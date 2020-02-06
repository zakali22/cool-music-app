<template>
    <Page actionBarHidden="true">
        <DockLayout stretchLastChild="true" class="loginpage">
            <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="flex-end" dock="top" width="100%" class="loginpage__logo--container">
                <Image :src="imageSrc" class="loginpage__logo--container__image" />
                <Label text="Cool Music" class="loginpage__logo--container__text"/>
            </FlexboxLayout>
            <Label text="Done" dock="bottom" />
        </DockLayout>
    </Page>
</template>
<script>
export default {
    data() {
	    return {
            imageSrc: "~/assets/images/music-logo.png"

	    };
    }
}
</script>
<style lang="scss" scoped>
    .loginpage {
        height: 100%;
        &__logo {
            &--container {
                height: 350;
                background: #5956ff;
                &__image {
                    height: 90;
                }
                &__text {
                    margin-top: 14;
                    font-size: 23;
                    text-transform: uppercase;
                    // font-family: 'Roboto', "Roboto-Bold";
                    font-family: "Raleway", "Raleway-Bold";
                    color: white;
                }
            }
        }
    }
</style>