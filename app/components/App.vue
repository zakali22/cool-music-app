<template>
    <Page actionBarHidden="true" @loaded="onLoad">
        <DockLayout class="homepage" stretchLastChild="false">
            <FlexboxLayout flexDirection="column" alignItems="center" dock="top" width="100%" class="homepage__logo--container" id="logoContainer">
                <Image :src="imageSrc" class="homepage__logo--container__image" />
                <Label text="Cool Music" class="homepage__logo--container__text"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="column" class="homepage__buttons" dock="bottom" id="buttonsContainer">
                <Button text="Sign in"  class="homepage__buttons--button" @tap="loginPageNavigate"/>
                <Label text="Sign up" class="homepage__buttons--signup" />
            </FlexboxLayout>
        </DockLayout>
    </Page>
</template>

<script>
import LoginPage from "./Login"
import { AnimationCurve } from "ui/enums"
export default {
        data() {
            return {
                imageSrc: "~/assets/images/music-logo.png"
            };
        },
        mounted(){
            console.log("Done")
        },
        methods: {
            loginPageNavigate: function() {
                console.log("Tapped");
                this.$navigateTo(LoginPage, {
                    animated: true, 
                    transition: {
                        name: 'slide', 
                        duration: 300
                    }
                });
            }, 
            onLoad: function(args){
                console.log(args)
                const page = args.object;
                const logoContainer = page.getViewById("logoContainer")
                const buttonsContainer = page.getViewById("buttonsContainer")
                logoContainer.animate({
                    scale: {x: 1, y: 1},
                    // translate: { y: 0, x:0 },
                    duration: 500, 
                    delay: 500, 
                    opacity: 1, 
                    curve: AnimationCurve.easeInOut
                })

                buttonsContainer.animate({
                    translate: {x:0, y:0}, 
                    duration: 500, 
                    delay: 900, 
                    opacity:1, 
                    curve: AnimationCurve.easeOut
                })
            }
        }
    };
</script>

<style lang="scss">
    .homepage {
        height: 100%;
        background: #5956ff;
        color: white;
        &__logo {
            &--container {
                transform: scale(.5, .5);
                opacity: 0;
                margin-top: 130;
                &__image {
                    height: 140;
                }
                &__text {
                    margin-top: 15;
                    font-size: 30;
                    text-transform: uppercase;
                    // font-family: 'Roboto', "Roboto-Bold";
                    font-family: "Raleway", "Raleway-Bold";
                }
            }
        }
        &__buttons {
            margin: 0 35 80 35;
            font-family: "Raleway", "Raleway-Bold";
            transform: translateY(120%);
            opacity: 0;
            & > * {
                font-size: 20;
                text-transform: capitalize;
                padding: 15 0;
                width: 100%;
                
            }
            &--button {
                color: #5956ff;
                background: white;
                border-radius: 10;
            }
            &--signup {
                color: white;
                text-align: center;
                margin-top: 20;
            }
        }
    }
</style>
