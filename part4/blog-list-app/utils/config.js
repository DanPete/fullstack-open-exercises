require('dotenv').config()

const { PORT, TEST_MONGO_URI, NODE_ENV } = process.env
let { MONGO_URI } = process.env

if (NODE_ENV === 'test') {
  MONGO_URI = TEST_MONGO_URI
}

module.exports = {
  PORT,
  MONGO_URI,
}
