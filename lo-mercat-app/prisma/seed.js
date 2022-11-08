const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function updateOrCreate({ schema, where, update, create }) {
  let created = true;
  let pre_defined = await schema.findFirst(
    {
      where
    }
  );

  let id = '0';
  if (pre_defined != null) {
    id = pre_defined.id;
    created = false;
  }

  let obj = await schema.upsert({
    where: {
      id: id
    },
    update,
    create
  });
  return { created, obj };
}

async function createProduct (name) {
  return await updateOrCreate({
    schema: prisma.product,
    where: {
      name
    },
    update: {},
    create: {
      name
    }
  });
}

async function createMarket (m) {
  return await updateOrCreate({
    schema: prisma.market,
    where: {
      name: m.name
    },
    update: m,
    create: m
  });
}

async function createFarmer(f) {
  return await updateOrCreate({
    schema: prisma.farmer,
    where: {
      name: f.name
    },
    update: f,
    create: f
  });
}

async function createUser(u) {
  return await updateOrCreate({
    schema: prisma.user,
    where: {
      name: u.email
    },
    update: u,
    create: u
  });
}

async function createStock({farmer, product, quantity, cost}) {
  return await updateOrCreate({
    schema: prisma.stock,
    where: {
      productId: product.id,
      farmerId: farmer.id,
    },
    update: {
      quantity,
      cost
    },
    create: {
      productId: product.id,
      farmerId: farmer.id,
      quantity,
      cost
    }
  });
}

async function createStand({farmer, market}) {
  return await updateOrCreate({
    schema: prisma.stand,
    where: {
      marketId: market.id,
      farmerId: farmer.id,
    },
    update: {
    },
    create: {
      marketId: market.id,
      farmerId: farmer.id,
    }
  });
}


async function main() {

  let potato = await createProduct('Potato');
  let pineapple = await  createProduct('Pineapple');
  let apple = await createProduct('Apple');

  let balafia = await createMarket(
    {
      name: 'Balafia',
      location: 'Balafia',
      schedule: 'Sabado'
    }
  );
  let tarragona = await createMarket(
    {
      name: 'Tarragona',
      location: 'Tarragona',
      schedule: 'Dilluns-Dissabte'
    }
  );
  let barcelona = await createMarket(
    {
      name: 'Barcelona',
      location: 'Barcelona',
      schedule: 'Dilluns-Dissabte'
    }
  );

  let user_alpha = await createUser({
    email: 'alpha@gmail.com',
    password: '123',
    name: 'alpha',
  });

  let user_beta = await createUser({
    email: 'beta@gmail.com',
    password: '123',
    name: 'beta',

  });

  let alpha = await createFarmer(
    {
      name: 'Alpha',
      birthday: new Date(2022, 1, 1),
      userId: user_alpha.obj.id
    }
  );

  let beta = await createFarmer(
    {
      name: 'Beta',
      birthday: new Date(1990, 1, 1),
      userId: user_beta.obj.id
    }
  );

  let alpha_apple = await createStock({
    farmer: alpha.obj,
    product: apple.obj,
    quantity: 30,
    cost: 25
  });

  let alpha_pineapple = await createStock({
    farmer: alpha.obj,
    product: pineapple.obj,
    quantity: 50,
    cost: 30
  });

  let alpha_potato = await createStock({
    farmer: alpha.obj,
    product: potato.obj,
    quantity: 15,
    cost: 10
  });

  let beta_apple = await createStock({
    farmer: beta.obj,
    product: apple.obj,
    quantity: 30,
    cost: 25
  });

  let beta_pineapple = await createStock({
    farmer: beta.obj,
    product: pineapple.obj,
    quantity: 50,
    cost: 30
  });

  let beta_potato = await createStock({
    farmer: beta.obj,
    product: potato.obj,
    quantity: 15,
    cost: 10
  });

  let barcelona_alpha = await createStand(
    {
      farmer: alpha.obj,
      market: barcelona.obj
    }
  );

  let balafia_alpha = await createStand(
    {
      farmer: alpha.obj,
      market: balafia.obj
    }
  );

  let tarragona_alpha = await createStand(
    {
      farmer: alpha.obj,
      market: tarragona.obj
    }
  );


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
