<template>
    <Page actionBarHidden="true" class="bottomnav">
        <FlexboxLayout width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" class="bottomnav__wrapper">
            <StackLayout :class="['bottomnav__icon--container', {'active': activePage==='listen'}]" id="listen" @tap="goToPage('listen')">
                <SVGImage :src="activePageImage('listen')" height="25" />
                <Label text="Listen" />
            </StackLayout>
            <StackLayout :class="['bottomnav__icon--container', {'active': activePage==='search'}]" id="search"  @tap="goToPage('search')">
                <SVGImage :src="activePageImage('search')" height="25"/>
                <Label text="Search" />
            </StackLayout>
            <StackLayout :class="['bottomnav__icon--container', {'active': activePage==='settings'}]" id="settings"  @tap="goToPage('settings')">
                <SVGImage :src="activePageImage('settings')" height="25"/>
                <Label text="Settings" />                
            </StackLayout>
            <StackLayout :class="['bottomnav__icon--container', {'active': activePage==='account'}]" id="account"  @tap="goToPage('account')">
                <SVGImage :src="activePageImage('account')" id="account" height="25"/>
                <Label text="Account" />                
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>
<script>
import {mapState, mapActions} from "vuex"
export default {
    data(){
        return {
            images: {
                listen: {
                    active: '~/assets/images/music-solid--active.svg',
                    default: '~/assets/images/music-solid.svg'
                }, 
                search: {
                    active: '~/assets/images/search-solid--active.svg',
                    default: '~/assets/images/search-solid.svg'                    
                }, 
                settings: {
                    active: '~/assets/images/cog-solid--active.svg',
                    default: '~/assets/images/cog-solid.svg'                    
                }, 
                account: {
                    active: '~/assets/images/user-circle-regular--active.svg',
                    default: '~/assets/images/user-circle-regular.svg'                   
                }             
            }
        }
    }, 
    methods: {
        ...mapActions(['changeActivePage']),
        activePageImage: function(page){
            if(page==='listen'){
                if(this.activePage === 'listen'){
                    return this.images['listen'].active
                } else {
                    return this.images['listen'].default
                }
            } else if(page==='search'){
                if(this.activePage === 'search'){
                    return this.images['search'].active
                } else {
                    return this.images['search'].default
                }
            } else if(page==='settings'){
                if(this.activePage === 'settings'){
                    return this.images['settings'].active
                } else {
                    return this.images['settings'].default
                }
            } else {
                if(this.activePage === 'account'){
                    return this.images['account'].active
                } else {
                    return this.images['account'].default
                }
            }
        }, 
        goToPage: function(page){
            this.changeActivePage(page)
        }
    },
    computed: {
        ...mapState(['activePage'])
    }, 
    watch: {
        activePage: {
            immediate: true, 
            deep: true, 
            handler: function(newState, oldState){
                
            }
        }
    }
}
</script>
<style lang="scss">
.bottomnav {
    background: white;
    z-index: 1000;
    &__wrapper {
        margin: 15 0;
    }
    &__icon {
        &--container {
            width: 100%;
            height: 100%;
            &.active {
                Label {
                    color: #5956ff;
                }
            }
            Image {
                width: 25;
                height: 25;
                &#account {
                    width: 27;
                    height: 27
                }
            }
            Label {
                text-align: center;
                margin-top: 7;
            }
        }
    }
}
</style>