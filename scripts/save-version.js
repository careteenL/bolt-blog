import fs from 'fs';
import path from 'path';

const versionsDir = path.join(process.cwd(), '.versions');

if (!fs.existsSync(versionsDir)) {
  fs.mkdirSync(versionsDir);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const versionDir = path.join(versionsDir, timestamp);

fs.mkdirSync(versionDir);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(process.cwd(), versionDir);

console.log(`Version saved: ${timestamp}`);