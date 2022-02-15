let switchContent = document.querySelector('.switch_content')
let switchCircle = document.querySelector('.switch_circle')

switchContent.addEventListener('click', () => {
    switchContent.classList.toggle('active')

    switchContent.classList.add('transition')
    switchCircle.classList.add('transition')
    setTimeout(() => {
        switchContent.classList.remove('transition')
        switchCircle.classList.remove('transition')
    }, 300)

    let linkTheme = document.getElementById('link_theme')

    if (switchContent.classList.contains('active'))
        linkTheme.href = 'assets/css/dark.css'
    else
        linkTheme.href = 'assets/css/light.css'
})


let burgerMenuBtn = document.querySelector('.burgerMenuBtn')
burgerMenuBtn.addEventListener('click', () => {
    burgerMenuBtn.classList.toggle('active')
})


if (window.matchMedia("(max-width: 1200)").matches) {
    console.log('anaaba')
    burgerMenuBtn.classList.toggle('hidden')
}