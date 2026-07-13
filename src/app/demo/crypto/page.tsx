'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Activity } from 'lucide-react';

export default function CryptoDemo() {
  const [price, setPrice] = useState(68240.50);
  const [priceChange, setPriceChange] = useState(3.12);
  const [history, setHistory] = useState([67800, 67950, 67900, 68150, 68020, 68100, 68240]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 300);

      setPrice((prev) => {
        const delta = (Math.random() - 0.47) * 80;
        const nextPrice = Number((prev + delta).toFixed(2));
        
        setHistory((prevHistory) => {
          const nextHistory = [...prevHistory.slice(1), nextPrice];
          return nextHistory;
        });

        const initialVal = 67800;
        const change = ((nextPrice - initialVal) / initialVal) * 100;
        setPriceChange(Number(change.toFixed(2)));

        return nextPrice;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const minVal = Math.min(...history);
  const maxVal = Math.max(...history);
  const valRange = maxVal - minVal || 1;
  const svgPoints = history
    .map((val, idx) => {
      const x = (idx / (history.length - 1)) * 100;
      const y = 35 - ((val - minVal) / valRange) * 28;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EDEEF0] flex flex-col justify-between p-6 select-none font-sans border border-neutral-900">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-neutral-900 pb-3">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-[#C961F2] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">APEX LIVE TELEMETRY</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
          <RefreshCw size={10} className={isUpdating ? 'animate-spin text-[#C961F2]' : ''} />
          <span>LIVE</span>
        </div>
      </header>

      {/* Main Board */}
      <main className="flex-grow flex flex-col justify-center my-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Price Block */}
          <div className="bg-[#14161A] p-4 rounded-xl border border-neutral-900">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">AET / USD</span>
            <div className="text-lg md:text-xl font-bold font-mono tracking-tight transition-all duration-300">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-medium">
              {priceChange >= 0 ? (
                <>
                  <ArrowUpRight size={12} className="text-[#34D399]" />
                  <span className="text-[#34D399]">+{priceChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight size={12} className="text-[#FF5F56]" />
                  <span className="text-[#FF5F56]">{priceChange}%</span>
                </>
              )}
            </div>
          </div>

          {/* Volume Block */}
          <div className="bg-[#14161A] p-4 rounded-xl border border-neutral-900 flex flex-col justify-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">24H Volume</span>
            <div className="text-lg md:text-xl font-bold font-mono tracking-tight text-[#4F8CFF]">
              $24.8M
            </div>
            <span className="text-[10px] font-mono text-neutral-500 mt-1">Slipped 1.2% dev</span>
          </div>
        </div>

        {/* Live Vector SVG Sparkline Chart */}
        <div className="bg-[#14161A] p-4 rounded-xl border border-neutral-900 flex-grow min-h-[120px] flex flex-col justify-between relative overflow-hidden">
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">Telemetry Stream (AET_60s)</span>
          
          <div className="w-full h-24 my-2 relative">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              {/* Fill Gradient path */}
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C961F2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C961F2" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0,40 L ${svgPoints} L 100,40 Z`}
                fill="url(#chartGlow)"
                className="transition-all duration-1000 ease-in-out"
              />
              {/* Line path */}
              <polyline
                fill="none"
                stroke="#C961F2"
                strokeWidth="1.5"
                points={svgPoints}
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[9px] font-mono text-neutral-500">
            <span>T-12s</span>
            <span>T-8s</span>
            <span>T-4s</span>
            <span>NOW</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-[9px] font-mono text-neutral-600 text-center border-t border-neutral-900 pt-3 flex justify-between">
        <span>RENDERED: COMPONENT_WS</span>
        <span>AETHERIC FINANCE DEV</span>
      </footer>
    </div>
  );
}
