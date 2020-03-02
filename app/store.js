import Vue from 'vue';
import Vuex from 'vuex';
import {CHANGE_SELECTED, SET_CURRENT_ARTIST_IMG, CHANGE_PAGE, SET_PLAYLISTS_FETCH} from "./mutation-types"
import axios from "axios"
import {TNSPlayer} from "nativescript-audio"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlists: [],
    selectedSong: null, 
    startPlay: false,
    currArtistImg: '', 
    activePage: 'listen', 
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
    }, 
    [SET_PLAYLISTS_FETCH] (state, playlists){
      state.playlists = playlists
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
    }, 
    setAllPlaylists({commit}, playlists){
      commit(SET_PLAYLISTS_FETCH, playlists)
    }
  }
});
