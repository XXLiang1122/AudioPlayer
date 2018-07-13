<template>
    <div class="wrapper">
        <div class="folder" @click="openFolder"></div>
    </div>
</template>

<script>
    'use strict';

    import * as Types from '../store/mutation-types';
    import {remote} from 'electron';

    export default {
        data() {
            return {
            }
        },

        mounted() {
            this.$store.dispatch(Types.GET_MUSIC_LIST)
                .then((list) => {
                    console.log(list);
                });
        },

        methods: {
            openFolder() {
                let {dialog} = remote;

                dialog.showOpenDialog({
                    properties: ['openDirectory']
                },
                (folderUrl) => {
                    this.$store.commit(Types.SET_DATA, {url: folderUrl[0]});
                    this.$store.dispatch(Types.GET_MUSIC_LIST)
                        .then((list) => {
                            console.log(list);
                        });
                });
            }
        }
    }
</script>

<style lang="stylus">
    .wrapper {
        height: 100%;
        color: #fff;

        .folder {
            width: 30px;
            height: 30px;
            background: orange;
        }
    }
</style>