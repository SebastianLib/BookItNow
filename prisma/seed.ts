const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const services = [
  {
    category: "Barbering",
    services: [
      "Men’s Haircut",
      "Beard Trim and Shape",
      "Hot Towel Shave",
      "Hair and Beard Combo",
      "Kids’ Haircut",
    ],
  },
  {
    category: "Cosmetics",
    services: [
      "Makeup Application",
      "Bridal Makeup",
      "Makeup Lesson",
      "Eyelash Extensions",
      "Eyebrow Shaping",
    ],
  },
  {
    category: "General Beauty",
    services: [
      "Manicure",
      "Pedicure",
      "Facial Treatment",
      "Body Massage",
      "Hair Coloring",
    ],
  },
];
async function main() {
  for (const serviceCategory of services) {
    const createdCategory = await prisma.category.create({
      data: {
        name: serviceCategory.category,
        services: {
          create: serviceCategory.services.map((service) => ({
            name: service,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });