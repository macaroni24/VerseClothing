import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative">
        <div
          className="h-[72vh] min-h-[520px] w-full bg-cover bg-center"
          style={{
            backgroundImage:

              "url('https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/puuzbo1boowkdwqhpijf')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end">
            <div className="w-full pb-12 md:pb-16">
              <p className="text-xs uppercase tracking-[0.25em] text-white/80">
                New season • Minimal essentials
              </p>

              <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-3xl">
                Modern silhouettes, everyday pieces.
              </h1>

              <p className="mt-5 text-sm md:text-base text-white/85 max-w-2xl leading-6">
                A clean, editorial storefront inspired by fashion retailers. Discover Women, Men,
                and Kids collections designed for daily rotation.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Shop by category</h2>
            <p className="mt-2 text-sm text-gray-600">
              Quick entry points into the collection.
            </p>
          </div>

          <Link to="/shop" className="text-sm uppercase tracking-[0.2em] hover:text-gray-500">
            All products
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </section>

      {/* NEW IN / FEATURED STRIP */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">New in</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Fresh arrivals curated for the week.
              </h3>
              <p className="mt-4 text-sm text-gray-600 leading-6">
                Explore a rotating selection of highlights. This section can later be powered by an
                API tag like “new” or “featured”.
              </p>

              <div className="mt-7 flex gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-800 transition"
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
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* NEWSLETTER / BOTTOM CTA */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="border border-gray-200 p-10 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Stay updated</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Get drops, edits, and new arrivals.
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                This is UI-only. Later we can connect it to a real newsletter API.
              </p>
            </div>

       
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ title, subtitle, to, img }) {
  return (
    <Link to={to} className="group block border border-gray-200 overflow-hidden">
      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold tracking-tight">{title}</p>
        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-gray-500 group-hover:text-gray-700">
          Explore
        </p>
      </div>
    </Link>
  )
}

function FeatureTile({ title, copy, to, img }) {
  return (
    <Link to={to} className="group block border border-gray-200 overflow-hidden">
      <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Featured</p>
        <p className="mt-2 text-lg font-semibold tracking-tight">{title}</p>
        <p className="mt-2 text-sm text-gray-600">{copy}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-gray-500 group-hover:text-gray-700">
          Shop now
        </p>
      </div>
    </Link>
  )
}
