import Vue from 'vue';
import Vuex from 'vuex';
import {CHANGE_SELECTED, SET_CURRENT_ARTIST_IMG, CHANGE_PAGE} from "./mutation-types"
import axios from "axios"
import {TNSPlayer} from "nativescript-audio"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedSong: null, 
    startPlay: false,
    currArtistImg: '', 
    activePage: 'settings', 
    player: new TNSPlayer()
  },
  mutations: {
    [CHANGE_SELECTED] (state, songObj){
      state.selectedSong = songObj
      state.startPlay = true
    },
    [SET_CURRENT_ARTIST_IMG] (state, currArtist){
      state.currArtistImg = currArtist.picture_medium
    }, 
    [CHANGE_PAGE] (state, page){
      state.activePage = page
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
    }, 
    changeActivePage({commit}, page){
      commit(CHANGE_PAGE, page)
    }
  }
});
