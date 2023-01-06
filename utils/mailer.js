const config = require('config');
const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const { nextTick } = require('process');
const { default: axios } = require('axios');

const appUrl = config.get('app.url');
handlebars.registerHelper('host_url', () => appUrl);
const Templates = {
  loanReport: {
    from: 'Rumsan Money<raktim@rumsan.com>',
    subject: 'Loan Submission Report!',
    html: `${__dirname}/../public/templates/loanReport.htm`,
  },
};

class Mailer {
  getTemplate(name) {
    return Templates[name];
  }

  getHtmlBody(name, data) {
    const template = this.getTemplate(name);
    if (!template) return null;
    const text = fs.readFileSync(template.html, { encoding: 'utf-8' });
    const hTemplate = handlebars.compile(text);
    return hTemplate(data);
  }

  async main(payload) {
    try {
      const templates = this.getTemplate(payload.template);
      if (!templates) throw new Error('No template is defined');
      if (payload.subject) {
        templates.subject = payload.subject;
      }
      const { template, token, ...rest } = payload;
      const report = this.getHtmlBody(payload.template, rest);
      const options = { format: 'A4' };
      const reportDate = Date.now();
      pdf
        .create(report, options)
        .toFile(
          `__dirname +/../public/reports/${reportDate}.pdf`,
          (err, res) => {
            if (err) throw new Error('PDF Generation Failed');
            return res;
          },
        );
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'raktim@rumsan.com',
          pass: 'cvmxdibcznyldavi',
        },
      });
      const fileName = `${__dirname}/../public/reports/${reportDate}.pdf`;
      const reportName = fileName.split('reports/')[1];
      const mailOptions = {
        from: 'Rumsan Money',
        to: 'bibek.khadka@rumsan.com',
        subject: 'Apply Now Form Details For Loan',
        attachments: [
          {
            filename: reportName,
            path: fileName,
          },
        ],
      };
      setTimeout(async () => {
        const mailSender = await transporter.sendMail(mailOptions);
        if (mailSender) {
          fs.unlink(fileName, (err) => {
            if (err) console.log(err);
          });
        }
      }, 3000);

      return '<p>Your Application Has Been Succesfully Sent!</p>';
    } catch (e) {
      return e;
    }
  }

  async userInfo(payload) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'raktim@rumsan.com',
          pass: 'cvmxdibcznyldavi',
        },
      });
      const mailOptions = {
        from: 'Rumsan Money',
        to: 'bibek.khadka@rumsan.com',
        subject: 'Apply Now Form Details For Loan',
        html: `<h2> Loan Apply Form : ${payload.product_name} by ${payload.bank_name} </h2><br/><h2>Full Name: </h2>${payload.full_name}<br/><h2>Phone:</h2> ${payload.phone}<br/><h2>Email:</h2> ${payload.email}`,
      };
      await transporter.sendMail(mailOptions);
      return '<p>Your Application Has Been Succesfully Sent!</p>';
    } catch (e) {
      return e;
    }
  }

  async bankContact(payload) {
    const { token, ...data } = payload;
    const url = config.get('api.baseUrl') + config.get('api.requests');
    if (data.cookieName) {
      const existingUser = await this.getCookieFromAdmin(data);
      if (existingUser) {
        await this.updateUserUsingContactForm(data.cookieName, data.phone);
      }
    }
    try {
      const result = await axios.post(url, data);
      if (result) {
        return { status: 200, message: 'User information received successfully!' };
      }
      return { status: 500, message: 'Oops, Something went wrong!' };
    } catch (e) {
      console.log(e);
    }
  }

  async getCookieFromAdmin(data) {
    const { cookieName, ...rest } = data;
    const url = `${config.get('api.baseUrl') + config.get('api.cookies')}/${cookieName}`;
    return axios(url);
  }

  async updateUserUsingContactForm(cookieName, username) {
    const data = { username };
    const url = `${config.get('api.baseUrl') + config.get('api.cookies')}/${cookieName}`;
    return axios.patch(url, data);
  }
}

module.exports = new Mailer();
