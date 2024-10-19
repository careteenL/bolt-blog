import fs from 'fs';
import path from 'path';

const versionsDir = path.join(process.cwd(), '.versions');

if (!fs.existsSync(versionsDir)) {
  console.log('No versions saved yet.');
} else {
  const versions = fs.readdirSync(versionsDir);
  console.log('Saved versions:');
  versions.forEach(version => {
    console.log(version);
  });
}