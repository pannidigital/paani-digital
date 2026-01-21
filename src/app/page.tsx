import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Pricing from '@/components/home/Pricing';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChatBot from '@/chatbot/page';
import Team from '@/components/home/Team';
import Tools from '@/components/home/Tools';
import CaseStudies from '@/components/home/CaseStudies';
import Photos from '@/components/home/Photos';
import Videos from '@/components/home/Videos';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Team />
      <CaseStudies />
      <Photos />
      <Videos />
      <Tools />
      <ChatBot />
      <Footer />
    </main>
  );
}
