const request = require('supertest');
const api = require('../src/api');
const { mongoConnect, 
    mongoDisconnect,
} = require('../src/services/mongo');

// supertest will call listen function on api

describe('Test GET /stat/getStats/:id', () => {

    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    test('It should respond with 200 success', async () => {
        const response = await request(api)
          .get('/stat/getStats/107690329016216797536')
          .expect('Content-Type', /json/) // headers have content-type containing json
          .expect(200)
          .then((response) => {
            console.log(' in get response', response.body)
          });
    });
    test('It should catch missing required properties', () => {

    });
})

describe('Test POST /stat/updateStats', () => {

    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    test('It should respond with 201 success', async () => {
        const data = {
           googleId: "103819164206813002244",
           change: "localWins"
          }
        const response = await request(api)
          .post('/stat/updateStats')
          .send(data)
          .then((response) => {
            console.log('post response', response.body, 'data', data)
          })
          //.expect(201);
    });
    test('It should catch missing required properties', () => {
        
    })
})