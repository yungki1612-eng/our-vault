file_path = '/Users/yungki/our-vault/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_layout = """            const handleResetData = () => { if (confirm("Are you sure you want to reset all data? This cannot be undone.")) { const initial = generateInitialData(); setFinancialData(initial); localStorage.removeItem('financialData'); } };
            const TABS = [
                {id: 'dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard}, 
                {id: 'assets', label: 'Asset Sheets', icon: Icons.Table2}, 
                {id: 'budget', label: 'Income & Expenses', icon: Icons.Banknote}, 
                {id: 'loans', label: 'Loans & Debt', icon: Icons.CreditCard}, 
                {id: 'realestate', label: 'Real Estate', icon: Icons.Home}, 
                {id: 'stocks', label: 'Stock Profits', icon: Icons.CandlestickChart}, 
                {id: 'salary', label: 'Salary Sheets', icon: Icons.TrendingUp}
            ];
            const [activeTab, setActiveTab] = useState('dashboard');
            const dashboardAllMonths = Object.keys(financialData).filter(isMonthKey).sort();
            const handleDashboardMonthChange = (direction) => {
                const idx = dashboardAllMonths.indexOf(dashboardViewDate);
                if (idx === -1) {
                    if (dashboardAllMonths.length > 0) setDashboardViewDate(dashboardAllMonths[dashboardAllMonths.length - 1]);
                    return;
                }
                const newIdx = idx + direction;
                if (newIdx >= 0 && newIdx < dashboardAllMonths.length) setDashboardViewDate(dashboardAllMonths[newIdx]);
            };

            return (
                <ErrorBoundary>
                    <div className="h-screen font-sans overflow-hidden flex flex-col transition-all duration-300 quantum-bg relative">
                        {/* Background Animated Blobs */}
                        <div className="blob blob-blue"></div>
                        <div className="blob blob-purple"></div>
                        <div className="blob blob-pink"></div>

                        <SyncModal isOpen={showSyncModal} onClose={() => setShowSyncModal(false)} currentId={syncId} onSyncIdChange={setSyncId} />
                        <div className="sticky top-0 z-50 backdrop-blur-xl border-b shrink-0 transition-all duration-300 bg-black/30 border-white/5">
                            <div className="flex items-center h-16 max-w-[1600px] mx-auto px-6 lg:px-10 relative z-10">
                                <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 p-0.5">
                                            <div className="w-full h-full rounded-full bg-[#0a0b16] flex items-center justify-center">
                                                <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">V</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="text-md font-bold tracking-tight font-grotesk text-white leading-none">QuantumVault</h1>
                                            <p className="text-[8px] text-white/40 uppercase tracking-widest mt-0.5 leading-none">Holographic Telemetry Console</p>
                                        </div>
                                    </div>
                                    {activeTab === 'dashboard' && (
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-sm shrink-0">
                                            <button onClick={() => handleDashboardMonthChange(-1)} className="p-0.5 rounded-full transition-colors text-slate-400 hover:bg-white/10"><Icons.ChevronLeft className="w-4 h-4"/></button>
                                            <span className="text-sm font-extrabold min-w-[72px] text-center text-cyan-400 font-grotesk">{dashboardViewDate}</span>
                                            <button onClick={() => handleDashboardMonthChange(1)} className="p-0.5 rounded-full transition-colors text-slate-400 hover:bg-white/10"><Icons.ChevronRight className="w-4 h-4"/></button>
                                        </div>
                                    )}
                                    <nav className="hidden md:flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar">
                                        {TABS.map(tab => (
                                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/5' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'}`}/> 
                                                {tab.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex items-center gap-3 shrink-0 ml-4">
                                    <button onClick={() => setShowSyncModal(true)} className="text-[10px] font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full px-3 py-1 flex items-center gap-1.5 transition-all hover:bg-cyan-500/20">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-fuchsia-500 animate-pulse' : 'bg-cyan-400'}`} />
                                        <span>QUANTUM_LINK: {isSyncing ? 'SYNCING' : 'ACTIVE'}</span>
                                    </button>
                                    <div className="hidden sm:flex text-[10px] font-semibold bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 rounded-full px-3 py-1 items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                                        <span>DB_SYNCED</span>
                                    </div>
                                    <button onClick={handleResetData} className="text-slate-500 hover:text-rose-500 transition-colors p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 hover:bg-rose-500/10" title="Reset All Data">
                                        <Icons.RefreshCw className="w-3.5 h-3.5"/>
                                    </button>
                                </div>
                            </div>
                            <div className="md:hidden overflow-x-auto no-scrollbar px-4 py-2 border-t flex gap-2 relative z-10 border-white/5 bg-[#0f1026]/40 backdrop-blur-xl">
                                {TABS.map(tab => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' : 'text-slate-400 bg-white/5'}`}>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex overflow-hidden relative z-10">
                            {/* Left Side Console Menu for desktop viewports */}
                            <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-black/25 backdrop-blur-xl p-6 overflow-y-auto shrink-0 justify-between">
                                <div className="space-y-6">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] font-grotesk pl-2">Console Menu</div>
                                    <div className="space-y-1.5">
                                        {TABS.map(tab => (
                                            <button 
                                                key={tab.id} 
                                                onClick={() => setActiveTab(tab.id)} 
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/5' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                            >
                                                <tab.icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'}`}/> 
                                                <span className="font-grotesk">{tab.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <GlassCard className="p-4 border-cyan-500/20">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-grotesk">Quantum Status</span>
                                            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">ONLINE</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
                                            <span>DB Latency</span>
                                            <span className="text-cyan-400">14 ms</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                                            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                                        </div>
                                    </GlassCard>
                                </div>

                                <div className="space-y-2 mt-auto border-t border-white/5 pt-6 font-mono text-[9px] text-slate-500">
                                    <div className="flex justify-between">
                                        <span>SYS_SHIELD:</span>
                                        <span className="text-cyan-400 font-bold">SECURED</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>INTEGRITY:</span>
                                        <span className="text-emerald-400 font-bold">100% OK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>FIREBASE:</span>
                                        <span className="text-pink-400 font-bold">CONNECTED</span>
                                    </div>
                                </div>
                            </aside>

                            {/* Main workspace */}
                            <main className="flex-1 overflow-auto p-4 lg:p-8 custom-scrollbar">
                                <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
                                    {activeTab === 'dashboard' && <Dashboard key={lastUpdated} data={financialData} onUpdate={updateFinancialData} darkMode={darkMode} viewDate={dashboardViewDate} setViewDate={setDashboardViewDate} />}
                                    {activeTab === 'assets' && <GenericSpreadsheet data={financialData} type="assets" onUpdate={updateFinancialData} categories={ASSET_CATEGORIES} hasCategory={true} darkMode={darkMode} />}
                                    {activeTab === 'realestate' && <RealEstateSheet data={financialData} onUpdate={updateFinancialData} darkMode={darkMode} />}
                                    {activeTab === 'budget' && <GenericSpreadsheet data={financialData} type="budget" onUpdate={updateFinancialData} categories={BUDGET_CATEGORIES} hasCategory={true} darkMode={darkMode} />}
                                    {activeTab === 'loans' && <LoanManagement data={financialData} onUpdate={updateFinancialData} darkMode={darkMode} />}
                                    {activeTab === 'stocks' && <GenericSpreadsheet data={financialData} type="stockProfit" onUpdate={updateFinancialData} categories={STOCK_PROFIT_CATEGORIES} hasCategory={true} darkMode={darkMode} />}
                                    {activeTab === 'salary' && <SalarySheet data={financialData} onUpdate={updateFinancialData} darkMode={darkMode} />}
                                </div>
                            </main>
                        </div>
                    </div>
                </ErrorBoundary>
            );
        }"""

start_marker = '            const handleResetData = () => { if (confirm("모든 데이터를 초기화하시겠습니까?")) { const initial = generateInitialData(); setFinancialData(initial); localStorage.removeItem(\'financialData\'); } };'
end_marker = "        const root = ReactDOM.createRoot(document.getElementById('root'));"

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx)
    if end_idx != -1:
        content = content[:start_idx] + new_layout + '\n\n        ' + content[end_idx:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Layout and Tabs updated successfully!")
    else:
        print("Could not find end marker.")
else:
    print("Could not find start marker.")
