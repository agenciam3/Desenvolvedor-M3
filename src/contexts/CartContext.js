import { createContext, useContext, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [isOpenned, setIsOpenned] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);

  if (isOpenned === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  function handleIsOpenned() {
    setIsOpenned((prevState) => !prevState);
  }

  function addProduct(product) {
    const alreadyAdded = productsInCart.find((item) => item.id === product.id);

    setProductsInCart((prevState) => (
      !alreadyAdded ? [...prevState, { ...product, totalPrice: product.price, quantity: 1 }]
        : prevState.map((item) => (
          item.id === product.id
            ? {
              ...item,
              totalPrice: item.totalPrice + product.price,
              quantity: item.quantity + 1,
            }
            : item
        ))
    ));
  }

  function productQunatityAdd(product) {
    const alreadyAdded = productsInCart.find((item) => item.id === product.id);

    setProductsInCart((prevState) => (
      alreadyAdded && prevState.map((item) => (
        item.id === product.id ? {
          ...item,
          totalPrice: item.totalPrice + product.price,
          quantity: item.quantity + 1,
        }
          : item
      ))
    ));
  }

  function productQunatityRemove(product) {
    const alreadyAdded = productsInCart.find((item) => item.id === product.id);

    setProductsInCart((prevState) => (
      alreadyAdded && prevState.map((item) => (
        item.quantity > 1 && item.id === product.id ? {
          ...item,
          totalPrice: item.totalPrice - product.price,
          quantity: item.quantity - 1,
        }
          : item
      ))
    ));
  }

  function removeProduct(id) {
    setProductsInCart((prevState) => (
      prevState.filter((item) => item.id !== id)
    ));
  }
  return (
    <CartContext.Provider
      value={{
        isOpenned,
        productsInCart,
        handleIsOpenned,
        addProduct,
        removeProduct,
        productQunatityAdd,
        productQunatityRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
