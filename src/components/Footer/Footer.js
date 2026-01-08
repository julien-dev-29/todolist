import './Footer.css'

export function Footer() {
    const footer = document.createElement('footer')
    footer.classList.add('footer')
    const h2 = document.createElement('h2')
    h2.textContent = "JuR0ll"
    footer.append(h2)
    return footer
}