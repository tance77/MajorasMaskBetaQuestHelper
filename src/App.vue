<template>
    <div id="app">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-5xl mx-auto">
                <Helper/>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "assets/scss/app.scss";
</style>
<script>


    import Helper from "./components/Helper";
    export default {
        name: "App",
        components: {
            Helper,
        },
    };
</script>
