import BestSellersCarousel from '@/components/home/BestSellersCarousel'
import FaqSection from '@/components/home/FaqSection'
import ViewAllButton from '@/components/home/ViewAllButton'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Supplement Store
        </h1>
        <BestSellersCarousel />
        <div className="flex justify-center mt-8">
          <ViewAllButton />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <FaqSection />
      </section>
    </main>
  )
}
