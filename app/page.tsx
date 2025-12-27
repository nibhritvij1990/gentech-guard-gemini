import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import SolutionsSection from "@/components/SolutionsSection";
import DealerMap from "@/components/DealerMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg text-white selection:bg-primary-blue selection:text-white">
      <Header />
      <Hero />
      <WhySection />
      <SolutionsSection />

      <DealerMap />
      <ContactForm />

      <Footer />
    </main>
  );
}
