import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-500 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">FF</span>
          </div>
          <span className="font-bold text-xl">FindAFriend</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/pets"
            className="text-foreground/80 hover:text-brand-500 transition-colors"
          >
            Buscar Pets
          </Link>
          <Link
            to="/orgs"
            className="text-foreground/80 hover:text-brand-500 transition-colors"
          >
            Organizações
          </Link>
          <Link
            to="/about"
            className="text-foreground/80 hover:text-brand-500 transition-colors"
          >
            Sobre
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/signin">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Cadastrar</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 w-full py-4 px-6 flex flex-col gap-4 border-b shadow-lg">
          <Link
            to="/pets"
            className="py-2 text-foreground/80 hover:text-brand-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Buscar Pets
          </Link>
          <Link
            to="/orgs"
            className="py-2 text-foreground/80 hover:text-brand-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Organizações
          </Link>
          <Link
            to="/about"
            className="py-2 text-foreground/80 hover:text-brand-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sobre
          </Link>
          <div className="flex flex-col gap-2 mt-2">
            <Button
              variant="ghost"
              asChild
              className="justify-center w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/signin">Entrar</Link>
            </Button>
            <Button
              asChild
              className="justify-center w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/signup">Cadastrar</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
