'use client';

import { useState } from 'react';
import { Heart, Moon, Zap, Trophy, Activity, RefreshCw } from 'lucide-react';

export default function MobileHealthDemo() {
  const [activeTab, setActiveTab] = useState<'activity' | 'sleep' | 'heart'>('activity');
  const [steps, setSteps] = useState(8420);

  const incrementSteps = () => {
    setSteps((prev) => prev + Math.floor(Math.random() * 300) + 100);
  };

  const ringCircumference = 2 * Math.PI * 18;
  const stepTarget = 10000;
  const progressPercent = Math.min(steps / stepTarget, 1);
  const strokeOffset = ringCircumference - progressPercent * ringCircumference;

  return (
    <div className="h-full min-h-screen bg-[#0C0D0F] text-[#EDEEF0] flex flex-col justify-between select-none font-sans overflow-hidden border border-neutral-900">
      {/* Header */}
      <div className="bg-[#14161A] border-b border-neutral-900 px-4 pt-8 pb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <Activity size={12} className="text-[#34D399]" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">VITALITY // MOCKUP</span>
        </div>
        <button
          onClick={incrementSteps}
          className="p-1 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={10} className="text-[#34D399]" />
          <span className="text-[9px] font-mono">STEP</span>
        </button>
      </div>

      {/* Tabs Content */}
      <div className="flex-grow p-4 flex flex-col justify-center space-y-4">
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {/* SVG Ring Progress */}
            <div className="flex items-center justify-center relative py-2">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 40 40">
                {/* Background Ring */}
                <circle cx="20" cy="20" r="18" fill="transparent" stroke="#1B1E23" strokeWidth="2.5" />
                {/* Active Ring */}
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="transparent"
                  stroke="#34D399"
                  strokeWidth="2.5"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              {/* Inner ring text */}
              <div className="absolute text-center flex flex-col items-center">
                <Zap size={14} className="text-[#34D399] mb-0.5 animate-pulse" />
                <span className="text-[14px] font-bold font-mono leading-none">{Math.round(progressPercent * 100)}%</span>
                <span className="text-[7px] text-neutral-500 font-mono tracking-widest mt-0.5">TARGET</span>
              </div>
            </div>

            {/* Step Stats card */}
            <div className="bg-[#1B1E23] p-3 rounded-xl border border-neutral-900 text-center">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-0.5">Steps Walked</span>
              <div className="text-xl font-bold font-mono text-[#34D399] tracking-tight">{steps.toLocaleString()}</div>
              <span className="text-[8px] text-neutral-500">Goal: 10,000 steps</span>
            </div>
          </div>
        )}

        {activeTab === 'sleep' && (
          <div className="space-y-4 animate-fade-in">
            {/* Sleep card */}
            <div className="bg-[#1B1E23] p-4 rounded-xl border border-neutral-900 text-center relative overflow-hidden">
              <div className="absolute w-20 h-20 rounded-full bg-violet-600/10 blur-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <Moon size={20} className="text-violet-400 mx-auto mb-2 animate-bounce" />
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-0.5">Last Night Session</span>
              <div className="text-xl font-bold font-mono text-violet-400 tracking-tight">7h 42m</div>
              <span className="text-[8px] text-neutral-500">Deep Sleep: 2h 15m (Good)</span>
            </div>
          </div>
        )}

        {activeTab === 'heart' && (
          <div className="space-y-4 animate-fade-in">
            {/* Heart card */}
            <div className="bg-[#1B1E23] p-4 rounded-xl border border-neutral-900 text-center relative overflow-hidden">
              <div className="absolute w-20 h-20 rounded-full bg-[#FF5F56]/10 blur-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <Heart size={20} className="text-[#FF5F56] mx-auto mb-2 animate-pulse" />
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-0.5">Current Pulse</span>
              <div className="text-xl font-bold font-mono text-[#FF5F56] tracking-tight">74 BPM</div>
              <span className="text-[8px] text-neutral-500">Resting Avg: 65 BPM</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs Footer */}
      <div className="bg-[#14161A] border-t border-neutral-900 p-2 grid grid-cols-3 shrink-0">
        <button
          onClick={() => setActiveTab('activity')}
          className={`flex flex-col items-center py-1 rounded cursor-pointer transition-colors ${
            activeTab === 'activity' ? 'text-[#34D399] bg-neutral-900' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Zap size={14} />
          <span className="text-[7px] font-mono tracking-widest uppercase mt-1">Energy</span>
        </button>
        <button
          onClick={() => setActiveTab('sleep')}
          className={`flex flex-col items-center py-1 rounded cursor-pointer transition-colors ${
            activeTab === 'sleep' ? 'text-violet-400 bg-neutral-900' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Moon size={14} />
          <span className="text-[7px] font-mono tracking-widest uppercase mt-1">Sleep</span>
        </button>
        <button
          onClick={() => setActiveTab('heart')}
          className={`flex flex-col items-center py-1 rounded cursor-pointer transition-colors ${
            activeTab === 'heart' ? 'text-[#FF5F56] bg-neutral-900' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Heart size={14} />
          <span className="text-[7px] font-mono tracking-widest uppercase mt-1">Heart</span>
        </button>
      </div>
    </div>
  );
}
