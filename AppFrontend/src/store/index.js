import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    getMovies: state => state.movies
  },

  state: {
    movies: []
  },
  mutations: {
    update_movies(state, movies) {
      state.movies = movies;
    }
  },
  actions: {
    sendParams({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/getMovies",
          data: params,
          method: "POST"
        })
          .then(resp => {
            const movies = resp.data.movies;
            commit("update_movies", movies);
            alert(movies);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {}
});
