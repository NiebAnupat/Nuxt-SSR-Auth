import Cookies from 'js-cookie'
export const state = () => ({
  user: null,
})

export const getter = {}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async login({ commit }, user) {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      )
      const { email, uid } = await this.$fire.auth.currentUser
      const userData = { email, uid }
      const token = await this.$fire.auth.currentUser.getIdToken()
      Cookies.set('access_token', token)
      await commit('setUser', userData)
      console.log('user logged in')
      this.app.router.push('/')
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async logout({ commit }) {
    await this.$fire.auth.signOut()
    await Cookies.remove('access_token')
    await commit('setUser', null)
    console.log('user logged out');
    location.href='/login'
  },
}
