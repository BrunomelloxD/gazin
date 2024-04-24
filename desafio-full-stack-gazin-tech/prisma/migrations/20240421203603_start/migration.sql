-- CreateTable
CREATE TABLE "levels" (
    "id" SERIAL NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developers" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "datanascimento" TIMESTAMP(3) NOT NULL,
    "idade" INTEGER NOT NULL,
    "hobby" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,

    CONSTRAINT "developers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "levels_nivel_key" ON "levels"("nivel");

-- AddForeignKey
ALTER TABLE "developers" ADD CONSTRAINT "developers_nivel_fkey" FOREIGN KEY ("nivel") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
