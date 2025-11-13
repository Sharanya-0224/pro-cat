// app/page.js
import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center py-20 text-white">
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-4 text-white">Product Catalog</h1>
      <p className="text-gray-400 mb-8">
        Browse, search, and filter products quickly. Demo with mock checkout.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <Link
          href="/login"
          className="px-6 py-3 border border-gray-500 !text-purple-600 rounded-md hover:bg-purple-50 transition"
        >
          Sign In
        </Link>
         <Link
  href="/register"
  className="px-6 py-3 bg-purple-600 !text-black rounded-md font-semibold hover:bg-purple-700 transition"
>
  Sign Up
</Link>
      </div>

      {/* Feature Cards */}
      <section className="mt-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-purple-400 mb-2">Search</h3>
            <p className="text-sm text-gray-400">
              Find products fast using keywords and filters.
            </p>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-purple-400 mb-2">Filter</h3>
            <p className="text-sm text-gray-400">
              Narrow results by category, price, and brand.
            </p>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-purple-400 mb-2">Checkout</h3>
            <p className="text-sm text-gray-400">
              Demo checkout via sandbox payment gateway.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}