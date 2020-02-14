<template>
    <Page actionBarHidden="true" class="detailpage" @load="onLoad"> 
        <ScrollView orientation="vertical" scrollBarIndicatorVisible="true">
            <DockLayout stretchLastChild="true" class="detailpage__container">
                <AbsoluteLayout height="300" dock="top" class="detailpage__container--header">
                    <StackLayout height="100%" width="100%">
                        <Image src="~/assets/images/electro.png" stretch="aspectFill"/>
                    </StackLayout>
                    <StackLayout paddingRight="20" paddingLeft="20" top="70">
                        <GridLayout height="100%" width="100%" columns="*,auto" rows="auto" >
                            <FlexboxLayout flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap" paddingRight="20" verticalAlignment="center">
                                <Label col="0" row="0" text="Seek the memory of love in Light and Nature" class="detailpage__container--header__title"  textWrap="true" width="300"/>
                            </FlexboxLayout>
                            <Image col="1" row="0" src="~/assets/images/camila-songs/1.png" height="75" width="75" verticalAlignment="center" borderRadius="50%"/>
                        </GridLayout>
                    </StackLayout>
                    <AbsoluteLayout top="218" width="100%">
                        <FlexboxLayout  width="100%" flexDirection="row" justifyContent="space-between" alignItems="center" class="detailpage__container--header__stats">
                            <StackLayout orientation="vertical">
                                <Image src="~/assets/images/heart-regular.png" height="30" width="30"/>
                                <Label text="2099"/>
                            </StackLayout>
                            <StackLayout orientation="vertical">
                                <Image src="~/assets/images/comment-regular.png" height="30" width="30" />
                                <Label text="801"/>
                            </StackLayout>
                            <StackLayout orientation="vertical">
                                <Image src="~/assets/images/play-solid.png" height="30" width="30"/>
                                <Label text="93.5W"/>
                            </StackLayout>
                            <StackLayout orientation="vertical">
                                <Image src="~/assets/images/download-solid.png" height="30" width="30"/>
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
                            <Label text="Play All (First 32)" fontSize="17"/>
                        </FlexboxLayout>
                        <Image src="~/assets/images/bars-solid.png" height="30" width="30"/>
                    </FlexboxLayout>
                    <StackLayout orientation="vertical" paddingLeft="10" class="detailpage__container--content__list"> <!-- List container -->
                        <ListView for="(song, index) in songs" height="100%">
                            <v-template>
                                <StackLayout>
                                    <GridLayout columns="auto,*,auto" row="auto" marginTop="30"> <!-- Individual Grid -->
                                        <Label :text="`0${index+1}`" col="0" row="0" rowSpan="2" verticalAlignment="center" class="detailpage__container--content__list--number"/>
                                        <GridLayout col="1" row="0" columns="auto,*" class="detailpage__container--content__list--details" marginLeft="20">
                                            <StackLayout col="0" row="0" rowSpan="2" marginRight="20">
                                                <Image :src="song.img" height="60" width="60" borderRadius="50%" />
                                            </StackLayout>
                                            <StackLayout orientation="vertical" col="1" row="0">
                                                <Label :text="song.title"  class="detailpage__container--content__list--title"/>
                                                <Label :text="song.artist" class="detailpage__container--content__list--artist"/>
                                            </StackLayout>
                                        </GridLayout>
                                        <Image src="~/assets/images/ellipsis-v-solid.png" rowSpan="2" verticalAlignment="center" height="25" width="25" col="2" row="0"/>
                                    </GridLayout> 
                                </StackLayout>
                            </v-template>
                        </ListView>
                    </StackLayout>
                </StackLayout> 
            </DockLayout>
        </ScrollView>
    </Page>
</template>
<script>
import {screen} from "tns-core-modules/platform"
export default {
    data(){
        return {
            songs: [
                {
                    img: "~/assets/images/camila-songs/1.png", 
                    title: "Beautiful in white",
                    artist: "Westlife"
                },
                {
                    img: "~/assets/images/camila-songs/1.png", 
                    title: "DDU-DU-DDU-DU",
                    artist: "BLACKPINK"
                },
                {
                    img: "~/assets/images/camila-songs/1.png", 
                    title: "Hold On to My Side",
                    artist: "Xiaoxue Liang"
                },
                {
                    img: "~/assets/images/camila-songs/1.png", 
                    title: "True Valentine",
                    artist: "Weki Meki"
                }
            ]
        }
    },
    methods: {
        onLoad: function(args){
            const page = args.object;

        }
    }
}
</script>
<style lang="scss">
.detailpage {
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