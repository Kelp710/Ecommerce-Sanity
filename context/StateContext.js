import React, { createContext, useContext, useState, useEfect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [model, setModel] = useState(null)
    const [yourModel, setYourModel] = useState(null)
    const [popUp, setPopUp] = useState(false);
    const [mergedPic, setMergedPic] = useState(null)
    const [checkedPic, setCheckedPic] = useState(null)

    let foundProduct;
    let index;

    const toggleCartItemQuanitity = (num, id, value) => {
        foundProduct = cartItems.find((item)=>item._id===id)
        index= cartItems.findIndex((product) =>product._id === id)
        const newCartItems = cartItems.filter((item)=>item._id !== id)

        if(value==='inc'){
            setCartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity+num}])
            setTotalPrice((prevTotalPrice)=>prevTotalPrice+(foundProduct.price*num))
            setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity+num)
        }
        else if(value==='dec'){
            if(foundProduct.quantity >1){
            setCartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity-num}])
            setTotalPrice((prevTotalPrice)=>prevTotalPrice-(foundProduct.price*num))
            setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity-num)
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

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        
        if(checkProductInCart) {
          cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id)  {
                toggleCartItemQuanitity(quantity,cartProduct._id,'inc')
                console.log(quantity)
            }
          })
    
        } else {
          product.quantity = quantity;
          
          setCartItems([...cartItems, { ...product }]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        }
    
        toast.success(`${qty} ${product.name} added to the cart.`);
      } 
    
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
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
        model,
        setModel,
        popUp,
        setPopUp,
        yourModel, 
        setYourModel,
        mergedPic,
        setMergedPic,
        checkedPic, 
        setCheckedPic
    }}>
        {children}
    </Context.Provider>)
}

export const useStateContext = () => 
    useContext(Context)
