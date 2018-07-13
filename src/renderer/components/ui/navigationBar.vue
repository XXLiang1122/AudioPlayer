<template>
    <div class="nav">
        <span class="btn btn-red" @click="operate('close')"></span>
        <span class="btn btn-yellow" @click="operate('maximize')"></span>
        <span class="btn btn-green" @click="operate('minimize')"></span>
    </div>
</template>

<script>
    import {ipcRenderer} from 'electron';

    export default {
        name: 'nav-bar',

        methods: {
            operate(type) {
                ipcRenderer.send(type);
            }
        }
    }
</script>

<style lang="stylus">
    .nav {
        width: 100%;
        height: 30px;
        padding-left: 5px;
        background: rgba(0, 0, 0, 0);
        -webkit-app-region: drag;

        * {
            -webkit-app-region: no-drag;
        }

        .btn {
            display: inline-block;
            float: left;
            width: 18px;
            height: 18px;
            margin-top: 6px;
            border-radius: 50%;
            margin-right: 5px;
            opacity: .6;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }

        .btn-red {
            background: red;
        }

        .btn-yellow {
            background: orange;
        }

        .btn-green {
            background: green;
        }
    }
</style>