import React, { useState } from 'react';
import { X, Send, EyeOff, Lock, Trash2, CheckCircle2, Sparkles, MessageSquarePlus } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function AnonymousModal({ isOpen, onClose, onAddCustomCard, customCards, onDeleteCustomCard }) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [penalty, setPenalty] = useState('');
  const [category, setCategory] = useState('buzon');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newCard = {
      id: `anon_${Date.now()}`,
      isAnonymous: true,
      category: category || 'buzon',
      intensity: ['te', 'previa', 'sinfiltro'],
      title: title.trim() || '🤫 Confesión Anónima del Grupo',
      text: text.trim(),
      penalty: penalty.trim() || 'Confiesa o toma 2 tragos (o cumple prenda elegida por el grupo).',
      quote: '"Alguien presente en esta mesa escribió esto en total secreto..."'
    };

    onAddCustomCard(newCard);
    sounds.playSuspense();
    setIsSuccess(true);
    setText('');
    setTitle('');
    setPenalty('');

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#1B132B] border-3 border-fuchsia-500 rounded-3xl p-5 md:p-6 shadow-pop-lg my-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-fuchsia-500/30 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-fuchsia-950/80 border-2 border-fuchsia-400 flex items-center justify-center text-fuchsia-300">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-comic text-2xl text-fuchsia-300 comic-stroke-sm">
                EL BUZÓN ANÓNIMO
              </h2>
              <p className="text-[10px] sm:text-xs text-yellow-300 font-bold uppercase tracking-wider">
                Secretos & Preguntas de Incógnito
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white bg-[#2E1E45] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro notice */}
        <div className="bg-[#26163D] border border-fuchsia-400/40 rounded-2xl p-3 mb-4 text-xs text-gray-300 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Escribe una anécdota, pregunta picante o verdad oculta sobre alguien presente. <strong>Nadie sabrá quién la escribió</strong> y saldrá mezclada por sorpresa durante la partida.
          </p>
        </div>

        {/* Success message */}
        {isSuccess ? (
          <div className="bg-emerald-950/80 border-2 border-emerald-400 rounded-2xl p-6 text-center my-6 animate-bounce-short">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
            <h3 className="font-comic text-2xl text-emerald-300 mb-1">
              ¡CONFESIÓN GUARDADA EN SECRETO!
            </h3>
            <p className="text-xs text-gray-200">
              Tu carta ya está dentro del mazo. Saldrá en cualquier momento para sorprender al grupo...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Título opcional */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Título o Tema (Opcional):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: El carrete de Año Nuevo, El ex prohibido..."
                className="w-full bg-[#130E1F] border border-fuchsia-400/40 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-400"
                maxLength={40}
              />
            </div>

            {/* Texto de la pregunta / secreto */}
            <div>
              <label className="block text-xs font-bold text-fuchsia-300 mb-1 flex items-center justify-between">
                <span>La Pregunta o Confesión Secreta: *</span>
                <span className="text-[10px] text-gray-400 font-normal">Obligatorio</span>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ej: ¿Quién en esta mesa estuvo a punto de volver con su ex tóxico este mes? O confiesa: ¿alguna vez besaste al casi algo de una amiga?"
                className="w-full bg-[#130E1F] border-2 border-fuchsia-400/50 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-400 h-24 resize-none leading-relaxed"
                required
                maxLength={240}
              />
            </div>

            {/* Castigo / Prenda */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Castigo o Prenda (Opcional):
              </label>
              <input
                type="text"
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                placeholder="Ej: Si no confiesa, 2 shots y mostrar los chats archivados..."
                className="w-full bg-[#130E1F] border border-fuchsia-400/40 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-400"
                maxLength={90}
              />
            </div>

            {/* Categoría */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">
                  Categoría de la Carta:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#130E1F] border border-purple-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                >
                  <option value="buzon">El Buzón del Desahogo</option>
                  <option value="quien">¿Quién es más propensa?</option>
                  <option value="basta">Tribunal Basta</option>
                  <option value="carrete">Ruleta del Orbiting</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-400 hover:to-pink-500 text-white font-comic text-base py-2 px-3 rounded-xl border-2 border-black shadow-pop flex items-center justify-center gap-1.5 transition active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>¡METER AL BUZÓN!</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* List of active anonymous cards */}
        {customCards.length > 0 && (
          <div className="mt-5 pt-4 border-t border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                Cartas secretas en el mazo: ({customCards.length})
              </span>
              <span className="text-[10px] text-fuchsia-300 font-semibold">
                Activas en la partida
              </span>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
              {customCards.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#140E20] border border-purple-500/30 p-2 rounded-xl flex items-center justify-between gap-2 text-xs"
                >
                  <span className="truncate text-gray-200">
                    🤫 {c.text}
                  </span>
                  <button
                    onClick={() => onDeleteCustomCard(c.id)}
                    className="p-1 text-gray-400 hover:text-red-400 shrink-0"
                    title="Eliminar esta carta"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
