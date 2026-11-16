import React, { useState } from 'react';
import { X, Plus, Trash2, UserCheck, Sparkles } from 'lucide-react';
import { CHARACTERS } from '../data/characters';

export function PlayerSetup({ isOpen, onClose, players, setPlayers, currentTurnIndex, setCurrentTurnIndex }) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('/images/carla.jpg');

  if (!isOpen) return null;

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    const newPlayer = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      avatar: selectedAvatar,
      drinksCount: 0
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (id) => {
    if (players.length <= 1) return;
    const updated = players.filter(p => p.id !== id);
    setPlayers(updated);
    if (currentTurnIndex >= updated.length) {
      setCurrentTurnIndex(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#1F1731] border-3 border-yellow-400 rounded-3xl p-5 md:p-6 shadow-pop-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/30 mb-4">
          <div>
            <h2 className="font-comic text-2xl text-yellow-300 comic-stroke-sm">
              AMIGAS EN LA MESA
            </h2>
            <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
              Configura quiénes están jugando
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white bg-[#30234B] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Player Form */}
        <form onSubmit={handleAddPlayer} className="bg-[#271E3C] p-3.5 rounded-2xl border-2 border-black mb-4 shadow-sm">
          <label className="block text-xs font-bold text-gray-300 mb-2">
            Agregar nueva amiga:
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Nombre de la jugadora..."
              className="flex-1 bg-[#171324] border border-purple-400/40 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              maxLength={20}
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-comic text-base px-4 py-2 rounded-xl border-2 border-black shadow-pop-hover flex items-center gap-1 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Sumar</span>
            </button>
          </div>

          {/* Pick Avatar */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 font-semibold">Avatar:</span>
            <div className="flex gap-2">
              {[
                { name: 'Karla', url: '/images/carla.jpg' },
                { name: 'Paulina', url: '/images/paulina.jpg' },
                { name: 'Natalia', url: '/images/natalia.jpg' }
              ].map((av) => (
                <button
                  type="button"
                  key={av.name}
                  onClick={() => setSelectedAvatar(av.url)}
                  className={`relative p-0.5 rounded-full border-2 transition ${
                    selectedAvatar === av.url ? 'border-yellow-400 scale-110 shadow-sm' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={av.url} alt={av.name} className="w-7 h-7 rounded-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Players List */}
        <div className="space-y-2 mb-5">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-xl border-2 transition ${
                currentTurnIndex === index
                  ? 'bg-purple-900/60 border-yellow-400 shadow-pop-hover'
                  : 'bg-[#271E3C] border-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={player.avatar || '/images/carla.jpg'}
                  alt={player.name}
                  className="w-10 h-10 rounded-full border-2 border-black object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">{player.name}</span>
                    {currentTurnIndex === index && (
                      <span className="text-[10px] bg-yellow-400 text-black font-bold px-1.5 py-0.5 rounded-full">
                        Turno actual
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Tragos acumulados: {player.drinksCount || 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTurnIndex(index)}
                  className="text-xs bg-[#1A1429] hover:bg-[#2E2448] text-yellow-300 px-2.5 py-1 rounded-lg border border-purple-500/30"
                  title="Pasar turno a esta jugadora"
                >
                  Dar Turno
                </button>
                {players.length > 1 && (
                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-comic text-xl py-2.5 rounded-2xl border-2 border-black shadow-pop transition"
        >
          ¡LISTAS PARA JUGAR!
        </button>
      </div>
    </div>
  );
}
