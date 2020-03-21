import Vue from 'vue'
import Vuex from 'vuex'
import { getCinemaDirect, getData2, getData4, getcity } from '@/utils/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    detail_arr: [], // 详情页电影数组
    lunbo: [], // 轮播图图片
    cinema: [], // 电影院数组
    city: '', // 定位到的城市数据
    cities: [], // 所有的城市
    cinameDirect: [], // navbar直接搜索的电影院，
    movie: [], // 购买页传来的电影数据
    movieShowInfo: [],
    imgIndex: 0
  },
  getters: {
    cityId (state) {
      // 处理城市的ID  因为高德地图地位的城市的信息数组和这个网站对应的城市名的数组不一样，所以要判断一下
      return state.city.adcode ? Number(state.city.adcode) : Number(state.city.cityId)
    },
    cityName (state) {
      // 处理城市的名字  因为高德地图地位的城市的信息数组和这个网站对应的城市名的数组不一样，所以要判断一下
      return state.city.name ? state.city.name : state.city.city
    }
  },
  mutations: {
    getIndex (state, payload) {
      state.imgIndex = payload
    },
    getShowInfo (state, payload) {
      state.movieShowInfo = payload
    },
    getMoive (state, payload) {
      state.movie = payload
    },
    pushCityId (state, payload) {
      state.city = payload
      // 向state中存当前定位的城市的ID
    },
    // pushCheckCode (state, list) {
    //   this.checkCode = list
    //   // 存储验证码
    // },
    pushdata2 (state, list) {
      state.detail_arr = list
      // 存详情页数组
    },
    pushdata3 (state, list) {
      state.cities = list
      // 存所有的城市
    },
    pushdata4 (state, list) {
      state.lunbo = list
      // 存轮播图
    },
    pushcinema (state, list) {
      // 存电影院
      state.cinema = list.data.cinemas
    },
    pushCInemaDirect (state, list) {
      // navbar直接搜索的电影院，
      state.cinameDirect = list
    }
  },
  actions: {
    get1 (context) {
      // 请求所有的城市的接口
      getcity().then(res => {
        context.commit('pushdata3', res.data.cities)
      })
    },
    get2 (context, { id }) {
      // 请求详情页接口
      getData2(id).then(res => {
        context.commit('pushdata2', res.data.film)
      })
    },
    get4 (context) {
      // 请求轮播图接口
      getData4().then(res => {
        context.commit('pushdata4', res.data)
      })
    },
    // get5 ({ commit }) { // 请求验证码
    //   getCheckCode().then(res => {
    //     console.log(res)
    //   })
    // },
    // 在navbar中直接请求本地电影院信息
    get8 ({ commit, getters }) {
      // console.log(getters.cityId)
      getCinemaDirect(getters.cityId).then(res => {
        commit('pushCInemaDirect', res)
      })
    }
  }
})
