import React from 'react';
import { Play, Users, BookOpen, AlertCircle, Sparkles, Check, EyeOff, Lock, Trophy, Volume2 } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { GAME_MODES } from '../data/modes';
import { sounds } from '../utils/soundEffects';

export function HomeScreen({
  onStartGame,
  onOpenPlayers,
  onOpenCharacters,
  onOpenRules,
  onOpenBuzzer,
  onOpenAnonymous,
  onOpenVerdict,
  onOpenSoundboard,
  cardsPlayedCount,
  players,
  selectedMode,
  setSelectedMode,
  customCardsCount
}) {
  const handleStart = () => {
    sounds.playCheer();
    onStartGame();
  };

  const handleSelectMode = (modeId) => {
    sounds.playFlip();
    setSelectedMode(modeId);
  };

  const currentModeObj = GAME_MODES.find(m => m.id === selectedMode) || GAME_MODES[1];

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
      <div className="relative w-full max-w-sm mx-auto mb-3 group">
        <div className="relative rounded-3xl overflow-hidden border-4 border-black shadow-pop-lg bg-[#241A38]">
          <img
            src="/images/portada.jpg"
            alt="Basta de Estupideces Podcast"
            className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-center p-3">
            <span className="font-comic text-xl text-yellow-300 tracking-wider comic-stroke-sm">
              AMIGAS HABLANDO CLARO
            </span>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute -bottom-3 right-4 bg-pink-600 text-white font-comic text-xs px-3 py-1 rounded-xl border-2 border-black shadow-pop rotate-6">
          🍸 100% CARRETE
        </div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="font-comic text-4xl sm:text-5xl text-yellow-300 leading-none mb-1 comic-stroke tracking-wide">
        BASTA DE ESTUPIDECES
      </h1>
      <p className="text-xs sm:text-sm text-gray-300 font-semibold max-w-md mx-auto mb-4 leading-snug">
        Confesiones, citas desastrosas, casi algos y veredictos con <strong className="text-yellow-400">Karla, Paulina y Natalia</strong>.
      </p>

      {/* ================= SELECTOR DE MODO DE INTENSIDAD ================= */}
      <div className="w-full bg-[#1C152E] border-2 border-black rounded-2xl p-3.5 shadow-pop mb-4 text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1">
            <span>🔥 Elige la Intensidad de la Junta:</span>
          </span>
          <span className="text-[10px] text-gray-400 font-semibold">
            Castigo: <strong className="text-white">{currentModeObj.penaltyType}</strong>
          </span>
        </div>

        {/* 3 Modes Grid */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {GAME_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleSelectMode(mode.id)}
                className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center text-center relative ${
                  isSelected
                    ? 'border-yellow-400 shadow-pop-hover bg-[#2D1F49] scale-102 font-bold'
                    : 'border-purple-500/30 bg-[#241B38] opacity-75 hover:opacity-100 hover:border-white/40'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-yellow-400 text-black flex items-center justify-center border border-black text-[9px] font-black">
                    ✓
                  </div>
                )}
                <span className="text-2xl mb-1">{mode.emoji}</span>
                <span className="font-comic text-xs tracking-wide text-white leading-tight">
                  {mode.name}
                </span>
                <span
                  className="text-[8px] font-bold uppercase mt-1 px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: isSelected ? mode.badgeColor : '#181224', color: isSelected ? '#000' : '#A78BFA' }}
                >
                  {mode.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Mode Description */}
        <div className="bg-[#140E22] px-3 py-2 rounded-xl border border-purple-500/20 text-xs text-gray-300">
          <strong className={currentModeObj.accentColor}>
            {currentModeObj.emoji} {currentModeObj.name}:
          </strong>{' '}
          {currentModeObj.description}
        </div>
      </div>

      {/* ================= FASE 3: BANNER BUZÓN ANÓNIMO ================= */}
      <button
        onClick={onOpenAnonymous}
        className="w-full bg-gradient-to-r from-fuchsia-950/70 via-purple-950/70 to-pink-950/70 hover:from-fuchsia-900/80 hover:to-pink-900/80 border-2 border-fuchsia-400/60 rounded-2xl p-2.5 shadow-pop mb-3 flex items-center justify-between px-3.5 transition group text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-fuchsia-500 text-black flex items-center justify-center border border-black shrink-0 font-bold">
            <EyeOff className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-comic text-sm text-fuchsia-300 tracking-wide block leading-tight">
              ¿TIENES UN SECRETO DE ALGUIEN PRESENTE?
            </span>
            <span className="text-[11px] text-gray-300">
              Escríbelo anónimo en el buzón y saldrá de sorpresa
            </span>
          </div>
        </div>

        <span className="text-[10px] bg-fuchsia-500 text-white font-comic px-2 py-0.5 rounded-lg border border-black shadow-sm shrink-0">
          {customCardsCount > 0 ? `${customCardsCount} en el mazo` : '+ Escribir'}
        </span>
      </button>

      {/* Main Play Button */}
      <button
        onClick={handleStart}
        className="w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 active:scale-98 text-black font-comic text-2xl sm:text-3xl py-4 px-6 rounded-2xl border-4 border-black shadow-pop-lg tracking-wider flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 mb-3"
      >
        <Play className="w-7 h-7 fill-black" />
        <span>¡COMENZAR ({currentModeObj.shortName.toUpperCase()})!</span>
      </button>

      {/* Secondary Options Grid */}
      <div className="grid grid-cols-3 gap-2.5 w-full mb-3">
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

      {/* Previous Round Diagnosis Banner if cards were played */}
      {cardsPlayedCount > 0 && onOpenVerdict && (
        <button
          onClick={onOpenVerdict}
          className="w-full bg-[#291F18] hover:bg-[#382B21] border-2 border-yellow-400 rounded-2xl p-2.5 shadow-pop mb-3 flex items-center justify-between px-3 transition group"
        >
          <div className="flex items-center gap-2 text-left">
            <Trophy className="w-5 h-5 text-yellow-400 shrink-0 group-hover:scale-110 transition" />
            <div>
              <span className="font-comic text-xs text-yellow-300 block tracking-wide">
                🏆 Partida en curso: {cardsPlayedCount} cartas jugadas
              </span>
              <span className="text-[10px] text-gray-300">
                Toca para ver el Diagnóstico y Podio del Carrete
              </span>
            </div>
          </div>
          <span className="text-xs font-comic text-yellow-400 bg-black/40 px-2 py-1 rounded-lg border border-yellow-400/40">
            Ver Veredicto →
          </span>
        </button>
      )}

      {/* Meet the Hosts Mini Bar */}
      <button
        onClick={onOpenCharacters}
        className="w-full bg-[#1C162D] hover:bg-[#271E3C] border-2 border-black rounded-2xl p-2.5 shadow-pop flex items-center justify-between px-4 transition group mb-2"
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {CHARACTERS.map(c => (
              <img key={c.id} src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full border-2 border-black object-cover" />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-200">
            Conoce a las Conductoras & Superpoderes
          </span>
        </div>
        <Sparkles className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition" />
      </button>

      {/* Soundboard Bar */}
      {onOpenSoundboard && (
        <button
          onClick={onOpenSoundboard}
          className="w-full bg-[#181226] hover:bg-[#261B3B] border-2 border-cyan-400/40 hover:border-cyan-400 rounded-2xl p-2.5 shadow-pop flex items-center justify-between px-4 transition group"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition" />
            <div className="text-left">
              <span className="text-xs font-bold text-cyan-200 block -mb-0.5">
                🎙️ Botonera de Voces (Soundboard Oficial)
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">
                Frases de Karla, Paulina y Natalia para poner en vivo
              </span>
            </div>
          </div>
          <span className="text-[10px] font-comic text-yellow-300 bg-black/40 px-2 py-1 rounded-lg border border-yellow-400/40">
            9 Audios →
          </span>
        </button>
      )}
    </div>
  );
}
