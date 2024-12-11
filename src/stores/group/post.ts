import {
  createPostApi,
  getPostsApi,
  deletePostApi,
  commentPostApi,
  getCommentPostApi,
  getPostDetailApi,
  reactPostApi,
  deleteCommentApi,
} from '@/services/group'
import type { IPost, ICreatePost, IComment, ICommentCreate } from '@/types/group'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import type { IPaging } from '@/types'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    isUpdating: false,
    posts: [] as IPost[],
    postDetail: {} as IPost,
    postMeta: null as IPaging | null,
    listComnentByPostId: [] as IComment[],
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
          variant: 'success',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    async createCommentPost(idPost: string, payload: ICommentCreate) {
      try {
        this.isUpdating = true
        await commentPostApi(idPost, payload)
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
    async getPostDetailByPostId(idGroup: string, idPost: string) {
      try {
        const { data } = await getPostDetailApi(idGroup, idPost)
        this.postDetail = data
        console.log(data, 'check data detail')
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Get detail post failed',
          variant: 'destructive',
        })
        throw error
      }
    },
    async getCommentByPostId(postId: string) {
      try {
        const data = await getCommentPostApi(postId)
        this.setCommentByPostId(data.data)
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch comments failed',
          variant: 'destructive',
        })
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
    async handleDeleteComment(idComment: string) {
      try {
        await deleteCommentApi(idComment)
        const index = this.listComnentByPostId.findIndex((i) => i.id === idComment)
        index > -1 && this.listComnentByPostId.splice(index, 1)
        showToast({
          description: 'Delete comment success',
          variant: 'default',
        })
      } catch (error) {
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    setCommentByPostId(data: IComment[]) {
      this.listComnentByPostId = data
      this.listComnentByPostId.forEach((el) => {
        el.isShowReply = false
      })
    },
    handleCommentByPostId(data: IComment) {
      this.listComnentByPostId.unshift(data)
      this.listComnentByPostId.forEach((el) => {
        el.isShowReply = false
      })
    },
  },
  getters: {
    getIsUpdating: (state) => state.isUpdating,
    getPosts: (state) => state.posts,
    getPostMeta: (state) => state.postMeta,
    getPostDetail: (state) => state.postDetail,
    getListComnentByPostId: (state) => state.listComnentByPostId,
  },
})
