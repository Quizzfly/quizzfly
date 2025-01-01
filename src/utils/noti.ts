export function notifyMe(data: any) {
  if (Notification.permission === 'granted' && window.Notification) {
    const notification = new Notification('Notification!', {
      body: `${data.content}`,
      icon: 'https://res.cloudinary.com/dx5omabv0/image/upload/v1734167367/vdijsfa92grm0kw5chsi.jpg',
    })

    notification.onclick = (event: { preventDefault: () => void }) => {
      event.preventDefault()
      window.open(
        `https://quizzfly.site/groups/${data.target_id}/posts/${data.notification_type == 'POST' ? data.object.id : data.object.post_id}`,
        '_blank',
      )
    }
  } else {
    Notification.requestPermission()
      .then(function (p) {
        if (p === 'granted') {
          const notification = new Notification('Notification!', {
            body: `${data.content}`,
            icon: 'https://res.cloudinary.com/dx5omabv0/image/upload/v1734167367/vdijsfa92grm0kw5chsi.jpg',
          })

          notification.onclick = (event: { preventDefault: () => void }) => {
            event.preventDefault()
            window.open(
              `https://quizzfly.site/groups/${data.target_id}/posts/${data.notification_type == 'POST' ? data.object.id : data.object.post_id}`,
              '_blank',
            )
          }
        } else {
          console.log('User blocked notifications.')
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  }
}
