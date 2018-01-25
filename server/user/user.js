const express = require('express');
const Router = express.Router();

Router.get('/info', (req, res) => {
     return res.json({
        num: 1
    })
})

module.exports = Router