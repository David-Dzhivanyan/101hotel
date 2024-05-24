import Vue from 'vue';
import Vuex from 'vuex';

import commentary from "../components/Commentary/Commentary";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        commentary,
    }
})
