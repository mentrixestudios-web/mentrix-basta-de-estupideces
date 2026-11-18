import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Wine, CheckCircle2, ChevronRight, HelpCircle, Eye, Coffee, Flame } from 'lucide-react';
import { CATEGORIES } from '../data/cards';
import { GAME_MODES } from '../data/modes';
import { VotingWidget } from './VotingWidget';
import { sounds } from '../utils/soundEffects';

export function CardDeck({ card, onNextCard, currentPlayer, onAddDrink, onAddDrinkToPlayer, players, selectedMode }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  if (!card) return null;

  const category = CATEGORIES[card.category] || CATEGORIES.buzon;
  const modeObj = GAME_MODES.find(m => m.id === selectedMode) || GAME_MODES[1];

  const handleNext = () => {
    setIsFlipping(true);
    sounds.playFlip();
    setTimeout(() => {
      setShowAnswer(false);
      onNextCard();
      setIsFlipping(false);
    }, 200);
  };

  const handleSuccess = () => {
    sounds.playCheer();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    handleNext();
  };

  const handleDrink = () => {
    sounds.playClink();
    if (onAddDrink) {
      onAddDrink();
    }
    handleNext();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Turn Banner with Active Mode */}
      <div className="flex items-center justify-between bg-[#261E38] px-4 py-2 rounded-2xl border-2 border-black shadow-pop mb-3">
        <div className="flex items-center gap-2.5">
          <img
            src={currentPlayer?.avatar || '/images/carla.jpg'}
            alt="Avatar"
            className="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover"
          />
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase block -mb-0.5">
              Le toca jugar a:
            </span>
            <span className="font-comic text-base text-yellow-300 tracking-wide">
              {currentPlayer?.name || 'Amiga de turno'}
            </span>
          </div>
        </div>

        {/* Mode Tag & Drinks counter */}
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-lg border border-black font-comic tracking-wide hidden sm:inline"
            style={{ backgroundColor: modeObj.badgeColor, color: modeObj.id === 'te' || modeObj.id === 'previa' ? '#000' : '#FFF' }}
          >
            {modeObj.emoji} {modeObj.shortName}
          </span>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase block -mb-0.5">
              {selectedMode === 'te' ? 'Prendas:' : 'Tragos:'}
            </span>
            <span className="font-comic text-base text-pink-400">
              {selectedMode === 'te' ? '⭐ ' : '🍷 '}
              {currentPlayer?.drinksCount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div
        className={`relative bg-[#211A34] border-4 border-black rounded-3xl p-5 md:p-7 shadow-pop-lg transition-transform duration-200 ${
          isFlipping ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        }`}
        style={{
          boxShadow: '6px 6px 0px 0px #000000'
        }}
      >
        {/* Category Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className="font-comic text-xs md:text-sm px-3 py-1 rounded-xl border-2 border-black uppercase tracking-wider font-bold shadow-sm"
            style={{ backgroundColor: category.color, color: '#000000' }}
          >
            {category.name}
          </span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-[#151122] px-2.5 py-1 rounded-lg border border-purple-500/20">
            {category.tag}
          </span>
        </div>

        {/* Card Title */}
        <h3 className="font-comic text-2xl md:text-3xl text-yellow-300 mb-3 comic-stroke-sm tracking-wide leading-tight">
          {card.title}
        </h3>

        {/* Card Question / Challenge Body */}
        <div className="bg-[#171224] p-4 md:p-5 rounded-2xl border-2 border-purple-500/30 mb-4">
          <p className="text-base md:text-lg text-white font-semibold leading-relaxed whitespace-pre-line">
            {card.text}
          </p>

          {/* Revealable Answer for Dato Duro */}
          {card.answer && (
            <div className="mt-3 pt-3 border-t border-purple-500/20">
              {showAnswer ? (
                <div className="bg-cyan-950/60 border border-cyan-400/40 rounded-xl p-3 text-cyan-200 text-xs md:text-sm">
                  <strong className="text-cyan-300 block font-comic text-base mb-1">
                    RESPUESTA OFICIAL:
                  </strong>
                  {card.answer}
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="w-full bg-[#271E3C] hover:bg-[#342750] text-cyan-300 text-xs font-bold py-2 px-3 rounded-xl border border-cyan-400/40 flex items-center justify-center gap-1.5 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Respuesta del Dato Duro</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* ================= FASE 2: VOTACIÓN INTERACTIVA EN PANTALLA ================= */}
        <VotingWidget
          card={card}
          players={players}
          onAddDrinkToPlayer={onAddDrinkToPlayer}
          selectedMode={selectedMode}
        />

        {/* Penalty / Shot Box */}
        <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50 rounded-2xl p-3.5 mb-4 flex items-start gap-2.5 text-pink-200 text-xs md:text-sm">
          {selectedMode === 'te' ? (
            <Coffee className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : selectedMode === 'sinfiltro' ? (
            <Flame className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <Wine className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
          )}
          <div>
            <strong className="text-pink-300 block font-comic text-sm tracking-wide">
              {selectedMode === 'te' ? 'PENITENCIA / RETO:' : selectedMode === 'sinfiltro' ? 'CASTIGO SIN FILTRO:' : 'CASTIGO / PRENDA:'}
            </strong>
            <p className="leading-snug">{card.penalty}</p>
          </div>
        </div>

        {/* Podcast Quote */}
        {card.quote && (
          <div className="text-center text-[11px] md:text-xs italic text-gray-400 px-3 py-1 bg-[#151122] rounded-xl border border-purple-500/20 mb-5">
            {card.quote}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Cumplir / Acierto */}
          <button
            onClick={handleSuccess}
            className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-comic text-base md:text-lg py-3 px-3 rounded-2xl border-2 border-black shadow-pop flex items-center justify-center gap-1.5 transition"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <span>¡CUMPLIDO!</span>
          </button>

          {/* Toma Trago o Paga Prenda */}
          <button
            onClick={handleDrink}
            className={`active:scale-95 text-white font-comic text-base md:text-lg py-3 px-3 rounded-2xl border-2 border-black shadow-pop flex items-center justify-center gap-1.5 transition ${
              selectedMode === 'te'
                ? 'bg-emerald-700 hover:bg-emerald-600'
                : selectedMode === 'sinfiltro'
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-pink-600 hover:bg-pink-500'
            }`}
          >
            {selectedMode === 'te' ? (
              <>
                <Coffee className="w-5 h-5 stroke-[2.5]" />
                <span>PAGA PRENDA</span>
              </>
            ) : selectedMode === 'sinfiltro' ? (
              <>
                <Flame className="w-5 h-5 stroke-[2.5]" />
                <span>DOBLE SHOT</span>
              </>
            ) : (
              <>
                <Wine className="w-5 h-5 stroke-[2.5]" />
                <span>TOMA TRAGO</span>
              </>
            )}
          </button>
        </div>

        {/* Skip / Next Card */}
        <button
          onClick={handleNext}
          className="w-full mt-3 bg-[#261E38] hover:bg-[#342A4C] text-gray-300 font-comic text-sm py-2 rounded-xl border border-purple-400/30 flex items-center justify-center gap-1 transition"
        >
          <span>Pasar a otra carta</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
