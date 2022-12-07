const request = require('supertest');
const api = require('../src/api');
const { mongoConnect, 
    mongoDisconnect,
} = require('../src/services/mongo');

// supertest will call listen function on api

const data = {
  googleId: "103819164206813002244",
  change: "localWins"
};

const addStat = async () => {
  await request(api)
          .post('/stat/updateStats')
          .send(data)
          .expect(201)
};

describe('Test GET /stat/getStats/:id', () => {

    beforeAll(async () => {
        await mongoConnect();
        
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    test('It should respond with 200 success', async () => {
        await addStat();
        const response = await request(api)
          .get('/stat/getStats/107690329016216797536')
          .expect('Content-Type', /json/) // headers have content-type containing json
          .expect(200)
          .then((response) => {
            console.log(' in get response', response.body)
          });
    });
    test('It should catch missing required properties', async () => {
        const response = await request(api)
        .get('/stat/getStats/fakeId')
        .expect(404)
        
     });
    
})

describe('Test POST /stat/updateStats', () => {
   

    const dataWOChange = {
        googleId: "103819164206813002244",
        change: ""
    }

    const dataWOGoogleId = {
        googleId: "",
        change: "localWins"
    };

    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    test('It should respond with 201 success', async () => {
       
        const response = await request(api)
          .post('/stat/updateStats')
          .send(data)
          .expect(201)
          .expect('Content-Type', /json/) 
          .then((response) => {
            expect(response.body).toHaveProperty('googleId', data.googleId);
            expect(response.body).toHaveProperty(data.change);
            console.log('post response', response.body, 'data', data);
          })
          
         
    });

    test('It should catch missing change', async () => {
        
         const response = await request(api)
           .post('/stat/updateStats')
           .send(dataWOChange)
           .expect(404)
           .then((response) => {
             console.log('post response', response.body, 'data', data)
           })
    });
    
    test('It should catch missing googleId', async () => {
        
         const response = await request(api)
           .post('/stat/updateStats')
           .send(dataWOGoogleId)
           .expect(404)
           .then((response) => {
             console.log('post response', response.body, 'data', data)
           })
    });
})