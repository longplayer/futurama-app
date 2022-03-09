import CharacterService from '@/services/CharacterService'
import { useStorage } from '@vueuse/core' // useStorage: avoid multiple api calls

export const namespaced = true

export const state = {
  characters: useStorage('characters', []),
  selected: useStorage('selected', []),
}

export const mutations = {
  SET_CHARACTERS: (state, payload) => {
    state.characters = payload
  },
  SET_SELECTED: (state, payload) => {
    state.selected = payload
  },
}

export const actions = {
  initState: ({ commit, state }) => {
    console.log('>Before promise', state.characters)
    return new Promise((resolve, reject) => {
      // With persistent data, length will not equal to 0
      // because  the iniState has already been executed
      if (state.characters.length === 0) {
        return CharacterService.getCharacterAll()
          .then((res) => {
            commit('SET_CHARACTERS', res.data)
            console.log('>After promise', state.characters)
            resolve()
          })
          .catch((error) => {
            console.error('>> API Request Error:', error)
            reject(error)
          })
      }
    })
  },
  setSelected: ({ commit }, payload) => {
    if(typeof payload !== 'undefined') {
      console.log('>commit SET_SELECTED...', payload)
      commit('SET_SELECTED', payload)
    }
  },
}

export const getters = {
  getCharacters: (state) => state.characters,
  getSelected: (state) => state.selected,
}
