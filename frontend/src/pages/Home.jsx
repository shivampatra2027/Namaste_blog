import React from 'react'
import HeroSection from '../components/HeroSection'
import { AppleCard } from '../components/AppleCard'
import { FeatureSection1 } from '../components/FeatureSection1'
import { FeatureSection2 } from '../components/FeatureSection2'
import { BentoGridLayout } from '../components/BentoGrid'
import { Searchbar } from '../components/Searchbar'
import Faq1 from '../components/faq-1'
import WaitlistPage from '../components/waitlist'
// import ChatWidget from "../components/ChatWidget.jsx"
function Home() {
  return (
    <div className="text-[var(--text)] transition-colors duration-300">
        {/* <NavbarDemo /> */}
        <HeroSection />
        <AppleCard />
        <FeatureSection1 />
        <BentoGridLayout />
        <FeatureSection2 />
        <Searchbar />
        {/* <ChatWidget/> */}
        <WaitlistPage />
        <Faq1 />
    </div>
  )
}

export default Home
