import '../style/app.scss';
const cors = 'https://cors-anywhere.herokuapp.com/'
const actualNewsUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts'
const latestNewsUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts?categories=33'
const imgUrl = 'https://renemorozowich.com/wp-json/wp/v2/media/'

//if ERROR 429 remove cors
let lengthArray
let div = document.createElement('div');
div.classList.add('main-container__left__content__wrapper__main', 'position-relative')



fetch(actualNewsUrl)
    .then(data => (data.json()))
    .then((data) => {
        let num = data.length
        for (let i = 1; num > 0 && (num -= 3) > -3; i++) {
            i % 2 === 0 && (num -= 1)
            let selectElement = document.querySelector('.main-container__left__content')
            let createNewWrapper = document.createElement('div')
            createNewWrapper.classList.add(`main-container__left__content__wrapper`)
            createNewWrapper.setAttribute('id', `wrapper_${i}`)
            selectElement.appendChild(createNewWrapper)
        }
        let flug = 0;
        let point = 1;
        lengthArray = data.length
        data.forEach((e, i) => {
            let featured_media = e.featured_media
            let result = e.title.rendered
            let date = e.date
            if (point % 2 === 0) {
                i % 7 === 0 && point++ && flug++
            } else {
                (i - flug) % 3 === 0 && i !== 0 ? point++ : undefined;
            }
            let selectWrapper = document.querySelector(`#wrapper_${point}`)
            let createNewContentWrapper = document.createElement('div')
            createNewContentWrapper.classList.add(`position-relative`)
            createNewContentWrapper.setAttribute('id', `content_wrapper_${i + 1}`)
            if (point % 2 === 0) {
                let createNewCurrentElement = document.createElement('div')
                if (i + 1 === 5) {
                    createNewCurrentElement.classList.add(`main-container__left__content__wrapper__main__element_${i + 1}`)
                    selectWrapper.appendChild(div).appendChild(createNewCurrentElement)
                }
                else if (i + 1 === 6) {
                    createNewCurrentElement.classList.add(`main-container__left__content__wrapper__main__two-elements`)
                    let someDiv = document.createElement('div')
                    someDiv.classList.add(`main-container__left__content__wrapper__main__two-elements_${i + 1}`)
                    div.appendChild(createNewCurrentElement).appendChild(someDiv)
                }
                else if (i + 1 === 7) {
                    createNewCurrentElement.classList.add(`main-container__left__content__wrapper__main__two-elements_${i + 1}`)
                    document.querySelector('.main-container__left__content__wrapper__main__two-elements').appendChild(createNewCurrentElement)
                }
                else {
                    selectWrapper.appendChild(createNewContentWrapper)
                }
            } else {
                selectWrapper.appendChild(createNewContentWrapper)
            }

            let selectContentWrapper = document.querySelector(`#content_wrapper_${i + 1}`)
            if (i + 1 === 5) {
                selectContentWrapper = document.querySelector(`.main-container__left__content__wrapper__main__element_${i + 1}`)
            }
            if (i + 1 === 6 || i + 1 === 7) {
                selectContentWrapper = document.querySelector(`.main-container__left__content__wrapper__main__two-elements_${i + 1}`)
            }
            /* if ((i + 1) > 3) {
                selectContentWrapper.hidden = true
            } */
            let createNewElement = document.createElement('div')
            createNewElement.textContent = result
            createNewElement.setAttribute('id', `element_${i + 1}`)
            createNewElement.classList.add(`main-container__left__content__wrapper__elements`)
            let createNewInfo = document.createElement('div')
            createNewInfo.textContent = date.slice(0, 10)
            createNewInfo.classList.add(`main-container__left__content__wrapper__info`)
            let createNewBtn = document.createElement('button')
            createNewBtn.textContent = 1
            createNewBtn.classList.add(`main-container__left__content__wrapper__btn`)
            fetch(imgUrl + featured_media).then(mediaData => (mediaData.json()))
                .then(mediaData => {
                    let createNewImg = document.createElement('img')
                    createNewImg.setAttribute('id', `img_${i + 1}`)
                    createNewImg.classList.add('main-container__left__content__wrapper__imgs')
                    createNewImg.src = mediaData.source_url
                    if (i + 1 === 7) {

                    }
                    selectContentWrapper.appendChild(createNewImg)
                    selectContentWrapper.appendChild(createNewElement)
                    selectContentWrapper.appendChild(createNewInfo)
                    selectContentWrapper.appendChild(createNewBtn)
                })
        })
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
            let createNewInfoWrapper = document.createElement('div')
            createNewInfoWrapper.classList.add('main-container__right__wrapper__content__info')
            createNewInfoWrapper.setAttribute('id', `right_content_wrapper_info_${i + 1}`)

            selectElement.appendChild(createNewButton)
            selectElement.appendChild(createNewElement)
            selectElement.appendChild(createNewInfoWrapper)

            let selectInfoWrapper = document.querySelector(`#right_content_wrapper_info_${i + 1}`)
            let createInfo = document.createElement('span')
            createInfo.textContent = date.slice(0, 10)
            selectInfoWrapper.appendChild(createInfo)

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
let currentIndex = 3

showMore.onclick = () => {
    showMoreText.textContent = "LOADING..."
    setTimeout(() => {                          //async emulation
        showMore.style.pointerEvents = 'none';
        let render = 3
        for (let i = 0; i < render; i++) {
            if (currentIndex < lengthArray) {
                currentIndex++
                document.querySelector(`#content_wrapper_${currentIndex}`).hidden = false
            }
        }
        if (currentIndex >= lengthArray) {
            document.querySelector(`.main - container__left__show - more__wrapper`).hidden = true
            return
        }
        showMore.disabled = true;
        showMoreText.textContent = "SHOW MORE"
        showMore.style.pointerEvents = 'auto';
    }, 2000)
}

let searchWrapper = document.querySelector('.header__search')
let search = document.querySelector('.fa-search')

search.onclick = () => {
    search.style.display = "none"
    if (!document.querySelector('.header__search__textarea')) {
        let selectTextArea = document.createElement('INPUT')
        selectTextArea.setAttribute("type", "text");
        selectTextArea.classList.add('header__search__textarea')
        selectTextArea.placeholder = 'Search'
        searchWrapper.appendChild(selectTextArea)
    }
    let selectText = document.querySelector('.header__search__textarea')
    if (selectText.style.display === "none") {
        selectText.style.display = "inherit"
    } else {
        selectText.addEventListener('focusout', (event) => {
            selectText.style.display = "none"
            search.style.display = "inherit"
        });
    }
}
