import React, { createContext, useContext, useState, useEfect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [sex, setSex] = useState('Male')
    const [model, setModel] = useState(null)
    const [yourModel, setYourModel] = useState(null)
    const [popUp, setPopUp] = useState(false);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart= cartItems.find((item) => item._id === product.id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevtotalQuantity) => prevtotalQuantity + quantity)
        if (checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct)=> {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
        setCartItems(updatedCartItems);
        }
        else{
            product.quantity = quantity

            setCartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to your cart!`);
    }

    const onRemove = (product) =>{
        foundProduct = cartItems.find((item)=>item._id===product._id)
        const newCartItems = cartItems.filter((item)=>item._id !== product._id)
        setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price* foundProduct.quantity)
        setTotalQuantities((prevtotalQuantity)=>prevtotalQuantity-foundProduct.quantity)
        setCartItems([...newCartItems])
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item)=>item._id===id)
        index= cartItems.findIndex((product) =>product._id === id)
        const newCartItems = cartItems.filter((item)=>item._id !== id)

        if(value==='inc'){
            setCartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity+1}])
            setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
            setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity+1)
        }
        else if(value==='dec'){
            if(foundProduct.quantity >1){
            setCartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity-1}])
            setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
            setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity-1)
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
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        sex,
        setSex,
        model,
        setModel,
        popUp,
        setPopUp,
        yourModel, 
        setYourModel
    }}>
        {children}
    </Context.Provider>)
}

export const useStateContext = () => 
    useContext(Context)
