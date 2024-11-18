import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from './schemas'
import env from "@/env";
config({path:'.env.local'})

if (!env.DATABASE_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
  }

export const client = neon(env.DATABASE_URL);

export const db = drizzle(client,{schema});


