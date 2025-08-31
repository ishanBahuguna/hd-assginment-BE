-- CreateTable
CREATE TABLE "public"."Note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
