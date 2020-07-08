const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { json } = require('express');
const router = express.Router();

// import API Key from .env
const dotenv = require('dotenv');
dotenv.config();
console.log('API Key', process.env.GOOGLE_API_KEY);

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('search query is', req.query.q);
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?input=${req.query.q}&type=park&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => {
            
            res.send(response.data);
        })
        .catch(error => {
            console.log('error on get', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;