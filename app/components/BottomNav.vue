<template>
    <Page actionBarHidden="true" class="bottomnav">
        <FlexboxLayout width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" class="bottomnav__wrapper">
            <StackLayout class="bottomnav__icon--container active">
                <Image src="~/assets/images/music-solid.png" />
                <Label text="Listen" />
            </StackLayout>
            <StackLayout class="bottomnav__icon--container">
                <Image src="~/assets/images/search-solid.png" />
                <Label text="Search" />
            </StackLayout>
            <StackLayout class="bottomnav__icon--container">
                <Image src="~/assets/images/cog-solid.png" />
                <Label text="Settings" />                
            </StackLayout>
            <StackLayout class="bottomnav__icon--container">
                <Image src="~/assets/images/user-circle-regular.png" id="account"/>
                <Label text="Account" />                
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>
<script>
export default {
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