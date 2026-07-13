'use client';

import { useState } from 'react';
import { ShoppingBag, Star, RefreshCw } from 'lucide-react';

const COLORS = [
  { name: 'Aether Blue', hex: '#4F8CFF', class: 'bg-[#4F8CFF]' },
  { name: 'Emerald Mobile', hex: '#34D399', class: 'bg-[#34D399]' },
  { name: 'Amber Custom', hex: '#F5A623', class: 'bg-[#F5A623]' },
  { name: 'Violet Game', hex: '#C961F2', class: 'bg-[#C961F2]' },
];

const SIZES = ['US 8', 'US 9', 'US 10', 'US 11'];

export default function EcommerceDemo() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('US 9');
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-6 select-none font-sans">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-neutral-900 pb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">DEMO // CUSTOMIZER</span>
        <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1 rounded-full text-xs">
          <ShoppingBag size={12} />
          <span>Cart: {cartCount}</span>
        </div>
      </header>

      {/* Main product display */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto items-center">
        {/* Sneaker Visualizer */}
        <div className="flex flex-col items-center justify-center p-4 bg-neutral-900/50 rounded-2xl border border-neutral-900 relative group min-h-[220px]">
          {/* Subtle spinning glow backdrop */}
          <div 
            className="absolute w-48 h-48 rounded-full blur-[80px] opacity-25 transition-colors duration-500"
            style={{ backgroundColor: selectedColor.hex }}
          />
          
          {/* Sneaker SVG */}
          <svg
            className="w-full max-w-[280px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transform -rotate-12 transition-transform group-hover:rotate-0 duration-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            {/* Sneaker outline and segments */}
            <path
              d="M3 14c2-1 4-1 6-2 1.5-.75 2.5-1.5 4-1 1 .3 1.5-.3 2-1s1.2-1.5 2-1 1 .5 1.5 1 .8 1.2 1.2 1.8c.8 1.2 1.3 2 1.3 3.2 0 1-.5 1.5-1 2-1 .8-2 1.5-3.5 1.8-2 .4-5.5.2-7.5-.2-2-.4-4.5-1.5-5.5-2.6C3.5 15.5 3.2 15 3 14Z"
              fill={selectedColor.hex}
              stroke="#ffffff"
              className="transition-colors duration-500"
            />
            {/* Sole */}
            <path
              d="M3.2 15.2c1 .8 3.5 1.8 5.5 2.2 2 .4 5.5.6 7.5.2 1.5-.3 2.5-1 3.5-1.8.5-.5 1-1 1-2H3c0 .5.1 1.1.2 1.6Z"
              fill="#ffffff"
              opacity="0.9"
            />
            {/* Laces */}
            <path
              d="M10 11.5c.5-.5 1.5-1.5 2-1.5m-2.5 3c.5-.5 1.5-1.5 2-1.5m-2.5 3c.5-.5 1.5-1.5 2-1.5"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            {/* Collar */}
            <path
              d="M13 11c1-1 2.5-2 4-2"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </svg>
          
          <span className="text-[10px] text-neutral-500 font-mono mt-4">interactive vector model</span>
        </div>

        {/* Sneaker custom details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#4F8CFF]">Featured Release</span>
            <div className="flex text-amber-500">
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold font-mono tracking-tight mb-2">AETHER STEP // ONE</h2>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Engineered mesh upper, adaptive responsive foam. Custom coloring variables injected dynamically in real-time.
          </p>

          {/* Color Switchers */}
          <div className="mb-4">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-2">Colorway: {selectedColor.name}</span>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full ${color.class} border-2 transition-all cursor-pointer ${
                    selectedColor.name === color.name ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size Switchers */}
          <div className="mb-6">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-2">Size</span>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs border rounded font-mono cursor-pointer transition-colors ${
                    selectedSize === size ? 'border-white bg-white text-black' : 'border-neutral-800 hover:border-neutral-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => setCartCount((prev) => prev + 1)}
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold py-2 rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={12} />
            <span>Inquire Build / Add</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-[9px] font-mono text-neutral-600 text-center border-t border-neutral-900 pt-3 flex justify-between">
        <span>RENDERED: CLIENT ROUTE</span>
        <span>AETHERIC WEB DEV</span>
      </footer>
    </div>
  );
}
