const mediaDevicesWrapper = document.querySelector('.mediaDevices__wrapper')
const mediaBtn = document.querySelector('.mediaDevices__btn')

mediaBtn.addEventListener('click', async () => {
    const constraints = {
        video: true
    }
    // Для захвата потока из устройств пользователя используется метод getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    //Поток состоит из треков (одного и более). Для получения треков используются 
    //методы getTrackById, getTracks, getAudioTracks и getVideoTracks. Мы будем 
    // использовать только последний:
    const videoTrack = stream.getVideoTracks()[0]
    // Для захвата изображений и фреймов из видеотрека используется интерфейс ImageCapture:
    const imageCapture = new ImageCapture(videoTrack)
    // Для получения списка возможностей и настроек для фото используются метод getPhotoSettings
    const photoSettings = await imageCapture.getPhotoSettings()
    // Для получения снимка используется метод takePhoto. Данный метод возвращает Blob:
    const blob = await imageCapture.takePhoto(photoSettings)
    // Для создания ссылки на blob используется метод createObjectURL интерфейса URL:
    const src = URL.createObjectURL(blob)

    const image = document.createElement('img')
    image.classList.add('mediaDevices__image')
    image.src = src
    mediaDevicesWrapper.insertAdjacentElement('afterbegin', image)
})


