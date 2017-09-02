import axios from 'axios'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'


const backendURL = 'http://localhost:3000';

let instance = axios.create({
    timeout: 1000,
});

export const state = () => ({
    authUser: null,
    statistics: null,
    token: null,
})

export const mutations = {
    SET_USER: function (state, user) {
        state.authUser = user
    },
    SET_STATISTICS: function (state, statistics) {
        state.statistics = statistics
    },
    SET_TOKEN: function (state, token) {
        state.token = token;
        2instance.defaults.headers = { Authorization: 'Bearer ' + token };
    },
}

export const actions = {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit({ commit }, { req }) {
        try {
            const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("token="));
            if (jwtCookie) {
                let token = jwtCookie.split('=')[1];
                let payload = jwtDecode(token);
                let date = Date.now() / 1000;
                if (payload.exp > date) {
                    commit('SET_USER', payload);
                    commit('SET_TOKEN', token);
                    instance.defaults.baseURL = backendURL;
                }
            }
        } catch (error) {

        }
    },
    async login({ commit }, { username, password }) {
        try {
            const { data } = await axios.post('/api/login', { username, password });
            let payload = jwtDecode(data.token);
            Cookie.set('token', data.token, { expires: 1 / 24 * 6 });  // Expire for 6h       
            commit('SET_TOKEN', data.token);
            commit('SET_USER', payload);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Bad credentials')
            }
            throw error
        }
    },
    async logout({ commit }) {
        Cookie.remove('token');
        commit('SET_USER', null);
        commit('SET_TOKEN', null);
    },
    async statistics({ commit, state }) {
        //instance.defaults.headers['Authorization'] = 'Bearer ' + state.token;
        
        try {
            const { data } = await instance.get('/api/statistics');
            commit('SET_STATISTICS', data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Bad credentials')
            }
            throw error
        }
    },
}
