CREATE TABLE IF NOT EXISTS "board" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"org_id" varchar NOT NULL,
	"authorId" varchar NOT NULL,
	"authorName" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "board_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"board_id" uuid NOT NULL,
	"user_id" varchar NOT NULL,
	"org_id" varchar NOT NULL,
	CONSTRAINT "favorite_id_unique" UNIQUE("id")
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
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "org_id_idx" ON "board" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "author_id_idx" ON "board" USING btree ("authorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "board_id_idx" ON "favorite" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_org_id_idx" ON "favorite" USING btree ("user_id","org_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_board_idx" ON "favorite" USING btree ("user_id","board_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_board_org_idx" ON "favorite" USING btree ("user_id","board_id","org_id");