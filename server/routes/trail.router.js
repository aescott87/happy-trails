const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { json } = require('express');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('search query is', req.query);
    let config = {
        headers: {
            apikey: "68b18cb0-84ef-458d-b149-41eebe912d2c",
            accept: "application/json"
        }
    }
    axios.get(`https://ridb.recreation.gov/api/v1/facilities?query=${req.query.q}&limit=15&offset=0&full=false&state=MN&radius=20&activity=14,100066,100076&sort=name`, config)
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