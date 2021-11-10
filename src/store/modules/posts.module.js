import service from "@/helpers/api";

export const posts = {
  namespaced: true,
  state: {
    posts: [],
    post: null,
    totalPosts: 0,
    postsOnPageAmount: 8,
    pages: 0,
    currentPage: 0,
    selectedSort: "title"
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
    },
    sortPosts: state => {
      return state.posts.sort((a, b) => a[state.selectedSort].split(' ').join().toUpperCase().localeCompare(b[state.selectedSort].split(' ').join().toUpperCase()))
    },
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
    async addNewPost({ commit }, post) {
      return service.post("posts", {
        title: post.title,
        description: post.description,
        fullText: post.fullText
      }).then(response => {
        commit("setNewPost", response.data);
        return Promise.resolve(response);
      },
        error => {
          return Promise.reject(error);
        });
    },
    async deletePost({ commit }, id) {
      return service.delete(`posts/${id}`).then(
        response => {
          commit("deletePost", id);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error.response.data.error);
        }
      )
    },
    async getNameById(_, id) {
      return service.get(`users/${id}`).then(
        response => {
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error.response.data.error);
        }
      )
    },
    async savePost({ commit }, post) {
      return service.patch(`posts/${post._id}`, {
        title: post.title,
        fullText: post.fullText,
        description: post.description
      }).then(
        (response) => {
          commit("updatePost", response.data)
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error.error);
        }
      )
    },
    async editPostPhoto({ commit }, payload) {
      console.log(payload)
      const response = await service.put('/posts/upload/' + payload.postId, payload.image, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      commit('updatePost', response.data)
    },
    async getPostComments(_, postId) {
      return service.get(`comments/post/${postId}`).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error.error);
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
    setPagesAmount(state, pagesAmount) {
      state.pages = pagesAmount
    },
    setCurrentPage(state, page) {
      state.currentPage = page
    },
    setPost(state, post) {
      state.post = post
    },
    setSelectedSort(state, value) {
      state.selectedSort = value
    },
    setNewPost(state, post) {
      state.posts.push(post);
    },
    deletePost(state, id) {
      state.posts = state.posts.filter(p => p._id !== id);
    },
    updatePost(state, data) {
      state.posts.forEach(post => {
        if (post._id === data._id) {
          post = { ...data }
        }
      })
    },
  },
};