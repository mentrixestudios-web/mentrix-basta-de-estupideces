import React from 'react';
import { X, Sparkles, HeartHandshake } from 'lucide-react';
import { CHARACTERS } from '../data/characters';

export function CharactersModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1D162E] border-3 border-yellow-400 rounded-3xl p-5 md:p-7 shadow-pop-lg my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/30 mb-5">
          <div>
            <h2 className="font-comic text-2xl md:text-3xl text-yellow-300 comic-stroke-sm tracking-wide">
              PROTAGONISTAS DEL PODCAST
            </h2>
            <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
              Las conductoras de "Basta de Estupideces"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-[#2E2248] rounded-full border border-purple-400/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Cards Grid */}
        <div className="space-y-4">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              className="bg-[#261E38] border-2 border-black rounded-2xl p-4 shadow-pop flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
            >
              <img
                src={char.avatar}
                alt={char.name}
                className="w-24 h-24 rounded-full border-3 border-black shadow-sm object-cover shrink-0"
                style={{ borderColor: char.color }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="font-comic text-xl text-white tracking-wide" style={{ color: char.accent }}>
                    {char.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-black bg-black/40 text-yellow-300">
                    {char.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-300 mb-2">
                  {char.subtitle}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed mb-2.5">
                  {char.description}
                </p>
                
                {/* Quote */}
                <div className="bg-[#181324] px-3 py-1.5 rounded-xl border border-purple-500/30 text-[11px] italic text-yellow-200/90 mb-2">
                  {char.quote}
                </div>

                {/* Superpower */}
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>Superpoder:</strong> {char.superpower}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-comic text-lg py-2.5 rounded-2xl border-2 border-black shadow-pop transition"
        >
          ¡VOLVER AL JUEGO!
        </button>
      </div>
    </div>
  );
}
