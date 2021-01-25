var express = require('express');
var router = express.Router();
const ShortUrl = require('../models/Url')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { title: 'Shortster', shortUrls: shortUrls });
});
router.post('/shortcode', async (req, res) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  await ShortUrl.create({ long: req.body.longUrl, date: new Date().toLocaleDateString(undefined, options) })

  res.redirect('/')
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
  ShortUrl.findOne({ short: req.query.shortcode })
    .then(editShort => {
      res.render('edit', { title: 'Shortster', editShort })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/edit', (req, res, next) => {
  ShortUrl.findOne({ short: req.query.shortcode })
    .then(() => {
      let { name, description } = req.body
      let shortUpdated = { name, description }

      ShortUrl.updateOne({ short: req.query.shortcode }, shortUpdated, { new: true })
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
