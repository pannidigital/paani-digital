import About from '@/components/home/About';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';


export default function AboutPage() {
  return (
    <main className="pt-20">
        <Header />
      <About />
        <Footer />
    </main>
  );
}