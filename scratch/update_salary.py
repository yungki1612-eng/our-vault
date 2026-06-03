file_path = '/Users/yungki/our-vault/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_salary = """        const SalarySheet = ({ data, onUpdate }) => {
            const salaryData = data.salary || { years: Array.from({length: 12}, (_, i) => String(2014 + i)), items: [{ id: 1, name: '융기', values: {} }, { id: 2, name: '수아', values: {} }] };
            const [years, setYears] = useState(salaryData.years);
            const fileInputRef = useRef(null);
            const containerRef = useRef(null);
            useEffect(() => { if (data.salary) setYears(data.salary.years); }, [data.salary]);
            
            const handleValueChange = (itemId, year, val) => {
                const newData = JSON.parse(JSON.stringify(data)); if (!newData.salary) newData.salary = salaryData;
                const item = newData.salary.items.find(i => i.id === itemId); if (item) { item.values[year] = val; onUpdate(newData); }
            };
            const addYear = () => {
                const lastYear = parseInt(years[years.length - 1]); const newYear = String(lastYear + 1);
                const newData = JSON.parse(JSON.stringify(data)); if (!newData.salary) newData.salary = salaryData;
                newData.salary.years.push(newYear); newData.salary.items.forEach(item => item.values[newYear] = 0); onUpdate(newData);
            };
            const handleDeleteYear = (yearToDelete) => {
                if (!confirm(`Delete data for ${yearToDelete}?`)) return;
                const newData = JSON.parse(JSON.stringify(data)); if (!newData.salary) return;
                newData.salary.years = newData.salary.years.filter(y => y !== yearToDelete);
                newData.salary.items.forEach(item => { if (item.values) delete item.values[yearToDelete]; }); onUpdate(newData);
            };
            const chartData = years.map(year => { const point = { year }; salaryData.items.forEach(item => point[item.name] = item.values[year] || 0); return point; });
            const itemTotals = salaryData.items.map(item => ({ id: item.id, name: item.name, total: Object.values(item.values).reduce((acc, val) => acc + (Number(val) || 0), 0) }));
            const grandTotal = itemTotals.reduce((acc, curr) => acc + curr.total, 0);
            const getLevel = (total) => {
                if (total > 2000000000) return { label: 'Generational Wealth Owner', color: 'text-amber-400', emoji: '🏰' };
                if (total > 1000000000) return { label: 'Rising Capitalist', color: 'text-emerald-400', emoji: '🏙️' };
                if (total > 500000000) return { label: 'Professional Earner', color: 'text-cyan-400', emoji: '☕' };
                if (total > 100000000) return { label: 'Diligent Ant', color: 'text-blue-400', emoji: '🐜' };
                return { label: 'Passion-Filled Rookie', color: 'text-slate-500', emoji: '🥚' };
            };
            const mainLevel = getLevel(grandTotal);
            return (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-r from-cyan-950/60 to-fuchsia-950/60 border border-white/10 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-2 font-grotesk">Our Lifetime Earnings</h2>
                            <div className="flex flex-col md:flex-row md:items-end gap-4"><span className="text-5xl font-black tracking-tighter font-grotesk">{formatCurrency(grandTotal)}</span><span className={`text-sm font-bold bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-1 flex items-center gap-2`}><span>{mainLevel.emoji}</span><span className="font-grotesk">{mainLevel.label}</span></span></div>
                            <p className="mt-4 text-slate-400 text-sm font-medium">"Hard work pays off! 🥩 We will be richer tomorrow than we are today."</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {itemTotals.map(it => { 
                            const lv = getLevel(it.total); 
                            const displayName = it.name === '융기' ? 'Yungki' : it.name === '수아' ? 'Sua' : it.name;
                            return (
                                <GlassCard key={it.id} className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative Earnings ({displayName})</span>
                                            <h3 className="text-3xl font-black text-white tracking-tight mt-1 font-grotesk">{formatCurrency(it.total)}</h3>
                                        </div>
                                        <div className="text-2xl">{lv.emoji}</div>
                                    </div>
                                    <div className={`text-xs font-bold ${lv.color} bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg inline-block font-grotesk`}>Level: {lv.label}</div>
                                </GlassCard>
                            ); 
                        })}
                    </div>
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-md font-bold text-white flex items-center gap-2 font-grotesk"><Icons.TrendingUp className="w-5 h-5 text-cyan-400"/> Walkwise of Lifetime Earnings</h3>
                            <div className="text-[10px] text-slate-500 font-bold uppercase font-grotesk">Income History Chart</div>
                        </div>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                                    <XAxis dataKey="year" fontSize={12} stroke="#64748b" axisLine={false} tickLine={false} />
                                    <YAxis fontSize={12} width={60} stroke="#64748b" tickFormatter={(val) => val >= 1000000 ? `${(val/1000000).toFixed(0)}M` : `${(val/1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                                    <RechartsTooltip formatter={(val) => formatCurrency(val)} contentStyle={{ background: 'rgba(10, 11, 22, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', color: '#e2e8f0' }} />
                                    <Legend iconType="circle" />
                                    <Line type="monotone" dataKey="융기" name="Yungki" stroke="#06b6d4" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#0f1026'}} activeDot={{r: 8, strokeWidth: 0}} />
                                    <Line type="monotone" dataKey="수아" name="Sua" stroke="#ec4899" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#0f1026'}} activeDot={{r: 8, strokeWidth: 0}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>
                    <GlassCard className="flex flex-col overflow-hidden">
                        <div className="p-5 bg-[#191b32]/40 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm font-grotesk">Yearly Salary Details</span>
                                <span className="text-[10px] text-slate-500 font-medium mt-0.5 font-grotesk">Unit: KRW (Gross income recommended)</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={addYear} className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-cyan-500/20 transition-all font-bold text-xs shadow-none active:scale-95"><Icons.Plus className="w-4 h-4"/> Add Year</button>
                                <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={(e) => {
                                    const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        const text = ev.target.result; const lines = text.split(/\\r\\n|\\n|\\r/).filter(l => l.trim() !== ''); if (lines.length < 2) return;
                                        const header = lines[0].split(',').map(s => s.trim().replace(/^"|"$/g, '')); const fileYears = header.slice(1);
                                        const newData = JSON.parse(JSON.stringify(data)); if(!newData.salary) newData.salary = { years: [], items: [] };
                                        const allYears = Array.from(new Set([...newData.salary.years, ...fileYears])).sort(); newData.salary.years = allYears;
                                        for(let i=1; i<lines.length; i++) {
                                            const row = lines[i].split(',').map(s => s.trim().replace(/^"|"$/g, '')); if(row.length < 2) continue;
                                            const name = row[0]; let item = newData.salary.items.find(it => it.name === name);
                                            if (!item) { item = { id: Date.now() + i, name: name, values: {} }; newData.salary.items.push(item); }
                                            fileYears.forEach((year, idx) => { item.values[year] = parseFloat(row[idx+1] || 0); });
                                        }
                                        onUpdate(newData); alert("Data successfully imported! 🚀");
                                    }; reader.readAsText(file);
                                }} />
                                <GlassButton onClick={() => fileInputRef.current.click()}><Icons.Upload className="w-3.5 h-3.5"/> Upload</GlassButton>
                                <GlassButton onClick={() => {
                                    const totalRow = salaryData.items.reduce((acc, item) => acc + Object.values(item.values).reduce((a,v) => a + (Number(v)||0), 0), 0);
                                    let csvRows = 'Name,Total,' + years.join(',') + '\\n';
                                    salaryData.items.forEach(item => {
                                        const displayName = item.name === '융기' ? 'Yungki' : item.name === '수아' ? 'Sua' : item.name;
                                        const itemTotal = Object.values(item.values).reduce((a,v) => a + (Number(v)||0), 0);
                                        csvRows += `"${displayName}",${itemTotal},` + years.map(y => item.values[y] || 0).join(',') + '\\n';
                                    });
                                    const blob = new Blob(['\\uFEFF' + csvRows], { type: 'text/csv;charset=utf-8;' });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.setAttribute('href', url);
                                    link.setAttribute('download', 'Salary_Management.csv');
                                    document.body.appendChild(link); link.click(); document.body.removeChild(link);
                                    URL.revokeObjectURL(url);
                                }}><Icons.Download className="w-3.5 h-3.5"/> Download</GlassButton>
                            </div>
                        </div>
                        <div className="overflow-auto custom-scrollbar" ref={containerRef}>
                            <table className="min-w-full text-sm text-right">
                                <thead className="bg-[#191b32]/40 text-slate-400 font-grotesk">
                                    <tr>
                                        <th className="p-4 text-left w-28 font-bold border-r border-white/5 sticky left-0 bg-[#191b32]/95 backdrop-blur-sm z-20">Name</th>
                                        <th className="p-4 w-32 font-black text-cyan-400 border-r border-white/10 sticky left-28 bg-[#1a2d42]/95 backdrop-blur-sm z-20">Total</th>
                                        {years.map(year => (
                                            <th key={year} data-year={year} className="p-4 min-w-[97px] font-bold border-r border-white/5 last:border-0 group/th relative">
                                                <div className="flex items-center justify-center gap-1">
                                                    {year}
                                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteYear(year); }} className="opacity-0 group-hover/th:opacity-100 p-1.5 hover:bg-rose-500/20 rounded-lg text-rose-400 transition-all absolute right-1 top-1/2 -translate-y-1/2" title="Delete Year">
                                                        <Icons.X className="w-3 h-3"/>
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {salaryData.items.map((item, idx) => {
                                        const itemTotal = Object.values(item.values).reduce((acc, val) => acc + (Number(val) || 0), 0);
                                        const displayName = item.name === '융기' ? 'Yungki' : item.name === '수아' ? 'Sua' : item.name;
                                        return (
                                            <tr key={item.id} className={`hover:bg-white/5 transition-colors group/tr ${idx % 2 === 0 ? 'bg-[var(--ss-cell-bg)]' : 'bg-[var(--ss-cell-bg-alt)]'}`}>
                                                <td className="p-4 text-left font-extrabold text-slate-300 bg-[var(--ss-sticky-bg)] sticky left-0 border-r border-white/5 z-10 group-hover/tr:bg-white/5 transition-colors">{displayName}</td>
                                                <td className="p-4 text-right font-black text-cyan-400 bg-[var(--ss-sum-bg)] sticky left-28 border-r border-white/10 z-10 group-hover/tr:bg-white/5 transition-colors">{formatCurrency(itemTotal)}</td>
                                                {years.map(year => (
                                                    <td key={year} className="p-0 border-r border-white/5">
                                                        <CurrencyInput value={item.values[year] || 0} onChange={(val) => handleValueChange(item.id, year, val)} className="w-full h-full p-4 text-right bg-transparent focus:bg-cyan-500/10 outline-none text-xs font-mono text-slate-300 hover:bg-white/5 transition-all"/>
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </div>
            );
        };"""

start_marker = "const SalarySheet = ({ data, onUpdate }) => {"
end_marker = "const SyncModal = ({ isOpen, onClose, currentId, onSyncIdChange }) => {"

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx)
    if end_idx != -1:
        content = content[:start_idx] + new_salary + '\n\n        ' + content[end_idx:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("SalarySheet replaced successfully using script!")
    else:
        print("Could not find end marker.")
else:
    print("Could not find start marker.")
