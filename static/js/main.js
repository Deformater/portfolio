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
        linkTheme.href = '../static/css/dark.css'
    else
        linkTheme.href = '../static/css/light.css'
})