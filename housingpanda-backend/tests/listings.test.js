const request = require('supertest');
const express = require('express');
const listingsRouter = require('../routes/listings');

const app = express();
app.use(express.json());
app.use('/listings', listingsRouter);

describe('HousingPanda API Tests', () => {
  it('should create a new listing', async () => {
    const res = await request(app)
      .post('/listings')
      .send({
        title: "Veritas Village Apartment",
        description: "Located near the University of Wisconsin-Madison campus, our apartments provide comfort.",
        rent: 2800,
        address: "110 N Livingston StMadison, WI 53703",
        rooms: 1,
        contact_info: "songkeke702@gmail.com"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("Listing added successfully!");
  });

  it('should return an array of listings', async () => {
    const res = await request(app).get('/listings');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

const connection = require('../models/index');

afterAll(() => {
  connection.end();
});
