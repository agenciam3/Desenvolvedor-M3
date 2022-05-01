const fetchProducts = () => {
    const baseUrl = 'http://localhost:5000/products'

    fetch(baseUrl).then(response => response.json())
        .then(products => {
            this.products
          

            function CreateArray(dbArray) {

                const productsCards = dbArray.reduce((acc, dbArray) => {

                    if (dbArray.id > 9) {


                        acc += `
                    <li class="card" id="cardList"> 
                    <img class="cardImage" src="${dbArray.image}"/>
                    <h2 class="cardTitle">${dbArray.name}</h2>
                    <p class="cardPrice">R$ ${Math.floor(dbArray.price)},00</p>
                    <p class="cardInstallment">até ${dbArray.parcelamento[0]}x de R$${Math.ceil(dbArray.parcelamento[1])},00</p>
                    <button id="${dbArray.id}"class="buyButton">Comprar</button>
                    </li>
                    `
                    } else {
                        acc += `
                    <li class="card" id="cardList2"> 
                    <img class="cardImage" src="${dbArray.image}"/>
                    <h2 class="cardTitle">${dbArray.name}</h2>
                    <p class="cardPrice">R$ ${Math.floor(dbArray.price)},00</p>
                    <p class="cardInstallment">até ${dbArray.parcelamento[0]}x de R$${Math.ceil(dbArray.parcelamento[1])},00</p>
                    <button id="${dbArray.id}" class="buyButton">Comprar</button>
                    </li>
                    `

                    }
                    return acc

                }, '')

                const main = document.querySelector('.main')
                main.innerHTML = productsCards
            }
            CreateArray(products)

            document.getElementById('priceSort').addEventListener('change', SortArray)
            function SortArray() {
                const value = document.getElementById("priceSort").selectedIndex

                if (value === 1) {

                    products.sort((a, b) => {
                        if (a.date > b.date) {
                            return -1;
                            if (a.date < b.date) {
                                return 1;
                            }
                            return 0
                        }
                    })
                    return CreateArray(products)

                }
                if (value === 2) {
                    products.sort((a, b) => {
                        if (a.price < b.price) {
                            return -1;
                            if (a.price > b.price) {
                                return 1;
                            }
                            return 0
                        }
                    })
                    return CreateArray(products)

                }
                if (value === 3) {
                    products.sort((a, b) => {
                        if (a.price > b.price) {
                            return -1;
                            if (a.price < b.price) {
                                return 1;
                            }
                            return 0
                        }
                    })
                    return CreateArray(products)
                }
            }


            document.getElementById("mostRecentMobile").addEventListener('click', SortMostRecent)
            function SortMostRecent() {
                products.sort((a, b) => {
                    if (a.date > b.date) {
                        return -1;
                        if (a.date > b.date) {
                            return 1;
                        }
                        return 0
                    }
                })
                return CreateArray(products)
            }


            document.getElementById("lowestPriceMobile").addEventListener('click', SortLowestPrice)
            function SortLowestPrice() {
                products.sort((a, b) => {
                    if (a.price < b.price) {
                        return -1;
                        if (a.price > b.price) {
                            return 1;
                        }
                        return 0
                    }
                })
                return CreateArray(products)
            }
            

            document.getElementById("biggestPriceMobile").addEventListener('click', SortBiggestPrice)
            function SortBiggestPrice() {
                products.sort((a, b) => {
                    if (a.price > b.price) {
                        return -1;
                        if (a.price < b.price) {
                            return 1;
                        }
                        return 0
                    }
                })
                return CreateArray(products)
            }


            document.getElementById('yellow').addEventListener('click', YellowSort)
            function YellowSort() {
                function isYellow(value) {
                    if (value.color === "Amarelo") {
                        return value
                    }
                }

                const newFilter = products.filter(isYellow)
                return CreateArray(newFilter)

            }

            document.getElementById('yellowMobile').addEventListener('click', YellowSortMobile)
            function YellowSortMobile() {
                function isYellow(value) {
                    if (value.color === "Amarelo") {
                        return value
                    }
                }

                const newFilter = products.filter(isYellow)
                return CreateArray(newFilter)

            }

            

            document.getElementById('blue').addEventListener('click', BlueSort)
            function BlueSort() {

                function isBlue(value) {
                    if (value.color === "Azul") {
                        return value
                    }
                }
                const newFilter = products.filter(isBlue)
                return CreateArray(newFilter)

            }

            document.getElementById('blueMobile').addEventListener('click', BlueSortMobile)
            function BlueSortMobile() {

                function isBlue(value) {
                    if (value.color === "Azul") {
                        return value
                    }
                }
                const newFilter = products.filter(isBlue)
                return CreateArray(newFilter)

            }

            document.getElementById('white').addEventListener('click', WhiteSort)
            function WhiteSort() {

                function isWhite(value) {
                    if (value.color === "Branco") {
                        return value
                    }
                }
                const newFilter = products.filter(isWhite)
                return CreateArray(newFilter)

            }

            document.getElementById('whiteMobile').addEventListener('click', WhiteSortMobile)
            function WhiteSortMobile() {

                function isWhite(value) {
                    if (value.color === "Branco") {
                        return value
                    }
                }
                const newFilter = products.filter(isWhite)
                return CreateArray(newFilter)

            }

            document.getElementById('gray').addEventListener('click', GraySort)
            function GraySort() {

                function isGray(value) {
                    if (value.color === "Cinza") {
                        return value
                    }
                }
                const newFilter = products.filter(isGray)
                return CreateArray(newFilter)

            }

            document.getElementById('grayMobile').addEventListener('click', GraySortMobile)
            function GraySortMobile() {

                function isGray(value) {
                    if (value.color === "Cinza") {
                        return value
                    }
                }
                const newFilter = products.filter(isGray)
                return CreateArray(newFilter)

            }

            document.getElementById('orange').addEventListener('click', OrangeSort)
            function OrangeSort() {

                function isOrange(value) {
                    if (value.color === "Laranja") {
                        return value
                    }
                }
                const newFilter = products.filter(isOrange)
                return CreateArray(newFilter)

            }

            document.getElementById('orangeMobile').addEventListener('click', OrangeSortMobile)
            function OrangeSortMobile() {

                function isOrange(value) {
                    if (value.color === "Laranja") {
                        return value
                    }
                }
                const newFilter = products.filter(isOrange)
                return CreateArray(newFilter)

            }

            document.getElementById('green').addEventListener('click', GreenSort)
            function GreenSort() {

                function isGreen(value) {
                    if (value.color === "Verde") {
                        return value
                    }
                }
                const newFilter = products.filter(isGreen)
                return CreateArray(newFilter)

            }

            document.getElementById('greenMobile').addEventListener('click', GreenSortMobile)
            function GreenSortMobile() {

                function isGreen(value) {
                    if (value.color === "Verde") {
                        return value
                    }
                }
                const newFilter = products.filter(isGreen)
                return CreateArray(newFilter)

            }

            document.getElementById('red').addEventListener('click', RedSort)
            function RedSort() {

                function isRed(value) {
                    if (value.color === "Vermelho") {
                        return value
                    }
                }
                const newFilter = products.filter(isRed)
                return CreateArray(newFilter)

            }

            document.getElementById('redMobile').addEventListener('click', RedSortMobile)
            function RedSortMobile() {

                function isRed(value) {
                    if (value.color === "Vermelho") {
                        return value
                    }
                }
                const newFilter = products.filter(isRed)
                return CreateArray(newFilter)

            }

            document.getElementById('black').addEventListener('click', BlackSort)
            function BlackSort() {

                function isBlack(value) {
                    if (value.color === "Preto") {
                        return value
                    }
                }
                const newFilter = products.filter(isBlack)
                return CreateArray(newFilter)

            }

            document.getElementById('blackMobile').addEventListener('click', BlackSortMobile)
            function BlackSortMobile() {

                function isBlack(value) {
                    if (value.color === "Preto") {
                        return value
                    }
                }
                const newFilter = products.filter(isBlack)
                return CreateArray(newFilter)

            }

            document.getElementById('pink').addEventListener('click', PinkSort)
            function PinkSort() {

                function isPink(value) {
                    if (value.color === "Rosa") {
                        return value
                    }
                }
                const newFilter = products.filter(isPink)
                return CreateArray(newFilter)

            }

            document.getElementById('pinkMobile').addEventListener('click', PinkSortMobile)
            function PinkSortMobile() {

                function isPink(value) {
                    if (value.color === "Rosa") {
                        return value
                    }
                }
                const newFilter = products.filter(isPink)
                return CreateArray(newFilter)

            }

            document.getElementById('wine').addEventListener('click', WineSort)
            function WineSort() {

                function isWine(value) {
                    if (value.color === "Vinho") {
                        return value
                    }
                }
                const newFilter = products.filter(isWine)
                return CreateArray(newFilter)

            }

            
            document.getElementById('wineMobile').addEventListener('click', WineSortMobile)
            function WineSortMobile() {

                function isWine(value) {
                    if (value.color === "Vinho") {
                        return value
                    }
                }
                const newFilter = products.filter(isWine)
                return CreateArray(newFilter)

            }

            document.getElementById('50').addEventListener('click', MoneySort)
            function MoneySort() {

                function isPrice50(value) {
                    if (value.price <= 50) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice50)
                return CreateArray(newFilter)

            }



            document.getElementById('50Mobile').addEventListener('click', MoneySortMobile)
            function MoneySortMobile() {

                function isPrice50(value) {
                    if (value.price <= 50) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice50)
                return CreateArray(newFilter)

            }

            document.getElementById('150').addEventListener('click', MoneySort151)
            function MoneySort151() {

                function isPrice151(value) {
                    if (value.price > 50 && value.price <= 150) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice151)
                return CreateArray(newFilter)

            }

            document.getElementById('150Mobile').addEventListener('click', MoneySort151Mobile)
            function MoneySort151Mobile() {

                function isPrice151(value) {
                    if (value.price > 50 && value.price <= 150) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice151)
                return CreateArray(newFilter)

            }

            document.getElementById('300').addEventListener('click', MoneySort300)
            function MoneySort300() {

                function isPrice300(value) {
                    if (value.price > 150 && value.price <= 300) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice300)
                return CreateArray(newFilter)

            }

            document.getElementById('300Mobile').addEventListener('click', MoneySort300Mobile)
            function MoneySort300Mobile() {

                function isPrice300(value) {
                    if (value.price > 150 && value.price <= 300) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice300)
                return CreateArray(newFilter)

            }

            document.getElementById('500').addEventListener('click', MoneySort500)
            function MoneySort500() {

                function isPrice500(value) {
                    if (value.price > 300 && value.price <= 500) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice500)
                return CreateArray(newFilter)
            }

            document.getElementById('500Mobile').addEventListener('click', MoneySort500Mobile)
            function MoneySort500Mobile() {

                function isPrice500(value) {
                    if (value.price > 300 && value.price <= 500) {
                        return value
                    }
                }
                const newFilter = products.filter(isPrice500)
                return CreateArray(newFilter)
            }

            document.getElementById('moreThan500').addEventListener('click', MoneySortMoreThan500)
            function MoneySortMoreThan500() {

                function isMoreThan500(value) {
                    if (value.price > 500) {
                        return value
                    }
                }
                const newFilter = products.filter(isMoreThan500)
                return CreateArray(newFilter)

            }

            document.getElementById('moreThan500Mobile').addEventListener('click', MoneySortMoreThan500Mobile)
            function MoneySortMoreThan500Mobile() {

                function isMoreThan500(value) {
                    if (value.price > 500) {
                        return value
                    }
                }
                const newFilter = products.filter(isMoreThan500)
                return CreateArray(newFilter)

            }

            document.getElementById('p').addEventListener('click', SizeSortP)
            function SizeSortP() {

                function isP(value) {
                    const teste = value.size
                    if (teste.includes('P')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isP)
                return CreateArray(newCloths)
            }



            document.getElementById('pMobile').addEventListener('click', SizeSortPMobile)
            function SizeSortPMobile() {

                function isP(value) {
                    const teste = value.size
                    if (teste.includes('P')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isP)
                return CreateArray(newCloths)
            }

            
            document.getElementById('m').addEventListener('click', SizeSortM)
            function SizeSortM() {

                function isM(value) {
                    const teste = value.size
                    if (teste.includes('M')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isM)
                return CreateArray(newCloths)
            }

            document.getElementById('mMobile').addEventListener('click', SizeSortMMobile)
            function SizeSortMMobile() {

                function isM(value) {
                    const teste = value.size
                    if (teste.includes('M')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isM)
                return CreateArray(newCloths)
            }
            


            document.getElementById('g').addEventListener('click', SizeSortG)
            function SizeSortG() {

                function isG(value) {
                    const teste = value.size
                    if (teste.includes('G')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isG)
                return CreateArray(newCloths)
            }

            document.getElementById('gMobile').addEventListener('click', SizeSortGMobile)
            function SizeSortGMobile() {

                function isG(value) {
                    const teste = value.size
                    if (teste.includes('G')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isG)
                return CreateArray(newCloths)
            }
            

            document.getElementById('gg').addEventListener('click', SizeSortGG)
            function SizeSortGG() {

                function isGG(value) {
                    const teste = value.size
                    if (teste.includes('GG')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isGG)
                return CreateArray(newCloths)
            }

            document.getElementById('ggMobile').addEventListener('click', SizeSortGGMobile)
            function SizeSortGGMobile() {

                function isGG(value) {
                    const teste = value.size
                    if (teste.includes('GG')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isGG)
                return CreateArray(newCloths)
            }


            document.getElementById('u').addEventListener('click', SizeSortU)
            function SizeSortU() {

                function isU(value) {
                    const teste = value.size
                    if (teste.includes('U')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isU)
                return CreateArray(newCloths)
            }

            document.getElementById('uMobile').addEventListener('click', SizeSortUMobile)
            function SizeSortUMobile() {

                function isU(value) {
                    const teste = value.size
                    if (teste.includes('U')) {
                        return teste
                    }
                }
                const newCloths = products.filter(isU)
                return CreateArray(newCloths)
            }

            document.getElementById('thirtySix').addEventListener('click', SizeSortThirtySix)
            function SizeSortThirtySix() {

                function isThirtySix(value) {
                    const teste = value.size
                    if (teste.includes('36')) {
                        return teste
                    }
                }
                
                const newCloths = products.filter(isThirtySix)
                return CreateArray(newCloths)
            }


            document.getElementById('thirtySixMobile').addEventListener('click', SizeSortThirtySixMobile)
            function SizeSortThirtySixMobile() {

                function isThirtySix(value) {
                    const teste = value.size
                    if (teste.includes('36')) {
                        return teste
                    }
                }
                
                const newCloths = products.filter(isThirtySix)
                return CreateArray(newCloths)
            }

            document.getElementById('thirtyEight').addEventListener('click', SizeSortThirtyEight)
            function SizeSortThirtyEight() {

                function isThirtyEight(value) {
                    const teste = value.size
                    if (teste.includes('38')) {
                        return teste
                    }
                }
               
                const newCloths = products.filter(isThirtyEight)
                return CreateArray(newCloths)
            }



            document.getElementById('thirtyEightMobile').addEventListener('click', SizeSortThirtyEightMobile)
            function SizeSortThirtyEightMobile() {

                function isThirtyEight(value) {
                    const teste = value.size
                    if (teste.includes('38')) {
                        return teste
                    }
                }
                
                const newCloths = products.filter(isThirtyEight)
                return CreateArray(newCloths)
            }

            document.getElementById('forty').addEventListener('click', SizeSortForty)
            function SizeSortForty() {

                function isForty(value) {
                    const teste = value.size
                    if (teste.includes('40')) {
                        return teste
                    }
                }
               
                const newCloths = products.filter(isForty)
                return CreateArray(newCloths)
            }

            
            document.getElementById('fortyMobile').addEventListener('click', SizeSortFortyMobile)
            function SizeSortFortyMobile() {

                function isForty(value) {
                    const teste = value.size
                    if (teste.includes('40')) {
                        return teste
                    }
                }
               
                const newCloths = products.filter(isForty)
                return CreateArray(newCloths)
            }


            let count = 1;
            function BuyItem() {
                document.getElementById("cartItems").innerHTML = count;
                ++count;
            }

            let buyButton = document.getElementsByClassName('buyButton');
            for (var i = 0; i < buyButton.length; i++) {

                (function (index) {
                    buyButton[i].addEventListener("click", function () {


                    
                        BuyItem()


                    })
                })(i);
            }

            document.getElementById("seeMoreColors").addEventListener('click', ShowColors)
            function ShowColors() {

                document.querySelectorAll('.form-control2').forEach(function (colors) {
                    const moreColors = document.getElementById("seeMoreColors")
                    colors.style.display = 'flex'
                    if (colors.style.display === 'flex') {
                        moreColors.style.display = 'none'
                    }
                })

            }

            document.getElementById('loadBtn').addEventListener('click', SelectCards)
            function SelectCards() {
                const card = document.querySelectorAll('#cardList').forEach(function (card) {
                    card.style.display = 'block'
                })
            }

            document.getElementById('clearFilter').addEventListener('click', ApplyFilter)
            function ApplyFilter() {
                onClickQuit()
                return CreateArray(products)
            }
        })

    document.getElementById('quitIcon').addEventListener('click', onClickQuit)
    function onClickQuit() {
        onClickFilter()

    }
    document.getElementById('quitSortIcon').addEventListener('click', onClickSortQuit)
    function onClickSortQuit() {
        onClickSort()

    }


    document.getElementById('filterMobile').addEventListener('click', onClickFilter)
    function onClickFilter() {
        document.getElementById('header').classList.toggle('invisible')
        document.getElementById('mobileCloth').classList.toggle('invisible')
        document.getElementById('mainCards').classList.toggle('invisible')
        document.getElementById('footer').classList.toggle('invisible')
        document.getElementById('loadBtn').classList.toggle('invisible')
        document.getElementById('filterMobile').classList.toggle('invisible')
        document.getElementById('sortMobile').classList.toggle('invisible')
        document.getElementById('sidebarFilterMobile').classList.toggle('invisible')
        document.getElementById('navMobile').classList.toggle('invisible')
        
        ShowColorsMobile()
    }

    document.getElementById("colorsVectorMobile").addEventListener('click', ShowColorsMobile)
    function ShowColorsMobile() {
        document.querySelectorAll('.form-control2').forEach(function (colors) {

            colors.classList.toggle('visible')
        })

    }

    document.getElementById("SizesVectorMobile").addEventListener('click', ShowSizesMobile)
    function ShowSizesMobile() {
        document.getElementById('othSizes').classList.toggle('invisible')

    }

    document.getElementById("PriceVectorMobile").addEventListener('click', ShowPriceMobile)
    function ShowPriceMobile() {
        document.getElementById('pricesCheckbox').classList.toggle('invisible')

    }

    document.getElementById('applyFilter').addEventListener('click', ApplyFilter)
    function ApplyFilter() {
        onClickQuit()
    }


    document.getElementById('sortMobile').addEventListener('click', onClickSort)
    function onClickSort() {
        document.getElementById('header').classList.toggle('invisible')
        document.getElementById('mobileCloth').classList.toggle('invisible')
        document.getElementById('mainCards').classList.toggle('invisible')
        document.getElementById('footer').classList.toggle('invisible')
        document.getElementById('loadBtn').classList.toggle('invisible')
        document.getElementById('filterMobile').classList.toggle('invisible')
        document.getElementById('sortMobile').classList.toggle('invisible')
        document.getElementById('sidebarSortMobile').classList.toggle('invisible')
        document.getElementById('mobileComboBox').classList.toggle('invisible')

    }






}
fetchProducts()