export const CATEGORIES = {
  buzon: {
    id: 'buzon',
    name: 'El Buzón del Desahogo',
    tag: 'CONFESIÓN O SHOT',
    color: '#FF6B00',
    bg: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500',
    badge: 'bg-orange-500 text-black',
    icon: 'MailOpen',
    desc: 'Verdades sin filtro. Si te niegas a responder o mientes, tomas el castigo.'
  },
  quien: {
    id: 'quien',
    name: '¿Quién es más propensa a...?',
    tag: 'VOTACIÓN A LA CUENTA DE 3',
    color: '#E91E63',
    bg: 'from-pink-500/20 to-purple-500/10',
    border: 'border-pink-500',
    badge: 'bg-pink-500 text-white',
    icon: 'Users',
    desc: 'A la de tres, todas apuntan con el dedo en la mesa. La más votada paga prenda o toma.'
  },
  basta: {
    id: 'basta',
    name: '¡Basta de Estupideces!',
    tag: 'TRIBUNAL DE AMIGAS',
    color: '#FFD600',
    bg: 'from-yellow-500/20 to-orange-500/10',
    border: 'border-yellow-400',
    badge: 'bg-yellow-400 text-black',
    icon: 'AlertOctagon',
    desc: 'Un caso real de la "Familia Web". ¿Es perdonable o es una estupidez monumental?'
  },
  datoduro: {
    id: 'datoduro',
    name: 'El Dato Duro',
    tag: 'TRIVIA & ENCUESTAS',
    color: '#00C2CB',
    bg: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-400',
    badge: 'bg-cyan-400 text-black',
    icon: 'BarChart3',
    desc: 'Estadísticas reales del podcast. La que acierta reparte tragos; las demás beben.'
  },
  carrete: {
    id: 'carrete',
    name: 'Ruleta del Orbiting',
    tag: 'RETO CELULAR & CARRETE',
    color: '#A855F7',
    bg: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-500',
    badge: 'bg-purple-500 text-white',
    icon: 'Smartphone',
    desc: 'Pruebas directas con el teléfono, chats archivados y redes sociales.'
  }
};

export const CARDS = [
  // ================= EL BUZÓN DEL DESAHOGO =================
  {
    id: 'b1',
    category: 'buzon',
    title: 'El Casi Algo que se hizo Humo',
    text: '¿Cuál ha sido la mayor humillación que viviste por un "casi algo"? (¿Ir a la casa, conocer a la tía, o que dijera "nunca fuimos nada"?).',
    penalty: 'Si no cuentas la historia con lujo de detalles, toma 2 tragos.',
    quote: '"Yo andaba de payasa contándole a todo el mundo y para él no fuimos nada." - Karla'
  },
  {
    id: 'b2',
    category: 'buzon',
    title: 'Microinfidelidades en la Alfombra',
    text: '¿Alguna vez te pillaron o pillaste una microinfidelidad (un like a las 2 AM, responder historias con fueguitos, o chat archivado)?',
    penalty: 'Confiesa con quién fue o toma 1 shot.',
    quote: '"Nada de micro... aquí la infidelidad se comete, no sucede." - Paulina'
  },
  {
    id: 'b3',
    category: 'buzon',
    title: 'El "Bebecita" a la Distancia',
    text: '¿Cuál es el piropo o apodo más chanta que te dijeron y con el que igual caíste redondita al principio?',
    penalty: 'Si finges que nunca te ha pasado, toma 2 tragos por mentirosa.',
    quote: '"Cuando un loco te empieza a decir bebecita... amiga, ¡ahí no es!" - Karla'
  },
  {
    id: 'b4',
    category: 'buzon',
    title: 'Google Rutas al Descubierto',
    text: '¿Hasta qué nivel de toxicidad o espionaje cibernético has llegado para pillar una mentira? (Cuentas falsas, ubicación, mejores amigos, etc.).',
    penalty: 'Muestra la última búsqueda en tu historial o toma 2 tragos.',
    quote: '"Google rutas motel tanto tanto... ¡La amiga desbloqueó una inseguridad brutal!"'
  },
  {
    id: 'b5',
    category: 'buzon',
    title: 'El Síndrome de la Migajera',
    text: '¿Cuánto tiempo fue lo máximo que aguantaste recibiendo migajas de atención esperando que formalizaran?',
    penalty: 'La que haya durado más de 6 meses, toma un trago de solidaridad.',
    quote: '"Pasáis del breve espacio de separación entre casi algo y migajera." - Paulina'
  },
  {
    id: 'b6',
    category: 'buzon',
    title: 'La Excusa más Descarada',
    text: '¿Cuál ha sido la peor mentira o excusa que te metió un hombre para no verte o zafar de una cita?',
    penalty: 'Cuenta la anécdota o tómate 2 tragos.',
    quote: '"No es que no quiera nada serio... es que no quiero nada serio CONTIGO."'
  },
  {
    id: 'b7',
    category: 'buzon',
    title: 'El Ex que Resucita (Orbiting)',
    text: '¿Quién es el ex o casi algo que jamás te habla pero no se pierde ni una sola historia de tus redes sociales?',
    penalty: 'Nombra sus iniciales o toma un shot.',
    quote: '"El tipo no come ni deja comer. Puro orbiting."'
  },
  {
    id: 'b8',
    category: 'buzon',
    title: 'Cita Desastrosa Express',
    text: '¿Cuál ha sido la peor cita a la que fuiste y de la que tuviste que inventar una emergencia para escapar?',
    penalty: 'Cuenta cómo escapaste o bebe 2 tragos.',
    quote: '"Escuchamos, no juzgamos... bueno, juzgamos un poquito."'
  },

  // ================= ¿QUIÉN ES MÁS PROPENSAPARA...? =================
  {
    id: 'q1',
    category: 'quien',
    title: 'La Intensa Libra',
    text: 'A la cuenta de 3, apunten: ¿Quién es la que ya le tiene nombre a los hijos y cotiza departamento con el mino en la segunda cita?',
    penalty: 'La más apuntada bebe 2 tragos y cuenta su mayor ataque de intensidad.',
    quote: '"Le teníamos nombre a los cabros chicos y el loco solo quería pasar el rato."'
  },
  {
    id: 'q2',
    category: 'quien',
    title: 'La Bomba de Humo',
    text: 'A la cuenta de 3: ¿Quién es la más propensa a desaparecer de un carrete sin despedirse de nadie y amanecer en otro lado?',
    penalty: 'La más votada debe confesar a dónde se fue en su última bomba de humo o tomar 2 tragos.',
    quote: '"Bomba de humo ninja... y al otro día: amiga me quedé dormida."'
  },
  {
    id: 'q3',
    category: 'quien',
    title: 'Recaída con el Ex',
    text: 'A la cuenta de 3: ¿Quién es la más propensa a responderle un mensaje de "hola perdida" a su peor ex a las 3 de la mañana?',
    penalty: 'La más votada bebe 2 tragos por peligro público.',
    quote: '"No aprendí la lección... pero es que soy débil."'
  },
  {
    id: 'q4',
    category: 'quien',
    title: 'Florerito de Mesa',
    text: 'A la cuenta de 3: ¿Quién es la que necesita atención constante, ser deseada por el mundo y que le suban el ego en cada carrete?',
    penalty: 'La ganadora hace un brindis por su propio ego y toma 1 trago.',
    quote: '"Todo lo que se llama florerito de mesa... ¡Fúname si quieres!"'
  },
  {
    id: 'q5',
    category: 'quien',
    title: 'La FBI de Instagram',
    text: 'A la cuenta de 3: ¿Quién es la que descubre la vida entera, exes, árbol genealógico y RUT de un tipo en menos de 5 minutos?',
    penalty: 'La más votada debe decir su técnica secreta de stalkeo o tomar 2 tragos.',
    quote: '"Informática de la NASA una alpargata al lado de una amiga con dudas."'
  },
  {
    id: 'q6',
    category: 'quien',
    title: 'La que Justifica lo Injustificable',
    text: 'A la cuenta de 3: ¿Quién es la amiga que siempre dice: "No, pero es que él cambió", "Es que tiene traumas de infancia", "Es que la mamá no lo quiso"?',
    penalty: 'Todas le tocan el botón de ¡BASTA DE ESTUPIDECES! y la acusada toma 2 tragos.',
    quote: '"¡Basta de ser la terapeuta gratuita de huevones que no quieren cambiar!"'
  },

  // ================= ¡BASTA DE ESTUPIDECES! (TRIBUNAL) =================
  {
    id: 't1',
    category: 'basta',
    title: 'Caso: "El amor no debe limitarse"',
    text: 'Llevan 1 año juntos. Él te propone abrir la relación porque "el amor es libre". Cuando tú sales con alguien a las dos semanas, él te hace un escándalo y se pone a llorar.',
    penalty: 'Voten todas: ¿Se conversa o BASTA DE ESTUPIDECES? Si alguien dice que se conversa, toma 2 tragos por ilusa.',
    quote: '"La ley del embudo: lo ancho para él y lo angosto para una."'
  },
  {
    id: 't2',
    category: 'basta',
    title: 'Caso: "Solo amigos de regaloneo"',
    text: 'Un chiquillo te dice que no quiere nada serio, pero te pide que se junten el domingo a comer helado, ver series abrazados bajo las sábanas y regalonear.',
    penalty: '¿Es un casi algo encubierto o una amistad moderna? Las que opinen que es casi algo eligen a quién darle un trago.',
    quote: '"¿Citas de regaloneo? ¡Para mí eso es un casi algo con otro nombre!"'
  },
  {
    id: 't3',
    category: 'basta',
    title: 'Caso: "El olvidadizo de preservativos"',
    text: 'Llegas a su departamento y encuentras un envoltorio roto de preservativo detrás del velador. Él dice: "Ah, eso debe ser de hace 8 meses antes de conocerte".',
    penalty: '¡PULSA EL BOTÓN DE BASTA! La jugadora de turno cuenta qué le respondería en la cara.',
    quote: '"¿Cómo tan inescrupuloso? Por último el decoro de botar el papelito."'
  },
  {
    id: 't4',
    category: 'basta',
    title: 'Caso: "El mensaje borrado"',
    text: 'Ves de reojo que le llega un mensaje de una compañera de pega que dice: "Gracias por lo de ayer, nadie se enteró 😉", y lo borra al instante frente a ti.',
    penalty: '¿Qué haces en ese segundo? Di tu reacción real. Si titubeas, shot de tequila.',
    quote: '"Cuando perdonas, te abandonas. Grábenselo en la frente."'
  },
  {
    id: 't5',
    category: 'basta',
    title: 'Caso: "La regla de los 3 meses"',
    text: 'Llevas 5 meses saliendo 4 veces por semana con un mino, te cocina, te presenta a los amigos, pero te dice: "No me gusta ponerle etiquetas a lo nuestro".',
    penalty: 'El tribunal vota: ¿Se manda a la punta del cerro en 3, 2, 1? La jugadora de turno bebe si alguna vez aguantó esto.',
    quote: '"Más de tres meses ya no es prueba, amiga: es micajerismo puro."'
  },

  // ================= EL DATO DURO (TRIVIA DEL PODCAST) =================
  {
    id: 'd1',
    category: 'datoduro',
    title: 'Estadística Cadem: Enamorarse de Dos',
    text: 'Según los datos de Cadem citados por Natalia en el podcast: ¿Qué porcentaje de chilenos reconoce haberse enamorado de dos personas al mismo tiempo?\n\nA) 14%\nB) 35%\nC) 52%',
    answer: 'A) 14% (¡Natalia sospecha que el otro 86% no quiso confesar por cartucho!).',
    penalty: 'Las que respondan mal toman 1 trago. La que acierte reparte 2 tragos.',
    quote: '"Nótese que este 14% es de los que fueron sinceros..." - Natalia'
  },
  {
    id: 'd2',
    category: 'datoduro',
    title: 'La Encuesta de la Familia Web',
    text: 'En la encuesta sobre casi algo: ¿Qué votó la mayoría como lo PEOR que te pueden hacer?\n\nA) Que desaparezca sin avisar (bomba de humo)\nB) Que aparezca con otra pareja a la semana\nC) Que te diga: "Tú y yo nunca fuimos nada"',
    answer: 'Empate técnico entre B y C (Que aparezca con otra y que te desconozca diciendo "nunca fuimos nada").',
    penalty: 'La que haya sufrido ambas en carne propia reparte 3 tragos de consuelo.',
    quote: '"Que te desconozcan es como decir que fuiste un relleno en la vida del otro."'
  },
  {
    id: 'd3',
    category: 'datoduro',
    title: 'Relaciones Abiertas en Chile',
    text: 'Ante la pregunta: ¿Alguna vez has considerado tener una relación abierta? ¿Qué porcentaje respondió "JAMÁS"?\n\nA) 40%\nB) 67%\nC) 89%',
    answer: 'B) 67% (Rotundo jamás en la familia web chilena).',
    penalty: 'Si respondiste mal, 1 trago. Si alguna en la mesa tendría una relación abierta, bebe por valiente.',
    quote: '"El cartuchismo chileno intacto... aunque en la práctica varios tengan chipe libre sin saberlo."'
  },
  {
    id: 'd4',
    category: 'datoduro',
    title: 'Volver con el Casi Algo',
    text: '¿Qué ganó en la encuesta: "Volverías con un casi algo que te hizo sufrir"?\n\nA) Bloqueado y superado\nB) No aprendí la lección\nC) Depende de qué pasó',
    answer: 'A) Bloqueado y superado (Aunque "No aprendí la lección" le pisaba los talones).',
    penalty: 'La que tenga a un ex bloqueado ahora mismo en WhatsApp reparte 1 trago.',
    quote: '"Si no lo bloqueas, el tipo vuelve en 6 meses diciendo: Hola perdida."'
  },

  // ================= RULETA DEL ORBITING / CARRETE =================
  {
    id: 'c1',
    category: 'carrete',
    title: 'Ruleta del Chat Archivado',
    text: 'Abre tu WhatsApp frente a todas y muestra quién es el último contacto que tienes en "Archivados".',
    penalty: 'Si te niegas a mostrarlo, toma 2 shots inmediatamente.',
    quote: '"Dejé en archivado el chat... y después se desarchivó solo, ¡milagro!"'
  },
  {
    id: 'c2',
    category: 'carrete',
    title: 'El Visto Humano',
    text: 'Entra a tu Instagram y busca la última persona que te dejó en visto. Tienes que mandarle un sticker o reacción sin decir nada.',
    penalty: 'Si no te atreves, toma 2 tragos.',
    quote: '"Dejar el visto duele, pero más duele arrastrarse."'
  },
  {
    id: 'c3',
    category: 'carrete',
    title: 'La Llamita Prohibida',
    text: 'Revisa las historias de Instagram de tus amigas presentes. La jugadora de la derecha elige a quién de tus seguidores le mandas un fueguito 🔥.',
    penalty: 'Cumple el reto o fondo blanco.',
    quote: '"Modo hombre activado: su fueguito, su llamita y desaparecer."'
  },
  {
    id: 'c4',
    category: 'carrete',
    title: 'Foto Vergonzosa del Baúl',
    text: 'Muestra una foto tuya de hace 10 años (en tu etapa más "pokemona", intensa o con tu peor look).',
    penalty: 'Risas garantizadas. Si no la muestras, 2 tragos.',
    quote: '"Todas tuvimos una etapa de la que nos arrepentimos."'
  },
  {
    id: 'c5',
    category: 'carrete',
    title: 'El Mensaje a Traición',
    text: 'La jugadora de tu izquierda tiene derecho a escribir un estado de WhatsApp de 5 palabras desde tu teléfono por 10 minutos.',
    penalty: 'Si te da pánico y te niegas, toma 3 tragos.',
    quote: '"El que no arriesga, no pasa vergüenza."'
  }
];
