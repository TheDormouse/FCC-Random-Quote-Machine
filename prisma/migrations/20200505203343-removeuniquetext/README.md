# Migration `20200505203343-removeuniquetext`

This migration has been generated at 5/5/2020, 8:33:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Quote.text"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505202754-makeuniquetext..20200505203343-removeuniquetext
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
-  text String @unique
+  text String
   author Author @relation(fields: [authorId], references: [id])
   authorId Int
   //uploadedby User @relation(fields: [userId], references:[id])
   //userId Int
```


