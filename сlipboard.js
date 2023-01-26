/*Интерфейс буфера обмена реализует API буфера обмена, предоставляя, если пользователь дает разрешение, доступ как для чтения, так и для записи содержимого системного буфера обмена. API буфера обмена можно использовать для реализации функций вырезания, копирования и вставки в веб-приложении.
 */


// ================= READ ===============================


/**
 * Метод read() интерфейса буфера обмена запрашивает копию содержимого буфера обмена, 
 * доставляя данные в возвращенный промис, когда промис разрешен. В отличие от readText(), 
 * метод read() может возвращать произвольные данные, например изображения. 
 * Этот метод также может возвращать текст.
 */
const destinationImage = document.querySelector('#destination')
const error = document.querySelector('.clipboard__error')

destinationImage.addEventListener('click', pasteImage);

async function pasteImage() {
    error.textContent = ''
    try {
        const permission = await navigator.permissions.query({
            name: 'clipboard-read'
        });
        if (permission.state === 'denied') {
            throw new Error('Not allowed to read clipboard.');
        }
        const clipboardContents = await navigator.clipboard.read();

        for (const item of clipboardContents) {

            if (!item.types.includes('image/png')) {
                error.textContent = 'В буфере обменя нет изображения'
                throw new Error('Clipboard contains non-image data.');
            }

            const blob = await item.getType('image/png');

            destinationImage.src = URL.createObjectURL(blob);
        }
    } catch (error) {
        console.error(error.message);
    }
}


// ============================ ReadText ===============================

/**
 * Метод readText() интерфейса буфера обмена возвращает обещание, 
 * которое разрешается копией текстового содержимого системного буфера обмена.
 */
const description = document.querySelector('.test-description')
const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    navigator.clipboard.readText()
        .then((data) => {
            description.textContent = data
        })

});


// ================================ write ==========================

/**
 * Метод write() буфера обмена записывает произвольные данные, например 
 * изображения, в буфер обмена. Это можно использовать для реализации 
 * функций вырезания и копирования.
 */


// берём любое изображение
const img = document.querySelector('.clipboard__img');
const copyImage = document.querySelector('.copy-image');

// создаём <canvas> того же размера
const canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

const context = canvas.getContext('2d');

// копируем изображение в  canvas (метод позволяет вырезать часть изображения)
context.drawImage(img, 0, 0);
// мы можем вращать изображение при помощи context.rotate() и делать множество других преобразований

// toBlob является асинхронной операцией, для которой callback-функция вызывается при завершении
copyImage.addEventListener('click', () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const context = canvas.getContext('2d')
    context.drawImage(img, 0, 0)
    canvas.toBlob(blob => {
        navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]).then(() => {
            console.log('Copied')
        })
    })

})



// ============================== writeText ===================



document.querySelector('.clipboard__copy').addEventListener('click', function () {
    this.classList.add('active')

    navigator.clipboard.writeText(this.textContent)

    setTimeout(() => {
        this.classList.remove('active')
    }, 2000)
})