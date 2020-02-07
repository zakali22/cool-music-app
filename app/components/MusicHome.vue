<template>
    <Page actionBarHidden="true">
        <DockLayout stretchLastChild="false">
            <GridLayout height="300" dock="top">
                <Carousel col="0" row="0" verticalAlignment="top" background="red" height="100%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="red" finite="true" bounce="true" showIndicator="true" android:indicatorAnimation="swap" color="white">
                    <CarouselItem id="slide1" backgroundColor="#b3cde0" verticalAlignment="middle">
                        <Label text="Slide 1" backgroundColor="#50000000" horizontalAlignment="center"/>
                    </CarouselItem>
                    <CarouselItem id="slide2" backgroundColor="#6497b1" verticalAlignment="middle">
                        <Label text="Slide 2" backgroundColor="#50000000" horizontalAlignment="center"/>
                    </CarouselItem>
                    <CarouselItem id="slide3" backgroundColor="#005b96" verticalAlignment="middle">
                        <Label text="Slide 3" backgroundColor="#50000000" horizontalAlignment="center"/>
                    </CarouselItem>
                    <CarouselItem id="slide4" backgroundColor="#03396c" verticalAlignment="middle">
                        <Label text="Slide 4" backgroundColor="#50000000" horizontalAlignment="center"/>
                    </CarouselItem>
                </Carousel>
            </GridLayout>
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