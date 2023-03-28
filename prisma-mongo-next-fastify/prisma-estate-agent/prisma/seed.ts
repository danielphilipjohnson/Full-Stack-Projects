import { HouseType, PrismaClient, HouseStatus } from "@prisma/client";
const prisma = new PrismaClient();

import { faker } from "@faker-js/faker";



const amountOfHousesToGenerate = 3000;

async function main() {
  await prisma.property.deleteMany({});

  for (let i = 0; i < amountOfHousesToGenerate; i++) {
    const houseStatus = faker.helpers.arrayElement<HouseStatus>([
      "SALE",
      "RENT"
    ]);
    const houseType = faker.helpers.arrayElement<HouseType>([
      "COTTAGE",
      "RANCH",
      "VILLA",
      "CARAVAN",
      "SEAHOUSE",
      "BUNGALOW",
      "FLAT",
      "APARTMENT",
      "HOUSE",
      "MEWS",
      "PENTHOUSE",
      "STUDIO"
    ]);
    const postCode =
      faker.random.alpha() +
      faker.random.alpha() +
      faker.random.numeric() +
      faker.random.numeric() +
      " " +
      faker.random.numeric() +
      faker.random.alpha() +
      faker.random.alpha();

    await prisma.property.create({
      data: {
        status: houseStatus,
        houseType: houseType,
        price: Number(faker.commerce.price(250000, 10000000)), // 904.00,
        isNewConstruction: faker.datatype.boolean(),
        isShowcase: faker.datatype.boolean(),
        isNewListing: faker.datatype.boolean(),
        listDate: faker.date.past(),
        beds: faker.datatype.number({
          min: 1,
          max: 10
        }),
        baths: faker.datatype.number({
          min: 1,
          max: 10
        }),
        sqft: faker.datatype.number({
          min: 10,
          max: 100
        }),
        lotSize: faker.datatype.number({
          min: 10,
          max: 100
        }),
        headline: faker.lorem.words(4),
        description: faker.lorem.paragraph(2),
        featureId: faker.database.mongodbObjectId(),
        features: {
          createMany: {
            data: [
              {
                description: faker.lorem.paragraph(2),
                title: faker.lorem.words(4)
              },
              {
                description: faker.lorem.paragraph(2),
                title: faker.lorem.words(4)
              },
              {
                description: faker.lorem.paragraph(2),
                title: faker.lorem.words(4)
              }
            ]
          }
        },

        photos: [
          faker.image.business(),
          faker.image.business(),
          faker.image.business(),
          faker.image.business(),
          faker.image.business()
        ],
        address: {
          create: {
            addressLine1: faker.address.streetAddress(true),
            addressLine2: "",
            city: faker.address.cityName(),
            county: faker.address.county(),
            postalCode: postCode,
            lat: Number(faker.address.latitude(10, -10, 5)),
            lon: Number(faker.address.longitude(10, -10, 5))
          }
        },
        contact: {
          create: {
            phone: faker.phone.number(),
            mobile: faker.phone.number(),
            email: faker.internet.email(),
            website: faker.internet.domainName()
          }
        }
      }
    });

    console.log("finished adding: ", i + 1);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
