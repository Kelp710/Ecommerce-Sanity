import React, { createContext, useContext, useState, useEfect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart= cartItems.find((item) => item._id === product.id);
        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        settotalQuantities((prevtotalQuantity) => prevtotalQuantity + quantity)
        if (checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct)=> {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
        setcartItems(updatedCartItems);
        }
        else{
            product.quantity = quantity

            setcartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to your cart!`);
    }

    const onRemove = (product) =>{
        foundProduct = cartItems.find((item)=>item._id===product._id)
        const newCartItems = cartItems.filter((item)=>item._id !== product._id)
        settotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price* foundProduct.quantity)
        settotalQuantities((prevtotalQuantity)=>prevtotalQuantity-foundProduct.quantity)
        setcartItems([...newCartItems])
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item)=>item._id===id)
        index= cartItems.findIndex((product) =>product._id === id)
        const newCartItems = cartItems.filter((item)=>item._id !== id)

        if(value==='inc'){
            setcartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity+1}])
            settotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
            settotalQuantities((prevTotalQuantity)=>prevTotalQuantity+1)
        }
        else if(value==='dec'){
            if(foundProduct.quantity >1){
            setcartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity-1}])
            settotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
            settotalQuantities((prevTotalQuantity)=>prevTotalQuantity-1)
            }
        }
    }

    const incQty = () =>{
        setQty((prevQty) => prevQty + 1)
    }
    const decQty = () =>{
        setQty((prevQty) => {if(prevQty-1<1) return 1
        return prevQty-1
        })
    }

    return(<Context.Provider value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
    }}>
        {children}
    </Context.Provider>)
}

export const useStateContext = () => 
    useContext(Context)
