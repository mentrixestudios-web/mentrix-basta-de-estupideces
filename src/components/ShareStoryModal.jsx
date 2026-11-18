import React, { useState, useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Download,
  Share2,
  Copy,
  Sparkles,
  X,
  Smartphone,
  Square,
  Check,
  AlertCircle,
  Wine,
  Flame,
  HeartCrack,
  Camera
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { CATEGORIES } from '../data/cards';

const STICKERS = [
  { id: 'basta', label: '¡BASTA!', color: 'bg-red-600 text-yellow-300 rotate-[-6deg]' },
  { id: 'toxica', label: '🚨 TÓXICA DETECTADA', color: 'bg-yellow-400 text-black rotate-[5deg]' },
  { id: 'previa', label: '🍸 100% CARRETE', color: 'bg-pink-600 text-white rotate-[-3deg]' },
  { id: 'micajera', label: '👑 MICAJERA CONFIRMADA', color: 'bg-purple-600 text-yellow-300 rotate-[4deg]' }
];

export function ShareStoryModal({
  isOpen,
  onClose,
  card,
  verdictData,
  currentPlayer,
  selectedMode
}) {
  const [aspectRatio, setAspectRatio] = useState('story'); // 'story' (9:16) | 'square' (1:1)
  const [activeSticker, setActiveSticker] = useState('basta');
  const [playerName, setPlayerName] = useState(currentPlayer?.name || 'Amigas en el Carrete');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const storyCardRef = useRef(null);

  if (!isOpen) return null;

  const isVerdictMode = Boolean(verdictData);
  const category = card ? (CATEGORIES[card.category] || CATEGORIES.buzon) : null;

  // Generate PNG image from the DOM node
  const handleDownloadImage = async () => {
    if (!storyCardRef.current) return;
    try {
      setIsGenerating(true);
      sounds.playCamera();

      const dataUrl = await toPng(storyCardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5
      });

      const link = document.createElement('a');
      link.download = `basta-de-estupideces-${isVerdictMode ? 'veredicto' : 'story'}.png`;
      link.href = dataUrl;
      link.click();

      confetti({ particleCount: 50, spread: 70 });
    } catch (err) {
      console.error('Error generating story image', err);
      alert('Hubo un problema al generar la imagen. Intenta nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Share via Web Share API
  const handleShareMobile = async () => {
    if (!storyCardRef.current) return;
    try {
      setIsGenerating(true);
      sounds.playCamera();

      const blob = await toBlob(storyCardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5
      });

      if (!blob) throw new Error('No blob generated');

      const file = new File([blob], 'basta-story.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Basta de Estupideces | El Juego de Carrete',
          text: '¡Miren lo que salió en nuestra junta con Basta de Estupideces! 🍸😂 #BastaDeEstupideces'
        });
      } else {
        // Fallback to downloading
        await handleDownloadImage();
      }
    } catch (err) {
      console.warn('Share not completed or cancelled', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy PNG to Clipboard
  const handleCopyClipboard = async () => {
    if (!storyCardRef.current) return;
    try {
      setIsGenerating(true);
      sounds.playCamera();

      const blob = await toBlob(storyCardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5
      });

      if (!blob) throw new Error('No blob generated');

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopiedSuccess(true);
        setTimeout(() => setCopiedSuccess(false), 2500);
      } else {
        await handleDownloadImage();
      }
    } catch (err) {
      console.error('Clipboard copy failed, downloading instead', err);
      await handleDownloadImage();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#1B1429] border-4 border-yellow-400 rounded-3xl p-4 sm:p-6 shadow-pop-lg my-auto text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-[#2E2045] rounded-full border border-purple-400/30 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-comic text-xs px-3.5 py-1 rounded-full border-2 border-black shadow-pop mb-2">
          <Camera className="w-4 h-4" />
          <span>MODO VIRAL — EXPORTAR PARA STORIES</span>
        </div>

        <h3 className="font-comic text-2xl sm:text-3xl text-yellow-300 comic-stroke leading-tight tracking-wide mb-1">
          CREAR TARJETA PARA INSTAGRAM
        </h3>
        <p className="text-xs text-gray-300 font-medium mb-3">
          Descarga o comparte esta tarjeta pop-art con el sello oficial de Karla, Paulina y Natalia.
        </p>

        {/* Format Selector: Story (9:16) vs Square (1:1) */}
        <div className="flex justify-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => setAspectRatio('story')}
            className={`px-3 py-1.5 rounded-xl border-2 font-comic text-xs flex items-center gap-1.5 transition ${
              aspectRatio === 'story'
                ? 'bg-yellow-400 text-black border-black shadow-pop font-bold'
                : 'bg-[#291E3B] text-gray-300 border-purple-500/30 hover:border-white/40'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Story (9:16)</span>
          </button>

          <button
            type="button"
            onClick={() => setAspectRatio('square')}
            className={`px-3 py-1.5 rounded-xl border-2 font-comic text-xs flex items-center gap-1.5 transition ${
              aspectRatio === 'square'
                ? 'bg-yellow-400 text-black border-black shadow-pop font-bold'
                : 'bg-[#291E3B] text-gray-300 border-purple-500/30 hover:border-white/40'
            }`}
          >
            <Square className="w-3.5 h-3.5" />
            <span>Post / WhatsApp (1:1)</span>
          </button>
        </div>

        {/* Sticker Selector */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
          <span className="text-[10px] text-gray-400 uppercase font-bold mr-1">Sticker:</span>
          {STICKERS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSticker(activeSticker === s.id ? null : s.id)}
              className={`text-[10px] font-comic px-2 py-0.5 rounded-lg border border-black transition ${
                activeSticker === s.id ? `${s.color} font-black shadow-sm scale-105` : 'bg-[#241A35] text-gray-400 opacity-70'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Player Name Tag Input */}
        <div className="mb-4 flex items-center justify-center gap-2 max-w-xs mx-auto">
          <span className="text-[11px] text-gray-300 font-bold">Firma:</span>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Nombre o grupo"
            maxLength={28}
            className="bg-[#241838] border border-purple-500/40 rounded-xl px-2.5 py-1 text-xs text-yellow-300 font-semibold focus:outline-none focus:border-yellow-400 text-center w-full"
          />
        </div>

        {/* ================= CONTENEDOR VISUAL EXPORTABLE (CAPTURA REAL) ================= */}
        <div className="overflow-x-auto p-1 flex justify-center mb-4">
          <div
            ref={storyCardRef}
            className={`relative bg-[#1A1028] border-4 border-black rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-hidden text-left ${
              aspectRatio === 'story'
                ? 'w-[320px] h-[520px]'
                : 'w-[320px] h-[340px]'
            }`}
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 20%, #351C4D 0%, #170E24 100%)'
            }}
          >
            {/* Pop-art Dot pattern background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#FACC15 1px, transparent 1px)',
                backgroundSize: '14px 14px'
              }}
            />

            {/* TOP BAR OF THE STORY */}
            <div className="relative z-10 flex items-center justify-between border-b-2 border-black/40 pb-2.5 mb-2">
              <div className="flex items-center gap-2">
                <img
                  src="/images/portada.jpg"
                  alt="Podcast"
                  className="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover"
                />
                <div>
                  <h4 className="font-comic text-xs text-yellow-300 leading-tight comic-stroke-sm">
                    BASTA DE ESTUPIDECES
                  </h4>
                  <span className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider block">
                    @bastadeestupideces
                  </span>
                </div>
              </div>

              {/* Host Trio Mini Avatars */}
              <div className="flex -space-x-1.5">
                <img src="/images/carla.jpg" alt="Karla" className="w-5 h-5 rounded-full border border-black object-cover" />
                <img src="/images/paulina.jpg" alt="Paulina" className="w-5 h-5 rounded-full border border-black object-cover" />
                <img src="/images/natalia.jpg" alt="Natalia" className="w-5 h-5 rounded-full border border-black object-cover" />
              </div>
            </div>

            {/* MAIN CARD CONTENT */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-1">
              {isVerdictMode ? (
                /* ============= VEREDICTO SUMMARY STORY ============= */
                <div className="space-y-2">
                  <div className="inline-block bg-yellow-400 text-black font-comic text-[11px] px-2.5 py-0.5 rounded-lg border-2 border-black shadow-sm font-bold">
                    🏆 EL VEREDICTO DEL CARRETE
                  </div>

                  <div className="bg-[#261536]/90 border-2 border-pink-500/60 rounded-2xl p-3 shadow-md">
                    <div className="flex items-center gap-2.5 mb-2">
                      <img
                        src={verdictData?.reinaMicajerismo?.avatar || '/images/carla.jpg'}
                        alt="Reina"
                        className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover shadow-sm"
                      />
                      <div>
                        <span className="text-[9px] text-pink-300 font-bold uppercase block -mb-0.5">
                          👑 REINA DEL MICAJERISMO
                        </span>
                        <h3 className="font-comic text-base text-yellow-300 leading-tight">
                          {verdictData?.reinaMicajerismo?.name || 'La más votada'}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-200 leading-snug italic">
                      "Le daría una 5ta oportunidad al casi-algo a las 3 AM. ¡Alguien quítele el teléfono!"
                    </p>
                  </div>

                  {aspectRatio === 'story' && verdictData?.laIntensa && (
                    <div className="bg-[#2D1A1E]/90 border-2 border-orange-500/60 rounded-2xl p-2.5 shadow-md flex items-center gap-2">
                      <img
                        src={verdictData.laIntensa.avatar || '/images/carla.jpg'}
                        alt="Intensa"
                        className="w-8 h-8 rounded-full border border-orange-400 object-cover"
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] text-orange-300 font-bold uppercase block -mb-0.5">
                          🔥 LA INTENSA ({verdictData.laIntensa.drinksCount || 0} tragos)
                        </span>
                        <h4 className="font-comic text-xs text-yellow-300 truncate">
                          {verdictData.laIntensa.name}
                        </h4>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-gray-300 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 font-bold">
                    <span>🍷 {verdictData?.totalDrinks || 0} Tragos</span>
                    <span>🚨 {verdictData?.gameStats?.buzzerCount || 0} ¡Basta!</span>
                    <span>🎴 {verdictData?.gameStats?.cardsPlayed || 0} Cartas</span>
                  </div>
                </div>
              ) : (
                /* ============= SINGLE CARD STORY ============= */
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="font-comic text-[10px] px-2.5 py-0.5 rounded-lg border-2 border-black font-bold uppercase shadow-sm"
                      style={{ backgroundColor: category?.color || '#FACC15', color: '#000' }}
                    >
                      {card?.isAnonymous ? '🤫 CONFESIÓN ANÓNIMA' : category?.name || 'EL JUEGO'}
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase">
                      {category?.tag || 'PREVIA'}
                    </span>
                  </div>

                  <div className="bg-[#221535]/95 border-2 border-purple-500/50 rounded-2xl p-3.5 shadow-md">
                    <h3 className="font-comic text-lg sm:text-xl text-yellow-300 leading-tight mb-2 comic-stroke-sm">
                      {card?.title}
                    </h3>
                    <p className="text-xs text-white font-medium leading-relaxed">
                      {card?.text}
                    </p>
                  </div>

                  {card?.quote && aspectRatio === 'story' && (
                    <p className="text-[10px] text-gray-300 italic text-center px-2">
                      {card.quote}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* STICKER OVERLAY IF ACTIVE */}
            {activeSticker && (
              <div className="relative z-20 flex justify-center -my-1">
                {(() => {
                  const st = STICKERS.find(s => s.id === activeSticker);
                  if (!st) return null;
                  return (
                    <span className={`font-comic text-xs sm:text-sm px-3.5 py-1 rounded-xl border-2 border-black shadow-pop font-black ${st.color}`}>
                      {st.label}
                    </span>
                  );
                })()}
              </div>
            )}

            {/* FOOTER OF THE STORY */}
            <div className="relative z-10 border-t-2 border-black/40 pt-2 flex items-center justify-between text-[10px]">
              <div>
                <span className="text-gray-400 block -mb-0.5 text-[8px] uppercase font-bold">
                  Jugado por:
                </span>
                <span className="font-comic text-yellow-300 text-xs">
                  {playerName || 'Amigas'}
                </span>
              </div>

              <div className="text-right">
                <span className="font-bold text-white bg-pink-600/90 border border-black px-2 py-0.5 rounded-lg shadow-sm">
                  basta.mentrixestudios.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTONES DE ACCIÓN PARA GUARDAR/COMPARTIR ================= */}
        <div className="space-y-2 max-w-sm mx-auto">
          {/* Main Share Button */}
          <button
            onClick={handleShareMobile}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-400 active:scale-98 text-white font-comic text-base py-3 px-4 rounded-2xl border-2 border-black shadow-pop flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Share2 className="w-5 h-5" />
            <span>{isGenerating ? 'Generando imagen...' : 'COMPARTIR EN STORIES / WHATSAPP'}</span>
          </button>

          <div className="flex gap-2">
            {/* Download PNG Button */}
            <button
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 active:scale-98 text-black font-comic text-xs sm:text-sm py-2.5 px-2 rounded-xl border-2 border-black shadow-pop flex items-center justify-center gap-1.5 transition disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>DESCARGAR PNG</span>
            </button>

            {/* Copy to Clipboard Button */}
            <button
              onClick={handleCopyClipboard}
              disabled={isGenerating}
              className="flex-1 bg-[#2C1F45] hover:bg-[#3B2B5C] active:scale-98 text-yellow-300 font-comic text-xs sm:text-sm py-2.5 px-2 rounded-xl border border-purple-400/40 flex items-center justify-center gap-1.5 transition"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">¡COPIADA!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPIAR IMAGEN</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
