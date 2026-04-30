-- CreateTable
CREATE TABLE "USERS" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_PROFILES" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "full_name" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "avatar_url" TEXT,
    "github_url" TEXT,
    "linkedin_url" TEXT,
    "portfolio_url" TEXT,
    "experience_level" TEXT,
    "availability_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USER_PROFILES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SKILLS" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SKILLS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_SKILLS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "proficiency_level" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USER_SKILLS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "INTERESTS" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "INTERESTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_INTERESTS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "interest_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USER_INTERESTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PORTFOLIO_PROJECTS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "project_url" TEXT,
    "github_url" TEXT,
    "image_url" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "start_date" DATE,
    "end_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PORTFOLIO_PROJECTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PORTFOLIO_PROJECT_SKILLS" (
    "id" SERIAL NOT NULL,
    "portfolio_project_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "PORTFOLIO_PROJECT_SKILLS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PROJECT_POSTS" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "project_type" TEXT,
    "team_size_type" TEXT,
    "min_members" INTEGER,
    "max_members" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'open',
    "visibility" TEXT NOT NULL DEFAULT 'public',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PROJECT_POSTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PROJECT_ROLES" (
    "id" SERIAL NOT NULL,
    "project_post_id" INTEGER NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT,
    "slots_needed" INTEGER NOT NULL DEFAULT 1,
    "slots_filled" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PROJECT_ROLES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PROJECT_ROLE_SKILLS" (
    "id" SERIAL NOT NULL,
    "project_role_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "priority" TEXT,

    CONSTRAINT "PROJECT_ROLE_SKILLS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PROJECT_APPLICATIONS" (
    "id" SERIAL NOT NULL,
    "project_post_id" INTEGER NOT NULL,
    "project_role_id" INTEGER NOT NULL,
    "applicant_id" INTEGER NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PROJECT_APPLICATIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PROJECT_MEMBERS" (
    "id" SERIAL NOT NULL,
    "project_post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_role_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PROJECT_MEMBERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MATCH_REQUESTS" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "project_post_id" INTEGER,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MATCH_REQUESTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MESSAGES" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "project_post_id" INTEGER,
    "content" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MESSAGES_pkey" PRIMARY KEY ("id")
);

-- Migrate existing users into the normalized schema.
INSERT INTO "USERS" ("id", "email", "password_hash", "username", "created_at", "updated_at")
SELECT "id", "email", "passwordHash", "username", "createdAt", "updatedAt"
FROM "User";

INSERT INTO "USER_PROFILES" (
    "user_id",
    "bio",
    "location",
    "avatar_url",
    "experience_level",
    "availability_status",
    "created_at",
    "updated_at"
)
SELECT
    "id",
    "bio",
    "location",
    "avatarUrl",
    "experienceLevel"::TEXT,
    "coderStatus"::TEXT,
    "createdAt",
    "updatedAt"
FROM "User";

INSERT INTO "SKILLS" ("name", "created_at", "updated_at")
SELECT DISTINCT skill_name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "User"
CROSS JOIN LATERAL unnest("skills") AS skill_name
WHERE skill_name IS NOT NULL AND skill_name <> '';

INSERT INTO "USER_SKILLS" ("user_id", "skill_id", "created_at", "updated_at")
SELECT DISTINCT u."id", s."id", u."createdAt", u."updatedAt"
FROM "User" u
CROSS JOIN LATERAL unnest(u."skills") AS skill_name
JOIN "SKILLS" s ON s."name" = skill_name
WHERE skill_name IS NOT NULL AND skill_name <> '';

INSERT INTO "INTERESTS" ("name", "created_at", "updated_at")
SELECT DISTINCT interest_name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "User"
CROSS JOIN LATERAL unnest("projectInterests") AS interest_name
WHERE interest_name IS NOT NULL AND interest_name <> '';

INSERT INTO "USER_INTERESTS" ("user_id", "interest_id", "created_at", "updated_at")
SELECT DISTINCT u."id", i."id", u."createdAt", u."updatedAt"
FROM "User" u
CROSS JOIN LATERAL unnest(u."projectInterests") AS interest_name
JOIN "INTERESTS" i ON i."name" = interest_name
WHERE interest_name IS NOT NULL AND interest_name <> '';

-- Keep sequences aligned with migrated IDs.
SELECT setval(pg_get_serial_sequence('"USERS"', 'id'), COALESCE((SELECT MAX("id") FROM "USERS"), 1), (SELECT MAX("id") IS NOT NULL FROM "USERS"));
SELECT setval(pg_get_serial_sequence('"USER_PROFILES"', 'id'), COALESCE((SELECT MAX("id") FROM "USER_PROFILES"), 1), (SELECT MAX("id") IS NOT NULL FROM "USER_PROFILES"));
SELECT setval(pg_get_serial_sequence('"SKILLS"', 'id'), COALESCE((SELECT MAX("id") FROM "SKILLS"), 1), (SELECT MAX("id") IS NOT NULL FROM "SKILLS"));
SELECT setval(pg_get_serial_sequence('"USER_SKILLS"', 'id'), COALESCE((SELECT MAX("id") FROM "USER_SKILLS"), 1), (SELECT MAX("id") IS NOT NULL FROM "USER_SKILLS"));
SELECT setval(pg_get_serial_sequence('"INTERESTS"', 'id'), COALESCE((SELECT MAX("id") FROM "INTERESTS"), 1), (SELECT MAX("id") IS NOT NULL FROM "INTERESTS"));
SELECT setval(pg_get_serial_sequence('"USER_INTERESTS"', 'id'), COALESCE((SELECT MAX("id") FROM "USER_INTERESTS"), 1), (SELECT MAX("id") IS NOT NULL FROM "USER_INTERESTS"));

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");
CREATE UNIQUE INDEX "USERS_username_key" ON "USERS"("username");
CREATE UNIQUE INDEX "USER_PROFILES_user_id_key" ON "USER_PROFILES"("user_id");
CREATE UNIQUE INDEX "SKILLS_name_key" ON "SKILLS"("name");
CREATE UNIQUE INDEX "USER_SKILLS_user_id_skill_id_key" ON "USER_SKILLS"("user_id", "skill_id");
CREATE INDEX "USER_SKILLS_skill_id_idx" ON "USER_SKILLS"("skill_id");
CREATE UNIQUE INDEX "INTERESTS_name_key" ON "INTERESTS"("name");
CREATE UNIQUE INDEX "USER_INTERESTS_user_id_interest_id_key" ON "USER_INTERESTS"("user_id", "interest_id");
CREATE INDEX "USER_INTERESTS_interest_id_idx" ON "USER_INTERESTS"("interest_id");
CREATE INDEX "PORTFOLIO_PROJECTS_user_id_idx" ON "PORTFOLIO_PROJECTS"("user_id");
CREATE UNIQUE INDEX "PORTFOLIO_PROJECT_SKILLS_portfolio_project_id_skill_id_key" ON "PORTFOLIO_PROJECT_SKILLS"("portfolio_project_id", "skill_id");
CREATE INDEX "PORTFOLIO_PROJECT_SKILLS_skill_id_idx" ON "PORTFOLIO_PROJECT_SKILLS"("skill_id");
CREATE INDEX "PROJECT_POSTS_owner_id_idx" ON "PROJECT_POSTS"("owner_id");
CREATE INDEX "PROJECT_ROLES_project_post_id_idx" ON "PROJECT_ROLES"("project_post_id");
CREATE UNIQUE INDEX "PROJECT_ROLE_SKILLS_project_role_id_skill_id_key" ON "PROJECT_ROLE_SKILLS"("project_role_id", "skill_id");
CREATE INDEX "PROJECT_ROLE_SKILLS_skill_id_idx" ON "PROJECT_ROLE_SKILLS"("skill_id");
CREATE UNIQUE INDEX "PROJECT_APPLICATIONS_project_role_id_applicant_id_key" ON "PROJECT_APPLICATIONS"("project_role_id", "applicant_id");
CREATE INDEX "PROJECT_APPLICATIONS_project_post_id_idx" ON "PROJECT_APPLICATIONS"("project_post_id");
CREATE INDEX "PROJECT_APPLICATIONS_applicant_id_idx" ON "PROJECT_APPLICATIONS"("applicant_id");
CREATE UNIQUE INDEX "PROJECT_MEMBERS_project_post_id_user_id_key" ON "PROJECT_MEMBERS"("project_post_id", "user_id");
CREATE INDEX "PROJECT_MEMBERS_user_id_idx" ON "PROJECT_MEMBERS"("user_id");
CREATE INDEX "PROJECT_MEMBERS_project_role_id_idx" ON "PROJECT_MEMBERS"("project_role_id");
CREATE UNIQUE INDEX "MATCH_REQUESTS_sender_id_receiver_id_project_post_id_key" ON "MATCH_REQUESTS"("sender_id", "receiver_id", "project_post_id");
CREATE INDEX "MATCH_REQUESTS_receiver_id_idx" ON "MATCH_REQUESTS"("receiver_id");
CREATE INDEX "MATCH_REQUESTS_project_post_id_idx" ON "MATCH_REQUESTS"("project_post_id");
CREATE INDEX "MESSAGES_sender_id_idx" ON "MESSAGES"("sender_id");
CREATE INDEX "MESSAGES_receiver_id_idx" ON "MESSAGES"("receiver_id");
CREATE INDEX "MESSAGES_project_post_id_idx" ON "MESSAGES"("project_post_id");

-- AddForeignKey
ALTER TABLE "USER_PROFILES" ADD CONSTRAINT "USER_PROFILES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "USER_SKILLS" ADD CONSTRAINT "USER_SKILLS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "USER_SKILLS" ADD CONSTRAINT "USER_SKILLS_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "SKILLS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "USER_INTERESTS" ADD CONSTRAINT "USER_INTERESTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "USER_INTERESTS" ADD CONSTRAINT "USER_INTERESTS_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "INTERESTS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PORTFOLIO_PROJECTS" ADD CONSTRAINT "PORTFOLIO_PROJECTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PORTFOLIO_PROJECT_SKILLS" ADD CONSTRAINT "PORTFOLIO_PROJECT_SKILLS_portfolio_project_id_fkey" FOREIGN KEY ("portfolio_project_id") REFERENCES "PORTFOLIO_PROJECTS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PORTFOLIO_PROJECT_SKILLS" ADD CONSTRAINT "PORTFOLIO_PROJECT_SKILLS_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "SKILLS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_POSTS" ADD CONSTRAINT "PROJECT_POSTS_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_ROLES" ADD CONSTRAINT "PROJECT_ROLES_project_post_id_fkey" FOREIGN KEY ("project_post_id") REFERENCES "PROJECT_POSTS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_ROLE_SKILLS" ADD CONSTRAINT "PROJECT_ROLE_SKILLS_project_role_id_fkey" FOREIGN KEY ("project_role_id") REFERENCES "PROJECT_ROLES"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_ROLE_SKILLS" ADD CONSTRAINT "PROJECT_ROLE_SKILLS_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "SKILLS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_APPLICATIONS" ADD CONSTRAINT "PROJECT_APPLICATIONS_project_post_id_fkey" FOREIGN KEY ("project_post_id") REFERENCES "PROJECT_POSTS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_APPLICATIONS" ADD CONSTRAINT "PROJECT_APPLICATIONS_project_role_id_fkey" FOREIGN KEY ("project_role_id") REFERENCES "PROJECT_ROLES"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_APPLICATIONS" ADD CONSTRAINT "PROJECT_APPLICATIONS_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_MEMBERS" ADD CONSTRAINT "PROJECT_MEMBERS_project_post_id_fkey" FOREIGN KEY ("project_post_id") REFERENCES "PROJECT_POSTS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_MEMBERS" ADD CONSTRAINT "PROJECT_MEMBERS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PROJECT_MEMBERS" ADD CONSTRAINT "PROJECT_MEMBERS_project_role_id_fkey" FOREIGN KEY ("project_role_id") REFERENCES "PROJECT_ROLES"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MATCH_REQUESTS" ADD CONSTRAINT "MATCH_REQUESTS_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MATCH_REQUESTS" ADD CONSTRAINT "MATCH_REQUESTS_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MATCH_REQUESTS" ADD CONSTRAINT "MATCH_REQUESTS_project_post_id_fkey" FOREIGN KEY ("project_post_id") REFERENCES "PROJECT_POSTS"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MESSAGES" ADD CONSTRAINT "MESSAGES_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MESSAGES" ADD CONSTRAINT "MESSAGES_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MESSAGES" ADD CONSTRAINT "MESSAGES_project_post_id_fkey" FOREIGN KEY ("project_post_id") REFERENCES "PROJECT_POSTS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Drop old denormalized user schema after migration.
DROP TABLE "User";
DROP TYPE "ExperienceLevel";
DROP TYPE "CoderStatus";
