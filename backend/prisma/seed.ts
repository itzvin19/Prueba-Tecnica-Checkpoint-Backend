import { PrismaClient } from '@prisma/client';
import { productos } from './data/productos';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Insertar productos desde el array importado
  for (const producto of productos) {
    await prisma.producto.create({
      data: producto,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
