# auth-api-boilerplate

Boiler plate using Express, MongoDb, passport, passport-jwt for signup, passport-local for signin. Auth'd routes. 
Passwords stored as Hashs using bcrypt. 

Note that the secret for bcrypt is stored in a config file that you will have to create and give the key secret as it is referenced as config.secret in the user model. module.exports = { secret: 'a string of your secret' }. Then require in as const config = require('./config')
