import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Trophy, Wine, AlertCircle, RotateCcw, Home, Sparkles, X, Share2, Flame, Scale, Brain, HeartCrack, Camera } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function VerdictModal({
  isOpen,
  onClose,
  players,
  gameStats,
  onRestartGame,
  onGoHome,
  selectedMode,
  onOpenStoryModal
}) {
  useEffect(() => {
    if (isOpen) {
      sounds.playCheer();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Total drinks among all players
  const totalDrinks = players.reduce((acc, p) => acc + (p.drinksCount || 0), 0);

  // Smart Title Assignment to give distinct friends the spotlight
  // 1. Reina del Micajerismo: most whoVotesCount (or most drinks)
  const sortedByWhoVotes = [...players].sort((a, b) => (b.whoVotesCount || 0) - (a.whoVotesCount || 0));
  const reinaMicajerismo = sortedByWhoVotes[0] || players[0];

  // 2. La Karla (Intensa): Most drinks (prioritize someone with drinks or distinct)
  const sortedByDrinks = [...players].sort((a, b) => (b.drinksCount || 0) - (a.drinksCount || 0));
  const laIntensa = sortedByDrinks.find(p => p.id !== reinaMicajerismo.id && (p.drinksCount || 0) > 0) || sortedByDrinks[0] || players[0];

  // 3. Jueza de Hierro (Paulina): Player with tribunal/buzzer energy or distinct
  const juezaDeHierro = players.find(p => p.id !== reinaMicajerismo.id && p.id !== laIntensa.id) || (players.length > 1 ? players[1] : players[0]);

  // 4. Dra. Datos Duros (Natalia): Player with analytical/least drinks energy
  const laDatosDuros = players.find(p => p.id !== reinaMicajerismo.id && p.id !== laIntensa.id && p.id !== juezaDeHierro.id) ||
    [...players].sort((a, b) => (a.drinksCount || 0) - (b.drinksCount || 0))[0] ||
    (players.length > 2 ? players[2] : players[0]);

  const handleOpenStory = () => {
    sounds.playCamera();
    if (onOpenStoryModal) {
      onOpenStoryModal({
        reinaMicajerismo,
        laIntensa,
        juezaDeHierro,
        laDatosDuros,
        totalDrinks,
        gameStats
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#201834] border-4 border-yellow-400 rounded-3xl p-5 sm:p-7 shadow-pop-lg my-auto text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-[#30244E] rounded-full border border-purple-400/30 transition z-10"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-comic text-xs px-3.5 py-1 rounded-full border-2 border-black shadow-pop mb-3 rotate-[-1deg]">
          <Trophy className="w-4 h-4" />
          <span>DIAGNÓSTICO FINAL DEL CARRETE</span>
        </div>

        {/* Title */}
        <h2 className="font-comic text-3xl sm:text-4xl text-yellow-300 comic-stroke leading-tight tracking-wide mb-1">
          EL VEREDICTO DE LAS AMIGAS
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-medium mb-4 max-w-md mx-auto">
          Tras una exhaustiva sesión de desahogo, el tribunal de Karla, Paulina y Natalia ha emitido sus sentencias oficiales:
        </p>

        {/* ================= RESUMEN DE ESTADÍSTICAS RÁPIDAS ================= */}
        <div className="grid grid-cols-4 gap-2 bg-[#171126] border-2 border-black rounded-2xl p-2.5 mb-5 shadow-sm text-center">
          <div className="p-1">
            <span className="block font-comic text-lg sm:text-xl text-yellow-400 leading-none">
              {gameStats?.cardsPlayed || 0}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Cartas</span>
          </div>
          <div className="p-1 border-l border-purple-500/20">
            <span className="block font-comic text-lg sm:text-xl text-pink-400 leading-none">
              {totalDrinks}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase">
              {selectedMode === 'te' ? 'Prendas' : 'Tragos'}
            </span>
          </div>
          <div className="p-1 border-l border-purple-500/20">
            <span className="block font-comic text-lg sm:text-xl text-red-400 leading-none">
              {gameStats?.buzzerCount || 0}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase">¡Basta!</span>
          </div>
          <div className="p-1 border-l border-purple-500/20">
            <span className="block font-comic text-lg sm:text-xl text-fuchsia-400 leading-none">
              {gameStats?.anonymousCount || 0}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Secretos</span>
          </div>
        </div>

        {/* ================= PODIO DE TÍTULOS Y RECONOCIMIENTOS ================= */}
        <div className="space-y-3 mb-6 text-left">
          {/* 1. Reina del Micajerismo */}
          <div className="bg-gradient-to-r from-[#3B1736] to-[#25152F] border-2 border-pink-400/80 rounded-2xl p-3 sm:p-3.5 shadow-pop-hover flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={reinaMicajerismo.avatar || '/images/carla.jpg'}
                alt={reinaMicajerismo.name}
                className="w-14 h-14 rounded-full border-3 border-pink-400 object-cover shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-xs p-1 rounded-full border border-black shadow">
                👑
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-comic text-xs uppercase text-pink-300 tracking-wider flex items-center gap-1">
                  <HeartCrack className="w-3.5 h-3.5 text-pink-400" />
                  REINA DEL MICAJERISMO
                </span>
                <span className="text-[10px] bg-pink-900/60 text-pink-200 px-2 py-0.5 rounded-full font-bold">
                  {reinaMicajerismo.whoVotesCount || 0} votos
                </span>
              </div>
              <h4 className="font-comic text-lg text-yellow-300 leading-tight truncate">
                {reinaMicajerismo.name}
              </h4>
              <p className="text-[11px] text-gray-300 leading-tight mt-0.5">
                Le daría una 5ta oportunidad al casi-algo que le escribe "holi perdida" a las 3 AM. ¡Alguien quítele el teléfono!
              </p>
            </div>
          </div>

          {/* 2. La Intensa del Carrete (Karla) */}
          <div className="bg-gradient-to-r from-[#3E211A] to-[#2B1717] border-2 border-orange-500/80 rounded-2xl p-3 sm:p-3.5 shadow-pop-hover flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={laIntensa.avatar || '/images/carla.jpg'}
                alt={laIntensa.name}
                className="w-14 h-14 rounded-full border-3 border-orange-400 object-cover shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs p-1 rounded-full border border-black shadow">
                🔥
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-comic text-xs uppercase text-orange-300 tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  LA INTENSA DE LA NOCHE (KARLA)
                </span>
                <span className="text-[10px] bg-orange-900/60 text-orange-200 px-2 py-0.5 rounded-full font-bold">
                  {laIntensa.drinksCount || 0} tragos
                </span>
              </div>
              <h4 className="font-comic text-lg text-yellow-300 leading-tight truncate">
                {laIntensa.name}
              </h4>
              <p className="text-[11px] text-gray-300 leading-tight mt-0.5">
                Vive a 200 km/h, mandó 3 audios de 8 minutos antes de llegar y prometió que hoy "se iba a portar bien".
              </p>
            </div>
          </div>

          {/* 3. Jueza de Hierro (Paulina) */}
          <div className="bg-gradient-to-r from-[#3D141E] to-[#25101A] border-2 border-red-500/80 rounded-2xl p-3 sm:p-3.5 shadow-pop-hover flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={juezaDeHierro.avatar || '/images/paulina.jpg'}
                alt={juezaDeHierro.name}
                className="w-14 h-14 rounded-full border-3 border-red-500 object-cover shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs p-1 rounded-full border border-black shadow">
                🛑
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-comic text-xs uppercase text-red-300 tracking-wider flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-red-400" />
                  JUEZA DE HIERRO (PAULINA)
                </span>
                <span className="text-[10px] bg-red-900/60 text-red-200 px-2 py-0.5 rounded-full font-bold">
                  Tribunal
                </span>
              </div>
              <h4 className="font-comic text-lg text-yellow-300 leading-tight truncate">
                {juezaDeHierro.name}
              </h4>
              <p className="text-[11px] text-gray-300 leading-tight mt-0.5">
                Cero tolerancia a las excusas baratas. Si por ella fuera, mete presas a las amigas por ilusas.
              </p>
            </div>
          </div>

          {/* 4. Dra. Datos Duros (Natalia) */}
          <div className="bg-gradient-to-r from-[#142B38] to-[#121E2C] border-2 border-cyan-400/80 rounded-2xl p-3 sm:p-3.5 shadow-pop-hover flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={laDatosDuros.avatar || '/images/natalia.jpg'}
                alt={laDatosDuros.name}
                className="w-14 h-14 rounded-full border-3 border-cyan-400 object-cover shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 bg-cyan-400 text-black text-xs p-1 rounded-full border border-black shadow">
                📊
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-comic text-xs uppercase text-cyan-300 tracking-wider flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" />
                  DRA. DATOS DUROS (NATALIA)
                </span>
                <span className="text-[10px] bg-cyan-900/60 text-cyan-200 px-2 py-0.5 rounded-full font-bold">
                  {laDatosDuros.drinksCount || 0} tragos
                </span>
              </div>
              <h4 className="font-comic text-lg text-yellow-300 leading-tight truncate">
                {laDatosDuros.name}
              </h4>
              <p className="text-[11px] text-gray-300 leading-tight mt-0.5">
                Mantiene el Excel emocional al día, analiza patrones tóxicos con rigor científico y nunca pierde el glamour.
              </p>
            </div>
          </div>
        </div>

        {/* ================= BOTONES DE ACCIÓN ================= */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleOpenStory}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 active:scale-98 text-white font-comic text-sm sm:text-base py-3 px-3 rounded-2xl border-2 border-black shadow-pop tracking-wide flex items-center justify-center gap-2 transition"
            >
              <Camera className="w-5 h-5" />
              <span>CREAR STORY DEL VEREDICTO</span>
            </button>

            <button
              onClick={() => {
                onRestartGame();
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 active:scale-98 text-black font-comic text-sm sm:text-base py-3 px-3 rounded-2xl border-2 border-black shadow-pop tracking-wide flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-5 h-5 text-black" />
              <span>OTRA RONDA (REVANCHA)</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-[#281F3D] hover:bg-[#382B56] text-gray-300 text-xs font-bold py-2 rounded-xl border border-purple-400/30 transition"
            >
              Volver al Juego
            </button>
            <button
              onClick={() => {
                onClose();
                onGoHome();
              }}
              className="flex-1 bg-[#281F3D] hover:bg-[#382B56] text-yellow-300 text-xs font-bold py-2 rounded-xl border border-yellow-400/30 transition flex items-center justify-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Ir al Menú de Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
