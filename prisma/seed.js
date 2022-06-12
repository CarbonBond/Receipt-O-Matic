import PrismaClientPkg from '@prisma/client'

// Prisma doesn't ES modules so we have to assign it.
const PrismaClient = PrismaClientPkg.PrismaClient;
const prisma = new PrismaClient();

function getUsers() {
  return [
    {
      username: 'carbon',
      email: 'brandon.w.burge@email.com',
      firstname: 'Brandon',
      lastname: 'Burge',
      company: {
        create: [
          {
            id: 0,
            name: "BallsAndBikes",
          }
        ]
      },
      role: {
        create: [
          {
            name: 'admin',
            permission: ['admin']
          }
        ]
      },
      receipt: {
        create: [
          {
            customer: {
              create: {
                firstname: 'Joe',
                lastname: 'smith'
              }
            },
            products: {
              create: [
                {
                  name: "bike",
                  cost: 1000.00,
                  desc: "Mountain bike with shocks and disc brakes",
                  sku: " 1010101",
                  quantity: 1,
                  companyId: 0
                }, {
                  name: "ball",
                  cost: 1.50,
                  desc: "Bouncy Ball",
                  sku: "1111111",
                  quantity: 100,
                  companyId: 0
                }

              ]
            }
          }
        ]
      }
    },
  ]
}

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return prisma.user.create({ data: user })
    })
  )
}

seed()
