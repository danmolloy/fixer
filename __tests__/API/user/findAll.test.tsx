//import prisma from '../client'
import { prismaMock } from '../../../singleton'
import { findUsers } from '../../../pages/api/user/findAll'


test('should mock findUsers', async () => {

  const userArr = [{
    "email": "Daphne38@gmail.com",
    "emailVerified": null, 
    "id": "cl5jlqw1e0057t6u07993b5w1", 
    "image": null, 
    "instrument": "Trumpet", 
    "isFixer": null, 
    "name": "Ollie McLaughlin", 
    "profileInfo": null
  }]
  
  prismaMock.user.findMany.mockResolvedValue(userArr)

  await expect(findUsers()).resolves.toEqual(userArr)
  
})