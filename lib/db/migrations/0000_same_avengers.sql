CREATE TABLE IF NOT EXISTS "board" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"org_id" varchar NOT NULL,
	"authorId" varchar NOT NULL,
	"authorName" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "board_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image" varchar,
	"password" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "org_id_idx" ON "board" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "author_id_idx" ON "board" USING btree ("authorId");