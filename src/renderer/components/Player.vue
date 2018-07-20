<template>
    <div class="wrapper">
        <div class="music-list" @mouseover="showFolder" @mouseout="hideFolder">
            <transition name="fade">
                <div class="folder" v-show="this.show" @click="openFolder"></div>
            </transition>
            <div class="item" v-for="item in list">
                <music-item :name="item.name" :url="item.url"></music-item>
            </div>
        </div>
    </div>
</template>

<script>
    'use strict';

    import * as Types from '../store/mutation-types';
    import {remote} from 'electron';
    import musicItem from './ui/list-item';

    export default {
        components: {
            musicItem
        },

        data() {
            return {
                show: false
            }
        },

        mounted() {
            this.$store.dispatch(Types.GET_MUSIC_LIST)
                .then((list) => {
                    console.log(list);
                    console.log(this.$store.state.player);
                });
        },

        computed: {
            list() {
                return this.$store.state.player.list;
            }
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
                            console.log(this.$store.state.player);
                        });
                });
            },

            showFolder() {
                this.show = true;
            },

            hideFolder() {
                this.show = false;
            }
        }
    }
</script>

<style lang="stylus">
    .wrapper {
        height: 100%;

        .folder {
            position: fixed;
            bottom: 10px;
            left: 10px;
            width: 30px;
            height: 25px;
            background: url(../assets/icon-folder.png) no-repeat center;
            background-size: cover;
            opacity: .5;
            cursor: pointer;

            &:hover {
                opacity: .8;
            }
        }

        .music-list {
            position: absolute;
            top: 30px;
            left: 0;
            bottom: 0;
            right: 80%;
            min-width: 200px;
            padding-bottom: 50px;
            background: #1e1e1e;
            overflow-y: auto;
            overflow-x: hidden;

            &::-webkit-scrollbar {
                width: 4px;
                /*background-color: #0ec10e;*/
            }

            &::-webkit-scrollbar-track {
                background-color: #212121;
            }

            &::-webkit-scrollbar-thumb {
                background: #636463;
            }
        }

        .item:nth-child(odd) {
            background: #343434;

            &:hover {
                background: #3f3f3f;
            }
        }

        .item:nth-child(even) {
            background: #1e1e1e;

            &:hover {
                background: #262626;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0!important;
    }
</style>