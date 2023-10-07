
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";

CREATE FUNCTION "public"."add_user_profile"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  insert into public.profiles(id)
  values(new.id);
  
  return new;
end;$$;

ALTER FUNCTION "public"."add_user_profile"() OWNER TO "postgres";

CREATE FUNCTION "public"."delete_user"() RETURNS "void"
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
	--delete from public.profiles where id = auth.uid();
	delete from auth.users where id = auth.uid();
$$;

ALTER FUNCTION "public"."delete_user"() OWNER TO "postgres";

CREATE FUNCTION "public"."form_encrypt_secret_access_token"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
		BEGIN
		        new.access_token = CASE WHEN new.access_token IS NULL THEN NULL ELSE
			CASE WHEN '6fc172db-73e4-48a1-9673-fabee15d113d' IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.access_token, 'utf8'),
				pg_catalog.convert_to(('')::text, 'utf8'),
				'6fc172db-73e4-48a1-9673-fabee15d113d'::uuid,
				NULL
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;

ALTER FUNCTION "public"."form_encrypt_secret_access_token"() OWNER TO "postgres";

CREATE FUNCTION "public"."integration_notion_encrypt_secret_access_token"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
		BEGIN
		        new.access_token = CASE WHEN new.access_token IS NULL THEN NULL ELSE
			CASE WHEN '6fc172db-73e4-48a1-9673-fabee15d113d' IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.access_token, 'utf8'),
				pg_catalog.convert_to(('')::text, 'utf8'),
				'6fc172db-73e4-48a1-9673-fabee15d113d'::uuid,
				NULL
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;

ALTER FUNCTION "public"."integration_notion_encrypt_secret_access_token"() OWNER TO "postgres";

CREATE FUNCTION "public"."profiles_encrypt_secret_provider_token"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
		BEGIN
		        new.provider_token = CASE WHEN new.provider_token IS NULL THEN NULL ELSE
			CASE WHEN '6fc172db-73e4-48a1-9673-fabee15d113d' IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.provider_token, 'utf8'),
				pg_catalog.convert_to(('')::text, 'utf8'),
				'6fc172db-73e4-48a1-9673-fabee15d113d'::uuid,
				NULL
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;

ALTER FUNCTION "public"."profiles_encrypt_secret_provider_token"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."form" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "layer" "jsonb",
    "user_id" "uuid",
    "databaseId" "text",
    "detail" "jsonb",
    "access_token" "text",
    "logic" "jsonb"
);

ALTER TABLE "public"."form" OWNER TO "postgres";

SECURITY LABEL FOR "pgsodium" ON COLUMN "public"."form"."access_token" IS 'ENCRYPT WITH KEY ID 6fc172db-73e4-48a1-9673-fabee15d113d SECURITY INVOKER';

CREATE VIEW "public"."decrypted_form" WITH ("security_invoker"='true') AS
 SELECT "form"."id",
    "form"."created_at",
    "form"."layer",
    "form"."user_id",
    "form"."databaseId",
    "form"."detail",
    "form"."access_token",
        CASE
            WHEN ("form"."access_token" IS NULL) THEN NULL::"text"
            ELSE
            CASE
                WHEN ('6fc172db-73e4-48a1-9673-fabee15d113d' IS NULL) THEN NULL::"text"
                ELSE "convert_from"("pgsodium"."crypto_aead_det_decrypt"("decode"("form"."access_token", 'base64'::"text"), "convert_to"(''::"text", 'utf8'::"name"), '6fc172db-73e4-48a1-9673-fabee15d113d'::"uuid", NULL::"bytea"), 'utf8'::"name")
            END
        END AS "decrypted_access_token",
    "form"."logic"
   FROM "public"."form";

ALTER TABLE "public"."decrypted_form" OWNER TO "postgres";

CREATE TABLE "public"."integration_notion" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "workspace_name" "text",
    "workspace_icon" "text",
    "workspace_id" "text",
    "access_token" "text"
);

ALTER TABLE "public"."integration_notion" OWNER TO "postgres";

SECURITY LABEL FOR "pgsodium" ON COLUMN "public"."integration_notion"."access_token" IS 'ENCRYPT WITH KEY ID 6fc172db-73e4-48a1-9673-fabee15d113d SECURITY INVOKER';

CREATE VIEW "public"."decrypted_integration_notion" WITH ("security_invoker"='true') AS
 SELECT "integration_notion"."id",
    "integration_notion"."created_at",
    "integration_notion"."user_id",
    "integration_notion"."workspace_name",
    "integration_notion"."workspace_icon",
    "integration_notion"."workspace_id",
    "integration_notion"."access_token",
        CASE
            WHEN ("integration_notion"."access_token" IS NULL) THEN NULL::"text"
            ELSE
            CASE
                WHEN ('6fc172db-73e4-48a1-9673-fabee15d113d' IS NULL) THEN NULL::"text"
                ELSE "convert_from"("pgsodium"."crypto_aead_det_decrypt"("decode"("integration_notion"."access_token", 'base64'::"text"), "convert_to"(''::"text", 'utf8'::"name"), '6fc172db-73e4-48a1-9673-fabee15d113d'::"uuid", NULL::"bytea"), 'utf8'::"name")
            END
        END AS "decrypted_access_token"
   FROM "public"."integration_notion";

ALTER TABLE "public"."decrypted_integration_notion" OWNER TO "postgres";

CREATE TABLE "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "username" character varying,
    "stripe_customer" "text",
    "is_subscribed" boolean DEFAULT false,
    "interval" "text",
    "plan" "text",
    "trail_end" "text",
    "plan_end" "text",
    "provider_token" "text"
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

SECURITY LABEL FOR "pgsodium" ON COLUMN "public"."profiles"."provider_token" IS 'ENCRYPT WITH KEY ID 6fc172db-73e4-48a1-9673-fabee15d113d SECURITY INVOKER';

CREATE VIEW "public"."decrypted_profiles" WITH ("security_invoker"='true') AS
 SELECT "profiles"."id",
    "profiles"."created_at",
    "profiles"."username",
    "profiles"."stripe_customer",
    "profiles"."is_subscribed",
    "profiles"."interval",
    "profiles"."plan",
    "profiles"."trail_end",
    "profiles"."plan_end",
    "profiles"."provider_token",
        CASE
            WHEN ("profiles"."provider_token" IS NULL) THEN NULL::"text"
            ELSE
            CASE
                WHEN ('6fc172db-73e4-48a1-9673-fabee15d113d' IS NULL) THEN NULL::"text"
                ELSE "convert_from"("pgsodium"."crypto_aead_det_decrypt"("decode"("profiles"."provider_token", 'base64'::"text"), "convert_to"(''::"text", 'utf8'::"name"), '6fc172db-73e4-48a1-9673-fabee15d113d'::"uuid", NULL::"bytea"), 'utf8'::"name")
            END
        END AS "decrypted_provider_token"
   FROM "public"."profiles";

ALTER TABLE "public"."decrypted_profiles" OWNER TO "postgres";

ALTER TABLE "public"."integration_notion" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."integration_notion_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."pomodoro" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "data" "jsonb",
    "user_id" "uuid"
);

ALTER TABLE "public"."pomodoro" OWNER TO "postgres";

CREATE TABLE "public"."pomodoro_wallpaper" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "wallpaperUrl" "text",
    "wallpaperName" "text"
);

ALTER TABLE "public"."pomodoro_wallpaper" OWNER TO "postgres";

ALTER TABLE "public"."pomodoro_wallpaper" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."pomodoro_wallpaper_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."form"
    ADD CONSTRAINT "form_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."integration_notion"
    ADD CONSTRAINT "integration_notion_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."pomodoro"
    ADD CONSTRAINT "pomodoro_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."pomodoro_wallpaper"
    ADD CONSTRAINT "pomodoro_wallpaper_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

CREATE TRIGGER "form_encrypt_secret_trigger_access_token" BEFORE INSERT OR UPDATE OF "access_token" ON "public"."form" FOR EACH ROW EXECUTE FUNCTION "public"."form_encrypt_secret_access_token"();

CREATE TRIGGER "integration_notion_encrypt_secret_trigger_access_token" BEFORE INSERT OR UPDATE OF "access_token" ON "public"."integration_notion" FOR EACH ROW EXECUTE FUNCTION "public"."integration_notion_encrypt_secret_access_token"();

CREATE TRIGGER "profiles_encrypt_secret_trigger_provider_token" BEFORE INSERT OR UPDATE OF "provider_token" ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."profiles_encrypt_secret_provider_token"();

ALTER TABLE ONLY "public"."form"
    ADD CONSTRAINT "form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."integration_notion"
    ADD CONSTRAINT "integration_notion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."pomodoro"
    ADD CONSTRAINT "pomodoro_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."form" FOR DELETE USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."integration_notion" FOR DELETE USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."form" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."integration_notion" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."pomodoro" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."form" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."pomodoro" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."pomodoro_wallpaper" FOR SELECT USING (true);

CREATE POLICY "Enable read access for user_id" ON "public"."integration_notion" FOR SELECT USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable update for users based on email" ON "public"."form" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable update for users based on email" ON "public"."integration_notion" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable update for users based on email" ON "public"."pomodoro" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."form" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."integration_notion" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."pomodoro" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."pomodoro_wallpaper" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."add_user_profile"() TO "anon";
GRANT ALL ON FUNCTION "public"."add_user_profile"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_user_profile"() TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."form_encrypt_secret_access_token"() TO "anon";
GRANT ALL ON FUNCTION "public"."form_encrypt_secret_access_token"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."form_encrypt_secret_access_token"() TO "service_role";

GRANT ALL ON FUNCTION "public"."integration_notion_encrypt_secret_access_token"() TO "anon";
GRANT ALL ON FUNCTION "public"."integration_notion_encrypt_secret_access_token"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."integration_notion_encrypt_secret_access_token"() TO "service_role";

GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_provider_token"() TO "anon";
GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_provider_token"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."profiles_encrypt_secret_provider_token"() TO "service_role";

GRANT ALL ON TABLE "public"."form" TO "anon";
GRANT ALL ON TABLE "public"."form" TO "authenticated";
GRANT ALL ON TABLE "public"."form" TO "service_role";

GRANT ALL ON TABLE "public"."decrypted_form" TO "anon";
GRANT ALL ON TABLE "public"."decrypted_form" TO "authenticated";
GRANT ALL ON TABLE "public"."decrypted_form" TO "service_role";

GRANT ALL ON TABLE "public"."integration_notion" TO "anon";
GRANT ALL ON TABLE "public"."integration_notion" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_notion" TO "service_role";

GRANT ALL ON TABLE "public"."decrypted_integration_notion" TO "anon";
GRANT ALL ON TABLE "public"."decrypted_integration_notion" TO "authenticated";
GRANT ALL ON TABLE "public"."decrypted_integration_notion" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."decrypted_profiles" TO "anon";
GRANT ALL ON TABLE "public"."decrypted_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."decrypted_profiles" TO "service_role";

GRANT ALL ON SEQUENCE "public"."integration_notion_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."integration_notion_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."integration_notion_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."pomodoro" TO "anon";
GRANT ALL ON TABLE "public"."pomodoro" TO "authenticated";
GRANT ALL ON TABLE "public"."pomodoro" TO "service_role";

GRANT ALL ON TABLE "public"."pomodoro_wallpaper" TO "anon";
GRANT ALL ON TABLE "public"."pomodoro_wallpaper" TO "authenticated";
GRANT ALL ON TABLE "public"."pomodoro_wallpaper" TO "service_role";

GRANT ALL ON SEQUENCE "public"."pomodoro_wallpaper_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."pomodoro_wallpaper_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."pomodoro_wallpaper_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
