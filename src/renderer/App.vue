<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavBar from './components/ui/navigationBar';
    import Vue from 'vue';

    export default {
        name: 'AudioPlayer'
    }

    Vue.component(NavBar.name, NavBar);
</script>

<style>
    html,
    body {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    * {
        margin: 0;
        padding: 0;
    }

    #app {
        height: 100%;
    }
</style>
