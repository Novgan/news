import '../style/app.scss';
import loader from 'sass-loader';
const actualNewsUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts'
const latestNewsUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts?categories=33'
const imgUrl = 'https://renemorozowich.com/wp-json/wp/v2/media/'

fetch(actualNewsUrl)
    .then(data => (data.json()))
    .then((data) => {
        for (let i = 0; i < Math.ceil(data.length / 3); i++) {
            let selectElement = document.querySelector('.main-container__left__content')
            let createNewWrapper = document.createElement('div')
            createNewWrapper.classList.add(`main-container__left__content__wrapper`)
            createNewWrapper.setAttribute('id', `wrapper_${i + 1}`)
            selectElement.appendChild(createNewWrapper)
        }
        let point = 1;
        data.forEach((e, i) => {
            let featured_media = e.featured_media
            let result = e.title.rendered
            let date = e.date
            i % 3 === 0 && i !== 0 ? point++ : undefined
            let selectWrapper = document.querySelector(`#wrapper_${point}`)
            let createNewContentWrapper = document.createElement('div')
            createNewContentWrapper.classList.add(`position-relative`)
            createNewContentWrapper.setAttribute('id', `content_wrapper_${i + 1}`)
            selectWrapper.appendChild(createNewContentWrapper)

            let selectContentWrapper = document.querySelector(`#content_wrapper_${i + 1}`)
            let createNewElement = document.createElement('div')
            createNewElement.textContent = result
            createNewElement.setAttribute('id', `element_${i + 1}`)
            createNewElement.classList.add(`main-container__left__content__wrapper__elements`)
            fetch(imgUrl + featured_media).then(mediaData => (mediaData.json()))
                .then(mediaData => {
                    let createNewImg = document.createElement('img')
                    createNewImg.setAttribute('id', `img_${i + 1}`)
                    createNewImg.classList.add('main-container__left__content__wrapper__imgs')
                    createNewImg.src = mediaData.source_url
                    selectContentWrapper.appendChild(createNewImg)
                    selectContentWrapper.appendChild(createNewElement)
                })
        });
    })

fetch(latestNewsUrl)
    .then(data => (data.json()))
    .then((data) => {
        data.forEach((e, i) => {
            let result = e.title.rendered
            let date = e.date
            let selectWrapper = document.querySelector('.main-container__right__wrapper')
            let createNewWrapper = document.createElement('div')
            createNewWrapper.classList.add('main-container__right__wrapper__content')
            createNewWrapper.setAttribute('id', `right_content_wrapper_${i + 1}`)
            selectWrapper.appendChild(createNewWrapper)

            let selectElement = document.querySelector(`#right_content_wrapper_${i + 1}`)
            let createNewElement = document.createElement('div')
            createNewElement.textContent = result
            createNewElement.classList.add('main-container__right__wrapper__content__text')
            let createNewButton = document.createElement('button')
            createNewButton.textContent = i
            createNewButton.classList.add('main-container__right__wrapper__content__btn')
            selectElement.appendChild(createNewButton)
            selectElement.appendChild(createNewElement)
            if (i + 1 < data.length) {
                let createLine = document.createElement('div')
                createLine.classList.add('main-container__right__wrapper__content__line')
                selectElement.appendChild(createLine)
            }
        });
    })

window.addEventListener('load', () => {
    const loader = document.querySelector(".loader")
    loader.className += " hidden"
})

let showMore = document.querySelector('.main-container__left__show-more__wrapper')
let showMoreText = showMore.querySelector(".main-container__left__show-more__wrapper__text")

showMore.onclick = () => {
    showMoreText.textContent = "LOADING"
}