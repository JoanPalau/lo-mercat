const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  /*
  // ... you will write your Prisma Client queries here

  let createProduct = async (p) => {
    let p = await prisma.product.findFirst(
      {
        where: {
          name: p
        }
      }
    )
    return await prisma.product.upsert({
      where: {
        name :p
      },
      update: {

      },
      create: {
          name: p
      }
    });
  }
  let potato = createProduct('Potato');
  let pineapple = createProduct('Pineapple');
  let apple = createProduct('Apple');

  let createMarket = async (m) => {
    return await prisma.product.upsert({
      where: {
        name: m.name
      },
      update: m,
      create: m
    });
  }

  let balafia = createMarket(
    {
      name: 'Balafia',
      location: 'Balafia',
      schedule: 'Sabado'  
    }
  );
  */
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
