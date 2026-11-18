import React from 'react';
import { Home, Users, Sparkles, AlertCircle, BookOpen, EyeOff, Trophy, Volume2 } from 'lucide-react';

export function Navbar({
  onOpenBuzzer,
  onOpenPlayers,
  onOpenCharacters,
  onOpenRules,
  onOpenAnonymous,
  onOpenVerdict,
  onOpenSoundboard,
  onGoHome,
  currentScreen,
  players,
  currentPlayer,
  customCardsCount,
  cardsPlayedCount
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#161224]/90 backdrop-blur-md border-b-2 border-black px-4 py-2.5 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Logo / Brand & Home */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition"
        >
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
              {currentScreen === 'home' ? 'Pantalla de Inicio' : 'El Juego de Carrete'}
            </p>
          </div>
        </div>

        {/* Quick Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* If in Game, show Return Home button */}
          {currentScreen === 'game' && (
            <button
              onClick={onGoHome}
              className="bg-[#2A203F] hover:bg-[#392C55] text-yellow-300 p-2 rounded-xl border border-yellow-400/30 text-xs font-bold transition flex items-center gap-1 shadow-sm"
              title="Volver a la Pantalla de Inicio"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Inicio</span>
            </button>
          )}

          {/* Turn Indicator (only in game) */}
          {currentScreen === 'game' && currentPlayer && (
            <div className="hidden md:flex items-center gap-2 bg-[#261E38] px-3 py-1 rounded-full border border-purple-500/40 text-xs">
              <span className="text-gray-400">Turno:</span>
              <span className="font-bold text-yellow-300 flex items-center gap-1">
                {currentPlayer.avatar && (
                  <img src={currentPlayer.avatar} className="w-4 h-4 rounded-full object-cover" />
                )}
                {currentPlayer.name}
              </span>
            </div>
          )}

          {/* Anonymous Mailbox Button */}
          <button
            onClick={onOpenAnonymous}
            className="relative bg-[#341647] hover:bg-[#481E63] text-fuchsia-300 p-2 rounded-xl border border-fuchsia-400/40 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Buzón Anónimo de Secretos"
          >
            <EyeOff className="w-4 h-4 text-fuchsia-400" />
            <span className="hidden sm:inline">Buzón</span>
            {customCardsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-fuchsia-500 text-white font-comic text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-black font-bold">
                {customCardsCount}
              </span>
            )}
          </button>

          {/* Characters Button */}
          <button
            onClick={onOpenCharacters}
            className="bg-[#2A203F] hover:bg-[#392C55] text-white p-2 rounded-xl border border-purple-400/30 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Ver Protagonistas"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="hidden lg:inline">Protagonistas</span>
          </button>

          {/* Soundboard Button */}
          <button
            onClick={onOpenSoundboard}
            className="bg-[#221A38] hover:bg-[#332454] text-cyan-300 p-2 rounded-xl border border-cyan-400/40 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Botonera de Voces (Soundboard)"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Voces</span>
          </button>

          {/* Players Button */}
          <button
            onClick={onOpenPlayers}
            className="bg-[#2A203F] hover:bg-[#392C55] text-white p-2 rounded-xl border border-purple-400/30 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Jugadoras en la mesa"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">{players.length} Amigas</span>
          </button>

          {/* Rules Button */}
          <button
            onClick={onOpenRules}
            className="bg-[#2A203F] hover:bg-[#392C55] text-white p-2 rounded-xl border border-purple-400/30 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Reglas"
          >
            <BookOpen className="w-4 h-4 text-pink-400" />
          </button>

          {/* Verdict Button */}
          {onOpenVerdict && (cardsPlayedCount > 0 || currentScreen === 'game') && (
            <button
              onClick={onOpenVerdict}
              className="bg-yellow-400 hover:bg-yellow-300 text-black p-2 sm:px-2.5 rounded-xl border border-black shadow-pop font-comic text-xs font-bold transition flex items-center gap-1"
              title="Ver Diagnóstico / Veredicto"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">Veredicto</span>
            </button>
          )}

          {/* THE BIG RED BASTA BUZZER BUTTON */}
          <button
            onClick={onOpenBuzzer}
            className="bg-red-600 hover:bg-red-500 active:scale-95 text-white px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-black shadow-pop font-comic text-xs sm:text-sm tracking-wide flex items-center gap-1 animate-pulse transition"
          >
            <AlertCircle className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>¡BASTA!</span>
          </button>
        </div>
      </div>
    </header>
  );
}
