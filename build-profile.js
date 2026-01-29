import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to copy
const dirsToCopy = ['css', 'fonts', 'img', 'js', 'json', 'mail', 'static', 'vendor'];
const filesToCopy = ['index.html', 'blogs.html', 'storymaker.html', 'favicon.ico'];

const distDir = path.join(__dirname, 'dist');
const COMMON_NAV_URL = process.env.COMMON_NAV_URL || 'http://localhost:5174';

if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// Copy Files
filesToCopy.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(distDir, file);
    if (fs.existsSync(src)) {
        let content = fs.readFileSync(src, 'utf8');
        // Replace URL only in HTML files
        if (file.endsWith('.html')) {
             content = content.replace(/http:\/\/localhost:5174/g, COMMON_NAV_URL);
        }
        fs.writeFileSync(dest, content);
    }
});

// Copy Dirs
dirsToCopy.forEach(dir => {
    const src = path.join(__dirname, dir);
    const dest = path.join(distDir, dir);
     if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
     }
});

console.log(`Profile built to dist/ with Nav URL: ${COMMON_NAV_URL}`);
