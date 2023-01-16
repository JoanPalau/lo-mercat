const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

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

async function createProduct (name, id) {
  return await updateOrCreate({
    schema: prisma.product,
    where: {
      name
    },
    update: {
      id
    },
    create: {
      name,
      id
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

async function createCustomer(c) {
  return await updateOrCreate({
    schema: prisma.customer,
    where: {
      name: c.name
    },
    update: c,
    create: c
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
  u.password = await bcrypt.hash(u.password, 10);
  return await updateOrCreate({
    schema: prisma.user,
    where: {
      name: u.email
    },
    update: u,
    create: u
  });
}

async function createPurchase({customerId, id}) {
  return await updateOrCreate({
    schema: prisma.purchase,
    where: {
      id: id
    },
    update: {
      customerId
    },
    create: {
      customerId,
      id
    }
  });
}

async function createOrder({purchaseId, id}) {
  return await updateOrCreate({
    schema: prisma.order,
    where: {
      id: id
    },
    update: {
      purchaseId,
      completed: false,
    },
    create: {
      purchaseId,
      completed: false,
      id
    }
  });
}

async function createOrderLine({stockId, orderId, quantity, cost, id, marketId, created_at}) {
  return await updateOrCreate({
    schema: prisma.orderLine,
    where: {
      id: id
    },
    update: {
      stockId,
      orderId,
      quantity,
      cost,
      marketId,
      created_at
    },
    create: {
      stockId,
      orderId,
      quantity,
      cost,
      id,
      marketId,
      created_at
    }
  });
}

async function createStock({farmer, product, quantity, cost, id}) {
  return await updateOrCreate({
    schema: prisma.stock,
    where: {
      productId: product.id,
      farmerId: farmer.id,
    },
    update: {
      quantity,
      cost, 
      id
    },
    create: {
      productId: product.id,
      farmerId: farmer.id,
      quantity,
      cost,
      id
    }
  });
}

async function createStand({farmer, market, id}) {
  return await updateOrCreate({
    schema: prisma.stand,
    where: {
      marketId: market.id,
      farmerId: farmer.id,
    },
    update: {
      id
    },
    create: {
      marketId: market.id,
      farmerId: farmer.id,
      id
    }
  });
}


async function main() {

  let potato = await createProduct('Potato', '1');
  let pineapple = await  createProduct('Pineapple', '2');
  let apple = await createProduct('Apple', '3');

  let balafia = await createMarket(
    {
      id: '1',
      name: 'Balafia',
      location: 'Balafia',
      schedule: 'Sabado',
      type: 'PUBLIC'
    }
  );
  let tarragona = await createMarket(
    {
      id: '2',
      name: 'Tarragona',
      location: 'Tarragona',
      schedule: 'Dilluns-Dissabte',
      type: 'PUBLIC'
    }
  );
  let barcelona = await createMarket(
    {
      id: '3',
      name: 'Barcelona',
      location: 'Barcelona',
      schedule: 'Dilluns-Dissabte',
      type: 'PUBLIC'
    }
  );
  let girona = await createMarket(
    {
      id: '4',
      name: 'Girona',
      location: 'Girona',
      schedule: 'Dilluns-Dissabte',
      type: 'PUBLIC'
    }
  );

  let user_alpha = await createUser({
    id: '1',
    email: 'alpha@gmail.com',
    password: '123',
    name: 'alpha',
  });

  let user_beta = await createUser({
    id: '2',
    email: 'beta@gmail.com',
    password: '123',
    name: 'beta',
  });

  let user_customerA = await createUser({
    id: '3',
    email: 'customerA@gmail.com',
    password: '123',
    name: 'customer',
  });

  let user_customerB = await createUser({
    id: '4',
    email: 'customerB@gmail.com',
    password: '123',
    name: 'customer',
  });

  let alpha = await createFarmer(
    {
      id: '1',
      name: 'Alpha',
      birthday: new Date(2022, 1, 1),
      userId: user_alpha.obj.id
    }
  );

  let beta = await createFarmer(
    {
      id: '2',
      name: 'Beta',
      birthday: new Date(1990, 1, 1),
      userId: user_beta.obj.id
    }
  );

  let customerA = await createCustomer(
    {
      id: '1',
      name: 'Customer1',
      birthday: new Date(1990, 1, 1),
      userId: user_customerA.obj.id,
      gender: 'Not defined'
    }
  );

  let customerB = await createCustomer(
    {
      id: '2',
      name: 'Customer2',
      birthday: new Date(1990, 1, 1),
      userId: user_customerB.obj.id,
      gender: 'Not defined'
    }
  );
  

  let alpha_apple = await createStock({
    farmer: alpha.obj,
    product: apple.obj,
    quantity: 30,
    cost: 25,
    id: '1'
  });

  let alpha_pineapple = await createStock({
    farmer: alpha.obj,
    product: pineapple.obj,
    quantity: 50,
    cost: 30,
    id: '2'
  });

  let alpha_potato = await createStock({
    farmer: alpha.obj,
    product: potato.obj,
    quantity: 15,
    cost: 10,
    id: '3'
  });

  let beta_apple = await createStock({
    farmer: beta.obj,
    product: apple.obj,
    quantity: 30,
    cost: 25,
    id: '4'
  });

  let beta_pineapple = await createStock({
    farmer: beta.obj,
    product: pineapple.obj,
    quantity: 50,
    cost: 30,
    id: '5'
  });

  let beta_potato = await createStock({
    farmer: beta.obj,
    product: potato.obj,
    quantity: 15,
    cost: 10,
    id: '6'
  });

  let barcelona_alpha = await createStand(
    {
      farmer: alpha.obj,
      market: barcelona.obj,
      id: '1'
    }
  );

  let balafia_alpha = await createStand(
    {
      farmer: alpha.obj,
      market: balafia.obj,
      id: '2'
    }
  );

  let tarragona_alpha = await createStand(
    {
      farmer: alpha.obj,
      market: tarragona.obj,
      id: '3'
    }
  );

  let products = [
    beta_apple,
    beta_pineapple,
    beta_potato,
    alpha_apple,
    alpha_pineapple,
    alpha_potato
  ];
  let customers = [
    customerA,
    customerB
  ]
  let markets = [
    balafia,
    tarragona,
    barcelona,
    girona
  ];
  let count = 1;
  
  for(let i = 0; i < products.length; i++){
    let product = products[i];
    let purchasesNumber = faker.datatype.number({ min: 2, max: 50 });
    for(let j = 0; j < purchasesNumber; j++) {
      var costumerIndex = Math.floor(Math.random() * customers.length);
      let costumer = customers[costumerIndex];
      let marketIndex = Math.floor(Math.random() * markets.length);
      let market = markets[marketIndex];

      let purchase1 = await createPurchase(
        {
          customerId: costumer.obj.id,
          id: '' + count
        }
      );
    
      let order1 = await createOrder(
        {
          purchaseId: purchase1.obj.id,
          id: '' + count
        }
      );
    
      let orderLine1 = await createOrderLine(
        {
          stockId: product.obj.id,
          orderId: order1.obj.id,
          quantity: faker.datatype.number({ min: 1, max: 25 }),
          cost: faker.datatype.number({ min: 10, max: 278 }),
          id: '' + count,
          marketId: market.obj.id,
          created_at: faker.date.past(1)
        }
      );

      count++;
    }
    
  }

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
