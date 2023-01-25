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

destinationImage.addEventListener('click', pasteImage);

async function pasteImage() {
    try {
        const permission = await navigator.permissions.query({
            name: 'clipboard-read'
        });
        if (permission.state === 'denied') {
            throw new Error('Not allowed to read clipboard.');
        }
        const clipboardContents = await navigator.clipboard.read();
        console.log('clipboardContents: ', clipboardContents);

        for (const item of clipboardContents) {

            if (!item.types.includes('image/png')) {
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
const description = document.querySelector('.description')
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


// ============================== writeText ===================



document.querySelector('.copy').addEventListener('click', function(){
    this.classList.add('active')
  
    navigator.clipboard.writeText(this.textContent)

    setTimeout(() => {
        this.classList.remove('active')
    }, 2000)
})