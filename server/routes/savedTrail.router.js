const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { json } = require('express');
const router = express.Router();

// import API Key from .env
const dotenv = require('dotenv');
dotenv.config();

router.get('/', (req, res) => {
    const id = req.user.id;
    console.log('user id is', id);
    pool.query(`SELECT "place_id" FROM "saved_trail" WHERE "user_id" = $1;`, [id])
    .then((result) => {
        console.log('sample place id is', result.rows[0].place_id)
        const placesPromises = [];
        for(row of result.rows) {
            let placeId = row.place_id;
            console.log('place id is', placeId);
            let placePromise = axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_address&key=${process.env.GOOGLE_API_KEY}`)
            placesPromises.push(placePromise);
        }
        Promise.all(placesPromises)
        .then((results) => {
            console.log('result is', results.map((result) => result.data.result));
            
            res.send(results.map((result) => result.data.result))
        })
        .catch((error) => {
            console.log('Error retreiving place data', error);
            res.sendStatus(500);
        })
    })
    .catch((err) => {
        console.log('Error completing GET saved trails query', err);
        res.sendStatus(500);
    });
})

module.exports = router;