import type { Config } from "drizzle-kit";
import env from "./env";

export default {
    schema: './lib/db/schemas',
    out:'./lib/db/migrations',
    dialect:'postgresql',
    dbCredentials:{
        url:env.DATABASE_URL!,
    }

} satisfies Config;