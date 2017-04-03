const kue = require('kue');
const helper = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const { REDIS_URL } = require('../config');

const queue = kue.createQueue({
  redis: REDIS_URL,
});
const subject = 'Hello from Dittio!';

module.exports = () => {
  queue.process('contact', (job, done) => {
    setTimeout(() => {
      const from_email = new helper.Email(job.data.from);
      const to_email = new helper.Email(job.data.email);
      const content = new helper.Content('text/plain', job.data.message);
      const mail = new helper.Mail(from_email, subject, to_email, content);

      const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, (err, res) => {
        if (err) {
          console.error(err);
          return done(new Error(err));
        }
        done();
      });
    }, 2000);
  });
};
