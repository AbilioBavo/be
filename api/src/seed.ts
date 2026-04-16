import { prisma } from './lib/prisma';

async function main() {
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    await prisma.category.update({
      where: { id: cat.id },
      data: { slug: cat.name.toLowerCase().replace(/ /g, '-') }, // Logica simples de slug
    });
  }
}
main();
