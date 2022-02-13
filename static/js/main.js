let themeSwitch = document.getElementById('themeSwitch')
themeSwitch.onchange = function () {
    let theme = document.getElementById('theme')
    if (themeSwitch.checked)
        theme.href = '../static/css/light.css'
    else
        theme.href = '../static/css/dark.css'
}