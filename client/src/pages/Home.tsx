import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import EcosystemVisual from "../components/home/EcosystemVisual"
import Hero from "../components/home/Hero"
import StatsStrip from "../components/home/StatsStrip"

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <EcosystemVisual />
        <StatsStrip />
      </main>

      <Footer />
    </>
  )
}

export default Home