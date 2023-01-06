const config = require('config');
const axios = require('axios');
const qs = require('query-string');
const GSheet = require('../services/gsheet');

class Controller {
  async getAllData(bankName, productType, productName) {
    try {
      let data = await GSheet.getData();
      if (bankName) {
        data = data.filter((el) => el.bank_name === bankName);
      }
      if (productType) {
        data = data.filter((el) => el.product_type === productType);
      }
      if (productName) {
        data = data.filter((el) => el.product_name === productName);
      }
      return data;
    } catch (error) {
      return { msg: error };
    }
  }

  async getLookup() {
    try {
      const data = await GSheet.getLookup();
      return data;
    } catch (error) {
      return { msg: error };
    }
  }

  async getAllLoanType(type) {
    try {
      const data = await GSheet.getLookup();
      const finalData = [];
      const objData = {};
      if (type) {
        data = data.filter((el) => {
          el.account_type === type;
        });
        data.forEach((el) => {
          objData.account_type = el.account_type;
          finalData.push(objData);
        });
      } else {
        data.forEach((el) => {
          objData.account_type = el.account_type;
          finalData.push(objData);
        });
      }
      return data;
    } catch (error) {
      return { msg: error };
    }
  }

  async compareBanks(bankOne, bankTwo, bankThree) {
    try {
      const allData = await this.getAllData();
      const data = [];
      if (bankOne) {
        const bankOneDetails = allData.filter((el) => el.bank_id === bankOne);
        data.push(bankOneDetails[0]);
      }
      if (bankTwo) {
        const bankTwoDetails = allData.filter((el) => el.bank_id === bankTwo);
        data.push(bankTwoDetails[0]);
      }
      if (bankThree) {
        const bankThreeDetails = allData.filter((el) => el.bank_id === bankThree);
        data.push(bankThreeDetails[0]);
      }
      return data;
    } catch (error) {
      return { msg: error };
    }
  }

  async getCategories(name) {
    let categories;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.categories')}/?name=${name}&limit=90&status=true`,
      )
      .then((data) => {
        categories = data.data.data;
      })
      .catch((e) => console.log(e));
    return categories;
  }

  async getCategoriesByID(id) {
    let category;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.categories')}/${id}`,
      )
      .then((data) => {
        category = data.data;
      })
      .catch((e) => console.log(e));
    return category;
  }

  async getBanks() {
    let banks;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.banks')}/web?&limit=80`,
      )
      .then((data) => {
        banks = data.data.data;
      })
      .catch((e) => console.log(e));
    return banks;
  }

  async getBankProducts(slug) {
    let products;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.banks')}/${slug}/products`,
      )
      .then((data) => {
        products = data.data.data;
      })
      .catch((e) => console.log(e));
    return products;
  }

  async getCompanyProducts(slug) {
    let products;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.companies')}/${slug}/products`,
      )
      .then((data) => {
        products = data.data.data;
      })
      .catch((e) => console.log(e));
    return products;
  }

  async getProducts(type) {
    let products;
    if (type) {
      await axios
        .get(
          `${config.get('api.baseUrl')}${config.get('api.products')}?type=${type}&limit=2000`,
        )
        .then((data) => {
          products = data.data.data;
        })
        .catch((e) => console.log(e));
    } else {
      await axios
        .get(
          `${config.get('api.baseUrl')}${config.get('api.products')}?&limit=2000`,
        )
        .then((data) => {
          products = data.data.data;
        })
        .catch((e) => console.log(e));
    }

    return products;
  }

  async getFeatured() {
    let featured;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.categories')}?type=featured&limit=5&status=true`,
      )
      .then((data) => {
        featured = data.data.data;
      })
      .catch((e) => console.log(e));
    return featured;
  }

  async getPopularCategories() {
    let popularCategories;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.categories')}?type=popular&limit=6&status=true`,
      )
      .then((data) => {
        popularCategories = data.data.data;
      })
      .catch((e) => console.log(e));
    return popularCategories;
  }

  async getPopularProducts() {
    let products;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.featured')}`,
      )
      .then((data) => {
        products = data.data;
      })
      .catch((e) => console.log(e));
    return products;
  }

  async getAllCategories() {
    let allCategories;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.categories')}?limit=20&status=true`,
      )
      .then((data) => {
        allCategories = data.data.data;
      })
      .catch((e) => console.log(e));
    return allCategories;
  }

  async shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  async getInsurances() {
    let insurances;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.insurances')}?limit=500`,
      )
      .then((data) => {
        insurances = data.data.data;
      })
      .catch((e) => console.log(e));
    return insurances;
  }

  async getInsurancesBySlug(companySlug, productSlug) {
    let insurances;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.insurances')}/slug/${companySlug}/${productSlug}`,
      )
      .then((data) => {
        insurances = data.data;
      })
      .catch((e) => console.log(e));
    return insurances;
  }

  async getInsuranceCompanies() {
    let companies;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.companies')}?limit=1000`,
      )
      .then((data) => {
        companies = data.data.data;
      })
      .catch((e) => console.log(e));
    return companies;
  }

  async getInsuranceCompanyDetail(companySlug) {
    let companyInfo;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.companies')}/slug/${companySlug}`,
      )
      .then((data) => {
        companyInfo = data.data;
      })
      .catch((e) => console.log(e));
    return companyInfo;
  }

  async getProductsBySlug(bankSlug, productSlug) {
    let products;
    await axios
      .get(`${config.get('api.baseUrl')}${config.get('api.products')}/slug/${bankSlug}/${productSlug}`)
      .then((data) => {
        products = data.data;
      })
      .catch((e) => console.log(e));
    return products;
  }

  async getAllBanks() {
    let allBanks;
    await axios
      .get(
        `${config.get('api.baseUrl')}${config.get('api.banks')}?limit=1000`,
      )
      .then((data) => {
        allBanks = data.data.data;
      })
      .catch((e) => console.log(e));
    return allBanks;
  }

  async getBankDetail(bankSlug) {
    let bankInfo;
    await axios
      .get(`${config.get('api.baseUrl')}${config.get('api.banks')}/slug/${bankSlug}`)
      .then((data) => {
        bankInfo = data.data;
      })
      .catch((e) => console.log(e));
    return bankInfo;
  }

  capitalize(input) {
    return input.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  }

  async getCookieByName(name) {
    let cookie;
    await axios
      .get(`${config.get('api.baseUrl')}${config.get('api.cookies')}/${name}`)
      .then(((data) => {
        cookie = data.data;
      }))
      .catch((e) => console.log(e));
    return cookie;
  }

  async updatePreference(cookieName, preference) {
    preference = JSON.parse(preference);
    await axios({
      method: 'post',
      url: `${config.get('api.baseUrl')}${config.get('api.cookies')}/${cookieName}`,
      data: { data: preference },
    })
      .then(((data) => {
        data;
      }))
      .catch((e) => console.log(e));
    return data;
  }

  async getPrefferedCategories(payload) {
    payload = JSON.parse(payload);
    let prefferedCategory;
    await axios({
      method: 'get',
      url: `${config.get('api.baseUrl')}${config.get('api.categories')}${config.get('api.preference')}`,
      data: { data: payload },
    })
      .then(((data) => {
        prefferedCategory = data.data;
      }))
      .catch((e) => console.log(e));
    return prefferedCategory;
  }

  async addCookie(payload) {
    let cookie;
    // console.log(payload);
    await axios({
      method: 'post',
      url: `${config.get('api.baseUrl')}${config.get('api.cookies')}`,
      data: payload,
    })
      .then(((data) => {
        cookie = data;
      }))
      .catch((e) => console.log(e));
    return cookie;
  }

  async addHistory(payload) {
    let history;
    await axios({
      method: 'post',
      url: `${config.get('api.baseUrl')}${config.get('api.histories')}`,
      data: payload,
    })
      .then(((data) => {
        history = data;
      }))
      .catch((e) => console.log(e));
    return history;
  }

  async getResources(start) {
    const data = await axios({
      method: 'get',
      url: `${config.get('api.baseUrl')}${config.get('api.categories')}?start=${start}&status=true`,
    })
      .then((d) => d)
      .catch((e) => console.log(e));
    return data;
  }

  async getBankDetailsProducts(slug, start) {
    const data = await axios({
      method: 'get',
      url: `${config.get('api.baseUrl')}${config.get('api.banks')}/${slug}/products?start=${start}`,
    })
      .then((d) => d)
      .catch((e) => console.log(e));
    return data;
  }

  async getcompanyDetailsProducts(slug, start) {
    const data = await axios({
      method: 'get',
      url: `${config.get('api.baseUrl')}${config.get('api.companies')}/${slug}/products?start=${start}`,
    })
      .then((d) => d)
      .catch((e) => console.log(e));
    return data;
  }

  getShortDesc(desc) {
    const regex = /.*?(\.)(?=\s[A-Z])/;
    // replace html tags
    let str = desc.replace(new RegExp('<[^>]*>', 'g'), '');
    // replace &nbsp
    str = str.replace(new RegExp('&nbsp;', 'g'), ' ');
    let m;
    let shortDesc;
    if ((m = regex.exec(str)) !== null) {
      shortDesc = m[0];
    }
    return shortDesc;
  }

  async getLSIProducts({
    start, limit, ptype, type,
  }) {
    let data;
    if (type === 'insurance') {
      data = await axios({
        method: 'get',
        url: `${config.get('api.baseUrl')}${config.get('api.insurances')}?start=${start}&limit=${limit}&categoryslug=${ptype}`,
      })
        .then((d) => d)
        .catch((e) => console.log(e));
    } else {
      data = await axios({
        method: 'get',
        url: `${config.get('api.baseUrl')}${config.get('api.products')}?start=${start}&limit=${limit}&type=${type}&ptype=${ptype}`,
      })
        .then((d) => d)
        .catch((e) => console.log(e));
    }

    return data.data;
  }

  async getProductsById(id) {
    const data = await axios({
      method: 'get',
      url: `${config.get('api.baseUrl')}${config.get('api.products')}/${id}`,
    })
      .then((d) => d)
      .catch((e) => console.log(e));
    return data.data;
  }

  async getBlogs(query) {
    const data = await axios({
      method: 'get',
      url: `${config.get('api.baseUrl')}${config.get('api.blogs')}?${qs.stringify(query)}`,
    })
      .then((d) => d)
      .catch((e) => console.log(e));
    return data.data;
  }

  async getBlogsDetail(slug) {
    const query = { slug };
    const data = await axios({
      method: 'get',
      url: `${config.get('api.baseUrl')}${config.get('api.blogs')}?${qs.stringify(query)}`,
    })
      .then((d) => d)
      .catch((e) => console.log(e));
    return data.data;
  }
}
module.exports = new Controller();
