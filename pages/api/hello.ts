import prisma from "../../client"
import { faker } from "@faker-js/faker";
import { instrumentArr } from "../../components/fixing/fixing";

export const createUser  = async() => {
  console.log("createUser called")
  return await prisma.user.create({
    data: {
      email: faker.internet.email(),
      emailVerified: new Date(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mobileNumber: faker.phone.number(),
      fixingEnsembles: [faker.lorem.words(3)],
      profileText: faker.lorem.paragraph(),
      image: faker.image.url({ width: 100, height: 100}),
      preferredMethod: Math.random() > .3 ? "textMessage" : "whatsApp",
      instrumentsList: [instrumentArr[Math.floor(Math.random() * instrumentArr.length)]]
    }
  })
}

export default async function handle(req, res) {

  res.status(200).json(await createUser())
}