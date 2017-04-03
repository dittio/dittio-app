
// =====================================================
// IMPORTED ENVIRONMENT VARIABLES ======================
// =====================================================
const {
  NODE_ENV,
  PORT,
  SESSION_SECRET,
  
  FB_apiKey: apiKey,
  FB_authDomain: authDomain,
  FB_databaseURL: databaseURL,
  FB_projectId: projectId,
  FB_storageBucket: storageBucket,
  FB_messagingSenderId: messagingSenderId,

  FSAK_type: type,
  FSAK_project_id: project_id,
  FSAK_private_key: private_key,
  FSAK_client_email: client_email,
  FSAK_client_id: client_id,
  FSAK_auth_uri: auth_uri,
  FSAK_token_uri: token_uri,
  FSAK_auth_provider: auth_provider,
  FSAK_auth_provider_x509_cert_url: auth_provider_x509_cert_url,
  FSAK_client_x509_cert_url: client_x509_cert_url,
} = process.env;


// =====================================================
// EXPORTED CONFIG OBJECT - reference within source code
// =====================================================
module.exports = {
  NODE_ENV,
  PORT: PORT || 3000,
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379/0',
  PG_CONFIG: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    database: process.env.PG_DB,
    port: process.env.PG_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
  },
  SESSION_SECRET,
  FB_CONFIG: {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
  },
  SERVICE_ACCOUNT_KEY: {
    type,
    project_id,
    private_key,
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
  },
};
