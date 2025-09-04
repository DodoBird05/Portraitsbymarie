import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface HomeProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroSubtitle: string
  }
  content: string
}

export default function HomePage({ frontmatter, content }: HomeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [heroBackground, setHeroBackground] = useState('/images/Hero/Portraits-by-Marie-Hero.webp')
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)

  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={heroBackground}
            alt="Professional business portrait photographer Marie Feutrier studio Phoenix Arizona"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex">
          {/* Header with Logo and Menu */}
          {/* Desktop Header */}
          <div className="hidden md:absolute md:top-8 md:right-8 md:flex md:items-start md:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/Logo/Portraits-by-Marie-Logo-Rectangle-White.svg"
                alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                width={300}
                height={120}
                className="h-32 w-auto"
              />
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
              >
                About
              </Link>
              <Link 
                href="/pricing" 
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden absolute top-4 right-4 z-20 flex items-center gap-2">
            {/* Square Logo for Mobile */}
            <Image
              src="/Logo/Portraits By Marie-Logo-square-White.svg"
              alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
              width={40}
              height={40}
              className="h-8 w-8"
            />
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 right-4 p-4 z-20" style={{ backgroundColor: '#1C1C1C' }}>
              <nav className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className="font-light text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#f8f8f8' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="font-light text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#f8f8f8' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/pricing" 
                  className="font-light text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#f8f8f8' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  href="/contact" 
                  className="font-light text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#f8f8f8' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
          
          {/* Main Content - Responsive Layout */}
          <div className="min-h-screen flex items-center justify-center px-4 md:px-8">
            {/* Desktop: 3 Column Layout */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:min-h-screen md:w-full">
              {/* First Column - Navigation Menu */}
              <div 
                className="text-left space-y-4 flex flex-col justify-center"
                onMouseLeave={() => {
                  setHoveredMenuItem(null)
                  setHeroBackground('/images/Hero/Portraits-by-Marie-Hero.webp')
                }}
              >
                <Link href="/professional-headshots">
                  <div 
                    className={`text-6xl font-light text-white transition-opacity cursor-pointer ${
                      hoveredMenuItem && hoveredMenuItem !== 'profile' ? 'opacity-30' : 'opacity-100 hover:opacity-80'
                    }`}
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}
                    onMouseEnter={() => {
                      setHeroBackground('/images/Hero/LinkedIn-Profile-Photography-Hero.webp')
                      setHoveredMenuItem('profile')
                    }}
                  >
                    Profile Pictures
                  </div>
                </Link>
                <Link href="/personal-branding">
                  <div 
                    className={`text-6xl font-light text-white transition-opacity cursor-pointer ${
                      hoveredMenuItem && hoveredMenuItem !== 'branding' ? 'opacity-30' : 'opacity-100 hover:opacity-80'
                    }`}
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}
                    onMouseEnter={() => {
                      setHeroBackground('/images/Hero/Personal-Brand-Photography-Hero.webp')
                      setHoveredMenuItem('branding')
                    }}
                  >
                    Branding Photos
                  </div>
                </Link>
                <div 
                  className={`text-6xl font-light text-white transition-opacity cursor-pointer ${
                    hoveredMenuItem && hoveredMenuItem !== 'corporate' ? 'opacity-30' : 'opacity-100 hover:opacity-80'
                  }`}
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}
                  onMouseEnter={() => {
                    setHeroBackground('/images/Hero/Corporate-team-photography-Hero.webp')
                    setHoveredMenuItem('corporate')
                  }}
                >
                  Corporate Teams
                </div>
                <Link href="/actor-headshots">
                  <div 
                    className={`text-6xl font-light text-white transition-opacity cursor-pointer ${
                      hoveredMenuItem && hoveredMenuItem !== 'actor' ? 'opacity-30' : 'opacity-100 hover:opacity-80'
                    }`}
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}
                    onMouseEnter={() => {
                      setHeroBackground('/images/Hero/Acting-headshots-hero.webp')
                      setHoveredMenuItem('actor')
                    }}
                  >
                    Actor Headshots
                  </div>
                </Link>
              </div>
              
              {/* Middle Column - Empty for now */}
              <div></div>
              
              {/* Third Column - H1 and Tagline bottom left */}
              <div className="flex flex-col justify-end items-start pb-16">
                <div className="text-left">
                  <h1 className="text-lg font-light text-white mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                    Professional Business Photographer | Phoenix, Arizona
                  </h1>
                  <div className="text-4xl font-light text-white" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                    Where artistry meets authenticity
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Centered Stacked Layout */}
            <div className="md:hidden flex flex-col justify-between min-h-screen w-full py-20">
              {/* Mobile Navigation Menu - Left Aligned */}
              <div className="flex-1 flex flex-col justify-center space-y-4 px-8">
                <Link href="/professional-headshots">
                  <div className="text-2xl font-light text-white hover:opacity-80 transition-opacity cursor-pointer text-left" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                    Profile Pictures
                  </div>
                </Link>
                <div className="text-2xl font-light text-white hover:opacity-80 transition-opacity cursor-pointer text-left" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                  Branding Photos
                </div>
                <div className="text-2xl font-light text-white hover:opacity-80 transition-opacity cursor-pointer text-left" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                  Corporate Teams
                </div>
                <Link href="/actor-headshots">
                  <div className="text-2xl font-light text-white hover:opacity-80 transition-opacity cursor-pointer text-left" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                    Actor Headshots
                  </div>
                </Link>
              </div>
              
              {/* Mobile H1 and Tagline - At Bottom */}
              <div className="text-center pb-8">
                <h1 className="text-sm font-light text-white mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                  Professional Business Photographer | Phoenix, Arizona
                </h1>
                <div className="text-xl font-light text-white" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                  Where artistry meets authenticity
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Carousel Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-8">
          {/* Carousel Container */}
          <div className="flex gap-8 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
            {/* Image 1 */}
            <Link href="/professional-headshots">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Professional-Headshots.webp"
                    alt="Professional business headshot of executive in suit against neutral background"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Professional Headshots
                </h3>
              </div>
            </Link>
            
            {/* Image 2 */}
            <Link href="/personal-branding">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Personal-Brand-Photography.webp"
                    alt="Personal branding portrait of entrepreneur in business attire Phoenix photographer"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Personal Branding Photography
                </h3>
              </div>
            </Link>
            
            {/* Image 3 */}
            <Link href="/actor-headshots">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Acting-headshot.webp"
                    alt="Actor headshot of performer in casual shirt with professional studio lighting"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Acting Headshots
                </h3>
              </div>
            </Link>
            
            {/* Image 4 */}
            <Link href="/professional-headshots">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/LinkedIn-Profile.webp"
                    alt="LinkedIn profile headshot of professional in business attire white background"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  LinkedIn Profile
                </h3>
              </div>
            </Link>
            
            {/* Image 5 */}
            <div className="flex-shrink-0">
              <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Home page Carousel/Corporate-Headshots.webp"
                  alt="Corporate headshot of executive in professional suit business photography Phoenix"
                  width={256}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Corporate Headshots
              </h3>
            </div>
            
            {/* Image 6 */}
            <Link href="/pricing">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Business-Portraits.webp"
                    alt="Business portrait of professional in dark blazer studio lighting Phoenix"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Business Portraits
                </h3>
              </div>
            </Link>
            
            {/* Image 8 */}
            <div className="flex-shrink-0">
              <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Home page Carousel/Team-Photography.webp"
                  alt="Corporate team photography group business professionals Phoenix Arizona studio"
                  width={256}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Team Photography
              </h3>
            </div>
            
            {/* Image 9 */}
            <Link href="/pricing">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Website-Photography.webp"
                    alt="Professional website portrait of business owner in modern attire Phoenix photographer"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Website Photography
                </h3>
              </div>
            </Link>
            
            {/* Image 11 */}
            <Link href="/professional-headshots">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Executive-Portraits.webp"
                    alt="Executive portrait of senior leader in professional business suit studio Phoenix"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Executive Portraits
                </h3>
              </div>
            </Link>
            
            {/* Image 13 */}
            <Link href="/actor-headshots">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Creative-Portraits.webp"
                    alt="Creative business portrait with artistic lighting professional photographer Phoenix"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Creative Portraits
                </h3>
              </div>
            </Link>
            
            {/* Image 14 */}
            <Link href="/personal-branding">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Brand-Photography.webp"
                    alt="Brand photography portrait of entrepreneur with professional styling Phoenix Arizona"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Brand Photography
                </h3>
              </div>
            </Link>
            
            {/* Image 15 */}
            <div className="flex-shrink-0">
              <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Home page Carousel/ERAS-Photo.webp"
                  alt="Medical residency ERAS headshot professional physician portrait white background"
                  width={256}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                ERAS Photo
              </h3>
            </div>
            
            {/* Image 16 */}
            <Link href="/personal-branding">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Lifestyle-Photography.webp"
                    alt="Lifestyle brand portrait of professional in casual business attire Phoenix photographer"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Lifestyle Brand Photography
                </h3>
              </div>
            </Link>
            
            {/* Image 17 */}
            <Link href="/pricing">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Content-creator-portrait.webp"
                    alt="Content creator portrait professional headshot for social media branding Phoenix"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Creator Photography
                </h3>
              </div>
            </Link>
            
            {/* Image 18 */}
            <Link href="/personal-branding">
              <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-64 h-80 bg-gray-200 rounded-none overflow-hidden mb-4">
                  <Image
                    src="/images/Home page Carousel/Motivational-Speaker-Portrait.webp"
                    alt="Professional speaker portrait of presenter in business attire conference headshot Phoenix"
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                  Speaker Portraits
                </h3>
              </div>
            </Link>

          </div>
        </div>
      </section>
      
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'home.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}