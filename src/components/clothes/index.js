import React, { useState, useEffect }from 'react';
import Clothing from './clothing';
import '../header.js';

import './style.css';

async function getClothes() {
        let response = await fetch('http://localhost:3000/api/clothes.json');
        let data = await response.json();
        return data;
}

async function getOriginalClothes() {
    let response = await fetch('http://localhost:3000/api/originalClothes.json');
    let data = await response.json();
    return data;
}




const Clothes = () => {

    const [clothes, setClothes] = useState([]);
    const [originalClothes, setOriginalClothes] = useState([]);

    useEffect(() => {
            getClothes().then(data => {
                setClothes(data['clothes'])
            })
    }, [])

    useEffect(() => {
        getOriginalClothes().then(data => {
            setOriginalClothes(data['originalClothes'])
        })
    }, [])
   
    const filterByColorYellow = () => {
        let yellowFilter = [...originalClothes].filter(x => x.color === 'yellow');
        setClothes(yellowFilter);
    }
    const filterByColorBlue = () => {
        let blueFilter = [...originalClothes].filter(x => x.color === 'blue');
        setClothes(blueFilter);
    }
    const filterByColorWhite = () => {
        let whiteFilter = [...originalClothes].filter(x => x.color === 'white');
        setClothes(whiteFilter);
    }
    const filterByColorGray = () => {
        let grayFilter = [...originalClothes].filter(x => x.color === 'gray');
        setClothes(grayFilter);
    }
    const filterByColorOrange = () => {
        let orangeFilter = [...originalClothes].filter(x => x.color === 'orange');
        setClothes(orangeFilter);
    }
    const filterByColorGreen = () => {
        let greenFilter = [...originalClothes].filter(x => x.color === 'green');
        setClothes(greenFilter);
    }
    const filterByColorRed = () => {
        let redFilter = [...originalClothes].filter(x => x.color === 'red');
        setClothes(redFilter);
    }
    const filterByColorBlack = () => {
        let blackFilter = [...originalClothes].filter(x => x.color === 'black');
        setClothes(blackFilter);
    }
    const filterByColorPink = () => {
        let pinkFilter = [...originalClothes].filter(x => x.color === 'pink');
        setClothes(pinkFilter);
    }
    const filterByColorWine = () => {
        let wineFilter = [...originalClothes].filter(x => x.color === 'wine');
        setClothes(wineFilter);
    }


    const filterBySizeP = () => {
        let pFilter = [...originalClothes].filter(x => x.size === 'P');
        setClothes(pFilter);
    }
    const filterBySizeM = () => {
        let mFilter = [...originalClothes].filter(x => x.size === 'M');
        setClothes(mFilter);
    }
    const filterBySizeG = () => {
        let gFilter = [...originalClothes].filter(x => x.size === 'G');
        setClothes(gFilter);
    }
    const filterBySizeGG = () => {
        let ggFilter = [...originalClothes].filter(x => x.size === 'GG');
        setClothes(ggFilter);
    }
    const filterBySizeU = () => {
        let uFilter = [...originalClothes].filter(x => x.size === 'U');
        setClothes(uFilter);
    }
    const filterBySize36 = () => {
        let filter36 = [...originalClothes].filter(x => x.size === '36');
        setClothes(filter36);
    }
    const filterBySize38 = () => {
        let filter38 = [...originalClothes].filter(x => x.size === '38');
        setClothes(filter38);
    }
    const filterBySize40 = () => {
        let filter40 = [...originalClothes].filter(x => x.size === '40');
        setClothes(filter40);
    }
    const filterBySize42 = () => {
        let filter42 = [...originalClothes].filter(x => x.size === '42');
        setClothes(filter42);
    }
    const filterBySize44 = () => {
        let filter44 = [...originalClothes].filter(x => x.size === '44');
        setClothes(filter44);
    }
    const filterBySize46 = () => {
        let filter46 = [...originalClothes].filter(x => x.size === '46');
        setClothes(filter46);
    }

    const filterByPrice50 = () => {
        let upTo50Filter = [...originalClothes].filter(x => x.price.value <= 50 && x.price >= 0);
        setClothes(upTo50Filter);
    }
    const filterByPrice150 = () => {
        let upTo150Filter = [...originalClothes].filter(x => x.price <= 150 && x.price >= 51);
        setClothes(upTo150Filter);
    }
    const filterByPrice300 = () => {
        let upTo300Filter = [...originalClothes].filter(x => x.price <= 300 && x.price >= 151);
        setClothes(upTo300Filter);
    }
    const filterByPrice500 = () => {
        let upTo500Filter = [...originalClothes].filter(x => x.price <= 500 && x.price >= 301);
        setClothes(upTo500Filter);
    }
    const filterByPrice501 = () => {
        let upTo501Filter = [...originalClothes].filter(x => x.price >= 501);
        setClothes(upTo501Filter);
    }

        return (

            <div>
                <div className="row">
                    <div className="column left">
                        <div>
                            <h3 className="filterStyle">CORES</h3>
                            <input type="radio" name="filterByColor" onClick={filterByColorYellow} />
                            <label htmlFor="yellow">Amarelo</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorBlue} />
                            <label htmlFor="blue">Azul</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorWhite} />
                            <label htmlFor="white">Branco</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorGray} />
                            <label htmlFor="gray">Cinza</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorOrange} />
                            <label htmlFor="orange">Laranja</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorGreen} />
                            <label htmlFor="green">Verde</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorRed} />
                            <label htmlFor="red">Vermelho</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorBlack} />
                            <label htmlFor="black">Preto</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorPink} />
                            <label htmlFor="pink">Rosa</label><br />
                            <input type="radio" name="filterByColor" onClick={filterByColorWine} />
                            <label htmlFor="wine">Vinho</label><br />
                        </div>

                        <div>
                            <h3 className="filterStyle">TAMANHOS</h3>
                            <input type="radio" name="filterBySize" onClick={filterBySizeP} />
                            <label htmlFor="p">P</label>
                            <input type="radio" name="filterBySize" onClick={filterBySizeM} />
                            <label htmlFor="m">M</label>
                            <input type="radio" name="filterBySize" onClick={filterBySizeG} />
                            <label htmlFor="g">G</label>
                            <input type="radio" name="filterBySize" onClick={filterBySizeGG} />
                            <label htmlFor="gg">GG</label><br />
                            <input type="radio" name="filterBySize" onClick={filterBySizeU} />
                            <label htmlFor="u">U</label>
                            <input type="radio" name="filterBySize" onClick={filterBySize36} />
                            <label htmlFor="36">36</label>
                            <input type="radio" name="filterBySize" onClick={filterBySize38} />
                            <label htmlFor="38">38</label>
                            <input type="radio" name="filterBySize" onClick={filterBySize40} />
                            <label htmlFor="40">40</label><br />
                            <input type="radio" name="filterBySize" onClick={filterBySize42} />
                            <label htmlFor="42">42</label>
                            <input type="radio" name="filterBySize" onClick={filterBySize44} />
                            <label htmlFor="44">44</label>
                            <input type="radio" name="filterBySize" onClick={filterBySize46} />
                            <label htmlFor="46">46</label>
                        </div>

                        <div>
                            <h3 className="filterStyle">PREÇOS</h3>
                            <input type="radio" name="filterByPrice" onClick={filterByPrice50} />
                            <label htmlFor="50">de R$ 0 até R$ 50</label><br />
                            <input type="radio" name="filterByPrice" onClick={filterByPrice150} />
                            <label htmlFor="150">de R$ 51 até R$ 150</label><br />
                            <input type="radio" name="filterByPrice" onClick={filterByPrice300} />
                            <label htmlFor="300">de R$ 151 até R$ 300</label><br />
                            <input type="radio" name="filterByPrice" onClick={filterByPrice500} />
                            <label htmlFor="500">de R$ 301 até R$ 500</label><br />
                            <input type="radio" name="filterByPrice" onClick={filterByPrice501} />
                            <label htmlFor="501">a partir de R$ 501</label><br />
                        </div>
                    </div>
                    <div className="column right">
                        <div className="rows">
                            {clothes.map((clothing) =>
                                <Clothing
                                    name={clothing.name}
                                    price={clothing.price}
                                    img_url={clothing.img_url}
                                    installment={clothing.installment}
                                    color={clothing.color}
                                    size={clothing.size}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default Clothes;