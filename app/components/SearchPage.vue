<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical" height="100%" backgroundColor="white">
            <AbsoluteLayout >
                <StackLayout width="100%" class="musicpage__search" top="15"> <!-- Search bar -->
                    <StackLayout width="90%">
                        <TextField class="music__search--bar" hint="Search Song Singer" v-model="searchTerm" @returnPress="searchSong" @textChange="searchSong" returnKeyType="Search" />
                    </StackLayout>
                </StackLayout>
                <GridLayout top="60" columns="*" rows="auto" width="100%" height="100%">
                    <RadListView layout="list" orientation="vertical" width="100%" height="100%" v-if="songsFound" for="(song,index) in songsFound" col="0" row="0" paddingLeft="10">
                        <v-template>
                            <GridLayout id="songLayout" columns="auto,*,auto" row="auto" marginTop="30" :class="{'lastItemMargin': index===songs.length-1}"> <!-- Individual Grid -->
                                <GridLayout col="1" row="0" columns="auto,*" class="detailpage__container--content__list--details" marginLeft="20">
                                    <StackLayout col="0" row="0" rowSpan="2" marginRight="20">
                                        <Image :src="song.album.cover_medium" height="60" width="60" borderRadius="50%" />
                                    </StackLayout>
                                    <StackLayout orientation="vertical" col="1" row="0">
                                        <Label :text="song.title"  class="detailpage__container--content__list--title"/>
                                        <Label :text="song.artist.name" class="detailpage__container--content__list--artist"/>
                                    </StackLayout>
                                </GridLayout>
                            </GridLayout> 
                        </v-template>
                    </RadListView>
                    <Label v-if="songsFound && !songsFound.length" class="error-text" text="No results found"/>
                </GridLayout>
            </AbsoluteLayout>
        </ScrollView>
    </Page>
</template>
<script>
import {mapState} from "vuex"
export default {
    data(){
        return {
            searchTerm: '', 
            songs: [], 
            songsFound: null
        }
    }, 
    methods: {
        searchSong: function(){
            console.log("Songs found")
            // console.log(this.songs)
            let songsFound = this.songs.filter(song => {
                return song.title.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
            this.songsFound = songsFound
        }
    }, 
    computed: {
        ...mapState(['playlists'])
    }, 
    created(){
        let songsFromPlaylists = []
        this.playlists.forEach(playlist => {
            let data = playlist.tracks.data;
            data.forEach(song => {
                songsFromPlaylists.push(song)
            })
        })
        this.songs = songsFromPlaylists
    }
}
</script>
<style lang="scss">
.error-text {
    font-size: 20;
    text-align: center;
    margin-top: 25
}
</style>