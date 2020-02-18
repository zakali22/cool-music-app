import Vue from 'vue';
import Vuex from 'vuex';
import {CHANGE_SELECTED, SET_CURRENT_ARTIST_IMG} from "./mutation-types"
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedSong: null, 
    currArtistImg: ''
  },
  mutations: {
    [CHANGE_SELECTED] (state, songObj){
      state.selectedSong = songObj
    },
    [SET_CURRENT_ARTIST_IMG] (state, currArtist){
      state.currArtistImg = currArtist.picture_medium
    }
  },
  actions: {
    selectSong({dispatch, commit}, songObj){
      commit(CHANGE_SELECTED, songObj);
      dispatch('getCurrentArtistImage')
    }, 
    async getCurrentArtistImage({commit, state}){
      const result = await axios.get(`https://api.deezer.com/artist/${state.selectedSong.artist.id}`)
      commit(SET_CURRENT_ARTIST_IMG, result.data)
    }
  }
});
