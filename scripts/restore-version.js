import fs from 'fs';
import path from 'path';

const versionsDir = path.join(process.cwd(), '.versions');

if (process.argv.length < 3) {
  console.log('Please provide a version to restore.');
  process.exit(1);
}

const versionToRestore = process.argv[2];
const versionDir = path.join(versionsDir, versionToRestore);

if (!fs.existsSync(versionDir)) {
  console.log(`Version ${versionToRestore} does not exist.`);
  process.exit(1);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
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

copyDir(versionDir, process.cwd());

console.log(`Restored to version: ${versionToRestore}`);