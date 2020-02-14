<template>
    <Page actionBarHidden="true" class="musicpage">
        <GridLayout columns="*">
            <Frame id="main-music-page">
                <MusicPageContainer />
            </Frame>
            <Frame @loaded="pushDown">
                <MusicPlayer />
            </Frame>
            <Frame @loaded="pushDown1">
                <BottomNav />
            </Frame>
        </GridLayout>
    </Page>
</template>
<script>
import MusicPageContainer from "./MusicPageContainer"
import MusicPlayer from "./MusicPlayer"
import BottomNav from "./BottomNav"
import {screen} from "tns-core-modules/platform"
export default {
    components: {
        MusicPageContainer, 
        MusicPlayer, 
        BottomNav
    },
    methods: {
        pushDown: function(args){
            const frame = args.object;
            frame.translateY = screen.mainScreen.heightDIPs - 250;
        }, 
        pushDown1: function(args){
            const frame = args.object;
            frame.translateY = screen.mainScreen.heightDIPs - 150
        }
    }
}
</script>