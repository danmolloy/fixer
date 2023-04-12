const { faker } = require('@faker-js/faker');
const instrumentArr = ["Violin", "Viola", "Cello", "Double Bass", "Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Harp", "Timpani", "Percussion"]
import prisma from '../../client'



async function createUsers() {
  function User() {
    this.name = faker.name.fullName(),
    this.instrument = instrumentArr[Math.floor(Math.random() * instrumentArr.length)]
  }
  let arr = [];

  for (let i = 0; i < 6; i ++) {
    arr = [...arr, new User()]
  }
  console.log(JSON.stringify(arr))
  
  return await prisma.user.createMany({
    data: [...arr]
  })
}

export default async function handle(req, res) {


  res.status(200).json({result: await createUsers()})
}