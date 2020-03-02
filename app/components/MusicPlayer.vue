<template>
    <Page actionBarHidden="true" class="musicplayer" backgroundColor="transparent" @loaded="scrollerAnim" xmlns:svg="nativescript-svg">
        <AbsoluteLayout v-if="selectedSong" width="100%" height="100%" id="playerContainer">
            <StackLayout left="22" height="100%" width="90" class="musicplayer__content--image-wrapper">
                <Image :src="playerData.img" class="musicplayer__content--image-wrapper__image" stretch="aspectFit" marginTop="24"/>
            </StackLayout>
            <GridLayout top="20" columns="120,*,auto" android:cco rows="auto" class="musicplayer__content" >
                <StackLayout col="1" row="0" height="100%" width="100%">
                    <ScrollView orientation="horizontal" id="name-scroller" scrollBarIndicatorVisible="false">
                        <StackLayout orientation="horizontal">
                            <Label :text="playerData.title" fontSize="21" color="black" class="textLoop"/>
                        </StackLayout>
                    </ScrollView>
                </StackLayout>
                <StackLayout class="musicplayer__content--buttons" col="2" row="0" orientation="horizontal"> <!-- Content container -->
                    <SVGImage :src="images.prevButton.img" height="19" width="32" verticalAlignment="center" marginRight="10"/>
                    <SVGImage :src="imageToDisplay()" @tap="playSong" backgroundColor="white" borderRadius="50%" height="45" width="50" verticalAlignment="center" marginRight="10"/>
                    <SVGImage :src="images.nextButton.img" height="19" width="32" />
                </StackLayout>
            </GridLayout>
            <!-- <StackLayout top="10" class="overlay" width="100%" height="80" backgroundColor="red"></StackLayout> Background -->
        </AbsoluteLayout>
    </Page>
</template>
<script>
require("nativescript-nodeify");
import Tween from "@tweenjs/tween.js"
import gsap from "gsap"
import {mapState, mapActions, mapGetters} from "vuex"
import axios from "axios"

import {ImageSourceSVG} from "nativescript-svg"
// import {TNSPlayer} from "nativescript-audio"

export default {
    data(){
        return {
            playerData: {
                img: '',
                title: '', 
                audioUrl: '', 
                playing: true
            }, 
            images: {
                playButton: {
                    img: '~/assets/images/play-solid--active.svg'
                }, 
                pauseButton: {
                    img: '~/assets/images/pause-circle-solid.svg'
                }, 
                nextButton: {
                    img: '~/assets/images/step-forward-solid.svg'
                }, 
                prevButton: {
                    img: '~/assets/images/step-backward-solid.svg'
                }
            }
        }
    }, 
    methods: {
        ...mapActions(['getCurrentArtistImage']),
        imageToDisplay: function(){
            if(this.playerData.playing){
                return this.images.pauseButton.img
            } else {
                return this.images.playButton.img
            }
        },
        playSong: function(){
            // const player = new TNSPlayer();
            if(this.selectedSong){
                if(!this.player.isAudioPlaying()){
                    this.player.resume();
                    this.playerData.playing = true
                } else {
                    this.player.pause()
                    this.playerData.playing = false
                }
            }
        },
        scrollerAnim: function(args){
            const page = args.object;
            const scroller = page.getViewById("name-scroller")

            if(scroller){
                console.log("scroller is loaded")

                setTimeout(() => {
                    scroller.scrollToHorizontalOffset(scroller.scrollableWidth, true)
                }, 500)
                scroller.scrollToHorizontalOffset(-60, true)
            }
        }, 
        rerunAnim: function(scroller){
                console.log(scroller.scrollableWidth - scroller.scrollableWidth)
                scroller.scrollToHorizontalOffset(scroller.scrollableWidth - scroller.scrollableWidth, true)
        }
    }, 
    computed: {
        ...mapState(['selectedSong', 'player'])
    },
    watch: {
        selectedSong: {
            immediate: true, 
            deep: true, 
            handler(newState, oldState){
                if(newState){
                    this.playerData.img = this.selectedSong.album.cover_medium
                    this.playerData.title = this.selectedSong.title
                    this.playerData.audioUrl = this.selectedSong.preview
                }
            }
        }
    }
}
</script>
<style lang="scss">
.musicplayer {
    display: none;
    AbsoluteLayout {
        transform: translateY(-5);
        width: 100%;
    }
    &__content {
        background: rgb(255, 255, 255);
        width: 100%;
        padding-right: 15;
        z-index: 1;
        backdrop-filter: blur(200px);
        filter: blur(200px);
        font-family: "Poppins, Poppins-Regular";
        .textLoop {
            
        }
        &__wrapper {    
            z-index: 1000;
        }
        &--image-wrapper {
            transform: translateY(-17);
            margin-right: 10;
            z-index:1000; 
            &__image {
                border-radius: 50%;
            }
        }
        &--buttons {
            padding: 20 0;
            .playButton {
                background: red;
                path {
                    fill: red !important;
                }
            }
        }
    }
}
</style>