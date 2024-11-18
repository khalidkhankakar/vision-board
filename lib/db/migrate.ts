import dotenv from 'dotenv';
import path from 'path';
import { migrate } from 'drizzle-orm/neon-http/migrator';
dotenv.config({ path: '.env.local' });
import {  db } from './drizzle';

async function main() {
  console.log('Migrating database');
  await migrate(db, { migrationsFolder: path.join(__dirname, './migrations') });
  console.log(`Migrations complete`);
}

main();