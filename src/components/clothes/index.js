import React, { useState, useEffect } from 'react';
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

    const filterByColor = (color) => {
        let yellowFilter = [...originalClothes].filter(x => x.color === color);
        setClothes(yellowFilter);
    }

    const filterBySize = (size) => {
        let sizeFilter = [...originalClothes].filter(x => x.size === size);
        setClothes(sizeFilter);
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
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("yellow")} />
                        <label htmlFor="yellow">Amarelo</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("blue")} />
                        <label htmlFor="blue">Azul</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("white")} />
                        <label htmlFor="white">Branco</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("gray")} />
                        <label htmlFor="gray">Cinza</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("orange")} />
                        <label htmlFor="orange">Laranja</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("green")} />
                        <label htmlFor="green">Verde</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("red")} />
                        <label htmlFor="red">Vermelho</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("black")} />
                        <label htmlFor="black">Preto</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("pink")} />
                        <label htmlFor="pink">Rosa</label><br />
                        <input type="radio" name="filterByColor" onClick={() => filterByColor("wine")} />
                        <label htmlFor="wine">Vinho</label><br />
                    </div>

                    <div>
                        <h3 className="filterStyle">TAMANHOS</h3>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("P")} />
                        <label htmlFor="p">P</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("M")} />
                        <label htmlFor="m">M</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("G")} />
                        <label htmlFor="g">G</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("GG")} />
                        <label htmlFor="gg">GG</label><br />
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("U")} />
                        <label htmlFor="u">U</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("36")} />
                        <label htmlFor="36">36</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("38")} />
                        <label htmlFor="38">38</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("40")} />
                        <label htmlFor="40">40</label><br />
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("42")} />
                        <label htmlFor="42">42</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("44")} />
                        <label htmlFor="44">44</label>
                        <input type="radio" name="filterBySize" onClick={() => filterBySize("46")} />
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