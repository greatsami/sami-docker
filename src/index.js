const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const os = require('os');
// const { Pool, Client } = require('pg');

// init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect redis
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis...'));
redisClient.connect();

// connect postgres db
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_HOST = 'postgres';
// const DB_PORT = 5432;
// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
//  
// const client = new Client({
//   connectionString: URI,
// });
// client.connect()
//     .then(() => console.log('connected to postgres db...'))
//     .catch((err) => console.log('Failed to connect to postgres db: ', err));


// connect mongo_db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'mongo';
const DB_PORT = 27017;
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI)
    .then(() => console.log('connected to db...'))
    .catch((err) => console.log('Failed to connect to db: ', err));


app.get('/', (req, res) => {
    redisClient.set('product', 'products111111')
    console.log(`Traffic from${os.hostname}`);
    res.send(`
        <h1>Hello Great SamiMan! ${process.env.NODE_ENV}</h1>
        <h2>Push to AWS</h2>
        <h3>Using Doker Hub</h3>
        <h4>With watchtower</h4>
    `);
});

app.get('/data', async (req, res) => {
    const product = await redisClient.get('product');
    console.log(`Traffic from${os.hostname}`);
    res.send(`<h2>${product}</h2>`)
});

app.listen(PORT, () => console.log(`app is up and running on port ${PORT}`));