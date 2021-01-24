var express = require('express');
var router = express.Router();
const ShortUrl = require('../models/Url')
/* GET home page. */
router.get('/', async (req, res, next) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { title: 'Shortster', shortUrls: shortUrls });
});
router.post('/shortcode', async (req, res) => {
  await ShortUrl.create({ long: req.body.longUrl })
  res.redirect('/')
})
module.exports = router;
