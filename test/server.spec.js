const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({path:'.env.test.local'});

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.DB_MONGO);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await User.deleteOne({name:"Test"});
  await mongoose.connection.close();
});

describe('POST /api/user', () => {

  describe('given name, email and a 6 length password', () => {
    const TestUser = {
      name:"Test",
      email: "test@test.com",
      password:"Test123456"
    }
  
    test('should respond with a 200 status code', async () => {
      const response = await request(server).post('/api/users').send(TestUser)
      expect(response.statusCode).toBe(200)

     })

    test('should have a Content-Type: application/json header', async () => {
      const response = await request(server).post('/api/users').send(TestUser)
      expect(response.headers['content-type']).toMatch(/json/);
      
     })

  })

  describe('when name, email or password are missing', () => {
    const TestFields = [
      {name:"Test"},
      {email:"test@email.com"},
      {name:"Test",password:"test@email.com"}

    ]

    for (const TestUSer of TestFields) {
      test('should respond with a 400 status code', async () => {
        const response = await request(server).post('/api/users').send(TestUSer)
        expect(response.statusCode).toBe(400)
  
       })
      
    }

  })  

})
