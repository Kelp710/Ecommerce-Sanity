import React, { useState,useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import { useStateContext } from '../context/StateContext'
import { runKohaku } from '../lib/utils'

const Success = () => {
    const { setCartItems,setTotalPrice, setTotalQuantities} = useStateContext();
    const [order, setOrder] = useState(null)
    useEffect(() => {
        runKohaku()
        localStorage.clear()
        setCartItems([]);
        setTotalPrice(0)
        setTotalQuantities(0)
     }, [])
     
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg2'>Check your email inbox for the receipt</p>
            <p className='description'>If you have any questions, Please send us emails
            <a className = 'email' href='mailto:order@expapmle.com'> , </a>
            </p>
        <Link href='/'>
            <button type="button" width="300px" className='btn'>
                Continue Shopping
            </button>
        </Link>
        </div>
    </div>
  )
}

export default Success