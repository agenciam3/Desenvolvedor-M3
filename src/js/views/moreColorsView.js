function moreColors() {
    const moreColors = document.querySelector('#moreColors')
    const restColors = [
        {color: 'green', value: 'Verde'},
        {color: 'red',   value: 'Vermelho'},
        {color: 'black', value: 'Preto'},
        {color: 'pink',  value: 'Rosa'},
        {color: 'wine',  value: 'Vinho'}
    ]

    restColors.forEach((obj) => {
        const { color, value } = obj
        console.log(color, value)
        const colors = document.createElement('label')
        colors.innerHTML = `
            <label for="${color}" class="containerInput">
                <input type="checkbox" id="${color}" value="color-${value}">
                <span class="checkmark"> <i class="bullet"></i> </span>
                <span>${value}</span>
            </label>
        `
        moreColors.parentNode.appendChild(colors)
    })
    moreColors.parentNode.removeChild(moreColors)
}

export default moreColors