<template>
    <Page actionBarHidden="true" :class="[deviceWidthClass, pageClasses]" @loaded="deviceWidthClassSetting">
        <DockLayout stretchLastChild="true">
            <AbsoluteLayout dock="top"> <!-- Carousel/Search container -->
                <GridLayout :height="gridLayout.height" width="100%" columns="*" @layoutChanged="shrinkHeightCarousel" ref="layout"> <!-- Carousel container -->
                    <Carousel col="0" row="0" verticalAlignment="top" height="100%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="white" finite="true" bounce="true" showIndicator="true" android:indicatorAnimation="swap" color="white">
                        <CarouselItem id="slide1" verticalAlignment="middle">
                            <AbsoluteLayout>
                                <AbsoluteLayout width="100%" height="100%">
                                    <Image src="~/assets/images/playlist1/1.png" :stretch="gridLayout.imageSize" height="100%" width="100%"/>
                                    <StackLayout class="backgroundContainer" width="100%" height="100%" />
                                </AbsoluteLayout>
                                <StackLayout :top="gridLayout.top" :left="gridLayout.left" class="musicpage__header--text">
                                    <Label text="DJ SNAKE"/>
                                </StackLayout>
                            </AbsoluteLayout>
                        </CarouselItem>
                        <CarouselItem id="slide2" backgroundColor="#3f5efb" verticalAlignment="middle">
                            <AbsoluteLayout>
                                <AbsoluteLayout width="100%" height="100%">
                                    <Image src="~/assets/images/playlist1/2.png" :stretch="gridLayout.imageSize" height="100%" width="100%"/>
                                    <StackLayout class="backgroundContainer" width="100%" height="100%" />
                                </AbsoluteLayout>
                                <StackLayout :top="gridLayout.top" :left="gridLayout.left" class="musicpage__header--text">
                                    <Label text="CAMILA"/>
                                </StackLayout>
                            </AbsoluteLayout>
                        </CarouselItem>
                        <CarouselItem id="slide3" backgroundColor="#3fbefb" verticalAlignment="middle">
                            <AbsoluteLayout>
                                <AbsoluteLayout width="100%" height="100%">
                                    <Image src="~/assets/images/playlist1/3.png" :stretch="gridLayout.imageSize" height="100%" width="100%"/>
                                    <StackLayout class="backgroundContainer" width="100%" height="100%" />
                                </AbsoluteLayout>
                                <StackLayout :top="gridLayout.top" :left="gridLayout.left" class="musicpage__header--text" id="imagine-dragon" ref="imagineDragon">
                                    <Label text="IMAGINE DRAGON"/>
                                </StackLayout>
                            </AbsoluteLayout>
                        </CarouselItem>
                    </Carousel>
                </GridLayout>
                <!-- <StackLayout width="100%" class="musicpage__search" top="15"> Search Bar
                    <StackLayout width="90%">
                        <TextField class="music__search--bar" hint="Search Song Singer" />
                    </StackLayout>
                </StackLayout> -->
            </AbsoluteLayout>
            <ScrollView scrollBarIndicatorVisible="false">
                <StackLayout class="musicpage__content" @layoutChanged="changeHeightStack">
                    <Label text="Recommended" class="musicpage__content--heading"/> <!-- Recommended Section -->
                    <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false"> <!-- Horizontal scrolling -->
                        <StackLayout orientation="horizontal" marginTop="20"> <!-- Scrolling container to space out -->
                            <StackLayout orientation="horizontal" v-for="(item, index) in recommendedList" :key="index" @tap="goToPage(item)">
                                <AbsoluteLayout :class="['musicpage__content--rec__item', {'lastItemNoMargin': index===recommendedList.length-1}]" height="150" width="145"> <!-- Individual item -->
                                    <AbsoluteLayout width="100%" height="100%"> <!-- Image wrapper -->
                                        <Image :src="item.img" stretch="aspectFill" width="100%" height="100%" borderRadius="10"/>
                                        <StackLayout class="carouselContainer" width="100%" height="100%" borderRadius="10"/>
                                    </AbsoluteLayout>
                                    <StackLayout width="100%" top="105" left="0" class="musicpage__content--rec__item--text"> <!-- Text -->
                                        <Label :text="item.name" horizontalAlignment="center"/>
                                    </StackLayout>
                                    <!-- <StackLayout left="95" top="8">
                                        <Image src="~/assets/images/btn2.png" stretch="aspectFit"/>
                                    </StackLayout> -->
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
import { mapState, mapActions } from 'vuex';
// require('nativescript-platform-css-free')

import * as utils from "utils/utils";
import * as platformModule from 'tns-core-modules/platform'
export default {
    data(){
        return {
            gridLayout: {
                height: 300,
                imageSize: 'aspectFill', 
                top: 100,
                left: 120
            },
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
            allPlaylists: [], 
            deviceWidthClass: ''
        }
    }, 
    methods: {
        ...mapActions(['setAllPlaylists']),
        changeHeightStack: function(){
            console.log("Layout changed Stack")
        },
        deviceWidthClassSetting: function(){
            const deviceWidth = platformModule.screen.mainScreen.widthDIPs;
            console.log("Height of screen")
            console.log(platformModule.screen.mainScreen.heightDIPs)
            if (deviceWidth >= 1280) {
                this.deviceWidthClass = "1280";
                console.log('Layout')
                console.log(deviceWidth)
            } else if (deviceWidth >= 1024) {
                this.deviceWidthClass = "1024";
                console.log('Layout')
                console.log(deviceWidth)
            } else if (deviceWidth >= 800) {
                this.deviceWidthClass = "800";
                console.log('Layout')
                console.log(deviceWidth)
            } else if (deviceWidth >= 600) {
                this.deviceWidthClass = "600";
                console.log('Layout')
                console.log(deviceWidth)
            } else if (deviceWidth >= 540) {
                this.deviceWidthClass = "540";
                console.log('Layout')
                console.log(deviceWidth)
            } else if (deviceWidth >= 480) {
                this.deviceWidthClass ="480";
                console.log('Layout')
                console.log(deviceWidth)
            } else if (deviceWidth >= 400) {
                this.deviceWidthClass = "400";
                console.log('Layout')
                console.log(deviceWidth)
            } else if (deviceWidth >= 360) {
                this.deviceWidthClass = "360";
                console.log('Layout')
                console.log(deviceWidth)
            }
        },
        shrinkHeightCarousel: function(){
            const width = utils.layout.toDeviceIndependentPixels(
                this.$refs.layout.nativeView.getMeasuredWidth()
            )
            if(width > 600){
                console.log(width)
                this.gridLayout = {
                    height: 150, 
                    imageSize: 'aspectFit',
                    top: 30, 
                    left: 250
                }
            }
        },
        shuffle: function(array){
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        },
        goToPage: async function(page){
            const res = await axios.get('https://api.deezer.com/chart');
            const playlistData = res.data;
            console.log(playlistData)
            this.$navigateTo(DetailsPage, {
                props: {
                    playlistData,
                    type: 'charts'
                },
                frame: 'main-music-page', 
                animated: true, 
                transition: {
                    name: 'slide', 
                    duration: 500
                }
            })
        },
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
                    playlistData, 
                    type: 'playlists'
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
        ...mapState(['selectedSong', 'allPlaylists']), 
        pageClasses: function(){ // Set android/ios classes
            return {
                'platform-ios': platformModule.isIOS, 
                'platform-android': platformModule.isAndroid
            }
        }
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
            this.allPlaylists = allPlaylists;
            this.setAllPlaylists(this.allPlaylists);
        }))
    }, 
    mounted(){
        console.log(this.allPlaylists)
    }
    // watch: {}
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

// Android and iOS specific CSS
.platform-android .musicpage {
    &__header {
        &--text {
            font-size: 100;
            &#imagine-dragon {
                font-size: 100;
            }
        }
    }
}

.400 .musicpage {
    &__header {
        &--text {
            color: red
        }
    }
}

</style>