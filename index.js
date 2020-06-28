import '../style/app.scss';
const cors = 'https://cors-anywhere.herokuapp.com/'
const actualNewsUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts'
const latestNewsUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts?categories=33'
const imgUrl = 'https://renemorozowich.com/wp-json/wp/v2/media/'
const categories = 'https://renemorozowich.com/wp-json/wp/v2/categories/'

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
                    createNewCurrentElement.setAttribute('id', `content_wrapper_${i + 1}`)
                    createNewCurrentElement.classList.add(`main-container__left__content__wrapper__main__element_${i + 1}`, 'position-relative')
                    selectWrapper.appendChild(div).appendChild(createNewCurrentElement)
                }
                else if (i + 1 === 6) {
                    createNewCurrentElement.classList.add(`main-container__left__content__wrapper__main__two-elements`)
                    let someDiv = document.createElement('div')
                    someDiv.setAttribute('id', `content_wrapper_${i + 1}`)
                    someDiv.classList.add(`main-container__left__content__wrapper__main__two-elements_${i + 1}`, 'position-relative')
                    div.appendChild(createNewCurrentElement).appendChild(someDiv)
                }
                else if (i + 1 === 7) {
                    createNewCurrentElement.setAttribute('id', `content_wrapper_${i + 1}`)
                    createNewCurrentElement.classList.add(`main-container__left__content__wrapper__main__two-elements_${i + 1}`, 'position-relative')
                    document.querySelector('.main-container__left__content__wrapper__main__two-elements').appendChild(createNewCurrentElement)
                }
                else {
                    selectWrapper.appendChild(createNewContentWrapper)
                }
            } else {
                selectWrapper.appendChild(createNewContentWrapper)
            }
            let selectContentWrapper = document.querySelector(`#content_wrapper_${i + 1}`)
            if ((i + 1 % 5) === 0) {
                selectContentWrapper = document.querySelector(`.main-container__left__content__wrapper__main__element_${i + 1}`)
            }
            if ((i + 1 % 6) === 0 || (i + 1 % 7) === 0) {
                selectContentWrapper = document.querySelector(`.main-container__left__content__wrapper__main__two-elements_${i + 1}`)
            }
            if ((i + 1) > 3) {
                selectContentWrapper.hidden = true
            }
            let createNewElement = document.createElement('div')
            createNewElement.textContent = result
            createNewElement.style.pointerEvents = "none";
            createNewElement.setAttribute('id', `element_${i + 1}`)
            if (i + 1 === 4)
                createNewElement.classList.add(`main-container__left__content__wrapper__info-elements`)
            else if ((i + 1 % 6) === 0 || (i + 1 % 7) === 0)
                createNewElement.classList.add(`main-container__left__content__wrapper__elements__title`)
            else
                createNewElement.classList.add(`main-container__left__content__wrapper__elements`)
            let createNewInfo = document.createElement('div')
            createNewInfo.textContent = date.slice(0, 10).replace(/-/g, '.')
            createNewInfo.setAttribute('id', `date_${i + 1}`)
            createNewInfo.style.pointerEvents = "none";
            createNewInfo.classList.add(`main-container__left__content__wrapper__info`)
            let createNewBtn = document.createElement('button')
            fetch(categories + e.categories[0]).then(categoriesInfo => (categoriesInfo.json()))
                .then((categoriesInfo) => {
                    createNewBtn.textContent = categoriesInfo.name
                })
            createNewBtn.classList.add(`main-container__left__content__wrapper__btn`, 'btn')
            fetch(imgUrl + featured_media).then(mediaData => (mediaData.json()))
                .then(mediaData => {
                    let createNewImg = document.createElement('img')
                    createNewImg.setAttribute('id', `img_${i + 1}`)
                    createNewImg.classList.add('main-container__left__content__wrapper__imgs')
                    createNewImg.src = mediaData.source_url
                    selectContentWrapper.appendChild(createNewImg)
                    selectContentWrapper.appendChild(createNewElement)
                    selectContentWrapper.appendChild(createNewBtn)
                    if (i + 1 === 4) {
                        let some = document.createElement('div')
                        some.classList.add('main-container__left__content__wrapper__info__wrapper')
                        let someElement = document.createElement('div')
                        someElement.style.pointerEvents = "none";
                        someElement.classList.add('main-container__left__content__wrapper__info__wrapper__content')
                        someElement.textContent = e.excerpt.rendered.slice(0, 200).replace(/<p>/g, '').replace(/<[/]p>/g, '').replace(/&#8217;/g, '`') + ' ...'
                        selectContentWrapper.appendChild(some).appendChild(someElement)
                        selectContentWrapper.appendChild(some).appendChild(createNewInfo)
                    } else {
                        selectContentWrapper.appendChild(createNewInfo)
                    }
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
            fetch(categories + e.categories[0]).then(categoriesInfo => (categoriesInfo.json()))
                .then((categoriesInfo) => {
                    createNewButton.textContent = categoriesInfo.name
                })
            createNewButton.classList.add('main-container__right__wrapper__content__btn', 'btn')
            let createNewInfoWrapper = document.createElement('div')
            createNewInfoWrapper.classList.add('main-container__right__wrapper__content__info')
            createNewInfoWrapper.setAttribute('id', `right_content_wrapper_info_${i + 1}`)
            selectElement.appendChild(createNewButton)
            selectElement.appendChild(createNewElement)
            selectElement.appendChild(createNewInfoWrapper)
            let selectInfoWrapper = document.querySelector(`#right_content_wrapper_info_${i + 1}`)
            let createInfo = document.createElement('span')
            createInfo.textContent = date.slice(0, 10).replace(/-/g, '.')
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

showMore.addEventListener('click', e => {
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
            document.querySelector(`.main-container__left__show-more__wrapper`).hidden = true
        }
        showMore.disabled = true;
        showMoreText.textContent = "SHOW MORE"
        showMore.style.pointerEvents = 'auto';
    }, 1000)
})

let searchWrapper = document.querySelector('.header__search')
let search = document.querySelector('.fa-search')

search.addEventListener('click', e => {
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
})


let x = window.matchMedia("(max-width: 1050px)")
let menu = document.querySelector('.header__logo')
let headerMenu = document.querySelector('.header__menu')
let menuItem = document.querySelector('.header__menu__items')
let latestNews = document.querySelector('.main-container__right__header__text')


let menuRoll = () => {
    headerMenu.style.top = 0
    headerMenu.style.transform = 'translate-y(100%)'
    headerMenu.style.transition = '1s'
}
let menuReverseRoll = () => {
    headerMenu.style.top = '-100%'
    headerMenu.style.transform = 'translate-y(-100%)'
    headerMenu.style.transition = '1s'
    console.log(12);

}

let myFunction = x => {
    if (x.matches) {
        latestNews.textContent = 'LATEST'
        menuItem.textContent = 'EXIT'
        menuItem.style.color = '#DCA74A'
        menu.addEventListener('click', menuRoll)
        menuItem.addEventListener('click', menuReverseRoll)
    } else {
        menuItem.textContent = 'Policy'
        latestNews.textContent = 'LATEST NEWS'
        menuItem.style.color = '#BFC0C1'
        menu.removeEventListener('click', menuRoll)
        menuItem.removeEventListener('click', menuReverseRoll)
    }
}
myFunction(x)
x.addListener(myFunction)