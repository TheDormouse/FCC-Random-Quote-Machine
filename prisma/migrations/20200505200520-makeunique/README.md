# Migration `20200505200520-makeunique`

This migration has been generated at 5/5/2020, 8:05:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Author.name" ON "public"."Author"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505200209-removeuser..20200505200520-makeunique
--- datamodel.dml
+++ datamodel.dml
@@ -2,17 +2,17 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Author {
   id Int @default(autoincrement()) @id
-  name String
+  name String @unique
   quotes Quote[]
 }
 model Quote {
```


