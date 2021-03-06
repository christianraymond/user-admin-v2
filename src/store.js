import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    clearAuth(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    signup({ commit }, authData) {
      axios
        .post(
          "https://1myy62by28.execute-api.af-south-1.amazonaws.com/default/demo-api",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });

          router.push("/dashboard");
        })
        .catch(err => {
          console.log(err)
          alert(err)
        })
    },
    login({ commit }, authData) {
      const url = "https://1myy62by28.execute-api.af-south-1.amazonaws.com/default/demo-api";
      axios.post(url, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
        headers: {
          "Access-Control-Allow-Origin": '*'
        },
      }).then(res => {
        this.message = res.data.message;
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("token", res.data.idToken);
        commit("authUser", {
          response: res.data.message,
          userId: res.data.localId,
          token: res.data.idToken,
        });
        router.push("/dashboard");
      })
        .catch(err => {
          console.log(err)
          alert(err)
        })
    },
    logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.replace("/");
    },
    AutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("authUser", {
        token: token,
        userId: userId
      });
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    ifAuthenticated(state) {
      return state.idToken !== null;
    }
  }
});
