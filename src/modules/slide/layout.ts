interface Row {
  id: number
  element: 'input' | 'textarea' | 'image' | 'video'
  props?: any
  value: string
}

export type SlideLayoutType = 'classic' | 'big-title' | 'big-media' | 'title-and-text' | 'quote'

export interface SlideLayout {
  type: SlideLayoutType
  columns: Array<Row[]>
}

export const classicLayout: SlideLayout = {
  type: 'classic',
  columns: [
    [
      {
        id: 1,
        element: 'input',
        value: '',
        props: {
          label: 'Title',
          placeholder: 'Title',
        },
      },
      {
        id: 2,
        element: 'textarea',
        value: '',
        props: {
          label: 'Description',
          placeholder: 'Description',
        },
      },
      {
        id: 3,
        value: '',
        element: 'image',
        props: {
          label: 'Image',
        },
      },
    ],
  ],
}

export const bigTitleLayout: SlideLayout = {
  type: 'big-title',
  columns: [
    [
      {
        id: 1,
        element: 'input',
        value: '',
        props: {
          label: 'Title',
          placeholder: 'Title',
        },
      },
      {
        id: 2,
        element: 'textarea',
        value: '',
        props: {
          label: 'Description',
          placeholder: 'Description',
        },
      },
    ],
    [
      {
        id: 3,
        element: 'image',
        value: '',
        props: {
          label: 'Image',
        },
      },
    ],
  ],
}

export const titleAndTextLayout: SlideLayout = {
  type: 'title-and-text',
  columns: [
    [
      {
        id: 1,
        element: 'input',
        value: '',
        props: {
          label: 'Title',
          placeholder: 'Title',
        },
      },
      {
        id: 2,
        element: 'textarea',
        value: '',
        props: {
          label: 'Description',
          placeholder: 'Description',
        },
      },
    ],
    [
      {
        id: 3,
        element: 'image',
        value: '',
        props: {
          label: 'Image',
        },
      },
    ],
  ],
}

export const bigImage: SlideLayout = {
  type: 'quote',
  columns: [
    [
      {
        id: 1,
        element: 'image',
        value: '',
        props: {
          label: 'Image',
        },
      },
    ],
  ],
}

export const slideLayouts = [classicLayout, bigTitleLayout, titleAndTextLayout, bigImage]
