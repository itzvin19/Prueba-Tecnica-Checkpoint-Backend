-- CreateTable
CREATE TABLE "Producto" (
    "Id" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Price" TEXT NOT NULL,
    "Image" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "Id" SERIAL NOT NULL,
    "Correo" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Contraseña" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Leads" (
    "Id" SERIAL NOT NULL,
    "Correo" TEXT NOT NULL,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("Id")
);
