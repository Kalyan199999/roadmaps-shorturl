const express = require('express')

const {
    getUrl,
    postUrl,
    getOriginalUrl,
    update,
    remove
} = require('../controllers/controller')

const router = express.Router()

router.get( '/' , getUrl )
router.post( '/' , postUrl )
router.get( '/original' , getOriginalUrl)
router.patch('/' , update )
router.delete( '/' , remove );

module.exports = router