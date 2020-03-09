<template>
    <Page actionBarHidden="true" class="chartspage">
        <ScrollView orientation="vertical">
                <TabView height="100%">
                    <TabViewItem title="Bar graph">
                        <StackLayout>
                            <RadCartesianChart height="500">
                                <CategoricalAxis  v-tkCartesianHorizontalAxis></CategoricalAxis>
                                <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
                                <BarSeries v-tkCartesianSeries :items="data.getCountriesData()" categoryProperty="Country" valueProperty="Amount"></BarSeries>
                            </RadCartesianChart>
                        </StackLayout>
                    </TabViewItem>
                    <TabViewItem title="Line graph">
                        <StackLayout>
                            <RadCartesianChart height="500">
                                <CategoricalAxis v-tkCartesianHorizontalAxis labelfitMode="rotate"></CategoricalAxis>
                                <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
                                <LineSeries v-tkCartesianSeries :items="data.getCountriesData()" categoryProperty="Country" valueProperty="Amount" showLabels="true"></LineSeries>
                                <LineSeries v-tkCartesianSeries :items="data.getCountriesData()" categoryProperty="Country" valueProperty="ThirdVal" showLabels="true"></LineSeries>
                            </RadCartesianChart>
                        </StackLayout>
                    </TabViewItem>
                    <TabViewItem title="Pie chart">
                        <StackLayout>
                            <RadPieChart allowAnimation="true" height="500">
                                <PieSeries v-tkPieSeries selectionMode="DataPoint" expandRadius="0.2" outerRadiusFactor="0.7" valueProperty="Amount" legendLabel="Country" :items="data.getCountriesData()"></PieSeries>
                                <RadLegendView v-tkPieLegend position="Right" title="Country" offsetOrigin="TopRight" width="100" enableSelection="true"></RadLegendView>
                            </RadPieChart>
                        </StackLayout>
                    </TabViewItem>
                    <TabViewItem title="Scatter plot">
                        <StackLayout>
                            <RadCartesianChart height="500">
                                <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
                                <LinearAxis v-tkCartesianHorizontalAxis></LinearAxis>
                                <ScatterSeries v-tkCartesianSeries :items="data.getCountriesData()" xProperty="Amount" yProperty="SecondVal"></ScatterSeries>
                                <ScatterSeries v-tkCartesianSeries :items="data.getCountriesData()" xProperty="Amount" yProperty="ThirdVal"></ScatterSeries>
                                <ScatterSeries v-tkCartesianSeries :items="data.getCountriesData()" xProperty="Amount" yProperty="FourthVal"></ScatterSeries>
                            </RadCartesianChart>
                        </StackLayout>
                    </TabViewItem>
                    <!-- <TabViewItem title="Scatter Bubble">
                        <StackLayout>
                            <RadCartesianChart height="500">
                                <LinearAxis v-tkCartesianHorizontalAxis></LinearAxis>
                                <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
                                <ScatterBubbleSeries v-tkCartesianSeries :items="data" bubbleScale="5" xProperty="Amount" yProperty="SecondVal" fillColor="red" bubbleSizeProperty="Impact"></ScatterBubbleSeries>
                                <ScatterBubbleSeries v-tkCartesianSeries :items="data" bubbleScale="5" xProperty="Amount" yProperty="ThirdVal" fillColor="red" bubbleSizeProperty="Impact"></ScatterBubbleSeries>
                                <ScatterBubbleSeries v-tkCartesianSeries :items="data" bubbleScale="5" xProperty="Age" yProperty="FourthVal" fillColor="red" bubbleSizeProperty="Impact"></ScatterBubbleSeries>
                            </RadCartesianChart>
                            <Label text="Charts page" class="chartspage__title--text"></Label>
                        </StackLayout>
                    </TabViewItem> -->
                    <TabViewItem title="Area chart">
                        <StackLayout>
                            <RadCartesianChart height="500">
                                <CategoricalAxis v-tkCartesianHorizontalAxis ></CategoricalAxis>
                                <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
                                <AreaSeries v-tkCartesianSeries :items="data.getCountriesData()" categoryProperty="Country" valueProperty="Amount"  showLabels="true"></AreaSeries>
                            </RadCartesianChart>
                        </StackLayout>
                    </TabViewItem>
                    <TabViewItem title="Range bar">
                        <StackLayout>
                            <RadCartesianChart height="500">
                                <CategoricalAxis v-tkCartesianHorizontalAxis verticalLocation="Bottom"></CategoricalAxis>
                                <LinearAxis v-tkCartesianVerticalAxis horizontalLocation="Left"></LinearAxis>
                                <RangeBarSeries v-tkCartesianSeries :items="data.getTasksData()" categoryProperty="Name" showLabels="true" lowPropertyName="Low" highPropertyName="High"></RangeBarSeries>
                            </RadCartesianChart>
                        </StackLayout>
                    </TabViewItem>
                    <!-- <TabViewItem title="Donut plot">
                        <StackLayout>
                            <RadCartesianChart height="500">
                                <CategoricalAxis v-tkCartesianVerticalAxis></CategoricalAxis>
                                <LinearAxis v-tkCartesianHorizontalAxis></LinearAxis>
                                <BarSeries v-tkCartesianSeries :items="data.getCountriesData()" categoryProperty="Country" valueProperty="Amount"></BarSeries>
                            </RadCartesianChart>
                            <Label text="Charts page" class="chartspage__title--text"></Label>
                        </StackLayout>
                    </TabViewItem> -->
                </TabView>
        </ScrollView>
    </Page>
</template>
<script>
import {cartesianData} from "../data"
import axios from "axios"
export default {
    data(){
        return {
            data: cartesianData, 
            selectedIndex: 0, 
            albums: []
        }
    }, 
    methods: {
        logIndex: function(evt){
            console.log(evt.newIndex)
        }
    }, 
    async created(){
        const res = await axios.get('https://api.deezer.com/chart');
        const chartsData = res.data.albums.data;
        let albums = [];
        
        let albumsIDs = chartsData.map(album => {
            return album.id
        })

        let arrRequests = [];
        albumsIDs.forEach(async (id) => {
            arrRequests.push(axios.get(`https://api.deezer.com/album/${id}`))
        })

        let albumDetails = [];
        albums = await axios.all(arrRequests).then(axios.spread((...albums) => {
            albumDetails = albums.map(({data: {nb_tracks, fans, rating, title, cover_medium}}) => {
                return {
                    title, 
                    nb_tracks, 
                    fans, 
                    rating,
                    cover_medium
                }
            })
        }))
        console.log(albumDetails)
        this.albums = albumDetails
    }
}
</script>
<style lang="scss">
.chartspage {
    RadCartesianChart {
        margin: 12;
        padding: 12
    }
    &__title {
        padding: 15 22;
        &--text {
            font-size: 30
        }
    }
}
</style>