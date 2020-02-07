<template>
    <Page actionBarHidden="true" @loaded="onLoadAnimation">
        <DockLayout stretchLastChild="true" class="loginpage">
            <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="flex-end" dock="top" width="100%" class="loginpage__logo--container">
                <StackLayout marginBottom="55" id="logoContainer">
                    <Image :src="imageSrc.logo" class="loginpage__logo--container__image" />
                    <Label text="Cool Music" class="loginpage__logo--container__text"/>
                </StackLayout>
            </FlexboxLayout>
            <FlexboxLayout dock="bottom" class="loginpage__content" flexDirection="column">
                <FlexboxLayout width="100%" flexDirection="row" class="loginpage__content--form__flex">
                    <StackLayout class="loginpage__content--form__container">
                        <TextField id="email-field" v-model="fields.email" keyboardType="email" autocorrect="false" returnKeyType="next" hint="email" class="loginpage__content--form__container--field loginpage__content--form__container--email"/>
                        <TextField id="password-field" v-model="fields.password" hint="password" @returnPress="submitForm" secure="true" class="loginpage__content--form__container--field loginpage__content--form__container--password"/>
                        <Button id="login-button" text="login" class="loginpage__content--form__container--button button" @tap="submitForm"/>
                        <Label id="forgot-text" text="forgot password?" horizontalAlignment="center" class="loginpage__content--form__container--forgot" @tap="forgotPassword"/>
                    </StackLayout>
                </FlexboxLayout>
                <FlexboxLayout class="loginpage__content--social" flexDirection="column">
                    <Label text="or" class="divider" id="divider"/>
                    <FlexboxLayout flexDirection="row" justifyContent="space-around" alignItems="center" class="loginpage__content--social__container">
                        <Image :src="imageSrc.facebook" class="facebook" id="facebook"/>
                        <Image :src="imageSrc.google" class="google" id="google"/>
                        <Image :src="imageSrc.twitter" class="twitter" id="twitter"/>
                    </FlexboxLayout>
                </FlexboxLayout>
            </FlexboxLayout>
        </DockLayout>
    </Page>
</template>
<script>
import MusicHome from "./MusicHome"
import {Animation} from "ui/animation"
import {AnimationCurve} from "ui/enums"
export default {
    data() {
	    return {
            fields: {
                email: "", 
                password: ""
            },
            imageSrc: { 
                logo: "~/assets/images/music-logo.png", 
                facebook: "~/assets/images/facebook.png", 
                google: "~/assets/images/google-plus.png", 
                twitter: "~/assets/images/twitter.png"
            }
	    };
    }, 
    methods: {
        forgotPassword: function(){
            console.log("Tapped forgot password")
        }, 
        submitForm: function(){
            console.log("Tapped login button")
            alert("Done")
            this.$navigateTo(MusicHome)
        },
        onLoadAnimation: function(args){
            const page = args.object;
            const logo = page.getViewById("logoContainer")
            const email = page.getViewById("email-field")
            const password = page.getViewById("password-field")
            const login = page.getViewById("login-button")
            const forgot = page.getViewById("forgot-text")
            const facebook = page.getViewById("facebook")
            const twitter = page.getViewById("twitter")
            const google = page.getViewById("google")
            const divider = page.getViewById("divider")

            const definitions = new Array();
            // Animating 
            definitions.push({
                target: logo, 
                opacity: 1,
                duration: 1300, 
                curve: AnimationCurve.easeInOut, 
                delay: 100
            })

            definitions.push({
                target: email, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 200
            })
 
            definitions.push({
                target: password, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 300
            }) 

            definitions.push({
                target: login, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 400
            })

            definitions.push({
                target: forgot, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 500
            })

            definitions.push({
                target: divider, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 600
            })


            definitions.push({
                target: facebook, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 700
            })

            definitions.push({
                target: google, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 800
            })

            definitions.push({
                target: twitter, 
                translate: {x:0, y:0}, 
                opacity: 1, 
                duration: 500, 
                curve: AnimationCurve.easeInOut, 
                delay: 900
            })

            const playSequentially = false;
            const animationSet = new Animation(definitions, playSequentially);
            animationSet.play().then(function(){
                console.log("Animation finished")
            });

        }
    }
}
</script>
<style lang="scss" scoped>
    .loginpage {
        height: 100%;
        font-family: "Raleway", "Raleway-Bold";
        #logoContainer {
            opacity: 0
        }
        #email-field, #password-field, #login-button, #forgot-text, #facebook, #google, #twitter, #divider {
            transform: translateY(130%);
            opacity: 0;
        }
        &__logo {
            &--container {
                height: 310;
                background: #5956ff;
                &__image {
                    height: 110;
                }
                &__text {
                    margin-top: 14;
                    font-size: 26;
                    text-transform: uppercase;
                    // font-family: 'Roboto', "Roboto-Bold";
                    color: white;
                }
            }
        }

        &__content {
            font-family: "Poppins", "Poppins-Regular";
            &--form {
                &__flex {
                    flex: 2;
                }
                &__container {
                    width: 100%;
                    margin: 40 30 0 30;
                    &--field {
                        border-bottom-width: 1;
                        border-bottom-color: transparent; 
                        placeholder-color: #d3d3d3;
                        font-size: 23;
                    }
                    &--email {
                        margin-bottom: 2;
                    }
                    &--button {
                        margin-top: 20;
                        font-size: 20;
                        padding: 15 0;
                        text-transform: lowercase;
                        color: white;
                        background: #5956ff;
                        font-weight: bold;
                    }
                    &--forgot {
                        font-size: 18;
                        color: #8d8d8d;
                        margin-top: 30
                    }
                }
            }
            &--social {
                flex: 1;
                padding-bottom: 37;
                
                .divider {
                    text-align: center;
                    font-size: 20;
                    color: #d3d3d3
                }
                &__container {
                    flex: 2;
                    margin-top: 15;

                    Image {
                        height: 41;
                    }
                    Image.facebook {
                        height: 30;
                    }
                    Image.twitter {
                        height: 31;
                    }
                }
            }
        }
    }
</style>