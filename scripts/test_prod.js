async function testProd() {
  try {
    const res = await fetch('https://basta.mentrixestudios.com/');
    console.log('Prod Root Status:', res.status);
    const html = await res.text();
    console.log('Prod HTML length:', html.length);
    
    // Check audio file
    const audioRes = await fetch('https://basta.mentrixestudios.com/audio/paulina_basta.mp3');
    console.log('Audio file status:', audioRes.status, 'Content-Type:', audioRes.headers.get('content-type'), 'Length:', audioRes.headers.get('content-length'));

    // Check service worker
    const swRes = await fetch('https://basta.mentrixestudios.com/sw.js');
    console.log('SW status:', swRes.status, 'Content-Type:', swRes.headers.get('content-type'));

    // Check script in HTML
    const match = html.match(/\/assets\/[a-zA-Z0-9_\-]+\.js/);
    if (match) {
      console.log('Found JS asset:', match[0]);
      const jsRes = await fetch('https://basta.mentrixestudios.com' + match[0]);
      console.log('JS Asset status:', jsRes.status, 'Content-Type:', jsRes.headers.get('content-type'));
    } else {
      console.log('No /assets/*.js found in prod HTML!');
    }
  } catch (err) {
    console.error('Error checking prod:', err);
  }
}

testProd();
