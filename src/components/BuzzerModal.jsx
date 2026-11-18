import React, { useEffect } from 'react';
import { AlertTriangle, X, Wine } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function BuzzerModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      sounds.playBuzzer();
      setTimeout(() => {
        sounds.playVoice('/audio/paulina_basta.mp3');
      }, 350);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#211933] border-4 border-yellow-400 rounded-3xl p-6 shadow-pop-lg text-center transform scale-100 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-[#32264C] rounded-full border border-purple-400/30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Paulina Avatar & Red Card */}
        <div className="relative inline-block mb-3">
          <img
            src="/images/paulina.jpg"
            alt="Paulina La Jueza"
            className="w-28 h-28 mx-auto rounded-full border-4 border-red-500 shadow-pop object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-red-600 text-white font-comic text-xs px-2.5 py-1 rounded-lg border-2 border-black rotate-12 shadow-sm">
            ¡TARJETA ROJA!
          </div>
        </div>

        {/* Comic Alert Header */}
        <div className="inline-block bg-red-600 text-yellow-300 font-comic text-2xl md:text-3xl px-4 py-1.5 rounded-2xl border-2 border-black shadow-pop mb-3">
          ¡BASTA DE ESTUPIDECES!
        </div>

        <p className="text-gray-200 text-sm md:text-base font-semibold leading-relaxed mb-4">
          Una amiga acaba de justificar una toxicidad, defender a un casi algo o decir una excusa inaceptable.
        </p>

        {/* Penalty Box */}
        <div className="bg-[#140F22] border-2 border-dashed border-red-500/60 rounded-2xl p-4 mb-5 text-left flex items-start gap-3">
          <Wine className="w-8 h-8 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-comic text-yellow-400 text-lg tracking-wide block">
              VEREDICTO DEL TRIBUNAL:
            </span>
            <p className="text-xs text-gray-300 leading-snug">
              La acusada debe callarse de inmediato, pedir perdón a su dignidad y <strong className="text-white">tomarse 2 tragos o 1 shot</strong> por orden de Paulina.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 active:scale-98 text-black font-comic text-xl py-3 rounded-2xl border-2 border-black shadow-pop tracking-wider transition"
        >
          ¡ENTENDIDO, BASTA!
        </button>
      </div>
    </div>
  );
}
