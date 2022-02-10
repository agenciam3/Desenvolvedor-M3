import {
  createContext, useContext, useEffect, useState,
} from 'react';

import { ProductsInfo } from '../products';

import useWindowSize from '../hooks/useWindowSize';

export const FilterContext = createContext({});

export function FilterContextProvider({ children }) {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({});
  const [orderby, setOrderby] = useState(false);
  const [activeFilterMobile, setActiveFilterMobile] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    if (colors.length === 0 && sizes.length === 0 && !priceRange.show) {
      return setProductsFiltered(ProductsInfo);
    }

    filtered();
  }, [colors, sizes, priceRange, activeFilterMobile]);

  function filteringOnMobile() {
    setActiveFilterMobile((prevState) => (
      prevState === true ? false : true
    ));
  }

  function orderbyIsOpen() {
    setOrderby((prevState) => (prevState === false ? true : false));
  }

  function ordering(option) {
    if (option === 'recent') {
      const order = productsFiltered.reverse();

      setProductsFiltered(order);
    } else if (option === 'cheaper') {
      const order = productsFiltered.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });

      setProductsFiltered(order);
    } else if (option === 'more-expensive') {
      const order = productsFiltered.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });

      setProductsFiltered(order);
    } else {
      const order = productsFiltered;
      setProductsFiltered(order);
    }
  }

  function colorSelected(color) {
    const alreadyAdded = colors.find((prevColors) => prevColors === color);

    setColors((prevState) => (
      !alreadyAdded ? [...prevState, color]
        : prevState.filter((item) => (item !== color))
    ));
  }

  function sizeSelected(size) {
    const alreadyAdded = sizes.find((prevSizes) => prevSizes === size);

    setSizes((prevState) => (
      !alreadyAdded ? [...prevState, size]
        : prevState.filter((item) => (item !== size))
    ));
  }

  function priceSelected(price) {
    setPriceRange(price);
  }

  function filtered() {
    if (width <= 900 && !activeFilterMobile) return;

    const products = ProductsInfo
      .filter((item) => {
        if (colors.length >= 1) {
          for (let i = 0; colors.length > i; i++) {
            if (item.color.includes(colors[i])) {
              return true;
            }
          }
          return false;
        }
        return true;
      })
      .filter((item) => {
        if (sizes.length >= 1) {
          for (let i = 0; sizes.length > i; i++) {
            if (item.size.includes(sizes[i])) {
              return true;
            }
          }
          return false;
        }
        return true;
      })
      .filter((item) => {
        if (!priceRange.show) {
          return true;
        } else if (
          item.price >= priceRange.minValue
          && item.price <= priceRange.maxValue
        ) {
          return true;
        }
      });

    setProductsFiltered(products);
  }

  return (
    <FilterContext.Provider
      value={{
        colorSelected,
        sizeSelected,
        priceSelected,
        orderbyIsOpen,
        ordering,
        setColors,
        setSizes,
        setPriceRange,
        filteringOnMobile,
        productsFiltered,
        orderby,
        colors,
        sizes,
        priceRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
