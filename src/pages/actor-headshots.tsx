import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

interface ActorHeadshotsProps {
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

export default function ActorHeadshotsPage({ frontmatter, content }: ActorHeadshotsProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqData = [
    {
      question: "How many looks should I bring?",
      answer: "Bring as many outfit options as you'd like - we have unlimited time and outfit changes. I recommend 3-4 looks: business casual, casual/commercial, more formal, and something that shows your personality."
    },
    {
      question: "What's the difference between commercial and theatrical headshots?",
      answer: "Commercial headshots are bright, approachable, and friendly - think 'real person' roles. Theatrical headshots are more dramatic with stronger character - think specific roles like detective or villain."
    },
    {
      question: "Do I keep the photo gallery?",
      answer: "No, you select and purchase only the final retouched images you want. This ensures you get professionally edited headshots rather than raw camera files."
    },
    {
      question: "How many headshots do I actually need?",
      answer: "Most working actors need 2-4 strong headshots - typically one commercial and one theatrical, plus variations for different casting needs."
    },
    {
      question: "When will I receive my final images?",
      answer: "Your professionally retouched headshots are delivered within 10 business days of your session."
    },
    {
      question: "Do you offer slate recordings?",
      answer: "Yes! I can help you record a slate on your phone at no additional charge to create a complete self-tape package."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Trigger hero animation after component mounts
    const timer = setTimeout(() => {
      setHeroLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&family=Gilda+Display&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 px-8 shadow-md bg-white' : 'py-8 px-8'}`}>
        <div className={`flex items-center ${isScrolled ? 'justify-end gap-4' : 'justify-end gap-4 md:gap-8'} w-full transition-all duration-300`}>
          {isScrolled ? (
            <>
              {/* Small Square Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Portraits By Marie-Logo-square-White.svg"
                    alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                    width={32}
                    height={32}
                    className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ filter: 'invert(1)' }}
                  />
                </Link>
              </div>
              
              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          ) : (
            <>
              {/* Logo - Square for mobile, Rectangle for desktop */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Portraits By Marie Logo-Square.svg"
                    alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                    width={80}
                    height={80}
                    className="h-20 w-20 md:hidden cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/Logo/Portraits-by-Marie-Logo-Rectangle-Black.svg"
                    alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                    width={240}
                    height={96}
                    className="hidden md:block h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              {/* Desktop Navigation Menu */}
              <nav className="hidden md:flex md:flex-col md:space-y-2">
                <Link 
                  href="/pricing" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Pricing
                </Link>
                <Link 
                  href="/about" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Contact
                </Link>
              </nav>
            </>
          )}
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden">
            <nav className="flex flex-col py-4 px-8">
              <Link 
                href="/pricing" 
                className="py-2 text-black font-light text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="py-2 text-black font-light text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="py-2 text-black font-light text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </nav>
      
      {/* Hero Section with Sliding Animation */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Hero Image with Sliding Animation */}
        <div 
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-out ${
            heroLoaded ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <Image
            src="/images/Hero/Acting-headshots-hero.webp"
            alt="Professional acting headshots photographer Phoenix Arizona casting directors"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content Overlay - Left Aligned like Home Page */}
        <div className="relative z-10 h-full flex">
          {/* Desktop: 3 Column Layout matching home page */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:min-h-screen md:w-full px-8">
            {/* First Column - Title */}
            <div className="text-left space-y-4 flex flex-col justify-center">
              <div 
                className="text-6xl font-light text-black" 
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}
              >
                Actor Headshots
              </div>
            </div>
            
            {/* Middle Column - Empty */}
            <div></div>
            
            {/* Third Column - Tagline bottom left */}
            <div className="flex flex-col justify-end items-start pb-16">
              <div className="text-left">
                <h1 className="text-lg font-light text-black mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                  Professional Acting Photography | Phoenix, Arizona
                </h1>
                <div className="text-4xl font-light text-black" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                  Headshots that get you cast
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Centered Stacked Layout */}
          <div className="md:hidden flex flex-col justify-between min-h-screen w-full py-20 px-8">
            {/* Mobile Title - Left Aligned */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-4xl font-light text-black text-left mb-4" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Actor Headshots
              </div>
            </div>
            
            {/* Mobile Tagline - At Bottom */}
            <div className="text-left pb-8">
              <h1 className="text-sm font-light text-black mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Professional Acting Photography | Phoenix, Arizona
              </h1>
              <div className="text-xl font-light text-black" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Headshots that get you cast
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
            {/* Headshot 1 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Commercial-Acting-Headshot-Male-Phoenix-Photographer.webp"
                  alt="Commercial acting headshot male actor outdoor natural lighting Phoenix Arizona photographer Marie Feutrier"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Commercial Headshots Phoenix
              </h3>
            </div>
            
            {/* Headshot 2 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Theatrical-Acting-Headshot-Male-Studio-Phoenix.webp"
                  alt="Theatrical acting headshot male actor dramatic studio lighting Phoenix Arizona casting directors"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Theatrical Headshots Phoenix
              </h3>
            </div>
            
            {/* Headshot 3 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Latina-Actress-Headshot-Commercial-Phoenix-Arizona.webp"
                  alt="Latina actress commercial headshot professional female actor Phoenix Arizona casting photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Commercial Acting Headshots
              </h3>
            </div>
            
            {/* Headshot 4 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Professional-Actress-Headshot-Casting-Directors-Phoenix.webp"
                  alt="Professional actress headshot casting directors female actor clean background Phoenix Arizona"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Professional Actor Headshots
              </h3>
            </div>
            
            {/* Headshot 5 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Young-Actress-Headshot-Studio-Portrait-Phoenix.webp"
                  alt="Young actress headshot natural studio portrait female actor Phoenix Arizona professional photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Young Actor Headshots
              </h3>
            </div>
            
            {/* Headshot 6 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Theatrical-Female-Headshot-Professional-Actor-Phoenix.webp"
                  alt="Theatrical female headshot professional actress warm smile Phoenix Arizona actor photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Theatrical Actor Headshots
              </h3>
            </div>

            {/* Headshot 7 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Child-Actor-Headshot-Commercial-Phoenix-Arizona.webp"
                  alt="Child actor commercial headshot young performer Phoenix Arizona professional kids photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Child Actor Headshots
              </h3>
            </div>

            {/* Headshot 8 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Male-Actor-Headshot-Professional-Studio-Phoenix.webp"
                  alt="Male actor dramatic black and white headshot professional studio lighting Phoenix Arizona casting"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Dramatic Actor Headshots
              </h3>
            </div>

            {/* Headshot 9 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Commercial-Female-Headshot-Casting-Directors-Phoenix.webp"
                  alt="Female actor moody commercial headshot dramatic lighting casting directors Phoenix Arizona"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Female Actor Headshots
              </h3>
            </div>

            {/* Headshot 10 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/Actors/Child-Commercial-Actor-Headshot-Studio-Phoenix-Arizona.webp"
                  alt="Young male child actor commercial headshot clean studio background Phoenix Arizona kids casting"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Young Actor Commercial Headshots
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Actor Headshots Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{ 
                    fontFamily: '"Gilda Display", serif', 
                    color: '#1C1C1C', 
                    fontWeight: 300 
                  }}
                >
                  Actor Headshots Phoenix Arizona
                </h2>
              </div>
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Commercial Headshots
              </h3>
              <p 
                className="text-lg mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Bright, approachable looks that casting directors use for "real people" roles - the neighbor, the office worker, the friendly parent.
              </p>
              
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Theatrical Headshots
              </h3>
              <p 
                className="text-lg mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                More dramatic, character-driven images for specific roles - the detective, the villain, the romantic lead.
              </p>
              
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Unlimited Expressions & Looks
              </h3>
              <p 
                className="text-lg"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                We shoot multiple expressions and variations for each outfit and background combination until we capture exactly what you need. No limits on the number of shots taken during your session.
              </p>
              
              {/* Book Today Button */}
              <div className="mt-8">
                <Link 
                  href="/pricing"
                  className="inline-block px-8 py-3 border-2 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
                  style={{ 
                    fontFamily: '"Hanken Grotesk", sans-serif', 
                    color: '#1C1C1C', 
                    borderColor: '#1C1C1C' 
                  }}
                >
                  Book Today
                </Link>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="flex justify-center">
              <Image
                src="/images/Actors/Theatrical-Actor-Headshot.webp"
                alt="Theatrical actor headshot professional studio lighting Phoenix Arizona casting directors"
                width={500}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Image Side */}
          <div className="relative">
            <Image
              src="/images/Actors/SAG Actor John Barbolla.webp"
              alt="SAG actor John Barbolla professional headshot testimonial client Phoenix Arizona photographer"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Quote Side */}
          <div 
            className="flex items-center justify-center p-8 md:p-12 relative"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <div className="max-w-md text-center">
              {/* Testimonial Text */}
              <blockquote 
                className="text-lg leading-relaxed mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 400 }}
              >
                "After 25 years of getting acting headshots in Chicago and Los Angeles I was nervous about getting headshots in Phoenix. BUT Marie was so professional and so keyed in to what I wanted. She understood the difference between my old shots and what I wanted from these new ones. I think they are wonderful and will open new doors and MORE doors for me in my acting."
              </blockquote>
              
              {/* Client Name */}
              <cite 
                className="text-base font-medium not-italic"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 'bold' }}
              >
                — John Barbolla, SAG Actor
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24 px-8">
        <h2 className="text-4xl font-light mb-12 text-center" style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}>
          Actor Headshots FAQ
        </h2>
        
        <div className="max-w-4xl mx-auto w-2/3">
          {/* Top divider line */}
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: '#E5E5E5' }}
          />
          
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
                style={{ 
                  backgroundColor: openFAQ === index ? '#1C1C1C' : '#F5F5F5',
                  color: openFAQ === index ? 'white' : '#1C1C1C'
                }}
              >
                <span className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 ml-4" />
                )}
              </button>
              
              {openFAQ === index && (
                <div 
                  className="p-6 border-l-4 transition-all duration-300"
                  style={{ backgroundColor: '#FAFAFA', borderColor: '#1C1C1C' }}
                >
                  <div 
                    className="text-base leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Book Today Button - Center */}
        <div className="text-center mt-12 mb-16">
          <Link 
            href="/pricing"
            className="inline-block px-8 py-3 border-2 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
            style={{ 
              fontFamily: '"Hanken Grotesk", sans-serif', 
              color: '#1C1C1C', 
              borderColor: '#1C1C1C' 
            }}
          >
            Book Today
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'actor-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}