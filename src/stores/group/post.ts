import {
  createPostApi,
  getPostsApi,
  deletePostApi,
  commentPostApi,
  getCommentPostApi,
  reactPostApi,
} from '@/services/group'
import type { IPost, ICreatePost, IComment, ICommentsPost } from '@/types/group'
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
    comments: [] as IComment[],
    listComnentByPostId: [] as ICommentsPost[],
  }),
  actions: {
    setIsUpdating(val: boolean) {
      this.isUpdating = val
    },
    async createPost(idGroup: string, payload: ICreatePost) {
      try {
        this.isUpdating = true
        const { data } = await createPostApi(idGroup, payload)
        this.posts.unshift(data)
        this.isUpdating = false
        showToast({
          description: 'Create post success',
          variant: 'default',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    async createCommentPost(idPost: string, payload: IComment) {
      try {
        this.isUpdating = true
        const { data } = await commentPostApi(idPost, payload)
        this.setCommentPosts(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
      this.isUpdating = false
    },
    async createReactPost(idPost: string) {
      try {
        this.isUpdating = true
        await reactPostApi(idPost)
        const result = this.posts.find((item) => item.id == idPost)
        if (result) {
          if (result.is_liked) {
            result.is_liked = !result.is_liked
            result.react_count -= 1
          } else {
            result.is_liked = !result.is_liked
            result.react_count += 1
          }
        }
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
    async getCommentByPostId(postId: any) {
      const result = this.listComnentByPostId.find((item) => item.post_id == postId)
      if (result) {
        return result.comments
      } else {
        try {
          const { data } = await getCommentPostApi(postId)
          this.comments = data
          this.listComnentByPostId.push({
            post_id: postId,
            comments: data,
          })
          return data
        } catch (error) {
          console.error(error)
          showToast({
            description: 'Fetch comments failed',
            variant: 'destructive',
          })
        }
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
    setCommentPosts(val: any) {
      this.comments = [...this.comments, val]
    },
  },
  getters: {
    getIsUpdating: (state) => state.isUpdating,
    getPosts: (state) => state.posts,
    getPostMeta: (state) => state.postMeta,
  },
})
