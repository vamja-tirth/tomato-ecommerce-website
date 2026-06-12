import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid'
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection'
import IncludedFeatures from '../../components/IncludedFeatures/IncludedFeatures'
import GuaranteeSection from '../../components/GuaranteeSection/GuaranteeSection'

const Home = () => {

  return (
    <div>
      <Header/>
      <CategoryGrid />
      <FeaturesSection />
      <IncludedFeatures />
      <GuaranteeSection />
    </div>
  )
}

export default Home
