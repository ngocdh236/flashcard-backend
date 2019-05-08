import keysProd from './keys_prod'
import keysDev from './keys_dev'

const keys = process.env.NODE_ENV === 'production' ? keysProd : keysDev

export default keys
