const fs = require('fs');
const content = fs.readFileSync('src/components/sections/ScrollStory.tsx', 'utf8');

const newOrder = [
  "china: { flag: '🇨🇳', name: 'China'",
  "vietnam: { flag: '🇻🇳', name: 'Vietnam'",
  "bangladesh: { flag: '🇧🇩', name: 'Bangladesh'",
  "srilanka: { flag: '🇱🇰', name: 'Sri Lanka'",
  "india: { flag: '🇮🇳', name: 'India'",
  "pakistan: { flag: '🇵🇰', name: 'Pakistan'",
  "turkey: { flag: '🇹🇷', name: 'Turkey'",
  "morocco: { flag: '🇲🇦', name: 'Morocco'",
  "portugal: { flag: '🇵🇹', name: 'Portugal'"
];

const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('india: { flag:'));
const endIndex = lines.findIndex(l => l.includes('};')) - 1; // before };

if (startIndex > 0 && endIndex > 0) {
  const dataLines = lines.slice(startIndex, endIndex + 1);
  const orderedDataLines = [];
  
  for (const prefix of newOrder) {
    const line = dataLines.find(l => l.trim().startsWith(prefix.split(':')[0] + ':'));
    if (line) orderedDataLines.push(line);
  }
  
  lines.splice(startIndex, dataLines.length, ...orderedDataLines);
  fs.writeFileSync('src/components/sections/ScrollStory.tsx', lines.join('\n'));
  console.log("Reordered!");
} else {
  console.log("Could not find FACTORY_DATA boundaries.");
}
