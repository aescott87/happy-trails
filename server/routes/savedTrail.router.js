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
    pool.query(`SELECT "place_id", "notes" FROM "saved_trail" WHERE "user_id" = $1;`, [id])
    .then((databaseResult) => {
        console.log('sample place id is', databaseResult.rows[0].place_id)
        const placesPromises = [];
        for(row of databaseResult.rows) {
            let placeId = row.place_id;
            let placePromise = axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_address,photo,place_id&key=${process.env.GOOGLE_API_KEY}`)
            placesPromises.push(placePromise);
        }
        Promise.all(placesPromises)
        .then((placesResults) => {
            placesResults = placesResults.map((placesResult) => placesResult.data.result);
            const placesAndNotesResults = placesResults.map((placesResult) => {
                const matchingRow = databaseResult.rows.find((row) => (placesResult.place_id === row.place_id))
                return {...placesResult, notes: matchingRow.notes};
            })
            res.send(placesAndNotesResults)
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

router.put('/', (req, res) => {
    const placeId = req.body.id;
    const notes = req.body.notes;
    const user = req.user.id;
    console.log('The place id and user id are', placeId, ' and ', user);
    pool.query(`UPDATE "saved_trail" SET "notes" = $1 WHERE "place_id" = $2 AND "user_id" = $3;`, [notes, placeId, user])
    .then((response) => {
        console.log('Notes update successful!');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error updating trail notes', error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    const placeId = req.params.id;
    const user = req.user.id;
    pool.query(`DELETE FROM "saved_trail" WHERE "place_id" = $1 AND "user_id" = $2;`, [placeId, user])
    .then((response) => {
        console.log('Trail deleted successfully!');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error deleting trail', error);
        res.sendStatus(500);
    })
})

module.exports = router;