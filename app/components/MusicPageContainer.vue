<template>
    <Page actionBarHidden="true">
        <DockLayout stretchLastChild="true">
            <AbsoluteLayout dock="top"> <!-- Carousel/Search container -->
                <GridLayout height="300" width="100%" columns="*"> <!-- Carousel container -->
                    <Carousel col="0" row="0" verticalAlignment="top" height="100%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="white" finite="true" bounce="true" showIndicator="true" android:indicatorAnimation="swap" color="white">
                        <CarouselItem id="slide1" verticalAlignment="middle">
                            <AbsoluteLayout>
                                <AbsoluteLayout width="100%" height="100%">
                                    <Image src="~/assets/images/playlist1/1.png" stretch="aspectFill" height="100%" width="100%"/>
                                    <StackLayout class="backgroundContainer" width="100%" height="100%" />
                                </AbsoluteLayout>
                                <StackLayout top="100" left="120" class="musicpage__header--text">
                                    <Label text="DJ SNAKE"/>
                                </StackLayout>
                            </AbsoluteLayout>
                        </CarouselItem>
                        <CarouselItem id="slide2" backgroundColor="#3f5efb" verticalAlignment="middle">
                            <AbsoluteLayout>
                                <AbsoluteLayout width="100%" height="100%">
                                    <Image src="~/assets/images/playlist1/2.png" stretch="aspectFill" height="100%" width="100%"/>
                                    <StackLayout class="backgroundContainer" width="100%" height="100%" />
                                </AbsoluteLayout>
                                <StackLayout top="100" left="140" class="musicpage__header--text">
                                    <Label text="CAMILA"/>
                                </StackLayout>
                            </AbsoluteLayout>
                        </CarouselItem>
                        <CarouselItem id="slide3" backgroundColor="#3fbefb" verticalAlignment="middle">
                            <AbsoluteLayout>
                                <AbsoluteLayout width="100%" height="100%">
                                    <Image src="~/assets/images/playlist1/3.png" stretch="aspectFill" height="100%" width="100%"/>
                                    <StackLayout class="backgroundContainer" width="100%" height="100%" />
                                </AbsoluteLayout>
                                <StackLayout top="110" left="80" class="musicpage__header--text" id="imagine-dragon">
                                    <Label text="IMAGINE DRAGON"/>
                                </StackLayout>
                            </AbsoluteLayout>
                        </CarouselItem>
                    </Carousel>
                </GridLayout>
                <StackLayout width="100%" class="musicpage__search" top="15"> <!-- Search bar -->
                    <StackLayout width="90%">
                        <TextField class="music__search--bar" hint="Search Song Singer" />
                    </StackLayout>
                </StackLayout>
            </AbsoluteLayout>
            <ScrollView scrollBarIndicatorVisible="false">
                <StackLayout class="musicpage__content">
                    <Label text="Recommended" class="musicpage__content--heading"/> <!-- Recommended Section -->
                    <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false"> <!-- Horizontal scrolling -->
                        <StackLayout orientation="horizontal" marginTop="20"> <!-- Scrolling container to space out -->
                            <StackLayout orientation="horizontal" v-for="(item, index) in recommendedList" :key="index">
                                <AbsoluteLayout :class="['musicpage__content--rec__item', {'lastItemNoMargin': index===recommendedList.length-1}]" height="150" width="145"> <!-- Individual item -->
                                    <AbsoluteLayout width="100%" height="100%"> <!-- Image wrapper -->
                                        <Image :src="item.img" stretch="aspectFill" width="100%" height="100%" borderRadius="10"/>
                                        <StackLayout class="carouselContainer" width="100%" height="100%" borderRadius="10"/>
                                    </AbsoluteLayout>
                                    <StackLayout width="100%" top="105" left="0" class="musicpage__content--rec__item--text"> <!-- Text -->
                                        <Label :text="item.name" horizontalAlignment="center"/>
                                    </StackLayout>
                                    <StackLayout left="95" top="8">
                                        <Image src="~/assets/images/btn2.png" stretch="aspectFit"/>
                                    </StackLayout>
                                </AbsoluteLayout>
                            </StackLayout>
                        </StackLayout>
                    </ScrollView>
                    <GridLayout columns="*,auto" marginTop="25">
                        <Label verticalAlignment="center" col="0" row="0" text="Selected Playlists" class="musicpage__content--heading"/> <!-- Selected Playlists -->
                        <Label verticalAlignment="center" text="More" col="1" row="0" fontSize="19"/>
                    </GridLayout>

                    <!--<GridLayout columns="*,*" rows="*,*" marginTop="20" marginBottom="110">--> <!-- Playlists container -->
                    <ScrollView orientation="horizontal" :marginBottom="selectedSong ? 150 : 50" marginTop="20">
                        <StackLayout orientation="horizontal">
                            <GridLayout columns="*,*" rows="*,*" marginRight="20" v-for="(playlist,index) in allPlaylists" :key="index" @tap="playlistPageLoad(playlist)" :class="'lastItemNoMargin' ? index===playlists.length-1 : ''">
                                <Image :src="playlistData.album.cover_medium" v-for="(playlistData,index) in playlist.tracks.data.slice(0,4)" :key="index" :col="colPos(index)" :row="rowPos(index)" width="90" height="90"/>
                            </GridLayout>
                        </StackLayout>
                    </ScrollView>
                </StackLayout>
            </ScrollView>
        </DockLayout>
    </Page>
</template>
<script>
require("nativescript-nodeify");
import axios from "axios"
import DetailsPage from './DetailsPage'
import { mapState } from 'vuex';
export default {
    data(){
        return {
            carouselImage: "~/assets/images/01.jpg", 
            backgroundGreen: 'green',
            recommendedList: [
                {img: "~/assets/images/drake.png", name: 'Daily'}, 
                {img:"~/assets/images/camila.png", name: 'New Song'}, 
                {img: "~/assets/images/camila-songs/4.jpg", name: 'Playlist'},
                {img:"~/assets/images/camila-songs/2.png", name: 'Artist'}, 
                {img: "~/assets/images/camila-songs/3.png", name: 'New Album'}, 
                {img: "~/assets/images/camila-songs/1.png", name: 'Album'}, 
            ], 
            playlists: [],
            allPlaylists: []
        }
    }, 
    methods: {
        rowPos: function(index){
            switch(index){
                case 0:
                    return '0';
                case 1: 
                    return '0';
                case 2:
                    return '1';
                case 3: 
                    return '1';
                default: 
                    return '0';
            }
        },
        colPos: function(index){
            switch(index){
                case 0:
                    return '0';
                case 1: 
                    return '1';
                case 2:
                    return '0';
                case 3: 
                    return '1';
                default: 
                    return '0';
            }
        },
        playlistPageLoad: function(playlistData){
            this.$navigateTo(DetailsPage, {
                props: {
                    playlistData
                },
                frame: 'main-music-page',
                animate: true, 
                transition: {
                    name: 'slide', 
                    duration: 500
                }
            })
        }
    },
    computed: {
        ...mapState(['selectedSong'])
    },
    async created(){
        // Make multiple requests to playlists
        const result = await axios.all([
            axios.get('https://api.deezer.com/playlist/908622995'),
            axios.get('https://api.deezer.com/playlist/30595446'),
            axios.get('https://api.deezer.com/playlist/59238841')
        ]).then(axios.spread((...playlists) => {
            let allPlaylists = []
            playlists.forEach(playlist => {
                let playlistResult = playlist.data;
                let playlistSongs = playlistResult.tracks.data.filter(songs => {
                    return songs.preview.length;
                })
                
                let playlistWithPreview = {
                    ...playlistResult, 
                    tracks: {
                        data: playlistSongs
                    }
                }
                
                console.log(playlistWithPreview)
                allPlaylists.push(playlistWithPreview)

            })
            this.allPlaylists = allPlaylists
        }))
    }, 
    mounted(){
        console.log(this.allPlaylists)
    }
}
</script>
<style lang="scss">
.musicpage {
    .lastItemNoMargin {
        margin-right: 0;
    }
    .backgroundContainer {
        background-image: linear-gradient(to right top, #9b40bb, #e62f94, #ff4f63, #ff8734, #ebbc12);
        opacity: .3;
        z-index: 1;
    }
    .carouselContainer {
        // background-image: linear-gradient(to right top, #9b40bb, #e62f94, #ff4f63, #ff8734, #ebbc12);
        opacity: .6;
        z-index: 1;
        
    }
    &__header {
        &--text {
            font-family: "Oswald, Oswald-Regular";
            text-transform: uppercase;
            font-size: 55;
            &#imagine-dragon {
                font-size: 45;
            }
        }
    }
    &__search {
        &--bar, TextField {
            border-width: 5;
            border-color: transparent;
            background: #d3d3d3;
            opacity: 0.8;
            border-radius: 30;
            padding: 0 15;
            height: 40;
            font-size: 18;
            color: white;
        }
    }
    &__content {
        padding: 25 20 25 25;
        &--heading {
            font-size: 22;
            letter-spacing: .009;
            color: black; 
            font-family: "Roboto, Roboto-Regular";
            text-transform: capitalize;
        }
        &--rec {
            &__item {
                border-radius: 20;
                margin-right: 20;
            
                &--text {
                    border-bottom-right-radius: 10;
                    border-bottom-left-radius: 10;
                    padding: 10 0;
                    filter: blur(150%);
                    // backdrop-filter: blur(100px);
                    background: rgba(211, 211, 211, 0.637);
                    font-size: 19;
                    color: white;

                    &.playlist-text {
                        font-size: 22;
                    }
                }
            }
        }
    }
}

</style>