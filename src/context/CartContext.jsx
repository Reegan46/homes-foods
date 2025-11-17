import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);


  const addToCart = (food) => {
    setCart([...cart, food]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  function resetCart(){
    setCart([])

  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,resetCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;