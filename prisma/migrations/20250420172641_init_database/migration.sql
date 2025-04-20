-- CreateTable
CREATE TABLE "metric_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "metric_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "metric_type_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "is_base" BOOLEAN NOT NULL,
    "to_base_formula" TEXT NOT NULL,
    "from_base_formula" TEXT NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metric_value" (
    "id" SERIAL NOT NULL,
    "recorded_at" TIMESTAMP NOT NULL,
    "base_value" DOUBLE PRECISION NOT NULL,
    "base_unit_id" INTEGER NOT NULL,

    CONSTRAINT "metric_value_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "metric_type_name_key" ON "metric_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unit_metric_type_id_name_key" ON "unit"("metric_type_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "unit_metric_type_id_symbol_key" ON "unit"("metric_type_id", "symbol");

-- CreateIndex
CREATE INDEX "metric_value_recorded_at_idx" ON "metric_value"("recorded_at");

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_metric_type_id_fkey" FOREIGN KEY ("metric_type_id") REFERENCES "metric_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metric_value" ADD CONSTRAINT "metric_value_base_unit_id_fkey" FOREIGN KEY ("base_unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
