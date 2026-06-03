import re

file_path = '/Users/yungki/our-vault/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new GenericSpreadsheet component code
new_generic_spreadsheet = """        const GenericSpreadsheet = ({ data = {}, type, onUpdate, categories, hasCategory }) => {
            const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const safeData = data || {};
            const months = Object.keys(safeData).filter(isMonthKey).sort();
            const listKey = (type === 'stockProfit') ? 'stockProfit' : type;
            const [newItemName, setNewItemName] = useState('');
            const [targetCategory, setTargetCategory] = useState(hasCategory ? Object.keys(categories)[0] : '');
            const [targetCategory2, setTargetCategory2] = useState('');
            const [editingItemOption, setEditingItemOption] = useState(null);
            const [colWidths, setColWidths] = useState(() => {
                const saved = localStorage.getItem(`colWidths_v2_${type}`);
                return saved ? JSON.parse(saved) : { c1: 77, c2: 66, c3: 110 };
            });
            useEffect(() => {
                localStorage.setItem(`colWidths_v2_${type}`, JSON.stringify(colWidths));
            }, [colWidths, type]);
            const [resizing, setResizing] = useState(null);
            const [isUploading, setIsUploading] = useState(false);
            
            useEffect(() => {
                if (!resizing) return;
                const handleMouseMove = (e) => {
                    const diff = e.clientX - resizing.startX;
                    let newWidth = Math.max(40, resizing.startW + diff);
                    setColWidths(prev => ({ ...prev, [resizing.col]: newWidth }));
                };
                const handleMouseUp = () => setResizing(null);
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
            }, [resizing]);
            const fileInputRef = useRef(null);
            const containerRef = useRef(null);
            const [hiddenItems, setHiddenItems] = useState(() => { const savedHidden = safeData.meta?.hiddenRows?.[type]; return new Set(savedHidden || []); });
            const [showHidden, setShowHidden] = useState(false);
            const [hiddenMonths, setHiddenMonths] = useState(() => { const savedHidden = safeData.meta?.hiddenMonths?.[type]; return new Set(savedHidden || []); });
            const [showHiddenMonths, setShowHiddenMonths] = useState(false);
            const [orderedItems, setOrderedItems] = useState({});
            const visibleMonths = useMemo(() => months.filter(m => showHiddenMonths || !hiddenMonths.has(m)), [months, showHiddenMonths, hiddenMonths]);
            
            useEffect(() => { const savedHidden = safeData.meta?.hiddenRows?.[type]; if (savedHidden) setHiddenItems(new Set(savedHidden)); }, [safeData.meta?.hiddenRows, type]);
            useEffect(() => { const savedHiddenMonths = safeData.meta?.hiddenMonths?.[type]; if (savedHiddenMonths) setHiddenMonths(new Set(savedHiddenMonths)); }, [safeData.meta?.hiddenMonths, type]);
            const toggleHide = (itemKey) => { 
                const next = new Set(hiddenItems); if (next.has(itemKey)) next.delete(itemKey); else next.add(itemKey);
                setHiddenItems(next); const newData = JSON.parse(JSON.stringify(safeData)); if (!newData.meta) newData.meta = {}; if (!newData.meta.hiddenRows) newData.meta.hiddenRows = {}; newData.meta.hiddenRows[type] = Array.from(next); onUpdate(newData);
            };
            const toggleHideMonth = (month) => {
                const next = new Set(hiddenMonths); if (next.has(month)) next.delete(month); else next.add(month);
                setHiddenMonths(next); const newData = JSON.parse(JSON.stringify(safeData)); if (!newData.meta) newData.meta = {}; if (!newData.meta.hiddenMonths) newData.meta.hiddenMonths = {}; newData.meta.hiddenMonths[type] = Array.from(next); onUpdate(newData);
            };
            useEffect(() => {
                const currentUnique = new Set();
                const tempGroups = hasCategory ? Object.fromEntries(Object.keys(categories).map(k => [k, []])) : { ALL: [] };
                Object.values(safeData).forEach(m => { (m[listKey] || []).forEach(i => {
                    const groupCat = (hasCategory && categories[i.category]) ? i.category : (hasCategory ? normalizeCategory(i.category, type) : 'ALL');
                    const validCat2 = i.category2 || '';
                    // For hasCategory=false (loans/stockProfit), key by name only to prevent duplicates
                    const itemKey = hasCategory ? `${i.category || 'ALL'}|${validCat2}|${i.name}` : i.name;
                    if (!currentUnique.has(itemKey)) {
                        currentUnique.add(itemKey);
                        if(tempGroups[groupCat]) tempGroups[groupCat].push({ name: i.name, category: i.category, category2: validCat2, itemKey });
                    }
                }); });
                setOrderedItems(prev => {
                    const next = { ...prev }; let changed = false;
                    const keys = hasCategory ? Object.keys(categories) : ['ALL'];
                    keys.forEach(cat => {
                        const itemsInGroup = tempGroups[cat] || [];
                        itemsInGroup.sort((a, b) => {
                            if (hasCategory) {
                                const c2A = a.category2 || '';
                                const c2B = b.category2 || '';
                                if (c2A !== c2B) return c2A.localeCompare(c2B);
                            }
                            return a.name.localeCompare(b.name);
                        });
                        if (JSON.stringify(itemsInGroup) !== JSON.stringify(next[cat])) { next[cat] = itemsInGroup; changed = true; }
                    });
                    return changed ? next : prev;
                });
            }, [safeData, listKey, hasCategory, categories]);
            const handleReorder = (targetCat, fromName, toName, sourceCat) => {
                if (fromName === toName && targetCat === sourceCat) return;
                if (hasCategory && targetCat !== sourceCat) {
                    if(confirm(`Move '${fromName}' from '${categories[sourceCat]?.label}' to '${categories[targetCat]?.label}'?`)) {
                        const newData = JSON.parse(JSON.stringify(safeData));
                        Object.keys(newData).forEach(month => { 
                            if (isMonthKey(month) && newData[month][listKey]) { 
                                const item = newData[month][listKey].find(i => {
                                    const iCat = (hasCategory && categories[i.category]) ? i.category : (hasCategory ? Object.keys(categories)[0] : 'ALL');
                                    return i.name === fromName && iCat === sourceCat;
                                }); 
                                if (item) item.category = targetCat; 
                            } 
                        });
                        onUpdate(newData);
                    }
                }
            };
            const handleDeleteRow = (itemKey, label) => { 
                if (!confirm(`Are you sure you want to delete '${label}'?`)) return; 
                const newData = JSON.parse(JSON.stringify(safeData)); 
                Object.keys(newData).forEach(m => { 
                    if (isMonthKey(m) && newData[m][listKey]) 
                        newData[m][listKey] = newData[m][listKey].filter(i => {
                            const iKey = `${i.category || 'ALL'}|${i.category2 || ''}|${i.name}`;
                            return iKey !== itemKey;
                        }); 
                }); 
                onUpdate(newData); 
            };

            const handleCellChange = (month, itemName, field, val, itemCategory, itemCategory2) => {
                const newData = JSON.parse(JSON.stringify(safeData));
                if (!newData[month][listKey]) newData[month][listKey] = [];
                const list = newData[month][listKey];
                const searchCat1 = itemCategory || (hasCategory ? (targetCategory || Object.keys(categories)[0]) : 'ALL');
                const searchCat2 = itemCategory2 !== undefined ? itemCategory2 : targetCategory2;
                
                const idx = list.findIndex(i => {
                    if (!hasCategory) return i.name === itemName; // loans / stockProfit: name only
                    return i.name === itemName && (i.category || 'ALL') === searchCat1 && (i.category2 || '') === (searchCat2 || '');
                });

                if (idx >= 0) { list[idx][field] = val; } 
                else {
                    const newItem = { id: Date.now(), name: itemName };
                    if (hasCategory) {
                        newItem.category = searchCat1;
                        newItem.category2 = searchCat2;
                    } else {
                        // For loans/stockProfit: inherit category from existing entry in other months
                        // to prevent duplicate rows caused by mismatched itemKeys
                        const existingEntry = Object.keys(safeData)
                            .filter(isMonthKey)
                            .flatMap(m => safeData[m]?.[listKey] || [])
                            .find(i => i.name === itemName);
                        if (existingEntry?.category) newItem.category = existingEntry.category;
                    }
                    if(type === 'assets') newItem.value = 0; else if(type === 'stockProfit') { newItem.profit = 0; newItem.dividend = 0; } else newItem.amount = 0;
                    newItem[field] = val; list.push(newItem);
                }
                onUpdate(newData);
            };
            const handleAddRow = () => { if(!newItemName) return; const lastMonth = months[months.length-1]; if (lastMonth) { let defaultField = type === 'assets' ? 'value' : type === 'stockProfit' ? (targetCategory === 'DIVIDEND' ? 'dividend' : 'profit') : 'amount'; handleCellChange(lastMonth, newItemName, defaultField, 0); } setNewItemName(''); };
            const handleSaveRowEdit = () => {
                if (!editingItemOption || !editingItemOption.newName) { setEditingItemOption(null); return; }
                const { oldName, newName, cat1, cat2, oldCat1, oldCat2 } = editingItemOption;
                const newData = JSON.parse(JSON.stringify(safeData));
                let conflict = false;
                if (oldName !== newName || oldCat1 !== cat1 || oldCat2 !== cat2) {
                    Object.values(newData).forEach(m => {
                        if (m[listKey] && m[listKey].some(i => {
                            const iCat = (hasCategory && categories[i.category]) ? i.category : (hasCategory ? Object.keys(categories)[0] : 'ALL');
                            const iCat2 = i.category2 || '';
                            return i.name === newName && iCat === cat1 && iCat2 === cat2;
                        })) conflict = true;
                    });
                }
                if (conflict) { alert('This item already exists.'); return; }
                Object.keys(newData).forEach(m => {
                    if (isMonthKey(m) && newData[m][listKey]) {
                        const item = newData[m][listKey].find(i => {
                            const iCat = (hasCategory && categories[i.category]) ? i.category : (hasCategory ? Object.keys(categories)[0] : 'ALL');
                            const iCat2 = i.category2 || '';
                            return i.name === oldName && iCat === oldCat1 && iCat2 === oldCat2;
                        });
                        if (item) {
                            item.name = newName;
                            if (hasCategory) { item.category = cat1; item.category2 = cat2; }
                        }
                    }
                });
                onUpdate(newData);
                setEditingItemOption(null);
            };
            const handleAddMonth = () => { 
                const last = months[months.length - 1]; let newKey;
                if (!last) { const now = new Date(); newKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`; } 
                else { const [y, m] = last.split('-').map(Number); let ny = y, nm = m + 1; if (nm > 12) { ny++; nm = 1; } newKey = `${ny}-${String(nm).padStart(2, '0')}`; }
                const newData = JSON.parse(JSON.stringify(safeData)); if (!newData[newKey]) newData[newKey] = { assets: [], loans: [], budget: [], stockProfit: [] }; onUpdate(newData); 
            };
            const handleDeleteMonth = (month) => { if (!confirm(`Delete data for ${month}? This action cannot be undone.`)) return; const newData = JSON.parse(JSON.stringify(safeData)); delete newData[month]; onUpdate(newData); };
            return (
                <div className="flex flex-col h-[calc(100vh-180px)] overflow-hidden bg-black/30 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md">
                    <div className="px-3 py-2 bg-[var(--ss-hdr-bg)] border-b border-[var(--ss-hdr-border)] flex flex-wrap gap-2 justify-between items-center text-xs z-40 relative">
                        <div className="flex gap-2 items-center">
                            {hasCategory && (
                                <>
                                    <select className="px-2.5 py-1.5 border border-white/10 bg-slate-900/60 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/20 text-slate-300 text-xs rounded-xl" value={targetCategory} onChange={(e) => setTargetCategory(e.target.value)}>{Object.entries(categories).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}</select>
                                    <input type="text" placeholder="Subcategory" className="px-2.5 py-1.5 border border-white/10 bg-slate-900/60 w-24 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/20 text-xs rounded-xl text-white" value={targetCategory2} onChange={(e) => setTargetCategory2(e.target.value)} />
                                </>
                            )}
                            <input type="text" placeholder="Item Name" className="px-2.5 py-1.5 border border-white/10 bg-slate-900/60 w-32 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/20 text-xs rounded-xl text-white" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
                            <button onClick={handleAddRow} className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold transition-all rounded-xl shadow-sm"><Icons.Plus className="w-3.5 h-3.5"/> Add</button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer select-none px-2.5 py-1.5 hover:bg-white/5 hover:text-white transition-colors rounded-xl"><input type="checkbox" checked={showHidden} onChange={e => setShowHidden(e.target.checked)} className="rounded bg-black/40 border-white/10 text-cyan-400 focus:ring-0"/> Hidden Rows</label>
                            <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer select-none px-2.5 py-1.5 hover:bg-white/5 hover:text-white transition-colors rounded-xl"><input type="checkbox" checked={showHiddenMonths} onChange={e => setShowHiddenMonths(e.target.checked)} className="rounded bg-black/40 border-white/10 text-cyan-400 focus:ring-0"/> Hidden Cols</label>
                            <button onClick={handleAddMonth} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-all rounded-xl shadow-sm"><Icons.CalendarPlus className="w-3.5 h-3.5"/> Add Month</button>
                            <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={(e) => processFileUpload(e.target.files[0], safeData, type, onUpdate, setIsUploading)} />
                            <button onClick={() => fileInputRef.current.click()} disabled={isUploading} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all disabled:opacity-50 rounded-xl">{isUploading ? <Icons.Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Icons.Upload className="w-3.5 h-3.5"/>} Upload CSV</button>
                            <button onClick={() => downloadCSV(safeData, type)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all rounded-xl"><Icons.Download className="w-3.5 h-3.5"/> Download CSV</button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar bg-transparent relative">
                        <table className="text-sm text-right border-collapse" style={{tableLayout: 'fixed', width: colWidths.c1 + colWidths.c2 + colWidths.c3 + visibleMonths.length * 102}}>
                            <colgroup>
                                {hasCategory ? (
                                    <>
                                        <col style={{ width: colWidths.c1 }} />
                                        <col style={{ width: colWidths.c2 }} />
                                        <col style={{ width: colWidths.c3 }} />
                                    </>
                                ) : (
                                    <col style={{ width: colWidths.c1 + colWidths.c2 + colWidths.c3 }} />
                                )}
                                {visibleMonths.map(m => (
                                    <col key={m} style={{ width: 102 }} />
                                ))}
                            </colgroup>
                            <thead className="sticky top-0 z-40">
                                <tr style={{ background: 'var(--ss-hdr-bg)' }}>
                                    {hasCategory ? (
                                        <>
                                            <th className="sticky-c1-hdr p-2 text-center font-bold text-xs text-[var(--ss-hdr-text)] border-r border-[var(--ss-hdr-border)] overflow-hidden" style={{ left: 0, width: colWidths.c1, minWidth: colWidths.c1, maxWidth: colWidths.c1 }}>Category<div className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-cyan-400 z-50 opacity-50" onMouseDown={(e) => setResizing({ col: 'c1', startX: e.clientX, startW: colWidths.c1 })}/></th>
                                            <th className="sticky-c2-hdr p-2 text-center font-bold text-xs text-[var(--ss-hdr-text)] border-r border-[var(--ss-hdr-border)] overflow-hidden" style={{ left: colWidths.c1, width: colWidths.c2, minWidth: colWidths.c2, maxWidth: colWidths.c2 }}>Subcategory<div className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-cyan-400 z-50 opacity-50" onMouseDown={(e) => setResizing({ col: 'c2', startX: e.clientX, startW: colWidths.c2 })}/></th>
                                            <th className="sticky-c3-hdr p-2 text-center font-bold text-xs text-[var(--ss-hdr-text)] border-r-2 border-[var(--ss-hdr-border-strong)] overflow-hidden" style={{ left: colWidths.c1 + colWidths.c2, width: colWidths.c3, minWidth: colWidths.c3, maxWidth: colWidths.c3 }}>Item Name<div className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-cyan-400 z-50 opacity-50" onMouseDown={(e) => setResizing({ col: 'c3', startX: e.clientX, startW: colWidths.c3 })}/></th>
                                        </>
                                    ) : (
                                        <th className="sticky-col-header p-2 text-left pl-3 font-bold text-xs text-[var(--ss-hdr-text)]" style={{ left: 0, width: colWidths.c1 + colWidths.c2 + colWidths.c3, minWidth: colWidths.c1 + colWidths.c2 + colWidths.c3, maxWidth: colWidths.c1 + colWidths.c2 + colWidths.c3 }}>Item Name</th>
                                    )}
                                    {visibleMonths.map(m => (
                                        <th key={m} className={`p-0 border-r border-[var(--ss-hdr-border)] font-bold text-center text-[var(--ss-hdr-text)] group/th relative border-b-2 border-b-[var(--ss-hdr-border-strong)] ${hiddenMonths.has(m) ? 'opacity-50' : ''}`} style={{ background: 'var(--ss-hdr-bg)', minWidth: '102px', maxWidth: '102px', width: '102px' }}>
                                            <div className="flex flex-col items-center justify-center py-2 px-2">
                                                <span className="text-[9px] text-slate-500 font-medium tracking-widest uppercase font-grotesk">{m.split('-')[0]}</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs font-bold text-slate-300 font-grotesk">{MONTH_NAMES[parseInt(m.split('-')[1]) - 1]}</span>
                                                    <button onClick={(e) => { e.stopPropagation(); toggleHideMonth(m); }} className={`p-0.5 transition-colors ${hiddenMonths.has(m) ? 'text-emerald-400' : 'text-slate-500 hover:text-cyan-400'}`} title={hiddenMonths.has(m) ? "Show Column" : "Hide Column"}>
                                                        {hiddenMonths.has(m) ? <Icons.Eye className="w-3 h-3"/> : <Icons.EyeOff className="w-3 h-3"/>}
                                                    </button>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteMonth(m); }} className="opacity-0 group-hover/th:opacity-100 p-0.5 text-slate-400 hover:text-rose-400 transition-all absolute top-0.5 right-0.5" title="Delete Column"><Icons.X className="w-2.5 h-2.5"/></button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--ss-cell-border)]">
                            {(hasCategory ? Object.keys(categories) : ['ALL']).map(catKey => {
                                const items = orderedItems[catKey] || [];
                                const visibleItems = items.filter(i => showHidden || !hiddenItems.has(i.itemKey || i.name));
                                if (hasCategory && visibleItems.length === 0) return null;
                                return (
                                    <React.Fragment key={catKey}>
                                        {visibleItems.map((item, idx) => {
                                            const iKey = item.itemKey || item.name;
                                            const isEditing = editingItemOption?.oldName === item.name && editingItemOption?.oldCat1 === (item.category || catKey) && editingItemOption?.oldCat2 === (item.category2 || '');
                                            const isFirstCat1 = isEditing || idx === 0;
                                            const isFirstCat2 = isEditing || idx === 0 || (idx > 0 && visibleItems[idx - 1].category2 !== item.category2);
                                            return (
                                                <tr key={iKey} className={`${idx % 2 === 0 ? 'bg-[var(--ss-cell-bg)]' : 'bg-[var(--ss-cell-bg-alt)]'} hover:bg-cyan-500/5 transition-colors group/row`}>
                                                    {hasCategory ? (
                                                        <>
                                                            <td className="sticky-c1 p-2 text-center text-xs font-bold text-slate-300 overflow-hidden" style={{ left: 0, width: colWidths.c1, minWidth: colWidths.c1, maxWidth: colWidths.c1 }}>
                                                                {isEditing ? (
                                                                    <select className="w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 focus:border-cyan-400" value={editingItemOption.cat1} onChange={(e) => setEditingItemOption({...editingItemOption, cat1: e.target.value})}>
                                                                        {Object.entries(categories).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}
                                                                    </select>
                                                                ) : isFirstCat1 ? <span className="block truncate w-full">{categories[catKey].label}</span> : ''}
                                                            </td>
                                                            <td className="sticky-c2 p-2 text-center text-xs font-medium text-slate-400 overflow-hidden" style={{ left: colWidths.c1, width: colWidths.c2, minWidth: colWidths.c2, maxWidth: colWidths.c2 }}>
                                                                {isEditing ? (
                                                                    <input type="text" className="w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 text-center focus:border-cyan-400" value={editingItemOption.cat2} onChange={(e) => setEditingItemOption({...editingItemOption, cat2: e.target.value})} onKeyDown={(e) => e.key === 'Enter' && handleSaveRowEdit()} />
                                                                ) : isFirstCat2 ? <span className="block truncate w-full">{item.category2 || ''}</span> : ''}
                                                            </td>
                                                            <td className="sticky-c3 p-2 overflow-hidden" style={{ left: colWidths.c1 + colWidths.c2, width: colWidths.c3, minWidth: colWidths.c3, maxWidth: colWidths.c3 }}>
                                                                {isEditing ? (
                                                                    <div className="flex items-center justify-between">
                                                                        <input type="text" autoFocus className="w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 text-xs focus:border-cyan-400" value={editingItemOption.newName} onChange={(e) => setEditingItemOption({...editingItemOption, newName: e.target.value})} onKeyDown={(e) => e.key === 'Enter' && handleSaveRowEdit()} />
                                                                        <div className="flex items-center gap-0.5 ml-1">
                                                                            <button onClick={handleSaveRowEdit} className="p-1 text-emerald-400 hover:bg-emerald-500/20 rounded"><Icons.Check className="w-3 h-3"/></button>
                                                                            <button onClick={() => setEditingItemOption(null)} className="p-1 text-slate-400 hover:bg-white/10 rounded"><Icons.X className="w-3 h-3"/></button>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center justify-between group">
                                                                        <div className="flex items-center gap-2 overflow-hidden w-full">
                                                                            <button onClick={() => toggleHide(iKey)} className="text-slate-500 hover:text-cyan-400 transition-colors shrink-0">
                                                                                {hiddenItems.has(iKey) ? <Icons.EyeOff className="w-3.5 h-3.5" /> : <Icons.Eye className="w-3.5 h-3.5" />}
                                                                            </button>
                                                                            <span className={`text-xs font-bold truncate ${hiddenItems.has(iKey) ? 'text-slate-500 line-through' : 'text-slate-300'}`} title={item.name}>{item.name}</span>
                                                                        </div>
                                                                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                                                            <button onClick={() => setEditingItemOption({ oldName: item.name, newName: item.name, cat1: item.category || catKey, cat2: item.category2 || '', oldCat1: item.category || catKey, oldCat2: item.category2 || '' })} className="p-1 text-slate-500 hover:text-cyan-400"><Icons.Edit2 className="w-3.5 h-3.5"/></button>
                                                                            <button onClick={() => handleDeleteRow(iKey, item.name)} className="p-1 text-slate-500 hover:text-rose-400"><Icons.Trash2 className="w-3.5 h-3.5"/></button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <td className="sticky left-0 z-20 p-2 border-r border-white/5" style={{ minWidth: colWidths.c1+colWidths.c2+colWidths.c3, maxWidth: colWidths.c1+colWidths.c2+colWidths.c3, width: colWidths.c1+colWidths.c2+colWidths.c3, backgroundColor: 'var(--ss-sticky-bg)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                                                            {isEditing ? (
                                                                <div className="flex items-center justify-between">
                                                                    <input type="text" autoFocus className="w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 text-xs focus:border-cyan-400" value={editingItemOption.newName} onChange={(e) => setEditingItemOption({...editingItemOption, newName: e.target.value})} onKeyDown={(e) => e.key === 'Enter' && handleSaveRowEdit()} />
                                                                    <div className="flex items-center gap-0.5 ml-1">
                                                                        <button onClick={handleSaveRowEdit} className="p-1 text-emerald-400 hover:bg-emerald-500/20 rounded"><Icons.Check className="w-3 h-3"/></button>
                                                                        <button onClick={() => setEditingItemOption(null)} className="p-1 text-slate-400 hover:bg-white/10 rounded"><Icons.X className="w-3 h-3"/></button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center justify-between group">
                                                                    <div className="flex items-center gap-2 overflow-hidden w-full">
                                                                        <button onClick={() => toggleHide(iKey)} className="text-slate-500 hover:text-cyan-400 transition-colors shrink-0">
                                                                            {hiddenItems.has(iKey) ? <Icons.EyeOff className="w-3.5 h-3.5" /> : <Icons.Eye className="w-3.5 h-3.5" />}
                                                                        </button>
                                                                        <span className={`text-xs font-bold truncate ${hiddenItems.has(iKey) ? 'text-slate-500 line-through' : 'text-slate-300'}`} title={item.name}>{item.name}</span>
                                                                    </div>
                                                                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                                                        <button onClick={() => setEditingItemOption({ oldName: item.name, newName: item.name, cat1: item.category || 'ALL', cat2: '', oldCat1: item.category || 'ALL', oldCat2: '' })} className="p-1 text-slate-500 hover:text-cyan-400"><Icons.Edit2 className="w-3.5 h-3.5"/></button>
                                                                        <button onClick={() => handleDeleteRow(iKey, item.name)} className="p-1 text-slate-500 hover:text-rose-400"><Icons.Trash2 className="w-3.5 h-3.5"/></button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </td>
                                                    )}
                                                    {visibleMonths.map(month => {
                                                        const found = (safeData[month][listKey] || []).find(i => {
                                                            if (!hasCategory) {
                                                                return i.name === item.name;
                                                            }
                                                            const iCat = categories[i.category] ? i.category : Object.keys(categories)[0];
                                                            const iCat2 = i.category2 || '';
                                                            return i.name === item.name && iCat === (item.category || catKey) && iCat2 === (item.category2 || '');
                                                        });
                                                        if (type === 'stockProfit') {
                                                            const isCatDividend = (item.category === 'DIVIDEND');
                                                            const fieldKey = isCatDividend ? 'dividend' : 'profit';
                                                            const val = found ? (found[fieldKey] || 0) : 0;
                                                            return (
                                                                <td key={month} className="p-0 border-r border-[var(--ss-cell-border)]" style={{ minWidth: '102px', maxWidth: '102px', width: '102px' }}>
                                                                    <CurrencyInput value={val} onChange={(v) => handleCellChange(month, item.name, fieldKey, v, item.category, item.category2)} className={`w-full h-full p-2 text-right bg-transparent focus:bg-cyan-500/10 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-cyan-500/20 text-xs font-mono hover:bg-white/5 transition-colors ${val < 0 ? 'text-cyan-400 font-bold' : val > 0 ? (isCatDividend ? 'text-emerald-400 font-bold' : 'text-fuchsia-400 font-bold') : 'text-slate-600'}`} />
                                                                </td>
                                                            );
                                                        } else {
                                                            const val = found ? (found.value ?? found.amount ?? 0) : 0;
                                                            const fieldName = type === 'assets' ? 'value' : 'amount';
                                                            return (
                                                                <td key={month} className="p-0 border-r border-[var(--ss-cell-border)]" style={{ minWidth: '102px', maxWidth: '102px', width: '102px' }}><CurrencyInput value={val} onChange={(v) => handleCellChange(month, item.name, fieldName, v, item.category, item.category2)} className="w-full h-full p-2 text-right bg-transparent focus:bg-cyan-500/10 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-cyan-500/20 text-xs font-mono text-slate-200 hover:bg-white/5 transition-colors"/></td>
                                                            );
                                                        }
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        {hasCategory && (
                                            <tr style={{ background: 'var(--ss-sum-bg)' }} className="font-bold text-cyan-400 border-t border-[var(--ss-sum-border)]">
                                                <td className="sticky-c-sum p-2 text-right text-xs text-cyan-400 font-grotesk" colSpan={3} style={{ left: 0, paddingRight: '0.75rem' }}>{categories[catKey].label} Total</td>
                                                {visibleMonths.map(month => {
                                                    const sum = visibleItems.reduce((acc, item) => { 
                                                        const found = (safeData[month][listKey] || []).find(i => {
                                                            const iCat = (hasCategory && categories[i.category]) ? i.category : (hasCategory ? Object.keys(categories)[0] : 'ALL');
                                                            const iCat2 = i.category2 || '';
                                                            const itemCat = (hasCategory && categories[item.category]) ? item.category : (hasCategory ? Object.keys(categories)[0] : 'ALL');
                                                            const itemCat2 = item.category2 || '';
                                                            return i.name === item.name && iCat === itemCat && iCat2 === itemCat2;
                                                        }); 
                                                        let val = 0;
                                                        if (found) {
                                                            if (type === 'stockProfit') {
                                                                val = item.category === 'DIVIDEND' ? (evaluateFormula(found.dividend) || 0) : (evaluateFormula(found.profit) || 0);
                                                            } else {
                                                                val = found.value ?? found.amount ?? 0;
                                                            }
                                                        }
                                                        return acc + (typeof val === 'number' ? val : evaluateFormula(val)); 
                                                    }, 0);
                                                    return (<td key={month} className="p-2 text-right border-r border-[var(--ss-hdr-border)] text-xs font-bold text-cyan-400 font-grotesk" style={{ background: 'var(--ss-sum-bg)', minWidth: '102px', maxWidth: '102px', width: '102px' }}>{formatCurrency(sum)}</td>);
                                                })}
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };
"""

# Find GenericSpreadsheet and replace it
start_marker = "const GenericSpreadsheet = ({ data = {}, type, onUpdate, categories, hasCategory }) => {"
end_marker = "const OWNERSHIP_TYPES = {"

# Find the start position of start_marker and start of OWNERSHIP_TYPES after it
start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx)
    if end_idx != -1:
        # We need to replace from start_idx to end_idx (non-inclusive of OWNERSHIP_TYPES)
        # Let's verify how much of end_idx we should keep. We replace up to the blank line before end_marker
        old_block = content[start_idx:end_idx]
        content = content[:start_idx] + new_generic_spreadsheet + '\\n\\n        ' + content[end_idx:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("GenericSpreadsheet replaced successfully using script!")
    else:
        print("Could not find end marker.")
else:
    print("Could not find start marker.")
