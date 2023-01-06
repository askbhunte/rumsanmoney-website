const router = require('express').Router();
const axios = require('axios');
const Controller = require('./controller');
const mailer = require('../utils/mailer');

router.get('/all-data', async (req, res, next) => {
  try {
    const bank = req.query.bank || null;
    const type = req.query.type || null;
    const productName = req.query.productName || null;
    const data = await Controller.getAllData(bank, type, productName);
    res.json(data);
  } catch (e) {
    next(e);
  }
});

router.get('/loan-type', async (req, res, next) => {
  try {
    const type = req.query.type || null;
    const data = await Controller.getAllLoanType(type);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/bank-names', async (req, res, next) => {
  try {
    const data = await Controller.getLookup();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/apply-now-submit', async (req, res, next) => {
  try {
    const url = `${'https://www.google.com/recaptcha/api/siteverify?secret=6LfVxswUAAAAAI18X1Tpnu0U1TnCLjKXpXyde-qi&response='}${
      req.body.token
    }`;
    const recaptcha = await axios.post(url);
    if (recaptcha.data.success && recaptcha.data.score > 0.1) {
      req.body.template = 'loanReport';
      await mailer
        .main(req.body)
        .then((d) => {
          res.json(d);
        })
        .catch((e) => next(e));
    }
  } catch (e) {
    res
      .status(500)
      .send('Oops! We encountered an error. Please try again later!');
  }
});
router.post('/apply-now-first-information-submit', async (req, res, next) => {
  try {
    await mailer
      .userInfo(req.body)
      .then((d) => {
        res.json(d);
      })
      .catch((e) => next(e));
  } catch (e) {
    res
      .status(500)
      .send('Oops! We encountered an error. Please try again later!');
  }
});

router.post('/contact-bank-form-submit', async (req, res, next) => {
  try {
    const url = `${'https://www.google.com/recaptcha/api/siteverify?secret=6LfVxswUAAAAAI18X1Tpnu0U1TnCLjKXpXyde-qi&response='}${req.body.token}`;
    try {
      const recaptcha = await axios.post(url);
      if (recaptcha.data.success && recaptcha.data.score >= 0.1) {
        const response = await mailer.bankContact(req.body);
        if (response) {
          res
            .status(200)
            .send(
              'Thanks, We have recieved your form. We will get back to you shortly',
            );
        }
      }
    } catch (e) {
      console.log('recaptcha Error', e);
    }
  } catch (e) {
    res
      .status(500)
      .send('Oops! We encountered an error. Please try again later!');
  }
});

router.post('/cookie/:name', async (req, res, next) => {
  try {
    const preference = await Controller.updatePreference(req.params.name, req.body.data);
    res.json(preference);
  } catch (e) {
    next(e);
  }
});

router.post('/categories/preference', async (req, res, next) => {
  try {
    const prefferedCategories = await Controller.getPrefferedCategories(req.body.data);
    res.json(prefferedCategories);
  } catch (e) {
    next(e);
  }
});

router.get('/cookie/:name', async (req, res, next) => {
  try {
    const cookie = await Controller.getCookieByName(req.params.name);
    res.json(cookie);
  } catch (e) {
    next(e);
  }
});

router.post('/cookie', async (req, res, next) => {
  try {
    req.body.ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.device = req.headers['user-agent'];
    req.body.referral = req.headers.referer;
    if (req.body.device.search(new RegExp(/googlebot/, 'gi')) !== -1) {
      res.json();
    } else {
      const cookie = await Controller.addCookie(req.body);
      res.json(cookie.data);
    }
  } catch (e) {
    next(e);
  }
});

router.post('/history', async (req, res, next) => {
  try {
    const history = await Controller.addHistory(req.body);
    res.json(history.data);
  } catch (e) {
    next(e);
  }
});

router.get('/resources', async (req, res, next) => {
  try {
    const data = await Controller.getResources(req.query.start);
    res.json(data.data);
  } catch (e) {
    next(e);
  }
});

router.get('/banks', async (req, res, next) => {
  try {
    const data = await Controller.getBankDetailsProducts(req.query.slug, req.query.start);
    res.json(data.data);
  } catch (e) {
    next(e);
  }
});

router.get('/companies', async (req, res, next) => {
  try {
    const data = await Controller.getcompanyDetailsProducts(req.query.slug, req.query.start);
    res.json(data.data);
  } catch (e) {
    next(e);
  }
});

router.get('/products', async (req, res, next) => {
  try {
    const start = req.query.start || null;
    const limit = req.query.limit || null;
    const type = req.query.type || null;
    const ptype = req.query.ptype || null;

    let data;

    if (type === 'insurance') {
      data = await Controller.getLSIProducts({
        start, limit, type, ptype,
      });
    } else {
      data = await Controller.getLSIProducts({
        start, limit, type, ptype,
      });
    }

    res.json(data);
  } catch (e) {
    next(e);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    data = await Controller.getProductsById(req.params.id);
    res.json(data);
  } catch (e) {
    next(e);
  }
});

router.get('/blogs', async (req, res, next) => {
  try {
    data = await Controller.getBlogs({ start: req.query.start, limit: req.query.limit });
    res.json(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
