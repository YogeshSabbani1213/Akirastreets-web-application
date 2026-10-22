import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import PageMeta from '../components/PageMeta.jsx'
import { useCart } from '../context/useCart.js'
import formatPrice from '../utils/formatPrice.js'

function Cart() {
  const { items, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart()

  // WHY: Keep cart edits and totals connected to the shared cart state on this page.
  return (
    <>
      <PageMeta
        description="Review the items in your Akira shopping bag."
        title="Shopping Cart"
      />
      <Container>
      <section className="py-12 sm:py-16">
        <header className="mb-8 border-b border-neutral-300 pb-5">
          <p className="text-xs tracking-[0.2em]">AKIRA / YOUR BAG</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
            Shopping cart
          </h1>
          <p className="mt-2 text-sm">{cartCount} items</p>
        </header>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm">Your bag is currently empty.</p>
            <Link
              className="mt-6 inline-flex border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
              to="/collections/shop-all"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <ul className="divide-y divide-neutral-300">
              {items.map((item) => (
                <li className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6" key={item.cartItemId}>
                  <Link aria-label={`View ${item.name}`} to={`/products/${item.slug}`}>
                    {item.image ? (
                      <img
                        alt={item.name}
                        className="aspect-[3/4] w-full object-cover"
                        decoding="async"
                        height="280"
                        loading="lazy"
                        src={item.image}
                        width="210"
                      />
                    ) : (
                      <span aria-hidden="true" className="block aspect-[3/4] bg-neutral-100" />
                    )}
                  </Link>
                  <div className="flex min-w-0 flex-col justify-between gap-4">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link
                          className="text-sm font-semibold uppercase tracking-wide underline-offset-4 hover:underline"
                          to={`/products/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                        <p className="mt-2 text-xs uppercase tracking-wider">Size: {item.size}</p>
                        <p className="mt-2 text-sm">{formatPrice(item.price)}</p>
                      </div>
                      <strong className="shrink-0 text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div aria-label={`Quantity for ${item.name}`} className="flex items-center border border-neutral-300">
                        <button
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="grid h-9 w-9 place-items-center disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={item.quantity <= 1}
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          type="button"
                        >
                          <FiMinus aria-hidden="true" size={14} />
                        </button>
                        <span aria-live="polite" className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase quantity of ${item.name}`}
                          className="grid h-9 w-9 place-items-center"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          type="button"
                        >
                          <FiPlus aria-hidden="true" size={14} />
                        </button>
                      </div>
                      <button
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider underline underline-offset-4"
                        onClick={() => removeFromCart(item.cartItemId)}
                        type="button"
                      >
                        <FiTrash2 aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit border border-neutral-300 p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest">Order summary</h2>
              <div className="mt-5 flex justify-between border-t border-neutral-300 pt-4 text-sm">
                <span>Subtotal</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <p className="mt-3 text-xs leading-5">
                Shipping and taxes will be calculated at checkout.
              </p>
              <Button className="mt-6 w-full" disabled>
                Checkout coming soon
              </Button>
              <Link
                className="mt-4 block text-center text-xs uppercase tracking-widest underline underline-offset-4"
                to="/collections/shop-all"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
      </Container>
    </>
  )
}

export default Cart
