const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const instrumentArr = ["Violin", "Viola", "Cello", "Double Bass", "Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Harp", "Timpani", "Percussion"]



async function main() {
  function User() {
    this.id = uuidv4(),
    this.name = faker.name.fullName(),
    this.instrument = instrumentArr[Math.floor(Math.random() * instrumentArr.length)]
  }
  let arr = [];

  for (let i = 0; i < 6; i ++) {
    arr = [...arr, new User()]
  }
  
  console.log(arr)
}

main()