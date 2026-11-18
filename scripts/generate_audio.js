import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';

const AUDIO_DIR = path.resolve('public/audio');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

const PHRASES = [
  { id: 'paulina_basta', text: '¡Basta de estupideces! ¡Tarjeta roja!', host: 'Paulina' },
  { id: 'paulina_ilusa', text: '¡Cero tolerancia a las excusas baratas! ¡A la cárcel por ilusa!', host: 'Paulina' },
  { id: 'paulina_tribunal', text: '¡El tribunal supremo de Paulina ha dictado sentencia!', host: 'Paulina' },
  { id: 'karla_amiga', text: '¡Amiga, date cuenta, por favor!', host: 'Karla' },
  { id: 'karla_casi_algo', text: '¡El casi algo que se hizo humo! ¡Yo andaba de payasa y para él no fuimos nada!', host: 'Karla' },
  { id: 'karla_intensa', text: '¡Prometo que hoy me porto bien! ¡Salud por los errores que vamos a cometer!', host: 'Karla' },
  { id: 'natalia_dato_duro', text: '¡Dato duro mata relato! El Excel emocional nunca miente.', host: 'Natalia' },
  { id: 'natalia_cientifico', text: 'Estadísticamente hablando, ese hombre es un desastre.', host: 'Natalia' },
  { id: 'natalia_glamour', text: 'Mantengan la compostura y el glamour, amigas.', host: 'Natalia' }
];

async function generateAll() {
  console.log(`Generando ${PHRASES.length} audios para Basta de Estupideces...`);

  for (const item of PHRASES) {
    const filePath = path.join(AUDIO_DIR, `${item.id}.mp3`);
    try {
      // Get base64 audio from google-tts-api in Spanish (es)
      const base64Audio = await googleTTS.getAudioBase64(item.text, {
        lang: 'es',
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
      });

      const buffer = Buffer.from(base64Audio, 'base64');
      fs.writeFileSync(filePath, buffer);
      console.log(`✅ Creado: ${item.id}.mp3 (${buffer.length} bytes) - [${item.host}] "${item.text}"`);
    } catch (err) {
      console.error(`❌ Error generando ${item.id}:`, err);
    }
  }

  console.log('¡Todos los audios generados exitosamente en public/audio!');
}

generateAll();
