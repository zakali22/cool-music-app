<template>
    <Page actionBarHidden="true" class="musicplayer" backgroundColor="transparent" @loaded="scrollerAnim">
        <AbsoluteLayout width="100%" height="100%">
            <StackLayout left="22" height="100%" width="90" class="musicplayer__content--image-wrapper">
                <Image src="~/assets/images/camila.png" class="musicplayer__content--image-wrapper__image" stretch="aspectFit" marginTop="24"/>
            </StackLayout>
            <GridLayout top="20" columns="120,*,auto" android:cco rows="auto" class="musicplayer__content" >
                <StackLayout col="1" row="0" height="100%" width="100%">
                    <ScrollView orientation="horizontal" id="name-scroller" scrollBarIndicatorVisible="false">
                        <StackLayout orientation="horizontal">
                            <Label text="DDU-DU DDU-DU" fontSize="21" color="black" class="textLoop"/>
                        </StackLayout>
                    </ScrollView>
                </StackLayout>
                <StackLayout class="musicplayer__content--buttons" col="2" row="0" orientation="horizontal"> <!-- Content container -->
                    <Image src="~/assets/images/step-backward-solid.png" height="19" width="32" verticalAlignment="center" marginRight="10"/>
                    <Image src="~/assets/images/pause-circle-solid.png" backgroundColor="white" borderRadius="50%" height="45" width="50" verticalAlignment="center" marginRight="10"/>
                    <Image src="~/assets/images/step-forward-solid.png" height="19" width="32" />
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
console.log(gsap)
export default {
    data(){
        return {

        }
    }, 
    methods: {
        scrollerAnim: function(args){
            const page = args.object;
            const scroller = page.getViewById("name-scroller")

            console.log("scroller is loaded")

            setTimeout(() => {
                scroller.scrollToHorizontalOffset(scroller.scrollableWidth, true)
            }, 500)
            scroller.scrollToHorizontalOffset(-60, true)
        }, 
        rerunAnim: function(scroller){
                console.log(scroller.scrollableWidth - scroller.scrollableWidth)
                scroller.scrollToHorizontalOffset(scroller.scrollableWidth - scroller.scrollableWidth, true)
        }
    }
}
</script>
<style lang="scss">
.musicplayer {
    // .overlay {
    //     background: rgba(255, 255, 255, 0.89);
    //     backdrop-filter: blur(100px);
    //     filter: blur(100px)
    // }
    display: none;
    AbsoluteLayout {
        transform: translateY(-5);
        width: 100%;
        // background: rgba(255, 255, 255, 0)
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
        }
    }
}
</style>