import React from 'react';
import { X, Wine, Users, AlertOctagon, HelpCircle, CheckCircle2 } from 'lucide-react';

export function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#1F1731] border-3 border-yellow-400 rounded-3xl p-5 md:p-6 shadow-pop-lg my-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/30 mb-4">
          <div>
            <h2 className="font-comic text-2xl md:text-3xl text-yellow-300 comic-stroke-sm">
              ¿CÓMO SE JUEGA?
            </h2>
            <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
              Reglas oficiales de "Basta de Estupideces"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white bg-[#30234B] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-3.5 text-xs md:text-sm text-gray-200">
          <div className="flex items-start gap-3 bg-[#281E3D] p-3 rounded-2xl border border-purple-500/20">
            <span className="font-comic text-lg text-yellow-400 bg-[#161223] w-7 h-7 rounded-xl flex items-center justify-center border border-black shrink-0">
              1
            </span>
            <div>
              <strong className="text-yellow-300 block font-semibold mb-0.5">
                La mesa y los tragos
              </strong>
              Pongan el celular al centro de la mesa con un copete o trago a elección (con o sin alcohol). Añadan los nombres de las amigas en el botón de jugadoras.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#281E3D] p-3 rounded-2xl border border-purple-500/20">
            <span className="font-comic text-lg text-yellow-400 bg-[#161223] w-7 h-7 rounded-xl flex items-center justify-center border border-black shrink-0">
              2
            </span>
            <div>
              <strong className="text-yellow-300 block font-semibold mb-0.5">
                Turnos sin anestesia
              </strong>
              La jugadora que indique la pantalla lee la carta en voz alta. Cada carta viene apadrinada por la vibra de Karla, Paulina o Natalia.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#281E3D] p-3 rounded-2xl border border-purple-500/20">
            <span className="font-comic text-lg text-yellow-400 bg-[#161223] w-7 h-7 rounded-xl flex items-center justify-center border border-black shrink-0">
              3
            </span>
            <div>
              <strong className="text-yellow-300 block font-semibold mb-0.5">
                Confesión, votación o prenda
              </strong>
              <ul>
                <li>• <strong>Buzón del Desahogo:</strong> Responde con la verdad o paga el castigo de tragos.</li>
                <li>• <strong>¿Quién es más propensa?:</strong> A la cuenta de 3 todas apuntan con el dedo. La más votada toma.</li>
                <li>• <strong>Tribunal Basta:</strong> Votan si un caso es perdonable o una estupidez monumental.</li>
                <li>• <strong>Dato Duro:</strong> Trivia Cadem del podcast. La que acierta reparte tragos.</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-red-950/60 p-3 rounded-2xl border-2 border-red-500/50">
            <AlertOctagon className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300 block font-semibold mb-0.5">
                El Botón Rojo "¡BASTA!"
              </strong>
              Si alguien en la mesa justifica a un tóxico, inventa una excusa barata o defiende a un casi algo... <strong>¡CUALQUIERA puede tocar el botón rojo!</strong> Sonará la alarma, Paulina sacará tarjeta roja y la acusada toma de inmediato.
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-comic text-lg py-2.5 rounded-2xl border-2 border-black shadow-pop transition"
        >
          ¡LISTAS, A JUGAR!
        </button>
      </div>
    </div>
  );
}
