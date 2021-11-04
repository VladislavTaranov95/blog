import service from "@/helpers/api";

export const posts = {
  namespaced: true,
  state: {
    posts: [],
    post: null,
    totalPosts: 0,
    postsOnPageAmount: 8,
    pages: 0,
    currentPage: 0
  },
  getters: {
    getPosts: state => {
      return state.posts
    },
    getTotalPosts: state => {
      return state.totalPosts
    },
    getPages: state => {
      return state.pages
    },
    getCurrentPage: state => {
      return state.currentPage
    },
    getAmountPostsOnPage: state => {
      return state.postsOnPageAmount
    }
  },
  actions: {
    async getPostsAmount({ state, commit }) {
      try {
        const response = await service.get("posts");
        commit("setTotalPosts", response.data.pagination.total);
        commit("setPagesAmount", Math.ceil(response.data.pagination.total / state.postsOnPageAmount))
      } catch (e) {
        console.log(e);
      }
    },
    async getPosts({ dispatch, commit, state }) {
      //get posts amount
      try {
        await dispatch('getPostsAmount')
      } catch (e) {
        console.log(e)
      }
      //get total posts after getting posts amount
      try {
        const response = await service.get("posts", {
          params: {
            limit: state.postsOnPageAmount,
            skip: (state.currentPage * state.postsOnPageAmount)
          }
        });
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
    async getPostById({ commit }, id) {
      return service.get(`posts/${id}`).then(
        response => {
          commit("setPost", response)
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error.response.data.error);
        }
      )
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setTotalPosts(state, postsAmount) {
      state.totalPosts = postsAmount
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
    sortPosts(state, data) {
      console.log('tyk tyk')
      state.posts.sort(function compare(a, b) {
        if (a[data] < b[data]) {
          return -1;
        }
        if (a[data] > b[data]) {
          return 1;
        }
        return 0;
      })
      state.filtered = data
    },
    setPagesAmount(state, pagesAmount) {
      state.pages = pagesAmount
    },
    setCurrentPage(state, page) {
      state.currentPage = page
    },
    setPost(state, post) {
      state.post = post
    }
  },
};