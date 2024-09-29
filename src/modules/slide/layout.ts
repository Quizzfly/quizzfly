import ImagePicker from '@/components/base/ImagePicker.vue'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import type { Component } from 'vue'

interface Row {
  id: number
  element: 'group' | Component
  elementType?: 'image' | 'video' | 'input' | 'textarea'
  label: 'title' | 'description' | 'Image' | 'group'
  props?: any
  columns?: Row[]
  rows?: Row[]
}

// interface Column {
//   id: number
//   element: 'group' | Component
//   elementType?: 'image' | 'video' | 'input' | 'textarea'
//   rows?: Row[]
// }

export type SlideLayoutType = 'classic' | 'big-title' | 'big-media' | 'title-and-text' | 'quote'

export interface SlideLayout {
  type: SlideLayoutType
  rows: Row[]
}

export const classicLayout: SlideLayout = {
  type: 'classic',
  rows: [
    {
      id: 1,
      element: Input,
      elementType: 'input',
      label: 'title',
      props: {
        placeholder: 'Title',
      },
    },
    {
      id: 2,
      element: ImagePicker,
      elementType: 'image',
      label: 'Image',
    },
    {
      id: 3,
      element: Input,
      elementType: 'textarea',
      label: 'description',
      props: {
        placeholder: 'Description',
      },
    },
  ],
}

export const bigTitleLayout: SlideLayout = {
  type: 'big-title',
  rows: [
    {
      id: 1,
      element: 'group',
      label: 'group',
      columns: [
        {
          id: 1,
          element: 'group',
          label: 'group',
          rows: [
            {
              id: 1,
              element: Input,
              elementType: 'input',
              label: 'title',
              props: {
                placeholder: 'Title',
              },
            },
            {
              id: 2,
              element: Input,
              elementType: 'input',
              label: 'description',
              props: {
                placeholder: 'Description',
              },
            },
          ],
        },
        {
          id: 2,
          element: 'group',
          label: 'group',
          rows: [
            {
              id: 2,
              element: ImagePicker,
              elementType: 'image',
              label: 'Image',
            },
          ],
        },
      ],
    },
  ],
}

export const titleAndTextLayout: SlideLayout = {
  type: 'title-and-text',
  rows: [
    {
      id: 1,
      element: 'group',
      label: 'group',
      columns: [
        {
          id: 1,
          element: 'group',
          label: 'group',
          rows: [
            {
              id: 1,
              element: Input,
              elementType: 'input',
              label: 'title',
              props: {
                placeholder: 'Title',
              },
            },
            {
              id: 2,
              element: Textarea,
              elementType: 'textarea',
              label: 'description',
              props: {
                placeholder: 'Description',
              },
            },
          ],
        },
        {
          id: 2,
          element: ImagePicker,
          elementType: 'image',
          label: 'Image',
        },
      ],
    },
  ],
}

export const quoteLayout: SlideLayout = {
  type: 'quote',
  rows: [
    {
      id: 1,
      element: ImagePicker,
      elementType: 'image',
      label: 'Image',
    },
    {
      id: 2,
      element: Input,
      elementType: 'input',
      label: 'title',
      props: {
        placeholder: 'Title',
      },
    },
    {
      id: 3,
      element: Input,
      elementType: 'textarea',
      label: 'description',
      props: {
        placeholder: 'Description',
      },
    },
  ],
}

export const slideLayouts = [classicLayout, bigTitleLayout, titleAndTextLayout, quoteLayout]
