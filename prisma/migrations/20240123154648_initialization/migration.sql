-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aslab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "npm" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aslab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "praktikan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "npm" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "aslab_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "praktikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tugas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "file_url" TEXT[],
    "aslab_id" TEXT NOT NULL,
    "praktikan_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submit_tugas" (
    "id" TEXT NOT NULL,
    "modul1" BOOLEAN NOT NULL,
    "modul2" BOOLEAN NOT NULL,
    "modul3" BOOLEAN NOT NULL,
    "modul4" BOOLEAN NOT NULL,
    "praktikan_id" TEXT NOT NULL,

    CONSTRAINT "submit_tugas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- AddForeignKey
ALTER TABLE "praktikan" ADD CONSTRAINT "praktikan_aslab_id_fkey" FOREIGN KEY ("aslab_id") REFERENCES "aslab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas" ADD CONSTRAINT "tugas_aslab_id_fkey" FOREIGN KEY ("aslab_id") REFERENCES "aslab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas" ADD CONSTRAINT "tugas_praktikan_id_fkey" FOREIGN KEY ("praktikan_id") REFERENCES "praktikan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submit_tugas" ADD CONSTRAINT "submit_tugas_praktikan_id_fkey" FOREIGN KEY ("praktikan_id") REFERENCES "praktikan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
