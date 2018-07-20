import fs from 'fs';
import path from 'path';
import * as Types from '../mutation-types';
import Vue from 'vue';

const state = {
    list: [],
    url: 'F:\\music/111111'
};

const mutations = {
    /**
     * set data
     * @param state
     * @param payload
     */
    [Types.SET_DATA](state, payload) {
        for (let key in payload) {
            Vue.set(state, key, payload[key]);
        }
    },

    /**
     * clear data
     * @param state
     */
    [Types.CLEAR_DATA](state) {
        state.list = [];
    }
};

const actions = {
    /**
     * get music list
     * @param state
     * @param commit
     */
    [Types.GET_MUSIC_LIST]({state, commit}) {
        let listInfo = [];
        let reg = new RegExp(/[.](mp3|wma|wav|asf|ogg)$/i);

        commit(Types.CLEAR_DATA);

        return fs.readdir(state.url, (err, files) => {
            if (err) {
                return Promise.reject(err);
            } else {
                files.forEach((filename) => {
                    let filedir = path.join(state.url, filename);
                    let item = {};

                    fs.stat(filedir, (err, stats) => {
                        if (err) {
                            throw err;
                        } else {
                            let isFile = stats.isFile();
                            let isDir = stats.isDirectory();

                            if (isFile) {
                                if (reg.test(filename)) {
                                    item.name = filename;
                                    item.url = filedir;
                                    item.content = fs.readFileSync(filedir, 'utf-8');
                                    listInfo.push(item);
                                }
                            }

                            if (isDir) {
                                console.log('directory', filename);
                            }
                        }
                    });
                });

                setTimeout(() => {
                    commit(Types.SET_DATA, {list: listInfo});
                    return Promise.resolve(listInfo);
                }, 0);
            }
        });
    }
};

export default {
    state,
    mutations,
    actions
}