import api from './apiServer'

export default {
  getCharacterAll () {
    return api.get('/characters/')
  },
}
