# Migration `20200505202754-makeuniquetext`

This migration has been generated at 5/5/2020, 8:27:54 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Quote.text" ON "public"."Quote"("text")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505200520-makeunique..20200505202754-makeuniquetext
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
@@ -17,9 +17,9 @@
 model Quote {
   id Int @default(autoincrement()) @id
   createdAt DateTime @default(now())
-  text String
+  text String @unique
   author Author @relation(fields: [authorId], references: [id])
   authorId Int
   //uploadedby User @relation(fields: [userId], references:[id])
   //userId Int
```


