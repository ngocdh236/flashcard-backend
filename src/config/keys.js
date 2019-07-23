const { keysProd } = require('./keys_prod')
const { keysDev } = require('./keys_dev')

exports.keys = process.env.NODE_ENV === 'production' ? keysProd : keysDev
