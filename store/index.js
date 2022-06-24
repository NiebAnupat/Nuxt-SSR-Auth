/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
import JWTDecode from 'jwt-decode'
import CookieParser from 'cookieparser'

export const state = () => ({})

export const getter = {}

export const mutations = {}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log('nuxtServerInit....')

    if (process.server && process.static) {console.log('return 1'); return;}
    if (!req.headers.cookie) {console.log('return 2'); return;}

    const parsed = CookieParser.parse(req.headers.cookie)
    const access_token = parsed.access_token

    if (!access_token) {console.log('return 3'); return;}

    const decoded = JWTDecode(access_token)

    if (!decoded) {console.log('return 4'); return;}

    commit('users/setUser', {
      uid: decoded.user_uid,
      email: decoded.user_email,
    })

    console.log('user logged in')
  },
}
