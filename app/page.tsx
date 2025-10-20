import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BookingSection } from "@/components/booking-section"
import { MyBookingsSection } from "@/components/my-bookings-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MyBookingsSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingSection />
      <Footer />
    </main>
  )
}
