import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const urls = [
  { url: 'https://robotics-learning-webpage.vercel.app', name: 'robotics.png' },
  { url: 'https://aurex-site-sepia.vercel.app', name: 'aurex.png' },
  { url: 'https://ascendavndevs.vercel.app', name: 'ascend.png' },
  { url: 'https://bodylab-3d.vercel.app', name: 'bodylab.png' },
  { url: 'https://demoresrurant-webpage1523.vercel.app', name: 'restaurant.png' }
];

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set a standard desktop resolution
  await page.setViewport({ width: 1440, height: 900 });

  for (const item of urls) {
    console.log(`Navigating to ${item.url}...`);
    try {
      // networkidle0 means wait until there are no more than 0 network connections for at least 500 ms
      await page.goto(item.url, { waitUntil: 'networkidle0', timeout: 60000 });
      
      // Wait a few extra seconds for WebGL/ThreeJS scenes to render (important for Bodylab, Aurex, etc.)
      console.log(`Waiting 5s for ${item.name} animations to settle...`);
      await new Promise(r => setTimeout(r, 5000));
      
      const savePath = join(__dirname, 'public', 'projects', item.name);
      await page.screenshot({ path: savePath });
      console.log(`Successfully saved ${item.name}`);
    } catch (e) {
      console.error(`Failed on ${item.name}:`, e.message);
    }
  }

  await browser.close();
  console.log('All screenshots completed.');
})();
