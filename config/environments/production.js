const nconf = require('nconf');

nconf.set('DATABASE_CONFIG', {
  URL: 'https://abtest-7a0da.firebaseio.com',
  SERVICE_ACCOUNT: 'ABTest-c0decc209c7c.json',
  LOGGING_ENABLE: false,
  PERSISTENCE_ENABLED : true
});

nconf.set('NODE_PORT',3000);
