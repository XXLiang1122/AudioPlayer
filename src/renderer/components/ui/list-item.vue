<template>
    <div class="item-content">
        <p @click="play">{{this.name}}</p>
    </div>
</template>

<script>
    export default {
        name: 'music-item',

        data() {
            return {
                count: 0
            }
        },

        props: {
            name: {
                type: String,
                default: ''
            },

            url: {
                type: String,
                default: ''
            }
        },

        methods: {
            play() {
                this.count++;
                setTimeout(() => {
                    if (this.count >= 2) {
                        console.log(this.url);
                    }
                    this.count = 0;
                }, 300);
            }
        }
    }
</script>

<style lang="stylus">
    .item-content {
        width: 100%;
        height: 30px;
        padding-left: 15px;
        font-size: 14px;
        line-height: 30px;
        color: #818181;
        cursor: pointer;
        user-select: none;

        &:hover {
            color: #ccc;
        }
    }
</style>