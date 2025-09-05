export const revalidate = 600

export const metadata = {
  title: "About",
  description: "Learn about Woodenlobby's mission and values.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 font-serif text-3xl text-gray-900">Our Mission</h1>
      <p className="mb-8 text-gray-700 leading-relaxed">
        At Woodenlobby, we craft premium solid wood furniture that blends timeless design with modern functionality.
        Each piece is made to order with meticulous attention to detail and long-lasting finishes.
      </p>
      <h2 className="mb-4 font-serif text-2xl text-gray-900">Our Values</h2>
      <ul className="list-disc space-y-3 pl-6 text-gray-700">
        <li>Craftsmanship: built by experienced makers using quality hardwoods.</li>
        <li>Sustainability: durable designs that stand the test of time.</li>
        <li>Honesty: transparent materials, finishes, and timelines.</li>
        <li>Service: customization and support tailored to your home.</li>
      </ul>
    </div>
  )
}
