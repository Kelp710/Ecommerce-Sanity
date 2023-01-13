import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <div className='header'>
        <Head>
          <title>Tommy Harufiger</title>
        </Head>
      </div>
      <header>
        <Navbar/>
      </header>
      <main className='main'>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout