const express = require('express');
const Router = express.Router();

Router.get('/info', (req, res) => {
    return res.json({
        code: 0,
        num: 1
    })
})

module.exports = Router