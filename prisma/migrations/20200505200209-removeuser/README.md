# Migration `20200505200209-removeuser`

This migration has been generated at 5/5/2020, 8:02:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Quote" DROP CONSTRAINT IF EXiSTS "Quote_userId_fkey",
ALTER COLUMN "userId" DROP NOT NULL;

ALTER TABLE "public"."Quote" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505195906-init..20200505200209-removeuser
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -20,10 +20,10 @@
   createdAt DateTime @default(now())
   text String
   author Author @relation(fields: [authorId], references: [id])
   authorId Int
-  uploadedby User @relation(fields: [userId], references:[id])
-  userId Int
+  //uploadedby User @relation(fields: [userId], references:[id])
+  //userId Int
 }
 model Profile {
   id     Int     @default(autoincrement()) @id
```


