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
let sideBar = document.querySelector('.sideBar')
burgerMenuBtn.addEventListener('click', () => {
    burgerMenuBtn.classList.toggle('active')
    sideBar.classList.toggle('hidden')
})


function burgerMenuShow(mediaQuery) {
    if (mediaQuery.matches){
        burgerMenuBtn.classList.add('hidden')
        burgerMenuBtn.classList.remove('active')
        sideBar.classList.add('hidden')

        document.querySelector('.menu').classList.remove('hidden')
        document.querySelector('.social').classList.remove('hidden')
    } else {
        burgerMenuBtn.classList.remove('hidden')

        document.querySelector('.menu').classList.add('hidden')
        document.querySelector('.social').classList.add('hidden')
    }
}


let trigger = window.matchMedia("(min-width: 1200px)")
burgerMenuShow(trigger)
trigger.addListener(burgerMenuShow)
