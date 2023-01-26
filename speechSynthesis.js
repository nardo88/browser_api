document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn')
    const input = document.querySelector('.speech__input')
    const voicesWrapper = document.querySelector('.voices')
    const speedInput = document.querySelector('.speed__input')
    const loudInput = document.querySelector('.loud__input')
    const stepInput = document.querySelector('.step__input')
    const speedValie = document.querySelector('.speed__valie')
    const loudValie = document.querySelector('.loud__valie')
    const stepValue = document.querySelector('.step__value')



    speedValie.textContent = speedInput.value
    loudValie.textContent = loudInput.value
    stepValue.textContent = stepInput.value

    speedInput.addEventListener('input', (e) => {
        speedValie.textContent = speedInput.value
    })

    loudInput.addEventListener('input', () => {
        loudValie.textContent = loudInput.value
    })

    stepInput.addEventListener('input', () => {
        stepValue.textContent = stepInput.value
    })

    btn.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(input.value);
        utterance.rate = speedInput.value
        utterance.volume = loudInput.value
        utterance.pitch = stepInput.value
        window.speechSynthesis.speak(utterance);
    })

    window.speechSynthesis.onvoiceschanged = function () {
        const updatedVoices = window.speechSynthesis.getVoices();
        updatedVoices.forEach(item => {
            const div = document.createElement('div')
            div.classList.add('voise-item')
            div.textContent = item.name
            div.addEventListener('click', function () {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(input.value);
                utterance.voice = item
                console.log('item: ', item);
                if(item.lang === 'ru-RU' && item.name !== 'Google русский'){
                    utterance.rate = speedInput.value
                }
                utterance.volume = loudInput.value
                utterance.pitch = stepInput.value
                window.speechSynthesis.speak(utterance);
            })
            voicesWrapper.insertAdjacentElement('beforeend', div)
        })
    };
})