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
                <StackLayout dock="bottom" marginTop="20"> <!--Main content -->
                    <FlexboxLayout flexDirection="row" alignItems="center" justifyContent="space-between" paddingRight="20" paddingLeft="20">
                        <FlexboxLayout flexDirection="row" alignItems="center">
                            <Image src="~/assets/images/bt1.png" height="35" width="35" marginRight="10"/>
                            <Label text="Play All (First 32)" fontSize="17"/>
                        </FlexboxLayout>
                        <Image src="~/assets/images/bars-solid.png" height="30" width="30"/>
                    </FlexboxLayout>
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
    }
}
</style>