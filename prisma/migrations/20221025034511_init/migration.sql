-- CreateTable
CREATE TABLE "tip" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "tip_pkey" PRIMARY KEY ("id")
);
