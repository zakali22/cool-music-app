<template>
    <Page actionBarHidden="true" class="detailpage" @navigatedTo="onLoad"> 
        <ScrollView orientation="vertical" scrollBarIndicatorVisible="true">
            <DockLayout stretchLastChild="true" class="detailpage__container">
                <AbsoluteLayout height="300" dock="top" class="detailpage__container--header">
                    <StackLayout height="100%" width="100%">
                        <Image :src="pageData.bgImg" stretch="aspectFill"/>
                    </StackLayout>
                    <StackLayout paddingRight="20" paddingLeft="20" top="70">
                        <GridLayout height="100%" width="100%" columns="*,auto" rows="auto" >
                            <FlexboxLayout flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap" paddingRight="20" verticalAlignment="center">
                                <Label col="0" row="0" :text="pageData.title" class="detailpage__container--header__title"  textWrap="true" width="300"/>
                            </FlexboxLayout>
                            <Image col="1" row="0" :src="pageData.artistImg" height="75" width="75" verticalAlignment="center" borderRadius="50%"/>
                        </GridLayout>
                    </StackLayout>
                    <AbsoluteLayout top="218" width="100%">
                        <FlexboxLayout  width="100%" flexDirection="row" :justifyContent="'space-between'" alignItems="center" class="detailpage__container--header__stats">
                            <StackLayout orientation="vertical" v-if="this.type==='playlists'">
                                <SVGImage src="~/assets/images/heart-regular.svg" height="30" width="30"/>
                                <Label :text="pageData.fans"/>
                            </StackLayout>
                            <StackLayout orientation="vertical" v-if="this.type==='playlists'">
                                <SVGImage src="~/assets/images/comment-regular.svg" height="30" width="30" />
                                <Label text="801"/>
                            </StackLayout>
                            <StackLayout orientation="vertical"  v-if="this.type==='playlists'">
                                <SVGImage src="~/assets/images/play-solid.svg" id="playBtn" class="playButton" height="30" width="30"/>
                                <Label :text="`${pageData.duration}m`"/>
                            </StackLayout>
                            <StackLayout orientation="vertical">
                                <SVGImage src="~/assets/images/download-solid.svg" height="30" width="30"/>
                                <Label text="Download"/>
                            </StackLayout>
                        </FlexboxLayout>
                        <StackLayout />
                    </AbsoluteLayout>
                </AbsoluteLayout>
                <StackLayout dock="bottom" marginTop="20" paddingRight="20" paddingLeft="20" class="detailpage__container--content"> <!--Main content -->
                    <FlexboxLayout flexDirection="row" alignItems="center" justifyContent="space-between" class="detailpage__container--content__play">
                        <FlexboxLayout flexDirection="row" alignItems="center">
                            <Image src="~/assets/images/bt1.png" height="35" width="35" marginRight="10"/>
                            <Label :text="`Play All (${Number(pageData.tracksNo)})`" fontSize="17"/>
                        </FlexboxLayout>
                        <SVGImage src="~/assets/images/bars-solid.svg" height="30" width="30"/>
                    </FlexboxLayout>
                    <GridLayout height="100%" rows="*" columns="*">
                         <RadListView col="0" row="0" id="songList" layout="list" height="100%" for="(song, index) in songs"  orientation="vertical" paddingLeft="10" class="detailpage__container--content__list"> <!-- List container -->        
                            <v-template>
                            <GridLayout id="songLayout" columns="auto,*,auto" row="auto" marginTop="30" :class="{'lastItemMargin': index===songs.length-1}" @tap="playSong(index)"> <!-- Individual Grid -->
                                <Label :text="index+1<=9 ? `0${index+1}` : `${index+1}`" col="0" row="0" rowSpan="2" verticalAlignment="center" class="detailpage__container--content__list--number"/>
                                <GridLayout col="1" row="0" columns="auto,*" class="detailpage__container--content__list--details" marginLeft="20">
                                    <StackLayout col="0" row="0" rowSpan="2" marginRight="20">
                                        <Image :src="song.album.cover_medium" height="60" width="60" borderRadius="50%" />
                                    </StackLayout>
                                    <StackLayout orientation="vertical" col="1" row="0">
                                        <Label :text="song.title"  class="detailpage__container--content__list--title"/>
                                        <Label :text="song.artist.name" class="detailpage__container--content__list--artist"/>
                                    </StackLayout>
                                </GridLayout>
                                <SVGImage src="~/assets/images/ellipsis-v-solid.svg" rowSpan="2" verticalAlignment="center" height="25" width="25" col="2" row="0"/>
                            </GridLayout> 
                            </v-template>
                        </RadListView>
                    </GridLayout>
                </StackLayout> 
            </DockLayout>
        </ScrollView>
    </Page>
</template>
<script>
require("nativescript-nodeify");
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format"
import axios from "axios"
import {screen} from "tns-core-modules/platform"
import {mapActions, mapState} from "vuex"
import {TNSPlayer} from "nativescript-audio"
momentDurationFormatSetup(moment);

export default {
    props: ['playlistData', 'type'], 
    data(){
        return {
            songs: [], 
            containerHeight: 1, 
            pageData: {
                title: '',
                bgImg: '', 
                artistImg: '', 
                fans: '',
                tracksNo: '',
                duration: ''
            }
        }
    },
    methods: {
        ...mapActions([
            'selectSong'
        ]),
        onLoad: function(args){
            const page = args.object
            const svg = page.getViewById("playBtn")
        }, 
        onScroll: function(){
            console.log("Scrolling")
        }, 
        getRandomIntInclusive: function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        }, 
        playSong: function(index){
            // const player = new TNSPlayer();
            let songSelected = this.playlistData.tracks.data[index];
            this.selectSong(songSelected)
            
            if(this.selectedSong){
                this.player.playFromUrl({
                    audioFile: this.selectedSong.preview
                })
            }
        }
    },
    computed: {
        ...mapState(['selectedSong', 'player']), 
        marginRightIcon: function(){
            if(this.type==='charts'){
                return {
                    'margin-right': 20
                }
            }
        }
    },
    mounted(){
        let { data } = this.playlistData.tracks
        this.songs = data
    }, 
    async created(){
        let playlist = this.playlistData
        let selectedTrack = playlist.tracks.data[this.getRandomIntInclusive(0, playlist.tracks.data.length-1)];
        const result = await axios.get(`https://api.deezer.com/artist/${selectedTrack.artist.id}`)

        this.pageData.title = selectedTrack.title;
        this.pageData.bgImg = selectedTrack.album.cover_medium;
        this.pageData.artistImg = result.data.picture_medium;
        this.pageData.fans = playlist.fans;
        this.pageData.tracksNo = this.type==='playlists' ? playlist.nb_tracks : playlist.tracks.data.length;
        this.pageData.duration = moment.duration(Number(playlist.duration), 'seconds').minutes()

    }
}
</script>
<style lang="scss">
.detailpage {
    .lastItemMargin {
        margin-bottom: 200;
    }
    font-family: 'Roboto, Roboto-Bold';
    &__container {
        &--header {
            color: white;
            &__title {
                font-size: 24;
                // font-weight: bold;
            }
            &__stats {
                padding: 0 20;
                font-size: 15;
                Label {
                    font-family: 'Roboto, Roboto-Regular';
                    margin-top: 12;
                }
                .marginRightIcon {
                    margin-right: 20;
                }
                .playButton path {
                    fill: green !important;
                }
            }
        }
        &--content {
            font-size: 23;
            &__play {
                font-family: 'Roboto, Roboto-Bold';
                color: black;
            }
            &__list {
                font-family: 'Roboto, Roboto-Regular';
                &--details {
                    background: transparent;
                }
                &--number, &--artist {
                    color: lightgray;
                }
                &--title {
                    color: black;
                    font-size: 21.5
                }
                &--artist {
                    font-size: 20;
                    margin-top: 5
                }
            }
        }
    }
}
</style>