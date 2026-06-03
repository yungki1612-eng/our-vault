file_path = '/Users/yungki/our-vault/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_real_estate = """        const OWNERSHIP_TYPES = {
            OWN: { label: 'Owned', color: 'bg-cyan-500', text: 'text-cyan-400', light: 'bg-cyan-500/10' },
            JEONSE: { label: 'Jeonse', color: 'bg-emerald-500', text: 'text-emerald-400', light: 'bg-emerald-500/10' },
            RENT: { label: 'Rent', color: 'bg-amber-500', text: 'text-amber-400', light: 'bg-amber-500/10' }
        };

        const RealEstateSheet = ({ data, onUpdate }) => {
            const realEstate = data.realEstate || [];
            const [newItem, setNewItem] = useState({ name: '', category: 'APARTMENT', ownershipType: 'OWN', purchaseDate: '', purchasePrice: 0, currentValue: 0, loan: 0, deposit: 0, monthlyRent: 0 });

            const stats = useMemo(() => {
                const totalValue = realEstate.reduce((acc, item) => acc + (Number(item.currentValue) || 0), 0);
                const totalLoanDeposit = realEstate.reduce((acc, item) => acc + (Number(item.loan) || 0) + (Number(item.deposit) || 0), 0);
                const totalRent = realEstate.reduce((acc, item) => acc + (Number(item.monthlyRent) || 0), 0);
                return { totalValue, netWorth: totalValue - totalLoanDeposit, totalRent, count: realEstate.length };
            }, [realEstate]);

            const handleAddItem = () => {
                if (!newItem.name) return;
                const newData = JSON.parse(JSON.stringify(data));
                if (!newData.realEstate) newData.realEstate = [];
                newData.realEstate.push({ ...newItem, id: Date.now() });
                onUpdate(newData);
                setNewItem({ name: '', category: 'APARTMENT', ownershipType: 'OWN', purchaseDate: '', purchasePrice: 0, currentValue: 0, loan: 0, deposit: 0, monthlyRent: 0 });
            };

            const handleUpdateItem = (id, field, value) => {
                const newData = JSON.parse(JSON.stringify(data));
                const item = newData.realEstate.find(i => i.id === id);
                if (item) {
                    item[field] = value;
                    onUpdate(newData);
                }
            };

            const handleDeleteItem = (id) => {
                if (!confirm("Are you sure you want to delete this property?")) return;
                const newData = JSON.parse(JSON.stringify(data));
                newData.realEstate = newData.realEstate.filter(i => i.id !== id);
                onUpdate(newData);
            };

            return (
                <div className="space-y-6 animate-fade-in">
                    {/* Summary Header */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <GlassCard className="p-5 border-l-4 border-cyan-500">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Property Value</span>
                            <h3 className="text-2xl font-black text-white mt-1 font-grotesk">{formatCurrency(stats.totalValue)}</h3>
                        </GlassCard>
                        <GlassCard className="p-5 border-l-4 border-emerald-500">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Real Estate Net Worth</span>
                            <h3 className="text-2xl font-black text-emerald-400 mt-1 font-grotesk">{formatCurrency(stats.netWorth)}</h3>
                        </GlassCard>
                        <GlassCard className="p-5 border-l-4 border-rose-500">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Loans & Deposits</span>
                            <h3 className="text-2xl font-black text-rose-400 mt-1 font-grotesk">{formatCurrency(stats.totalValue - stats.netWorth)}</h3>
                        </GlassCard>
                        <GlassCard className="p-5 border-l-4 border-amber-500">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Monthly Rent</span>
                            <h3 className="text-2xl font-black text-amber-400 mt-1 font-grotesk">{formatCurrency(stats.totalRent)}</h3>
                        </GlassCard>
                    </div>

                    {/* Input Form */}
                    <CollapsibleCard title="Register New Property" icon={Icons.Plus} initialOpen={false}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Property Name</label>
                                <input type="text" placeholder="e.g. Raemian 84A" className="w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:ring-2 focus:ring-cyan-500/20 outline-none focus:border-cyan-500/30" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Property Type</label>
                                <select className="w-full p-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-slate-300 outline-none focus:border-cyan-500/30" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                                    {Object.entries(REAL_ESTATE_CATEGORIES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Ownership Type</label>
                                <div className="flex bg-black/30 p-1 rounded-xl gap-1 border border-white/10">
                                    {Object.entries(OWNERSHIP_TYPES).map(([k, v]) => (
                                        <button 
                                            key={k}
                                            onClick={() => setNewItem({...newItem, ownershipType: k})}
                                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${newItem.ownershipType === k ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-300'}`}
                                        >
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Purchase Date</label>
                                <input type="text" placeholder="YYYY-MM-DD" className="w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-cyan-500/30" value={newItem.purchaseDate} onChange={e => setNewItem({...newItem, purchaseDate: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">{newItem.ownershipType === 'OWN' ? 'Purchase Price' : 'Deposit Amount'}</label>
                                <CurrencyInput value={newItem.purchasePrice} onChange={v => setNewItem({...newItem, purchasePrice: v})} className="w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Current Value</label>
                                <CurrencyInput value={newItem.currentValue} onChange={v => setNewItem({...newItem, currentValue: v})} className="w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Loan Balance</label>
                                <CurrencyInput value={newItem.loan} onChange={v => setNewItem({...newItem, loan: v})} className="w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Deposit (Paid/Received)</label>
                                <CurrencyInput value={newItem.deposit} onChange={v => setNewItem({...newItem, deposit: v})} className="w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1">Monthly Rent</label>
                                <div className="flex gap-2">
                                    <CurrencyInput value={newItem.monthlyRent} onChange={v => setNewItem({...newItem, monthlyRent: v})} className="flex-1 p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" />
                                    <button onClick={handleAddItem} className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-6 rounded-xl font-bold hover:bg-cyan-500/20 transition-all shadow-lg active:scale-95 shadow-cyan-500/5">Register</button>
                                </div>
                            </div>
                        </div>
                    </CollapsibleCard>

                    {/* Property List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {realEstate.map(item => {
                            const cat = REAL_ESTATE_CATEGORIES[item.category] || REAL_ESTATE_CATEGORIES.OTHER;
                            const own = OWNERSHIP_TYPES[item.ownershipType] || OWNERSHIP_TYPES.OWN;
                            const investment = (Number(item.purchasePrice) || 0) - (Number(item.deposit) || 0);
                            const yieldRate = investment > 0 ? ((Number(item.monthlyRent) || 0) * 12 / investment * 100).toFixed(2) : 0;
                            const profit = (Number(item.currentValue) || 0) - (Number(item.purchasePrice) || 0);
                            const profitRate = (Number(item.purchasePrice) || 0) > 0 ? (profit / item.purchasePrice * 100).toFixed(1) : 0;

                            return (
                                <GlassCard key={item.id} className="overflow-hidden flex flex-col hover:border-cyan-500/20 hover:shadow-cyan-500/5 hover:-translate-y-0.5 transition-all duration-300">
                                    <div className="p-4 bg-[#191b32]/40 border-b border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Icons.Home className={`w-5 h-5 ${cat.text}`} /></div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${own.light} ${own.text} border border-current`}>{own.label}</span>
                                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${cat.bg} ${cat.text} border border-current opacity-70`}>{cat.label}</span>
                                                    <h4 className="font-bold text-slate-200">{item.name}</h4>
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-medium">Contract Date: {item.purchaseDate || '-'}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><Icons.Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Current Value</p>
                                            <CurrencyInput value={item.currentValue} onChange={v => handleUpdateItem(item.id, 'currentValue', v)} className="text-xl font-black text-white p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" />
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className={`text-[10px] font-bold ${profit >= 0 ? 'text-rose-400' : 'text-cyan-400'}`}>{profit >= 0 ? '▲' : '▼'} {formatCurrency(Math.abs(profit))} ({profitRate}%)</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Loan Balance</p>
                                            <CurrencyInput value={item.loan} onChange={v => handleUpdateItem(item.id, 'loan', v)} className="text-xl font-black text-slate-300 p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Deposit / Rent</p>
                                            <div className="space-y-1">
                                                <CurrencyInput value={item.deposit} onChange={v => handleUpdateItem(item.id, 'deposit', v)} className="text-sm font-bold text-slate-300 p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" />
                                                <div className="flex items-center gap-2">
                                                    <CurrencyInput value={item.monthlyRent} onChange={v => handleUpdateItem(item.id, 'monthlyRent', v)} className="text-base font-black text-cyan-400 p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" />
                                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-grotesk">Annual {yieldRate}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-3 bg-[#10122c]/40 border-t border-white/5 flex justify-between items-center text-xs text-slate-400">
                                        <span className="text-[10px] font-bold text-slate-500">{item.ownershipType === 'OWN' ? 'Purchase Price' : 'Deposit Amount'}: {formatCurrency(item.purchasePrice)}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-slate-500">Actual Invested: {formatCurrency(investment)}</span>
                                            <div className="h-3 w-px bg-white/5"></div>
                                            <span className="text-[10px] font-bold text-slate-300 uppercase font-grotesk">Net Worth: {formatCurrency(item.currentValue - item.loan - item.deposit)}</span>
                                        </div>
                                    </div>
                                </GlassCard>
                            );
                        })}
                        {realEstate.length === 0 && (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 border border-dashed border-cyan-500/15 rounded-3xl">
                                <Icons.Building2 className="w-16 h-16 mb-4 opacity-40 text-cyan-400" />
                                <p className="font-bold">No registered real estate assets.</p>
                                <p className="text-xs mt-1 text-slate-600">Add a new asset using the registration form above.</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        };"""

start_marker = "const OWNERSHIP_TYPES = {"
end_marker = "const SalarySheet = ({ data, onUpdate }) => {"

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx)
    if end_idx != -1:
        content = content[:start_idx] + new_real_estate + '\n\n        ' + content[end_idx:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("RealEstate replaced successfully using script!")
    else:
        print("Could not find end marker.")
else:
    print("Could not find start marker.")
