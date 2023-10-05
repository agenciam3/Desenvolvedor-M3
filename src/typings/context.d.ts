type TContext = {
  bagCount: number,
  setBagCount: React.Dispatch<React.SetStateAction<number>>,
  products: TProduct[],
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>,
  productsToRender: TProduct[] | undefined,
  setProductsToRender: React.Dispatch<React.SetStateAction<TProduct[]>>,
  selectedColors: string[],
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>,
  selectedSizes: string[],
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>,
  selectedPrices: number[],
  setSelectedPrices: React.Dispatch<React.SetStateAction<number[]>>,
};

type TChildrenPass = {
  children: React.ReactNode;
};

interface IProducts {
  products: TProduct[];
}

type TProduct = {
  id: string;
  name: string;
  price: number;
  parcelamento: number[];
  color: string;
  image: string;
  size: string[];
  date: string;
};