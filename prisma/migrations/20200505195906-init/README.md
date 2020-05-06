# Migration `20200505195906-init`

This migration has been generated at 5/5/2020, 7:59:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Author" (
"id" SERIAL,"name" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Quote" (
"authorId" integer  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" SERIAL,"text" text  NOT NULL ,"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Profile" (
"bio" text   ,"id" SERIAL,"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" SERIAL,"name" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Profile.userId" ON "public"."Profile"("userId")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Quote" ADD FOREIGN KEY ("authorId")REFERENCES "public"."Author"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Quote" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200505195906-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,41 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+model Author {
+  id Int @default(autoincrement()) @id
+  name String
+  quotes Quote[]
+}
+
+model Quote {
+  id Int @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  text String
+  author Author @relation(fields: [authorId], references: [id])
+  authorId Int
+  uploadedby User @relation(fields: [userId], references:[id])
+  userId Int
+}
+
+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+
+model User {
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String?
+  profile Profile?
+  quotes Quote[]
+}
```


