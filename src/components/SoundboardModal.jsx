import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Square, X, Sparkles, Scale, Flame, Brain, Radio } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const SOUNDBOARD_DATA = [
  {
    hostId: 'paulina',
    name: 'Paulina',
    role: 'La Jueza de Hierro',
    avatar: '/images/paulina.jpg',
    color: '#EF4444',
    badgeClass: 'bg-red-600 text-white',
    icon: Scale,
    clips: [
      {
        id: 'paulina_basta',
        title: '¡Tarjeta Roja / BASTA!',
        text: '¡Basta de estupideces! ¡Tarjeta roja!',
        url: '/audio/paulina_basta.mp3'
      },
      {
        id: 'paulina_ilusa',
        title: '¡A la cárcel por ilusa!',
        text: '¡Cero tolerancia a las excusas baratas! ¡A la cárcel por ilusa!',
        url: '/audio/paulina_ilusa.mp3'
      },
      {
        id: 'paulina_tribunal',
        title: 'Sentencia del Tribunal',
        text: '¡El tribunal supremo de Paulina ha dictado sentencia!',
        url: '/audio/paulina_tribunal.mp3'
      }
    ]
  },
  {
    hostId: 'karla',
    name: 'Karla',
    role: 'La Intensa del Carrete',
    avatar: '/images/carla.jpg',
    color: '#F97316',
    badgeClass: 'bg-orange-500 text-white',
    icon: Flame,
    clips: [
      {
        id: 'karla_amiga',
        title: '¡Amiga, date cuenta!',
        text: '¡Amiga, date cuenta, por favor!',
        url: '/audio/karla_amiga.mp3'
      },
      {
        id: 'karla_casi_algo',
        title: 'Andaba de Payasa',
        text: '¡El casi algo que se hizo humo! ¡Yo andaba de payasa y para él no fuimos nada!',
        url: '/audio/karla_casi_algo.mp3'
      },
      {
        id: 'karla_intensa',
        title: 'Hoy me porto bien...',
        text: '¡Prometo que hoy me porto bien! ¡Salud por los errores que vamos a cometer!',
        url: '/audio/karla_intensa.mp3'
      }
    ]
  },
  {
    hostId: 'natalia',
    name: 'Natalia',
    role: 'Dra. Datos Duros',
    avatar: '/images/natalia.jpg',
    color: '#06B6D4',
    badgeClass: 'bg-cyan-500 text-black',
    icon: Brain,
    clips: [
      {
        id: 'natalia_dato_duro',
        title: 'Dato Duro mata Relato',
        text: '¡Dato duro mata relato! El Excel emocional nunca miente.',
        url: '/audio/natalia_dato_duro.mp3'
      },
      {
        id: 'natalia_cientifico',
        title: 'Estadísticamente hablando',
        text: 'Estadísticamente hablando, ese hombre es un desastre.',
        url: '/audio/natalia_cientifico.mp3'
      },
      {
        id: 'natalia_glamour',
        title: 'Mantengan el Glamour',
        text: 'Mantengan la compostura y el glamour, amigas.',
        url: '/audio/natalia_glamour.mp3'
      }
    ]
  }
];

export function SoundboardModal({ isOpen, onClose }) {
  const [playingClipId, setPlayingClipId] = useState(null);

  if (!isOpen) return null;

  const handlePlayClip = (clip) => {
    setPlayingClipId(clip.id);
    const audio = sounds.playVoice(clip.url);
    if (audio) {
      audio.onended = () => {
        setPlayingClipId(null);
      };
      audio.onerror = () => {
        setPlayingClipId(null);
      };
    }
  };

  const handleStop = () => {
    sounds.stopVoice();
    setPlayingClipId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#1C142B] border-4 border-yellow-400 rounded-3xl p-5 sm:p-7 shadow-pop-lg my-auto text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            handleStop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-[#2E2045] rounded-full border border-purple-400/30 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-comic text-xs px-3.5 py-1 rounded-full border-2 border-black shadow-pop mb-2">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>BOTONERA OFICIAL DE VOCES</span>
        </div>

        <h3 className="font-comic text-2xl sm:text-3xl text-yellow-300 comic-stroke leading-tight tracking-wide mb-1">
          SOUNDBOARD DEL PODCAST
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 font-medium mb-4 max-w-md mx-auto">
          Toca cualquier frase para escuchar los veredictos y remates de <strong className="text-yellow-400">Karla, Paulina y Natalia</strong> en medio del carrete.
        </p>

        {/* ================= HOSTS SOUNDBOARD GRID ================= */}
        <div className="space-y-4 mb-5 text-left">
          {SOUNDBOARD_DATA.map((host) => {
            const HostIcon = host.icon;
            return (
              <div
                key={host.hostId}
                className="bg-[#241738] border-2 border-black rounded-2xl p-3 shadow-pop"
              >
                {/* Host Title Bar */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <img
                      src={host.avatar}
                      alt={host.name}
                      className="w-8 h-8 rounded-full border-2 border-black object-cover"
                    />
                    <div>
                      <h4 className="font-comic text-sm text-yellow-300 leading-tight">
                        {host.name}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-bold block -mt-0.5">
                        {host.role}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-comic px-2 py-0.5 rounded-lg border border-black font-bold flex items-center gap-1 ${host.badgeClass}`}>
                    <HostIcon className="w-3 h-3" />
                    <span>{host.name.toUpperCase()}</span>
                  </span>
                </div>

                {/* Host Sound Clips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {host.clips.map((clip) => {
                    const isPlaying = playingClipId === clip.id;
                    return (
                      <button
                        key={clip.id}
                        type="button"
                        onClick={() => handlePlayClip(clip)}
                        className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between relative ${
                          isPlaying
                            ? 'bg-yellow-400 text-black border-black shadow-pop font-bold scale-102 ring-2 ring-yellow-300'
                            : 'bg-[#180E24] hover:bg-[#2F1C47] text-gray-200 border-purple-500/30 hover:border-yellow-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-comic text-[11px] leading-tight truncate">
                            {clip.title}
                          </span>
                          {isPlaying ? (
                            <span className="flex gap-0.5 items-center">
                              <span className="w-1 h-3 bg-black animate-pulse rounded" />
                              <span className="w-1 h-4 bg-black animate-pulse rounded delay-75" />
                              <span className="w-1 h-2 bg-black animate-pulse rounded delay-150" />
                            </span>
                          ) : (
                            <Play className="w-3 h-3 text-yellow-400 shrink-0 fill-yellow-400" />
                          )}
                        </div>

                        <p className={`text-[9px] line-clamp-2 leading-tight ${isPlaying ? 'text-black/80 font-semibold' : 'text-gray-400'}`}>
                          "{clip.text}"
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stop Bar */}
        <div className="flex gap-2">
          {playingClipId && (
            <button
              onClick={handleStop}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-comic text-xs py-2 px-3 rounded-xl border-2 border-black shadow-pop flex items-center justify-center gap-1.5 transition"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>DETENER AUDIO</span>
            </button>
          )}

          <button
            onClick={() => {
              handleStop();
              onClose();
            }}
            className="flex-1 bg-[#2C1F45] hover:bg-[#3B2B5C] text-gray-300 text-xs font-bold py-2 px-3 rounded-xl border border-purple-400/30 transition"
          >
            Cerrar Soundboard
          </button>
        </div>
      </div>
    </div>
  );
}
