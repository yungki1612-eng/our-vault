file_path = '/Users/yungki/our-vault/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_loans = """        const SyncModal = ({ isOpen, onClose, currentId, onSyncIdChange }) => {
            const [inputValue, setInputValue] = useState(''); if (!isOpen) return null;
            return (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
                    <div className="bg-[#0f1026] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl m-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 font-grotesk">
                                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20"><Icons.Cloud className="w-5 h-5"/></div>
                                Data Sync
                            </h3>
                            <button onClick={onClose} className="text-slate-500 hover:text-white"><Icons.X className="w-5 h-5"/></button>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 font-grotesk">Current Sync Key</label>
                                <div className="flex gap-2">
                                    <code className="flex-1 bg-black/35 border border-white/10 rounded-lg p-3 text-xs font-mono text-slate-300 break-all select-all">{currentId}</code>
                                    <button onClick={() => { navigator.clipboard.writeText(currentId); alert('Sync key copied!'); }} className="p-3 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"><Icons.Copy className="w-4 h-4"/></button>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-2">* Copy this key and input it on another device to sync data.</p>
                            </div>
                            <div className="border-t border-white/5 pt-6">
                                <label className="block text-sm font-bold text-slate-300 mb-2 font-grotesk">Load Data from Another Device</label>
                                <div className="flex gap-2">
                                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter Sync Key" className="flex-1 bg-black/25 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/>
                                    <button onClick={() => { if(confirm('Are you sure you want to load data? Your current local data will be overwritten.')) { onSyncIdChange(inputValue.trim()); onClose(); } }} disabled={!inputValue.trim()} className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-cyan-500/20 disabled:opacity-50 transition-colors">Load</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        const SliderInput = ({ label, value, min, max, step = 1, unit = '', onChange, formatter = (v) => v }) => (
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-grotesk">{label}</label>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">{formatter(value)}{unit}</span>
                </div>
                <input 
                    type="range" min={min} max={max} step={step} value={value} 
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
            </div>
        );

        const LoanCalculator = () => {
            const [purchasePrice, setPurchasePrice] = useState(500000000);
            const [equityRatio, setEquityRatio] = useState(30);
            const [rate, setRate] = useState(3.5);
            const [term, setTerm] = useState(30); // years
            const [gracePeriod, setGracePeriod] = useState(0); // years
            const [type, setType] = useState('level'); // level, principal, maturity

            const loanAmount = useMemo(() => purchasePrice * (1 - equityRatio / 100), [purchasePrice, equityRatio]);

            const results = useMemo(() => {
                const L = loanAmount;
                const r = rate / 100 / 12;
                const n = term * 12;
                const g = gracePeriod * 12;
                
                let monthlyPayment = 0;
                let totalInterest = 0;
                const yearlyData = [];

                if (r === 0) {
                    const mp = L / (n - g);
                    return { monthlyPayment: mp, totalInterest: 0, totalPayment: L, yearlyData: [] };
                }

                let currentBalance = L;
                let cumulativeInterest = 0;

                for (let year = 1; year <= term; year++) {
                    let yearPrincipal = 0;
                    let yearInterest = 0;

                    for (let month = 1; month <= 12; month++) {
                        const currentMonth = (year - 1) * 12 + month;
                        let mInterest = currentBalance * r;
                        let mPrincipal = 0;

                        if (currentMonth <= g) {
                            mPrincipal = 0;
                        } else {
                            if (type === 'level') {
                                const remainingMonths = n - g;
                                const mp = L * r * Math.pow(1 + r, remainingMonths) / (Math.pow(1 + r, remainingMonths) - 1);
                                monthlyPayment = mp;
                                mPrincipal = mp - mInterest;
                            } else if (type === 'principal') {
                                mPrincipal = L / (n - g);
                                monthlyPayment = mPrincipal + mInterest;
                            } else if (type === 'maturity') {
                                mPrincipal = 0;
                                monthlyPayment = mInterest;
                            }
                        }

                        if (type === 'maturity' && currentMonth === n) {
                            mPrincipal = L;
                        }

                        yearPrincipal += mPrincipal;
                        yearInterest += mInterest;
                        currentBalance -= mPrincipal;
                        cumulativeInterest += mInterest;
                    }

                    yearlyData.push({
                        name: `${year} Yr`,
                        Principal: Math.round(yearPrincipal),
                        Interest: Math.round(yearInterest)
                    });
                }

                let displayMonthly = 0;
                if (type === 'level') {
                    const remainingMonths = n - g;
                    displayMonthly = L * r * Math.pow(1 + r, remainingMonths) / (Math.pow(1 + r, remainingMonths) - 1);
                } else if (type === 'principal') {
                    displayMonthly = (L / (n - g)) + (L * r); // Initial payment
                } else {
                    displayMonthly = L * r; // Monthly interest
                }

                return { 
                    monthlyPayment: displayMonthly, 
                    totalInterest: cumulativeInterest, 
                    totalPayment: L + cumulativeInterest,
                    yearlyData 
                };
            }, [loanAmount, rate, term, gracePeriod, type]);

            return (
                <GlassCard className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
                                <Icons.Calculator className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-white font-grotesk">Loan Simulator</h4>
                        </div>
                        <div className="flex bg-black/30 p-1 rounded-xl gap-1 border border-white/10">
                            {['level', 'principal', 'maturity'].map((t) => (
                                <button 
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${type === t ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-300'}`}
                                >
                                    {t === 'level' ? 'Amortization' : t === 'principal' ? 'Equal Principal' : 'Maturity'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">
                        <div className="space-y-6">
                            <SliderInput 
                                label="Purchase Price" value={purchasePrice} min={50000000} max={2000000000} step={10000000} unit=" KRW" 
                                formatter={(v) => (v / 100000000).toFixed(1) + ' 100M'} onChange={setPurchasePrice} 
                            />
                            <SliderInput 
                                label="Equity Ratio" value={equityRatio} min={0} max={100} unit="%" 
                                onChange={setEquityRatio} 
                            />
                            <SliderInput 
                                label="Interest Rate" value={rate} min={1} max={15} step={0.1} unit="%" 
                                onChange={setRate} 
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <SliderInput 
                                    label="Loan Term" value={term} min={1} max={50} unit=" Yrs" 
                                    onChange={setTerm} 
                                />
                                <SliderInput 
                                    label="Grace Period" value={gracePeriod} min={0} max={Math.min(term, 10)} unit=" Yrs" 
                                    onChange={setGracePeriod} 
                                />
                            </div>

                            <div className="p-5 bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-white/10 rounded-2xl text-white shadow-xl relative overflow-hidden shadow-cyan-500/5">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative z-10 flex flex-col gap-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest opacity-80 mb-1 font-grotesk">Estimated Loan Amount</p>
                                        <h3 className="text-2xl font-black font-grotesk">{formatCurrency(loanAmount)}</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400">{type === 'principal' ? 'Monthly Payment (Max)' : 'Monthly Payment'}</p>
                                            <p className="text-lg font-black font-grotesk text-white">{formatCurrency(results.monthlyPayment)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400">Total Interest Paid</p>
                                            <p className="text-lg font-black font-grotesk text-white">{formatCurrency(results.totalInterest)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 font-grotesk">Yearly Principal & Interest Breakdown</p>
                            <div className="flex-1 min-h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={results.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                                        <XAxis dataKey="name" fontSize={10} stroke="#94a3b8" axisLine={false} tickLine={false} />
                                        <YAxis fontSize={10} stroke="#94a3b8" axisLine={false} tickLine={false} tickFormatter={(val) => val >= 1000000 ? `${(val/1000000).toFixed(1)}M` : val >= 1000 ? `${(val/1000).toFixed(0)}k` : val} />
                                        <RechartsTooltip 
                                            cursor={{fill: 'rgba(255, 255, 255, 0.02)'}}
                                            formatter={(v) => formatCurrency(v)}
                                            contentStyle={{ background: 'rgba(10, 11, 22, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', color: '#e2e8f0' }}
                                        />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                                        <Bar dataKey="Principal" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                                        <Bar dataKey="Interest" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            );
        };

        const LoanTrendGraph = ({ data }) => {
            const months = useMemo(() => Object.keys(data).filter(isMonthKey).sort(), [data]);
            
            const uniqueLoanNames = useMemo(() => {
                const names = new Set();
                months.forEach(m => {
                    (data[m]?.loans || []).forEach(loan => names.add(loan.name));
                });
                return Array.from(names);
            }, [data, months]);

            const graphData = useMemo(() => months.map(m => {
                const point = { name: m };
                (data[m]?.loans || []).forEach(loan => {
                    point[loan.name] = Number(loan.amount) || 0;
                });
                return point;
            }), [data, months]);

            const colors = ['#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

            return (
                <GlassCard className="p-6 h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
                                <Icons.TrendingDown className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-white font-grotesk">Balance Trend by Loan</h4>
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-grotesk">Loan Analytics</div>
                    </div>
                    <div className="h-64 sm:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                                <XAxis dataKey="name" fontSize={10} stroke="#94a3b8" tickMargin={10} axisLine={false} tickLine={false} />
                                <YAxis fontSize={10} width={60} stroke="#94a3b8" tickFormatter={(val) => val >= 1000000 ? `${(val/1000000).toFixed(1)}M` : val >= 1000 ? `${(val/1000).toFixed(0)}k` : val} axisLine={false} tickLine={false} />
                                <RechartsTooltip 
                                    formatter={(val, name) => [formatCurrency(val), name]} 
                                    contentStyle={{ background: 'rgba(10, 11, 22, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#e2e8f0' }} 
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                {uniqueLoanNames.map((loanName, index) => (
                                    <Line 
                                        key={loanName}
                                        type="monotone" 
                                        dataKey={loanName} 
                                        name={loanName}
                                        stroke={colors[index % colors.length]} 
                                        strokeWidth={3} 
                                        dot={{r: 3, strokeWidth: 2, fill: '#0f1026'}} 
                                        activeDot={{r: 6, strokeWidth: 0}} 
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            );
        };

        const LoanManagement = ({ data, onUpdate }) => {
            return (
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 gap-6">
                        <LoanTrendGraph data={data} />
                    </div>
                    <GenericSpreadsheet data={data} type="loans" onUpdate={onUpdate} hasCategory={false} />
                    <div className="grid grid-cols-1 gap-6">
                        <LoanCalculator />
                    </div>
                </div>
            );
        };"""

start_marker = "const SyncModal = ({ isOpen, onClose, currentId, onSyncIdChange }) => {"
end_marker = "const migrateStockProfitData = (data) => {"

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx)
    if end_idx != -1:
        content = content[:start_idx] + new_loans + '\n\n        ' + content[end_idx:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("SyncModal & LoanManagement replaced successfully!")
    else:
        print("Could not find end marker.")
else:
    print("Could not find start marker.")
