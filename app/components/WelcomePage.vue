<template>
    <Page actionBarHidden="true">
        <StackLayout class="page" orientation="vertical">
            <GridLayout columns="*" rows="auto" class="page__heading"><!-- Main vertical page layout -->
                <Label horizontalAlignment="left" col="0" row="0">Hi, username</Label>
            </GridLayout>
        </StackLayout>
    </Page>
</template>
<script>
export default {
    data() {
	    return {
            pages: [{name: "Contact"}, {name: "Blog"}, {name: "About us"}]
	    };
    }
}
</script>
<style lang="scss">
    .page {
        &__heading {
            padding: 10 20;
            font-size: 30;
            background: none;
        }
    }
</style>