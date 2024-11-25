import { createPostApi, getPostsApi, deletePostApi } from '@/services/group'
import type { IPost, ICreatePost } from '@/types/group'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import type { IPaging } from '@/types'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    isUpdating: false,
    posts: [] as IPost[],
    postMeta: null as IPaging | null,
  }),
  actions: {
    setIsUpdating(val: boolean) {
      this.isUpdating = val
    },
    async createPost(idGroup: string, payload: ICreatePost) {
      try {
        this.isUpdating = true
        await createPostApi(idGroup, payload)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
      this.isUpdating = false
    },
    async fetchPosts(page = 1, idGroup: string) {
      try {
        const { data, meta } = await getPostsApi(page, idGroup)
        this.posts = data
        this.postMeta = meta as IPaging
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch posts failed',
          variant: 'destructive',
        })
        throw error
      }
    },
    async handleDeleteGroup(idPost: string) {
      try {
        await deletePostApi(idPost)
        const index = this.posts.findIndex((i) => i.id === idPost)
        index > -1 && this.posts.splice(index, 1)
        showToast({
          description: 'Delete post success',
          variant: 'default',
        })
      } catch (error) {
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
  },
  getters: {
    getIsUpdating: (state) => state.isUpdating,
    getPosts: (state) => state.posts,
    getPostMeta: (state) => state.postMeta,
  },
})
