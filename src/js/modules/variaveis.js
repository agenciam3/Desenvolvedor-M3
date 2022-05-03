
export const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z"/></svg> `;
export const cores = ["Amarelo", "Azul", "Branco", "Cinza", "Laranja", "Verde", "Vermelho", "Preto", "Rosa", "Vinho"];

export const tamanhos = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"];

export const preço = ["de R$0 até R$50", "de R$51 até R$150","de R$151 até R$ 300", "de R$301 até R$500", "a partir de R$500"];

export const menus = [
    {
        h3: "Cores",
        array: cores,
        className: "menu-options-cores"
    },
    {   h3: "Tamanhos",
        array: tamanhos,
        className: "menu-options-tamanhos"
    },
    {
        h3: "Faixa de Preço",
        array: preço,
        className: "menu-options-price"
    }
]