const router = require('express').Router();
const config = require('config');
const axios = require('axios');
const moment = require('moment');

const Controller = require('./controller');

/* Index Page */
router.get('/', async (req, res, next) => {
  const page = {
    title: 'Homepage - Welcome to Rumsan Money Website',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com',
  };
  try {
    let featured = await Controller.getFeatured();
    let popularCategories = await Controller.getPopularCategories();
    popularCategories = await Controller.shuffle(popularCategories);
    let tempArr = featured.map((el) => {
      const { name, sub_head, image } = el;
      const tempObj = { name, sub_head, image };
      return tempObj;
    });
    featured = tempArr;
    tempArr = popularCategories.map((el) => {
      const {
        name, sub_head, image, _id,
      } = el;
      const tempObj = {
        name, sub_head, image, _id,
      };
      return tempObj;
    });
    popularCategories = tempArr;
    res.render('index', {
      page,
      featured,
      popularCategories,
    });
  } catch (error) {
    next(error);
  }
});

/* Loan Page */
router.get('/loan', async (req, res, next) => {
  let { type } = req.query;
  const page = {
    title: 'Loan - Rumsan Money',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com/loan',
  };
  try {
    let products;
    const categories = await Controller.getCategories('Loan');
    categories.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    if (!type) {
      type = categories[Math.floor(Math.random() * categories.length)].name;
    }
    res.render('loan', {
      page,
      categories,
      type,
    });
  } catch (error) {
    next(error);
  }
});

/* Savings Page */
router.get('/savings', async (req, res, next) => {
  let { type } = req.query;
  const page = {
    title: 'Savings - Rumsan Money',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com/savings',
  };
  try {
    let products;
    const categories = await Controller.getCategories('Saving');
    categories.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    if (!type) {
      type = categories[Math.floor(Math.random() * categories.length)].name;
    }
    res.render('savings', {
      page,
      categories,
      type,
    });
  } catch (error) {
    next(error);
  }
});

/* Insurance Page */
router.get('/insurance', async (req, res, next) => {
  let { type } = req.query;
  const page = {
    title: 'Insurance - Rumsan Money',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com/insurance',
  };
  try {
    const categories = await Controller.getCategories('Insurance');
    categories.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    if (!type) {
      type = categories[Math.floor(Math.random() * categories.length)].name;
    }
    res.render('insurance', {
      page,
      categories,
      type,
    });
  } catch (error) {
    next(error);
  }
});

/* Resources Page */
router.get('/resources', async (req, res, next) => {
  const page = {
    title: 'Resources - Rumsan Money',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com/resources',
  };
  try {
    let categories;
    categories = await Controller.getAllCategories();
    res.render('resources', {
      page,
      categories,
    });
  } catch (error) {
    next(error);
  }
});

/* Popular Page */
router.get('/popular', async (req, res) => {
  const page = {
    title: 'Popular Products - Rumsan Money',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com/popular',
  };
  try {
    const products = await Controller.getPopularProducts();
    res.render('popular', {
      page,
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/banks', async (req, res, next) => {
  try {
    const allBanks = await Controller.getAllBanks();
    const page = {
      title: 'Banks - Rumsan Money',
      description: '',
      keywords: '',
      url: 'https://rumsanmoney.com/banks',
    };
    res.render('banks', {
      page,
      banks: allBanks,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/preference', async (req, res, next) => {
  try {
    const page = {
      title: 'Categories You May Like - Rumsan Money',
      description: '',
      keywords: '',
      url: '',
    };
    res.render('preference', {
      page,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/banks/:slug', async (req, res, next) => {
  try {
    const bankSlug = req.params.slug;
    const bankDetail = await Controller.getBankDetail(bankSlug);
    const bankProducts = await Controller.getBankProducts(bankSlug);
    const page = {
      title: `${bankDetail.name} - Rumsan Money`,
      description: '',
      keywords: `${bankDetail.name}`,
      url: `https://rumsanmoney.com/banks/${bankDetail.slug}`,
    };
    res.render('bankDetail', {
      page,
      bank: bankDetail,
      products: bankProducts,
      bankSlug,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/insurance-companies', async (req, res, next) => {
  try {
    const allCompanies = await Controller.getInsuranceCompanies();
    const page = {
      title: 'Insurance Companies - Rumsan Money',
      description: '',
      keywords: '',
      url: 'https://rumsanmoney.com/insurance-companies',
    };
    res.render('insurance-companies', {
      page,
      companies: allCompanies,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/insurance-companies/:slug', async (req, res, next) => {
  try {
    const companySlug = req.params.slug;
    const companyDetail = await Controller.getInsuranceCompanyDetail(companySlug);
    const products = await Controller.getCompanyProducts(companySlug);
    const page = {
      title: `${companyDetail.name} - Rumsan Money`,
      description: '',
      keywords: `${companyDetail.name}`,
      url: `https://rumsanmoney.com/insurance-companies/${companyDetail.slug}`,
    };
    res.render('company-detail', {
      page,
      company: companyDetail,
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/compare', async (req, res, next) => {
  const page = {
    title: 'Compare - Rumsan Money',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com/compare',
  };
  try {
    const productOne = req.query.product_one || null;
    const productTwo = req.query.product_two || null;
    const productThree = req.query.product_three || null;
    const data = [];
    if (productOne) {
      data[0] = productOne;
    }
    if (productTwo) {
      data[1] = productTwo;
    }
    if (productThree) {
      data[2] = productThree;
    }
    const banks = await Controller.getBanks();
    let products = await Controller.getProducts();
    const tempArr = products.map((el) => {
      const {
        name, ptype, description, total_interest, slug, _id, loan_type, interest_rate,
      } = el;
      const tempObj = {
        name, ptype, description, total_interest, slug, _id, loan_type, interest_rate,
      };
      tempObj.name = tempObj.name.trim();
      tempObj.bankinfo = {};
      tempObj.categoryinfo = {};
      tempObj.bankinfo.name = el.bankinfo.name;
      tempObj.bankinfo.logo_url = el.bankinfo.logo_url;
      tempObj.bankinfo.product_url = el.bankinfo.product_url;
      tempObj.bankinfo.slug = el.bankinfo.slug;
      tempObj.categoryinfo.sub_head = el.categoryinfo.sub_head;
      tempObj.updated_at = el.updated_at;

      return tempObj;
    });
    products = tempArr;
    res.render('compare', {
      page,
      data,
      banks,
      products,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/about', async (req, res, next) => {
  const page = {
    title: 'About - Rumsan Money',
    description: '',
    keywords: '',
    url: 'https://rumsanmoney.com/about',
  };
  try {
    res.render('about-us', { page });
  } catch (e) {
    next(e);
  }
});

router.get('/learn/:bank/:product', async (req, res, next) => {
  try {
    let pTitle = req.params.product;
    pTitle = pTitle.split('-').join(' ');
    const prodTitle = Controller.capitalize(pTitle);
    let productsRecommend;

    const pSlug = req.params.product;
    const bSlug = req.params.bank;
    const product = await Controller.getProductsBySlug(bSlug, pSlug);
    if (product.loan_type === 'saving') {
      product.bankinfo.base_rate = 0;
      product.style = 'display:none;';
      productsRecommend = await Controller.getProducts(product.ptype);
      productsRecommend = productsRecommend.filter((el) => el._id !== product._id);
      productsRecommend = await Controller.shuffle(productsRecommend);
      productsRecommend = productsRecommend.slice(0, 4);
    } else {
      productsRecommend = await Controller.getProducts(product.ptype);
      productsRecommend = productsRecommend.filter((el) => el._id !== product._id);
      productsRecommend = await Controller.shuffle(productsRecommend);
      productsRecommend = productsRecommend.slice(0, 4);
    }
    product.updated_at = moment(product.updated_at).format('LL');
    let shortDesc;
    if (product.description) {
      shortDesc = Controller.getShortDesc(product.description);
    } else if (!product.description && product.categoryinfo.extras) {
      shortDesc = Controller.getShortDesc(product.categoryinfo.extras);
    }
    const page = {
      title: `${prodTitle} ` + '-' + ' ' + 'Rumsan Money',
      description: shortDesc || '',
      url: 'https://rumsanmoney.com' + '/' + 'learn' + '/' + `${product.bankinfo.slug}` + '/' + `${product.slug} `,
      image: `${product.bankinfo.product_url} `,
      keywords: `${prodTitle}, ${product.bankinfo.name}, ${product.categoryinfo.name}`,
    };

    const bankName = req.params.bank;
    const productName = req.params.product;
    res.render('learn', {
      page,
      bankName,
      productName,
      product,
      productsRecommend,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/learn-insurance/:companyslug/:productslug', async (req, res, next) => {
  const company = req.params.companyslug;
  const product = req.params.productslug;
  let products = req.params.productslug;
  products = products.split('-').join(' ');
  const prodTitle = Controller.capitalize(products);

  try {
    const insurances = await Controller.getInsurancesBySlug(company, product);
    let productsRecommend = await Controller.getInsurances();
    productsRecommend = productsRecommend.filter((el) => el.categoryinfo.name === insurances.categoryInfo.name);
    productsRecommend = productsRecommend.filter((el) => el._id !== insurances._id);
    productsRecommend = await Controller.shuffle(productsRecommend);
    productsRecommend = productsRecommend.slice(0, 4);

    let shortDesc;
    if (insurances.companyInfo.summary && insurances.companyInfo.summary.length > 0) {
      shortDesc = await Controller.getShortDesc(insurances.companyInfo.summary);
    } else if (insurances.categoryInfo.extras && insurances.categoryInfo.extras) {
      shortDesc = await Controller.getShortDesc(insurances.categoryInfo.extras);
    }
    const page = {
      title: `${prodTitle} ` + '-' + ' ' + 'Rumsan Money',
      description: shortDesc || '',
      url: 'https://rumsanmoney.com' + '/' + 'learn-insurance' + '/' + `${insurances.companyInfo.slug}` + '/' + `${insurances.slug} `,
      image: insurances.companyInfo.longImg ? insurances.companyInfo.longImg : '',
      keywords: `${prodTitle}, ${insurances.companyInfo.name}, ${insurances.categoryInfo.name}`,
    };
    res.render('learn-insurance', {
      page,
      insurances,
      productsRecommend,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/learn-resources/:name', async (req, res, next) => {
  try {
    const category = await Controller.getCategories(req.params.name.replace(/-/g, ' '));
    const categoryTitle = Controller.capitalize(category[0].name);
    let insuranceProducts; let products; let
      tempArr;
    if (category[0].name.includes('Insurance' || 'insurance')) {
      insuranceProducts = await Controller.getInsurances();
      insuranceProducts = insuranceProducts.filter((el) => el.categoryinfo.name === category[0].name);
      tempArr = insuranceProducts.map((el) => {
        const { name, slug, updated_at } = el;
        const tempObj = { name, slug, updated_at };
        tempObj.companyInfo = {};
        tempObj.categoryinfo = {};
        tempObj.companyInfo.name = el.companyInfo.name;
        tempObj.companyInfo.longImg = el.companyInfo.longImg;
        tempObj.companyInfo.slug = el.companyInfo.slug;
        tempObj.categoryinfo.sub_head = el.categoryinfo.sub_head;
        tempObj.categoryinfo.name = el.categoryinfo.name;
        tempObj.type = 'Insurance';
        return tempObj;
      });
      tempArr = await Controller.shuffle(tempArr);
      tempArr = tempArr.slice(0, 4);
    } else {
      products = await Controller.getProducts(category[0].name);
      tempArr = products.map((el) => {
        const {
          name, slug, ptype, loan_type, updated_at,
        } = el;
        const tempObj = {
          name, ptype, slug, loan_type, updated_at,
        };
        tempObj.bankinfo = {};
        tempObj.categoryinfo = {};
        tempObj.bankinfo.name = el.bankinfo.name;
        tempObj.bankinfo.logo_url = el.bankinfo.logo_url;
        tempObj.bankinfo.product_url = el.bankinfo.product_url;
        tempObj.bankinfo.slug = el.bankinfo.slug;
        tempObj.categoryinfo.sub_head = el.categoryinfo.sub_head;

        return tempObj;
      });
      tempArr = await Controller.shuffle(tempArr);
      tempArr = tempArr.slice(0, 4);
    }

    const page = {
      title: `${categoryTitle} - Rumsan Money`,
      description: category[0].sub_head ? category[0].sub_head : '',
      keywords: `${categoryTitle}`,
      url: `https://rumsanmoney.com/learn-resources/${req.params.id}`,
      image: category[0].image,
    };
    res.render('learn-resources', {
      page,
      category: category[0],
      products: tempArr,
    });
  } catch (e) {
    next(e);
  }
});

/* router.get("/apply-now/:bankslug/:productslug", async (req, res, next) => {
  try {
    let productName = req.params.productslug;
    let bankName = req.params.bankslug;
    productName = productName.toUpperCase();
    productName = productName.split("-").join(" ");
    bankName = bankName.toUpperCase();
    bankName = bankName.split("-").join(" ");
    const page = {
      title: `${ bankName.toLowerCase() } ` + "-" + " " + "Rumsan Money",
      description: "",
      keywords: "",
      url: ""
    };
    res.render("apply-now", {
      page,
      bankName,
      productName
    });
  } catch (e) {
    next(e);
  }
}); */

router.get('/contact/:bankslug/:productslug', async (req, res, next) => {
  try {
    let productName = req.params.productslug;
    let bankName = req.params.bankslug;
    productName = productName.toUpperCase();
    productName = productName.split('-').join(' ');
    bankName = bankName.toUpperCase();
    bankName = bankName.split('-').join(' ');
    const bankTitle = Controller.capitalize(bankName);
    const page = {
      title: `Contact ${bankTitle} - Rumsan Money`,
      description: '',
      keywords: ` ${bankName}, ${productName}`,
      url: `https://rumsanmoney.com/contact/${req.params.bankslug}/${req.params.productslug}`,
    };
    res.render('contact', {
      page,
      bankName,
      productName,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  const page = {
    title: 'Search - Rumsan Money',
    description: '',
    keywords: 'search',
    url: 'https://rumsanmoney.com/search',
  };
  try {
    res.render('search', {
      page,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/blogs', async (req, res, next) => {
  const page = {
    title: 'Blogs - Rumsan Money',
    description: '',
    keywords: 'blogs',
    url: 'https://rumsanmoney.com/search',
  };
  try {
    res.render('blogs', { page });
  } catch (e) {
    next(e);
  }
});

router.get('/blogs/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Controller.getBlogsDetail(slug);
    const page = {
      title: `${blog.data[0].name} - Rumsan Money`,
      description: `${blog.data[0].excerpt}`,
      keywords: `blogs, ${blog.data[0].name} `,
      url: `https://rumsanmoney.com/blogs/${blog.data[0].slug}`,
      image: `${blog.data[0].image_url}`,
    };
    res.render('blog-detail', { page, blog: blog.data[0] });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
