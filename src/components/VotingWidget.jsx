import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Users, AlertOctagon, ThumbsUp, ThumbsDown, Award, RotateCcw, Wine, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function VotingWidget({ card, players, onAddDrinkToPlayer, selectedMode, onRecordWhoWinner, onRecordBastaVerdict }) {
  // Votes state
  // For 'quien': { [playerId]: count }
  // For 'basta': { perdonable: count, basta: count }
  const [votes, setVotes] = useState({});
  const [isRevealed, setIsRevealed] = useState(false);
  const isWhoMode = card.category === 'quien';
  const isBastaMode = card.category === 'basta';

  // Reset when card changes
  useEffect(() => {
    setVotes({});
    setIsRevealed(false);
  }, [card.id]);

  if (!isWhoMode && !isBastaMode) return null;

  // Total votes cast
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  // Handlers for 'quien' (who is most likely)
  const handleVotePlayer = (playerId) => {
    sounds.playFlip();
    setVotes(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + 1
    }));
  };

  const handleRevealWho = () => {
    if (totalVotes === 0) return;
    setIsRevealed(true);
    sounds.playBuzzer();
    const winner = getMostVotedPlayer();
    if (winner?.player?.id && onRecordWhoWinner) {
      onRecordWhoWinner(winner.player.id);
    }
  };

  // Find most voted player
  const getMostVotedPlayer = () => {
    let max = -1;
    let winnerId = null;
    players.forEach(p => {
      const v = votes[p.id] || 0;
      if (v > max) {
        max = v;
        winnerId = p.id;
      }
    });
    return { player: players.find(p => p.id === winnerId), count: max };
  };

  // Handlers for 'basta' (verdict)
  const handleVoteVerdict = (type) => {
    sounds.playFlip();
    setVotes(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));
  };

  const handleRevealVerdict = () => {
    if (totalVotes === 0) return;
    setIsRevealed(true);
    const bastaCount = votes.basta || 0;
    const perdonableCount = votes.perdonable || 0;
    if (bastaCount >= perdonableCount) {
      sounds.playBuzzer();
      if (onRecordBastaVerdict) onRecordBastaVerdict('basta');
    } else {
      sounds.playCheer();
      confetti({ particleCount: 40, spread: 60 });
      if (onRecordBastaVerdict) onRecordBastaVerdict('perdonable');
    }
  };

  const handleReset = () => {
    sounds.playFlip();
    setVotes({});
    setIsRevealed(false);
  };

  // ================= VISTA 1: ¿QUIÉN ES MÁS PROPENSAPARA...? =================
  if (isWhoMode) {
    const winnerData = isRevealed ? getMostVotedPlayer() : null;

    return (
      <div className="bg-[#191326] border-2 border-pink-500/50 rounded-2xl p-3.5 mb-4 shadow-sm animate-fade-in">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-pink-300">
            <Users className="w-4 h-4 text-pink-400" />
            <span className="font-comic tracking-wide uppercase">Votación en Vivo: ¿Quién es?</span>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold bg-[#261E38] px-2 py-0.5 rounded-lg border border-purple-500/20">
            Votos: <strong className="text-white">{totalVotes}</strong>
          </span>
        </div>

        {!isRevealed ? (
          <>
            <p className="text-[11px] text-gray-300 mb-2.5">
              Toquen la foto de la amiga a la que acusan:
            </p>
            {/* Players voting grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {players.map((p) => {
                const count = votes[p.id] || 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleVotePlayer(p.id)}
                    className="relative bg-[#251B38] hover:bg-[#34264E] active:scale-95 p-2 rounded-xl border border-purple-400/30 flex flex-col items-center gap-1 transition group shadow-sm"
                  >
                    {count > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white font-comic text-xs w-5 h-5 rounded-full flex items-center justify-center border border-black shadow-sm font-bold">
                        {count}
                      </span>
                    )}
                    <img
                      src={p.avatar || '/images/carla.jpg'}
                      alt={p.name}
                      className="w-10 h-10 rounded-full border-2 border-black object-cover group-hover:scale-105 transition"
                    />
                    <span className="font-comic text-xs text-white truncate max-w-[80px]">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {totalVotes > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRevealWho}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-comic text-sm py-2 rounded-xl border-2 border-black shadow-pop tracking-wide flex items-center justify-center gap-1.5 transition active:scale-98"
                >
                  <Award className="w-4 h-4" />
                  <span>¡REVELAR A LA MÁS VOTADA!</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 text-gray-400 hover:text-white bg-[#251B38] rounded-xl border border-purple-400/30"
                  title="Reiniciar votos"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* RESULTADO REVELADO */
          <div className="bg-[#2D1B3E] border-2 border-yellow-400 rounded-xl p-3 text-center animate-bounce-short">
            <span className="font-comic text-xs text-yellow-300 uppercase tracking-widest block mb-1">
              🚨 ¡SENTENCIA DEL GRUPO! 🚨
            </span>
            <div className="flex items-center justify-center gap-2 my-1.5">
              <img
                src={winnerData?.player?.avatar || '/images/carla.jpg'}
                alt={winnerData?.player?.name}
                className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover shadow-sm"
              />
              <div className="text-left">
                <h4 className="font-comic text-xl text-yellow-300 leading-tight">
                  {winnerData?.player?.name}
                </h4>
                <span className="text-[11px] text-pink-300 font-bold">
                  {winnerData?.count} votos del grupo
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-200 mt-2 mb-3">
              Por mayoría unánime, {winnerData?.player?.name} debe pagar el castigo de la carta.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  sounds.playClink();
                  if (winnerData?.player?.id && onAddDrinkToPlayer) {
                    onAddDrinkToPlayer(winnerData.player.id);
                  }
                  handleReset();
                }}
                className="flex-1 bg-pink-600 hover:bg-pink-500 text-white font-comic text-xs py-2 px-2 rounded-xl border-2 border-black shadow-pop flex items-center justify-center gap-1"
              >
                <Wine className="w-4 h-4" />
                <span>Castigo a {winnerData?.player?.name}</span>
              </button>

              <button
                onClick={handleReset}
                className="text-xs bg-[#1F1731] hover:bg-[#32244E] text-gray-300 px-3 py-2 rounded-xl border border-purple-500/30 font-semibold"
              >
                Votar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= VISTA 2: ¡BASTA DE ESTUPIDECES! (TRIBUNAL) =================
  if (isBastaMode) {
    const bastaCount = votes.basta || 0;
    const perdonableCount = votes.perdonable || 0;
    const bastaPct = totalVotes > 0 ? Math.round((bastaCount / totalVotes) * 100) : 50;
    const perdonablePct = totalVotes > 0 ? 100 - bastaPct : 50;
    const bastaWins = bastaCount >= perdonableCount;

    return (
      <div className="bg-[#191326] border-2 border-yellow-400/60 rounded-2xl p-3.5 mb-4 shadow-sm animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-300">
            <AlertOctagon className="w-4 h-4 text-yellow-400" />
            <span className="font-comic tracking-wide uppercase">Tribunal en Vivo: ¿Perdonable o Basta?</span>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold bg-[#261E38] px-2 py-0.5 rounded-lg border border-purple-500/20">
            Votos: <strong className="text-white">{totalVotes}</strong>
          </span>
        </div>

        {!isRevealed ? (
          <>
            <p className="text-[11px] text-gray-300 mb-2.5">
              Cada amiga vota según su criterio:
            </p>

            {/* Two Voting Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {/* Voto Perdonable */}
              <button
                onClick={() => handleVoteVerdict('perdonable')}
                className="bg-[#1B2F25] hover:bg-[#234233] active:scale-95 border-2 border-emerald-500/50 p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition shadow-sm relative"
              >
                {perdonableCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black font-comic text-xs w-5 h-5 rounded-full flex items-center justify-center border border-black font-bold">
                    {perdonableCount}
                  </span>
                )}
                <ThumbsUp className="w-5 h-5 text-emerald-400" />
                <span className="font-comic text-xs text-emerald-300">
                  ES PERDONABLE
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  {perdonableCount} votos
                </span>
              </button>

              {/* Voto Basta de Estupideces */}
              <button
                onClick={() => handleVoteVerdict('basta')}
                className="bg-[#3D1A22] hover:bg-[#50212C] active:scale-95 border-2 border-red-500/60 p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition shadow-sm relative"
              >
                {bastaCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-comic text-xs w-5 h-5 rounded-full flex items-center justify-center border border-black font-bold">
                    {bastaCount}
                  </span>
                )}
                <ThumbsDown className="w-5 h-5 text-red-400" />
                <span className="font-comic text-xs text-red-300">
                  ¡BASTA!
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  {bastaCount} votos
                </span>
              </button>
            </div>

            {/* Live Progress Bar */}
            {totalVotes > 0 && (
              <div className="mb-3">
                <div className="h-2.5 w-full bg-[#271E3C] rounded-full overflow-hidden flex border border-black">
                  <div
                    className="bg-emerald-500 transition-all duration-300"
                    style={{ width: `${perdonablePct}%` }}
                  />
                  <div
                    className="bg-red-600 transition-all duration-300"
                    style={{ width: `${bastaPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-semibold">
                  <span className="text-emerald-400">{perdonablePct}% Perdonable</span>
                  <span className="text-red-400">{bastaPct}% ¡Basta!</span>
                </div>
              </div>
            )}

            {totalVotes > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRevealVerdict}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-comic text-sm py-2 rounded-xl border-2 border-black shadow-pop tracking-wide flex items-center justify-center gap-1.5 transition active:scale-98 font-bold"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>¡DICTAR SENTENCIA FINAL!</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 text-gray-400 hover:text-white bg-[#251B38] rounded-xl border border-purple-400/30"
                  title="Reiniciar votos"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* RESULTADO SENTENCIA */
          <div
            className={`border-2 rounded-xl p-3 text-center animate-bounce-short ${
              bastaWins ? 'bg-[#3D141E] border-red-500' : 'bg-[#183424] border-emerald-400'
            }`}
          >
            <span className="font-comic text-xs uppercase tracking-widest block mb-1" style={{ color: bastaWins ? '#FCA5A5' : '#86EFAC' }}>
              ⚖️ VEREDICTO DEL TRIBUNAL ⚖️
            </span>

            <h4
              className="font-comic text-2xl leading-tight mb-1"
              style={{ color: bastaWins ? '#EF4444' : '#10B981' }}
            >
              {bastaWins ? '¡BASTA DE ESTUPIDECES! (' + bastaPct + '%)' : '¡ES PERDONABLE! (' + perdonablePct + '%)'}
            </h4>

            <p className="text-xs text-gray-200 mb-3">
              {bastaWins
                ? 'El tribunal no perdona excusas baratas. ¡La persona en cuestión o la jugadora de turno paga castigo!'
                : 'El tribunal determinó que la situación tiene salvación. ¡Brindis de reconciliación!'}
            </p>

            <button
              onClick={handleReset}
              className="text-xs bg-[#1A1227] hover:bg-[#2A1D3F] text-gray-300 px-4 py-1.5 rounded-xl border border-purple-500/30 font-semibold"
            >
              Votar de nuevo
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
