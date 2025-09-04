import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

interface ExperienceProps {
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

export default function ExperiencePage({ frontmatter, content }: ExperienceProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const carouselMessages = [
    "Multiple looks, one session",
    "Multiple outfit changes included",
    "Various backgrounds available", 
    "Headshots to full-body coverage",
    "Your complete image library"
  ]

  const faqData = [
    {
      question: "What's included?",
      answer: `Your session includes:

• Up to 3 hours of shooting time - no rushing, we work at your pace
• Unlimited outfit changes - bring as many looks as you'd like
• Multiple backgrounds - choose from various options to match your style
• Professional retouching - every image is expertly edited
• Full range of shots - from headshots to full-body portraits`
    },
    {
      question: "Do I receive digital files?",
      answer: "Yes, all final images are delivered as high-resolution digital files. I focus exclusively on digital delivery to give you maximum flexibility for all your marketing needs."
    },
    {
      question: "When will I receive my final images?",
      answer: "Your professionally retouched portraits will be delivered within 10 business days of final payment."
    },
    {
      question: "What is your cancellation and rescheduling policy?",
      answer: "I understand that schedules can change. Sessions can be rescheduled at no charge with more than 24 hours notice. Rescheduling within 24 hours of your session requires a $50 fee to cover the reserved time slot."
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

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft
    const itemWidth = 400 // Approximate width of each item including gap
    const slideIndex = Math.round(scrollLeft / itemWidth)
    
    if (slideIndex < carouselMessages.length) {
      setCurrentSlide(slideIndex)
    }
  }

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
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'py-2 px-8 shadow-md' : 'py-8 px-8'}`}>
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
                  href="/" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Home
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
                href="/" 
                className="py-2 text-black font-light text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
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
      
      {/* Main Content */}
      <div className="pt-48 px-8 pb-16">
        <h1 
          className="text-6xl font-light mb-8"
          style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
        >
          The Experience
        </h1>
        <div 
          className="md:max-w-md lg:max-w-lg"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        
        {/* Sessions Carousel */}
        <section className="mt-16">
          <div className="w-full overflow-hidden">
            <div 
              className="flex gap-8 overflow-x-auto pb-4" 
              style={{ scrollbarWidth: 'thin' }}
              onScroll={handleCarouselScroll}
            >
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/2-outfits-5-backgrounds.webp"
                  alt="Professional portrait session showing 2 outfit changes 5 background options Phoenix"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/3-backgrounds-4-crops.webp"
                  alt="Business headshot variety 3 backgrounds 4 different crops one photography session"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/3-outfits-5-backgrounds-one-session.webp"
                  alt="Executive portrait package 3 outfit changes 5 background options single session"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/4-crops-2-Backgrounds.webp"
                  alt="Professional headshot variety 4 different crops 2 background options Phoenix"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/4-outfits-3-backgrounds-one-session.webp"
                  alt="Complete portrait session 4 outfit changes 3 professional backgrounds Phoenix"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/4-outfits-5-Backgrounds.webp"
                  alt="Premium business portrait session 4 outfits 5 background options Phoenix Arizona"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/4outfits-4-crops.webp"
                  alt="Professional portrait variety 4 outfit changes 4 different crops Phoenix photographer"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/Sessions/4outfits-4backgrounds.webp"
                  alt="Executive portrait package 4 outfits 4 professional backgrounds Phoenix Arizona"
                  width={400}
                  height={600}
                  className="h-96 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Elegant Statement Section */}
        <section className="mt-16 -mx-8 bg-gray-50 py-16">
          <div className="text-center px-8">
            <h2 
              className="text-5xl md:text-6xl font-light mb-6"
              style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
            >
              Multiple Looks, One Session
            </h2>
            <p 
              className="text-xl md:text-2xl font-light max-w-3xl mx-auto"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#666', fontWeight: 300 }}
            >
              Everything you need for your complete image library
            </p>
          </div>
        </section>

        {/* Animated Pricing Section */}
        <section className="mt-24 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Centered Image */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <Image
                  src="/images/Sessions/Photo-Session-With-Marie-Feutrier.webp"
                  alt="Professional portrait photography session with Marie Feutrier Phoenix Arizona"
                  width={500}
                  height={600}
                  className="object-cover mx-auto"
                />
              </div>
            </div>

            {/* Right Column - Animated Text */}
            <div className="space-y-8">
              {/* Pricing header */}
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{ 
                    fontFamily: '"Gilda Display", serif', 
                    color: '#1C1C1C', 
                    fontWeight: 300 
                  }}
                >
                  Photography Studio Sessions Pricing Per Person
                </h2>
              </div>

              {/* Package details */}
              <div>
                <div 
                  className="bg-gray-50 p-6"
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <h4 
                    className="text-2xl font-light mb-4"
                    style={{ 
                      fontFamily: '"Gilda Display", serif', 
                      color: '#1C1C1C', 
                      fontWeight: 300 
                    }}
                  >
                    The Portrait Experience
                  </h4>
                  <div 
                    className="text-3xl font-medium mb-4"
                    style={{ 
                      fontFamily: '"Hanken Grotesk", sans-serif', 
                      color: '#1C1C1C', 
                      fontWeight: 500 
                    }}
                  >
                    $200 + $95/image
                  </div>
                  <ul className="space-y-2">
                    <li 
                      className="text-lg"
                      style={{ 
                        fontFamily: '"Hanken Grotesk", sans-serif', 
                        color: '#666', 
                        fontWeight: 300 
                      }}
                    >
                      - Unlimited wardrobe changes
                    </li>
                    <li 
                      className="text-lg"
                      style={{ 
                        fontFamily: '"Hanken Grotesk", sans-serif', 
                        color: '#666', 
                        fontWeight: 300 
                      }}
                    >
                      - Unlimited background options
                    </li>
                    <li 
                      className="text-lg"
                      style={{ 
                        fontFamily: '"Hanken Grotesk", sans-serif', 
                        color: '#666', 
                        fontWeight: 300 
                      }}
                    >
                      - Unlimited session duration
                    </li>
                  </ul>
                  
                  {/* Book Today Button */}
                  <div className="mt-6">
                    <Link 
                      href="/book"
                      className="inline-block text-black border-2 border-black px-8 py-3 font-medium text-lg transition-colors book-today-btn"
                      style={{ 
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        textDecoration: 'none',
                        backgroundColor: '#f8f8f8'
                      }}
                    >
                      Book Today
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="mt-24">
          <h2 className="text-4xl font-light mb-12 text-center" style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}>
            Frequently Asked Questions
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
        </section>

        {/* Testimonials Section */}
        <section className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            {/* Image Side */}
            <div className="relative">
              <Image
                src="/images/Testimonials/Ron-testimonial-happy-client.webp"
                alt="Satisfied client portrait testimonial professional business headshot Phoenix photographer"
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
                  "Her prices were fair and comparable to other photographers I researched. Thank you again, Marie!"
                </blockquote>
                
                {/* Client Name */}
                <cite 
                  className="text-base font-medium not-italic"
                  style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 'bold' }}
                >
                  — RON
                </cite>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'pricing.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}