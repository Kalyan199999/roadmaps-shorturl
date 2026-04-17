const express = require('express')

const {
    getUrl,
    postUrl,
    getOriginalUrl,
    update,
    remove,
    getStats
} = require('../controllers/controller')

const router = express.Router()

// get the every record of the table
router.get( '/' , getUrl )

// create the new record of the table
router.post( '/' , postUrl )

// get the original url of the specified short url
router.get( '/original' , getOriginalUrl)

// update the original url of the short url
router.patch('/' , update )

// delete the url
router.delete( '/' , remove );

// get the statics of the url
router.get( '/stats' , getStats);

module.exports = router