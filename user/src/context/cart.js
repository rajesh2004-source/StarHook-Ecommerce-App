import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvide = ({ children }) => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        let cartItemhere = localStorage.getItem('cart')
        if (cartItemhere) setCart(JSON.parse(cartItemhere));
    }, []);
    return (
        < CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export { useCart, CartProvide }