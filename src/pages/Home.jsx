import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative bg-black">
        <div
          className="relative w-full bg-cover bg-center h-[62vh] min-h-[460px] md:h-[78vh] md:min-h-[560px]"
          style={{
            backgroundImage:
              "url('https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/puuzbo1boowkdwqhpijf')",
          }}
        >
          {/* Premium overlay: readable on all photos */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 h-full">
            <div className="h-full flex items-end">
              <div className="w-full pb-10 md:pb-16">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/80">
                  New season • Minimal essentials
                </p>

                <h1 className="mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white max-w-3xl">
                  Modern silhouettes, everyday pieces.
                </h1>

                <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/85 max-w-2xl leading-6">
                  A clean, editorial storefront inspired by fashion retailers. Discover Women, Men,
                  and Kids collections designed for daily rotation.
                </p>

                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center bg-white text-black px-7 py-3 text-sm uppercase tracking-[0.2em] hover:bg-white/90 transition"
                  >
                    Shop now
                  </Link>
                  <Link
                    to="/shop?group=kids"
                    className="inline-flex items-center justify-center border border-white/70 text-white px-7 py-3 text-sm uppercase tracking-[0.2em] hover:border-white transition"
                  >
                    Kids collection
                  </Link>
                </div>

                {/* Quick chips (mobile-friendly) */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip to="/shop?cat=women">Women</Chip>
                  <Chip to="/shop?cat=men">Men</Chip>
                  <Chip to="/shop?group=kids">Kids</Chip>
                  <Chip to="/shop?group=adults">Adults</Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES (cleaner, more responsive) */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Shop by category</h2>
              <p className="mt-2 text-sm text-gray-600">Quick entry points into the collection.</p>
            </div>

            <Link to="/shop" className="text-sm uppercase tracking-[0.2em] hover:text-gray-500">
              All products
            </Link>
          </div>

          {/* Better responsive grid:
              - mobile: 2 columns
              - tablet: 3 columns
              - desktop: 4 columns
          */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <CategoryCard
              title="Women"
              subtitle="Tailored, minimal, clean."
              to="/shop?cat=women"
              img="https://www.instyle.com/thmb/ZCp3KSs51VzqX5s0H12qorl8WDs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/050125-Minimalist-Style-bbf3ddf9ae704f048e46d236a83241c3.jpg"
            />
            <CategoryCard
              title="Men"
              subtitle="Modern basics for daily wear."
              to="/shop?cat=men"
              img="https://www.apetogentleman.com/wp-content/uploads/2022/08/MensWardrobeBasicsMain.jpg"
            />
            <CategoryCard
              title="Kids – Girls"
              subtitle="Comfort-first essentials."
              to="/shop?cat=kids-girls"
              img="https://comfrt.com/fast-image/comfrt/files/2_10.jpg?v=1731106736"
            />
            <CategoryCard
              title="Kids – Boys"
              subtitle="Play-ready, durable pieces."
              to="/shop?cat=kids-boys"
              img="https://littlesleepies.com/cdn/shop/files/everyday_essentials_mobile_e129d4fa-71d6-429a-9d48-3e27ec7cdd36.png?height=1000&v=1767834513"
            />
          </div>
        </div>
      </section>

      {/* EDITORIAL FEATURE STRIP */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gray-500">
                Weekly edit
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                Fresh highlights curated for the week.
              </h3>
              <p className="mt-4 text-sm text-gray-600 leading-6">
                Use this space for “new in” or “featured” items later. For now, it builds the
                premium, editorial vibe.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition"
                >
                  View new in
                </Link>
                <Link
                  to="/shop?group=adults"
                  className="inline-flex items-center justify-center border border-gray-300 px-6 py-3 text-sm uppercase tracking-[0.2em] hover:border-gray-400 transition"
                >
                  Adults
                </Link>
              </div>

              {/* Mobile-only: extra spacing so sticky intro doesn't feel cramped */}
              <div className="lg:hidden mt-10 border-t border-gray-200" />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FeatureTile
                title="Minimal Outerwear"
                copy="Clean layers built for repeat wear."
                to="/shop?cat=women"
                img="https://dimages2.corriereobjects.it/files/main_image_mobile/uploads/2025/10/06/68e3b90387e58.jpeg"
              />
              <FeatureTile
                title="Everyday Sneakers"
                copy="Simple shapes, versatile finishes."
                to="/shop?cat=men"
                img="https://barefootuniverse.com/wp-content/uploads/2024/03/Best-barefoot-sneakers-1-1.jpg"
              />
              <FeatureTile
                title="Kids Layers"
                copy="Comfort-first essentials for school days."
                to="/shop?group=kids"
                img="https://www.nakishawynn.com/wp-content/uploads/2019/08/back-to-school-fashion--768x1024.jpg"
              />
              <FeatureTile
                title="Clean Tailoring"
                copy="Polished looks with minimal effort."
                to="/shop?cat=women"
                img="https://images.squarespace-cdn.com/content/v1/58ba1e1fdb29d66bb3a03192/1594671580046-J6M9HRAFYM631LP0W0KL/polished+professional.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CTA (finished + responsive) */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-14">
          <div className="border border-gray-200 p-7 sm:p-10 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-7">
            <div className="max-w-xl">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gray-500">
                Stay updated
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Get drops, edits, and new arrivals.
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Optional UI-only newsletter block. Later you can connect it to a real provider.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:w-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Email address"
                className="w-full sm:w-80 bg-white border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Small footer links row (optional but looks premium) */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} VerseClothes. Minimal storefront.</p>
            <div className="flex gap-5">
              <Link to="/shop" className="hover:text-gray-700">
                Shop
              </Link>
              <Link to="/shop?cat=women" className="hover:text-gray-700">
                Women
              </Link>
              <Link to="/shop?cat=men" className="hover:text-gray-700">
                Men
              </Link>
              <Link to="/shop?group=kids" className="hover:text-gray-700">
                Kids
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ---------------- Small components ---------------- */

function Chip({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] border border-white/35 text-white/90 hover:text-white hover:border-white transition"
    >
      {children}
    </Link>
  )
}

function CategoryCard({ title, subtitle, to, img }) {
  return (
    <Link to={to} className="group block border border-gray-200 overflow-hidden bg-white">
      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold tracking-tight">{title}</p>
        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        <p className="mt-4 sm:mt-5 text-xs uppercase tracking-[0.25em] text-gray-500 group-hover:text-gray-700">
          Explore
        </p>
      </div>
    </Link>
  )
}

function FeatureTile({ title, copy, to, img }) {
  return (
    <Link to={to} className="group block border border-gray-200 overflow-hidden bg-white">
      <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">Featured</p>
        <p className="mt-2 text-lg font-semibold tracking-tight">{title}</p>
        <p className="mt-2 text-sm text-gray-600">{copy}</p>
        <p className="mt-4 sm:mt-5 text-xs uppercase tracking-[0.25em] text-gray-500 group-hover:text-gray-700">
          Shop now
        </p>
      </div>
    </Link>
  )
}
