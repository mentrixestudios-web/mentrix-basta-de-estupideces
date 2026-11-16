import React from 'react';
import { Volume2, Users, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export function Navbar({ onOpenBuzzer, onOpenPlayers, onOpenCharacters, players, currentPlayer }) {
  return (
    <header className="sticky top-0 z-40 bg-[#161224]/90 backdrop-blur-md border-b-2 border-black px-4 py-2.5 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5">
          <img 
            src="/images/portada.jpg" 
            alt="Basta de Estupideces Logo" 
            className="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-pop-hover object-cover"
          />
          <div>
            <h1 className="font-comic text-xl text-yellow-300 leading-none tracking-wide comic-stroke-sm">
              BASTA DE ESTUPIDECES
            </h1>
            <p className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
              El Juego de Carrete
            </p>
          </div>
        </div>

        {/* Current Turn & Quick Buttons */}
        <div className="flex items-center gap-2">
          {/* Turn Indicator */}
          {currentPlayer && (
            <div className="hidden sm:flex items-center gap-2 bg-[#261E38] px-3 py-1 rounded-full border border-purple-500/40 text-xs">
              <span className="text-gray-400">Turno de:</span>
              <span className="font-bold text-yellow-300 flex items-center gap-1">
                {currentPlayer.avatar && (
                  <img src={currentPlayer.avatar} className="w-4 h-4 rounded-full object-cover" />
                )}
                {currentPlayer.name}
              </span>
            </div>
          )}

          {/* Characters Button */}
          <button
            onClick={onOpenCharacters}
            className="bg-[#2A203F] hover:bg-[#392C55] text-white p-2 rounded-xl border border-purple-400/30 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Ver Protagonistas"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="hidden md:inline">Protagonistas</span>
          </button>

          {/* Players Button */}
          <button
            onClick={onOpenPlayers}
            className="bg-[#2A203F] hover:bg-[#392C55] text-white p-2 rounded-xl border border-purple-400/30 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Jugadoras"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">{players.length} Amigas</span>
          </button>

          {/* THE BIG RED BASTA BUZZER BUTTON */}
          <button
            onClick={onOpenBuzzer}
            className="bg-red-600 hover:bg-red-500 active:scale-95 text-white px-3 py-1.5 rounded-xl border-2 border-black shadow-pop font-comic text-sm tracking-wide flex items-center gap-1.5 animate-pulse transition"
          >
            <AlertCircle className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>¡BASTA!</span>
          </button>
        </div>
      </div>
    </header>
  );
}
