import brand from '../config/brand.js'
import Container from './Container.jsx'

const footerGroups = [
  {
    heading: 'Returns',
    links: [{ label: 'Returns & Exchanges', href: '#returns' }],
  },
  {
    heading: 'Customer Support',
    links: [{ label: 'Contact Us', href: '#customer-support' }],
  },
  {
    heading: 'Shipping',
    links: [{ label: 'Shipping Information', href: '#shipping' }],
  },
  {
    heading: 'Quick links',
    links: [
      { label: 'Shop All', href: '#shop-all' },
      { label: 'Sale', href: '#sale' },
    ],
  },
  {
    heading: 'Follow us',
    links: [],
  },
]

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <section className="footer-group">
            <h2 className="footer-group__heading">Our Stores</h2>
            {brand.stores.length > 0 ? (
              <ul className="footer-group__list">
                {brand.stores.map((store) => (
                  <li key={`${store.name}-${store.address}`}>
                    <strong>{store.name}</strong>
                    <address>{store.address}</address>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="footer-group__note">Store addresses coming soon.</p>
            )}
          </section>

          {footerGroups.map((group) => (
            <section className="footer-group" key={group.heading}>
              <h2 className="footer-group__heading">{group.heading}</h2>
              {group.heading === 'Customer Support' && brand.phone ? (
                <a className="footer-group__link" href={`tel:${brand.phone}`}>
                  {brand.phone}
                </a>
              ) : group.links.length > 0 ? (
                <ul className="footer-group__list">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a className="footer-group__link" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="footer-group__note">
                  {group.heading === 'Follow us'
                    ? 'Social links coming soon.'
                    : 'Contact details coming soon.'}
                </p>
              )}
            </section>
          ))}
        </div>
        <div className="site-footer__bottom">
          <a className="site-footer__brand" href="/">
            {brand.name}
          </a>
          <span>© {new Date().getFullYear()} {brand.name}</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
