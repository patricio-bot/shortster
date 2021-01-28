var express = require('express');
var router = express.Router();
const validUrl = require('valid-url')
const ShortUrl = require('../models/Url')
const customId = require('../helpers/customId')


router.get('/', async (req, res, next) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { title: 'Shortster', shortUrls: shortUrls });
});
router.post('/shortcode', async (req, res) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const long = req.body.longUrl
  let shorten = req.body.shortUrl

  const shortRegEx = /^[a-zA-Z0-9]{4}$/g
  if (!shorten) {
    shorten = customId(6)
  }
  else if (shortRegEx.test(shorten)) {
    shorten = shorten

  } else {
    res.render('error', { message: 'Bad shortcode. Shortcodes must be at least 4 characters long and contain only letters (case sensitive) and numbers.', status: 'Error' })
    return
  }




  if (validUrl.isUri(long)) {
    let url = await ShortUrl.findOne({ long })
    if (url) {
      console.log('url is already');


      res.render('error', { message: 'The url is already in database', status: 'Error' })
      return
    }

    else {
      short = shorten
      url = new ShortUrl({
        long,
        short,
        date: new Date().toLocaleDateString(undefined, options)
      })
      await url.save()

      res.redirect('/')
    }
  }
})
router.get('/stats', (req, res, next) => {

  ShortUrl.findOne({ short: req.query.shortcode })
    .then(oneShortcode => {
      if (!oneShortcode) {
        return res.sendStatus(404)

      }
      res.render("stats", { title: 'Shortster', oneShortcode })
    })
    .catch(next)
})
router.get('/edit', (req, res, next) => {
  ShortUrl.findOne({ _id: req.query.shortcode_id })
    .then(editShort => {
      res.render('edit', { title: 'Shortster', editShort })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/edit', (req, res, next) => {
  ShortUrl.findById(req.query.shortcode_id)
    .then(() => {
      let { name, description } = req.body
      let shortUpdated = { name, description }

      ShortUrl.updateOne({ _id: req.query.shortcode_id }, shortUpdated, { new: true })
        .then(() => {
          res.redirect('/')
        })
        .catch((err) => {
          next(err)
        })
    })
})

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.clicks++
  shortUrl.save()
  res.redirect(shortUrl.long)
})
module.exports = router;
