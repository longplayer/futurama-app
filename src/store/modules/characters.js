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
  initState: async ({ commit, state }) => {
    // With persistent data, length will not equal to 0
    // because  the iniState has already been executed
    if (state.characters.length === 0) {
      const data = await CharacterService.getCharacterAll()
      commit('SET_CHARACTERS', data.data)
    }
  },
  setSelected: ({ commit }, payload) => {
    commit('SET_SELECTED', payload)
  },
}

export const getters = {
  getCharacters: (state) => state.characters,
  getSelected: (state) => state.selected,
}
