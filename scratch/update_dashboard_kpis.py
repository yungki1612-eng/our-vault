file_path = '/Users/yungki/our-vault/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

combined_component = """        const CombinedAssetTelemetry = ({ totalAssets, liquidAssets, liabilities, prevTotalAssets, calcYoY }) => {
            const stakedAssets = Math.max(0, totalAssets - liquidAssets);
            const yoy = calcYoY(totalAssets, prevTotalAssets);
            
            let trendColor = 'text-slate-400', trendBg = 'bg-white/5', TrendIcon = Icons.TrendingUp;
            if (yoy > 0) { trendColor = 'text-cyan-400'; trendBg = 'bg-cyan-500/10'; TrendIcon = Icons.TrendingUp; } 
            else if (yoy < 0) { trendColor = 'text-blue-400'; trendBg = 'bg-blue-500/10'; TrendIcon = Icons.TrendingDown; }

            const formatAbbr = (val) => {
                if (typeof val !== 'number' || isNaN(val)) return '₩ 0.0M';
                return `₩ ${(val / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
            };

            return (
                <div className="relative overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between w-full h-full shadow-xl shadow-black/20 group">
                    <div className="absolute right-0 top-0 w-32 h-32 opacity-25 pointer-events-none transition-transform duration-700 group-hover:scale-105">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400/30">
                            <circle cx="100" cy="0" r="80" fill="none" stroke="currentColor" strokeDasharray="3,3" strokeWidth="1"/>
                            <circle cx="100" cy="0" r="60" fill="none" stroke="currentColor" strokeWidth="0.75"/>
                            <circle cx="100" cy="0" r="40" fill="none" stroke="currentColor" strokeDasharray="5,5" strokeWidth="0.5"/>
                            <circle cx="100" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </svg>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] font-grotesk uppercase">
                                PORTFOLIO_AGGREGATED_WORTH
                            </span>
                            {yoy !== 0 && (
                                <div className={`inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-full ${trendBg} ${trendColor} border border-current/10 font-mono`}>
                                    <TrendIcon className="w-2.5 h-2.5 mr-0.5" />
                                    YoY {Math.abs(yoy).toFixed(1)}%
                                </div>
                            )}
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-grotesk">
                                ₩ {new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(totalAssets)}
                            </span>
                        </div>

                        <div className="w-full h-px bg-white/10 my-2"></div>

                        <div className="grid grid-cols-3 gap-4 pt-1">
                            <div>
                                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-grotesk">Liquid Value</span>
                                <span className="text-base sm:text-lg font-black text-slate-200 mt-1 font-grotesk block truncate">
                                    {formatAbbr(liquidAssets)}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-grotesk">Staked Assets</span>
                                <span className="text-base sm:text-lg font-black text-slate-200 mt-1 font-grotesk block truncate">
                                    {formatAbbr(stakedAssets)}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-grotesk">Active Debt</span>
                                <span className="text-base sm:text-lg font-black text-rose-400 mt-1 font-grotesk block truncate">
                                    {formatAbbr(liabilities)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

"""

# 1. Insert CombinedAssetTelemetry component
target_str = "        const Dashboard = ({ data = {}, onUpdate, viewDate: viewDateProp, setViewDate: setViewDateProp }) => {"
idx = content.find(target_str)
if idx != -1:
    content = content[:idx] + combined_component + "        " + content[idx:]
    print("CombinedAssetTelemetry component added successfully!")
else:
    print("Error: Could not find const Dashboard definition.")
    exit(1)

# 2. Replace top cards grid
old_grid = """                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        {['total', 'net', 'debt', 'invest', 'annual'].map((id) => (
                            <div key={id}>{renderScoreCard(id)}</div>
                        ))}
                    </div>"""

new_grid = """                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <CombinedAssetTelemetry 
                                totalAssets={totalAssets} 
                                liquidAssets={liquidAssets} 
                                liabilities={liabilitiesExclJeonse} 
                                prevTotalAssets={prevTotalAssets}
                                calcYoY={calcYoY}
                            />
                        </div>
                        <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            {renderScoreCard('net')}
                            {renderScoreCard('annual')}
                        </div>
                    </div>"""

if old_grid in content:
    content = content.replace(old_grid, new_grid)
    print("Dashboard cards layout updated successfully!")
else:
    # Try with single quotes or different whitespace
    print("Error: Could not find the old cards grid block in index.html.")
    exit(1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Dashboard KPIs update script completed successfully.")
