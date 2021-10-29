import service from "@/helpers/api";

export const posts = {
  namespaced: true,
  state: {
    posts: []
  },
  getters: {
    getPosts: state => {
      return state.posts
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await service.get("posts");
        commit("setPosts", response.data.data);
      } catch (e) {
        console.log(e);
      }
    },
    async addLikeToPost({ commit }, data) {
      try {
        await service.put(`posts/like/${data.postId}`)
        commit('setLikeToPost', data)
      } catch (error) {
        console.log(error)
      }
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLikeToPost(state, data) {
      state.posts.forEach(item => {
        if (item._id === data.postId) {
          if (!item.likes.includes(data.userId)) {
            return item.likes.push(data.userId)
          } else {
            return item.likes.splice(item.likes.indexOf(data.userId), 1)
          }
        }
      })
    },
  },
};