import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  let potato = await prisma.product.create({
    data: {
        name: 'Potato'
    }
  })

  let pineapple = await prisma.product.create({
    data: {
        name: 'Pineapple'
    }
  })

  let apple = await prisma.product.create({
    data: {
        name: 'Apple'
    }
  })

  console.log(potato);
  console.log(apple);
  console.log(pineapple);
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
