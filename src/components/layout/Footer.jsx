import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <p className="text-xl font-semibold tracking-wide">CLOTHES</p>
            <p className="mt-5 text-sm text-gray-400 leading-6 max-w-sm">
              A modern fashion storefront inspired by editorial retail design.
              Discover Women, Men, and Kids collections built for everyday wear.
            </p>

            <div className="mt-7 flex gap-4">
              {['Instagram', 'TikTok', 'YouTube'].map((x) => (
                <a
                  key={x}
                  href="#"
                  className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white transition"
                >
                  {x}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-10">
            <FooterCol title="Shop">
              <FooterLink to="/shop">All products</FooterLink>
              <FooterLink to="/shop?cat=women">Women</FooterLink>
              <FooterLink to="/shop?cat=men">Men</FooterLink>
              <FooterLink to="/shop?group=kids">Kids</FooterLink>
            </FooterCol>

            <FooterCol title="Company">
              <FooterA>About</FooterA>
              <FooterA>Careers</FooterA>
              <FooterA>Press</FooterA>
              <FooterA>Sustainability</FooterA>
            </FooterCol>

            <FooterCol title="Support">
              <FooterA>Contact</FooterA>
              <FooterA>Shipping</FooterA>
              <FooterA>Returns</FooterA>
              <FooterA>Size guide</FooterA>
            </FooterCol>

            <FooterCol title="Legal">
              <FooterA>Privacy</FooterA>
              <FooterA>Terms</FooterA>
              <FooterA>Cookies</FooterA>
              <FooterA>Accessibility</FooterA>
            </FooterCol>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="mt-20 border border-gray-800 p-10 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Newsletter
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Get new drops and curated edits.
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-6">
                UI-only for now. Later we can connect this to a real email service.
              </p>
            </div>

            <div className="md:col-span-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  placeholder="Email address"
                  className="flex-1 bg-black border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                />
                <button className="bg-white text-black px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-200 transition">
                  Subscribe
                </button>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                By subscribing you agree to receive emails. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            © {new Date().getFullYear()} Clothes Store
          </p>

          <div className="flex gap-6">
            {['Payment', 'Delivery', 'Help'].map((x) => (
              <a
                key={x}
                href="#"
                className="text-xs uppercase tracking-[0.25em] text-gray-500 hover:text-white transition"
              >
                {x}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- helpers ---------------- */

function FooterCol({ title, children }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{title}</p>
      <div className="mt-5 flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block text-sm leading-6 text-gray-400 hover:text-white transition"
    >
      {children}
    </Link>
  )
}

function FooterA({ children }) {
  return (
    <a
      href="#"
      className="block text-sm leading-6 text-gray-400 hover:text-white transition"
    >
      {children}
    </a>
  )
}
