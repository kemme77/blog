import React from 'react'
import Image from 'next/image'
import testimage from '@/images/EnkelTrick.png'
import Container from './Container'

const Header = () => {
  return (
    <header className="w-full flex items-center space-x-4">
      <h1 className="text-2xl font-bold text-left mb-0">Welcome to my blog</h1>
        <Container className="bg-red-300 max-w-lg">
          {/* Logo */}
          <Image src={testimage} alt="TestImage" height={50} width={50} />
          {/* Navigation Bar */}
          {/* Theme Switcher */}
          {/* Input */}
        </Container>
    </header>
  )
}

export default Header
