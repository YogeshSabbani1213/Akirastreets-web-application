import { useEffect, useState } from 'react'
import { FiChevronDown, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import brand from '../config/brand.js'
import { useCart } from '../context/useCart.js'
import Container from './Container.jsx'
import CartDrawer from './CartDrawer.jsx'

const categories = [
  { label: 'SHOP ALL', href: '#shop-all' },
  { label: 'BOTTOMWEAR', href: '#bottomwear' },
  { label: 'WOMENSWEAR', href: '#womenswear' },
  { label: 'ACCESSORIES', href: '#accessories' },
  { label: 'ONE OF ONE', href: '#one-of-one' },
  { label: 'SALE', href: '#sale' },
]

const topwearLinks = [
  { label: 'T-SHIRTS', href: '#t-shirts' },
  { label: 'SHIRTS', href: '#shirts' },
  { label: 'JACKETS', href: '#jackets' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [topwearOpen, setTopwearOpen] = useState(false)
  const { cartCount } = useCart()

  // WHY: Let shoppers dismiss either drawer with Escape and prevent background scrolling.
  useEffect(() => {
    if (!menuOpen && !cartOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setCartOpen(false)
        setTopwearOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen, cartOpen])

  function closeMenu() {
    setMenuOpen(false)
    setTopwearOpen(false)
  }

  function openMenu() {
    setCartOpen(false)
    setMenuOpen(true)
  }

  function openCart() {
    setMenuOpen(false)
    setTopwearOpen(false)
    setCartOpen(true)
  }

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <button
          aria-controls="store-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="icon-button site-header__menu-trigger"
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          type="button"
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>

        <a aria-label={`${brand.name} home`} className="site-header__logo" href="/">
          {brand.logo.src ? (
            <img src={brand.logo.src} alt={brand.logo.alt} />
          ) : (
            brand.name
          )}
        </a>

        <nav aria-label="Quick actions" className="site-header__actions">
          <a aria-label="Account" className="icon-button" href="#login">
            <FiUser aria-hidden="true" />
          </a>
          <button aria-label="Search" className="icon-button" type="button">
            <FiSearch aria-hidden="true" />
          </button>
          <button
            aria-controls="cart-drawer"
            aria-expanded={cartOpen}
            aria-label={`Shopping bag, ${cartCount} items`}
            className="icon-button cart-trigger"
            onClick={openCart}
            type="button"
          >
            <FiShoppingBag aria-hidden="true" />
            {cartCount > 0 && <span className="cart-trigger__count">{cartCount}</span>}
          </button>
        </nav>
      </Container>

      <button
        aria-hidden={!menuOpen}
        aria-label="Close menu"
        className={`menu-overlay${menuOpen ? ' is-open' : ''}`}
        onClick={closeMenu}
        tabIndex={menuOpen ? 0 : -1}
        type="button"
      />

      <aside
        aria-hidden={!menuOpen}
        className={`menu-drawer${menuOpen ? ' is-open' : ''}`}
        id="store-menu"
        inert={!menuOpen}
      >
        <div className="menu-drawer__header">
          <span className="menu-drawer__label">MENU</span>
          <button
            aria-label="Close menu"
            className="icon-button"
            onClick={closeMenu}
            type="button"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Store categories" className="menu-drawer__nav">
          {categories.slice(0, 1).map((item) => (
            <a className="menu-link" href={item.href} key={item.label} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <div className="menu-category">
            <button
              aria-expanded={topwearOpen}
              className="menu-link menu-category__toggle"
              onClick={() => setTopwearOpen((isOpen) => !isOpen)}
              type="button"
            >
              TOPWEAR
              <FiChevronDown
                aria-hidden="true"
                className={topwearOpen ? 'menu-category__chevron is-open' : 'menu-category__chevron'}
              />
            </button>
            {topwearOpen && (
              <div className="menu-category__submenu">
                {topwearLinks.map((item) => (
                  <a href={item.href} key={item.label} onClick={closeMenu}>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {categories.slice(1).map((item) => (
            <a className="menu-link" href={item.href} key={item.label} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="menu-link menu-link--login" href="#login" onClick={closeMenu}>
            LOGIN
          </a>
        </nav>
      </aside>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}

export default Header
