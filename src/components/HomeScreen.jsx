import React from 'react';
import { Play, Users, BookOpen, AlertCircle, Sparkles, Flame, ShieldAlert, Heart } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { sounds } from '../utils/soundEffects';

export function HomeScreen({ onStartGame, onOpenPlayers, onOpenCharacters, onOpenRules, onOpenBuzzer, players }) {
  const handleStart = () => {
    sounds.playCheer();
    onStartGame();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full px-4 py-4 animate-fade-in text-center">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 bg-[#251B38] border-2 border-black px-3.5 py-1 rounded-full shadow-pop-hover mb-3">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
        <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest">
          El Juego Oficial de Carrete
        </span>
      </div>

      {/* Main Cover Illustration */}
      <div className="relative w-full max-w-sm mx-auto mb-4 group">
        <div className="relative rounded-3xl overflow-hidden border-4 border-black shadow-pop-lg bg-[#241A38]">
          <img
            src="/images/portada.jpg"
            alt="Basta de Estupideces Podcast"
            className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-3">
            <span className="font-comic text-xl text-yellow-300 tracking-wider comic-stroke-sm">
              AMIGAS HABLANDO CLARO
            </span>
          </div>
        </div>

        {/* Small floating badge */}
        <div className="absolute -bottom-3 right-4 bg-pink-600 text-white font-comic text-xs px-3 py-1 rounded-xl border-2 border-black shadow-pop rotate-6">
          🍸 100% CARRETE
        </div>
      </div>

      {/* Title */}
      <h1 className="font-comic text-4xl sm:text-5xl text-yellow-300 leading-none mb-1 comic-stroke tracking-wide">
        BASTA DE ESTUPIDECES
      </h1>
      <p className="text-xs sm:text-sm text-gray-300 font-semibold max-w-md mx-auto mb-5 leading-snug">
        Confesiones, citas desastrosas, casi algos y veredictos sin filtro con <strong className="text-yellow-400">Karla, Paulina y Natalia</strong>.
      </p>

      {/* Meet the Hosts Bar */}
      <div className="w-full bg-[#1C162D] border-2 border-black rounded-2xl p-3 shadow-pop mb-5">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
            Las Conductoras del Juego:
          </span>
          <button
            onClick={onOpenCharacters}
            className="text-[11px] text-yellow-300 hover:underline font-bold flex items-center gap-0.5"
          >
            <span>Ver Fichas</span>
            <Sparkles className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={onOpenCharacters}
              className="bg-[#271E3C] hover:bg-[#342750] p-2 rounded-xl border border-purple-500/30 flex flex-col items-center gap-1 transition group"
            >
              <img
                src={char.avatar}
                alt={char.name}
                className="w-12 h-12 rounded-full border-2 border-black object-cover group-hover:scale-105 transition"
                style={{ borderColor: char.color }}
              />
              <span className="font-comic text-xs text-white tracking-wide">
                {char.name.split(' ')[0]}
              </span>
              <span
                className="text-[9px] font-bold px-1.5 py-0.2 rounded-md border border-black/40 text-black leading-tight"
                style={{ backgroundColor: char.color }}
              >
                {char.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Play Button */}
      <button
        onClick={handleStart}
        className="w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 active:scale-98 text-black font-comic text-2xl sm:text-3xl py-4 px-6 rounded-2xl border-4 border-black shadow-pop-lg tracking-wider flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 mb-3"
      >
        <Play className="w-7 h-7 fill-black" />
        <span>¡COMENZAR A JUGAR!</span>
      </button>

      {/* Secondary Options Grid */}
      <div className="grid grid-cols-3 gap-2.5 w-full">
        {/* Players setup */}
        <button
          onClick={onOpenPlayers}
          className="bg-[#241A38] hover:bg-[#32244C] text-white p-2.5 rounded-2xl border-2 border-black shadow-pop flex flex-col items-center justify-center gap-1 transition"
        >
          <Users className="w-5 h-5 text-cyan-400" />
          <span className="font-comic text-xs tracking-wide">
            {players.length} Amigas
          </span>
          <span className="text-[9px] text-gray-400 -mt-1 font-semibold">Configurar</span>
        </button>

        {/* Rules button */}
        <button
          onClick={onOpenRules}
          className="bg-[#241A38] hover:bg-[#32244C] text-white p-2.5 rounded-2xl border-2 border-black shadow-pop flex flex-col items-center justify-center gap-1 transition"
        >
          <BookOpen className="w-5 h-5 text-yellow-400" />
          <span className="font-comic text-xs tracking-wide">
            ¿Cómo Jugar?
          </span>
          <span className="text-[9px] text-gray-400 -mt-1 font-semibold">Reglas</span>
        </button>

        {/* Emergency buzzer */}
        <button
          onClick={onOpenBuzzer}
          className="bg-red-600 hover:bg-red-500 text-white p-2.5 rounded-2xl border-2 border-black shadow-pop flex flex-col items-center justify-center gap-1 transition group"
        >
          <AlertCircle className="w-5 h-5 text-yellow-300 fill-yellow-300 group-hover:scale-110 transition" />
          <span className="font-comic text-xs tracking-wide">
            ¡Botón BASTA!
          </span>
          <span className="text-[9px] text-red-200 -mt-1 font-semibold">Alarma</span>
        </button>
      </div>
    </div>
  );
}
