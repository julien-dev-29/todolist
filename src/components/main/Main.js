import './Main.css'

export function Main() {
    const main = document.createElement('div')
    main.classList.add('main')
    main.textContent = "Main"
    return main
}

export function setMainContent(elem){
    const main = document.querySelector('.main')
    main.replaceChildren()
    main.append(elem)
}