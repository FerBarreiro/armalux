// Script de build para Netlify
// Lee las variables de entorno y genera config.js en el servidor
const fs = require('fs');

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  console.error('❌ Faltan variables de entorno: SUPABASE_URL y/o SUPABASE_KEY');
  process.exit(1);
}

const content = `// Generado automáticamente por build.js — no editar
const SUPABASE_URL = '${url}';
const SUPABASE_KEY = '${key}';
`;

fs.writeFileSync('config.js', content);
console.log('✅ config.js generado correctamente');
