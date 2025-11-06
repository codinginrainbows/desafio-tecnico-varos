-- AlterTable: Add isConsultor column
ALTER TABLE "usuarios" ADD COLUMN "isConsultor" BOOLEAN NOT NULL DEFAULT false;

-- Migrate data: Set isConsultor = true where tipoUsuario = 'consultor'
UPDATE "usuarios" SET "isConsultor" = true WHERE "tipoUsuario" = 'consultor';

-- DropColumn: Remove tipoUsuario
ALTER TABLE "usuarios" DROP COLUMN "tipoUsuario";
