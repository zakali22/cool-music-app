<template>
    <Page actionBarHidden="true">
        <DockLayout stretchLastChild="true">
            <AbsoluteLayout dock="top">
                <GridLayout height="300" width="100%">
                    <Carousel col="0" row="0" verticalAlignment="top" height="100%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="white" finite="true" bounce="true" showIndicator="true" android:indicatorAnimation="swap" color="white">
                        <CarouselItem id="slide1" backgroundColor="#b3cde0" verticalAlignment="middle">
                        </CarouselItem>
                        <CarouselItem id="slide2" backgroundColor="#6497b1" verticalAlignment="middle">
                        </CarouselItem>
                        <CarouselItem id="slide3" backgroundColor="#005b96" verticalAlignment="middle">
                        </CarouselItem>
                    </Carousel>
                </GridLayout>
            </AbsoluteLayout>
            <Label text="Content"/>
        </DockLayout>
    </Page>
</template>
<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>
<style>

</style>