import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

interface PersonalBrandingProps {
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

export default function PersonalBrandingPage({ frontmatter, content }: PersonalBrandingProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqData = [
    {
      question: "What's the difference between personal branding photos and headshots?",
      answer: "Personal branding photos tell your complete professional story through multiple images that showcase your personality, expertise, and lifestyle. While headshots focus on your face, branding photos include your workspace, props, lifestyle elements, and various expressions to create a comprehensive visual narrative."
    },
    {
      question: "How should I prepare for my personal branding session?",
      answer: "Bring 3-4 outfits that reflect different aspects of your brand, relevant props or tools from your profession, and think about locations that represent your work style. We'll also discuss your brand message and target audience before the shoot to ensure we capture images that align with your goals."
    },
    {
      question: "How many photos will I receive from my branding session?",
      answer: "You'll receive a curated gallery to choose from, and you can purchase as many final images as you need. Most clients select 15-25 images to have a comprehensive library for all their marketing needs throughout the year."
    },
    {
      question: "Can we shoot at multiple locations?",
      answer: "Absolutely! Personal branding sessions often include 2-3 locations - your office or workspace, an outdoor location that reflects your style, and perhaps a more casual setting. Multiple locations help tell a more complete story of who you are professionally."
    },
    {
      question: "What can I use these photos for?",
      answer: "Your personal branding photos come with full commercial usage rights. Use them for your website, social media, marketing materials, speaking engagements, book covers, media features, business cards, and any other professional marketing needs."
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 px-4 shadow-md bg-white' : 'py-8 px-8'}`}>
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
                  href="/pricing" 
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
            src="/images/Hero/Personal-Brand-Photography-Hero.webp"
            alt="Personal branding photography Phoenix Arizona professional lifestyle photographer"
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
                Personal Branding Photography
              </div>
            </div>
            
            {/* Middle Column - Empty */}
            <div></div>
            
            {/* Third Column - Tagline bottom left */}
            <div className="flex flex-col justify-end items-start pb-16">
              <div className="text-left">
                <h1 className="text-lg font-light text-black mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                  Personal Branding Photography | Phoenix, Arizona
                </h1>
                <div className="text-4xl font-light text-black" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                  Visual storytelling that builds your brand
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Centered Stacked Layout */}
          <div className="md:hidden flex flex-col justify-between min-h-screen w-full py-20 px-8">
            {/* Mobile Title - Left Aligned */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-4xl font-light text-black text-left mb-4" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Personal Branding Photography
              </div>
            </div>
            
            {/* Mobile Tagline - At Bottom */}
            <div className="text-left pb-8">
              <h1 className="text-sm font-light text-black mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Personal Branding Photography | Phoenix, Arizona
              </h1>
              <div className="text-xl font-light text-black" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Visual storytelling that builds your brand
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Carousel Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-8">
          <div className="flex gap-8 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
            <div className="flex-shrink-0">
              <Image
                src="/images/Branding/Kimerly-Bogue-Interior-Designer-Branding-Session.webp"
                alt="Kimerly Bogue interior designer branding session Phoenix Arizona personal branding photography"
                width={400}
                height={600}
                className="h-96 w-auto object-contain"
              />
            </div>
            
            <div className="flex-shrink-0">
              <Image
                src="/images/Branding/Personal Branding Session.webp"
                alt="Personal branding session Phoenix Arizona lifestyle branding photography"
                width={400}
                height={600}
                className="h-96 w-auto object-contain"
              />
            </div>

            <div className="flex-shrink-0">
              <Image
                src="/images/Branding/Maria-Zambrano-Interior-Designer-Branding-Session.webp"
                alt="Maria Zambrano interior designer branding session Phoenix Arizona personal branding photography"
                width={400}
                height={600}
                className="h-96 w-auto object-contain"
              />
            </div>

            <div className="flex-shrink-0">
              <Image
                src="/images/Branding/Physical-Therapy-Branding-Photos.webp"
                alt="Physical therapy branding photos Phoenix Arizona healthcare professional photography"
                width={400}
                height={600}
                className="h-96 w-auto object-contain"
              />
            </div>

            <div className="flex-shrink-0">
              <Image
                src="/images/Branding/Kyle-8.webp"
                alt="Kyle personal branding session Phoenix Arizona professional photography"
                width={400}
                height={600}
                className="h-96 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* First Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 
                className="text-3xl md:text-4xl font-light mb-8"
                style={{ 
                  fontFamily: '"Gilda Display", serif', 
                  color: '#1C1C1C', 
                  fontWeight: 300 
                }}
              >
                Building Your Visual Brand Story
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500 }}
                  >
                    Complete Brand Photography Sessions
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    Comprehensive photo shoots that capture every aspect of your professional identity. We create a cohesive library of images that work seamlessly across your website, social media, marketing materials, and speaking engagements.
                  </p>
                </div>

                <div>
                  <h3 
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500 }}
                  >
                    Studio & On-Location Options
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    Whether you prefer the controlled environment of our studio or the authenticity of your workspace, we'll create images that align with your brand aesthetic. Location sessions can include your office, co-working space, or anywhere that represents your business story.
                  </p>
                </div>
              </div>
              
              {/* Book Now Button */}
              <div className="mt-8">
                <Link 
                  href="/pricing"
                  className="inline-block px-8 py-3 border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
                  style={{ 
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Book Now
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/Branding/Portrait of an Excecutive.webp"
                alt="Portrait of an executive professional business headshot Phoenix Arizona branding photography"
                width={400}
                height={600}
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:order-1">
              <Image
                src="/images/Home page Carousel/Motivational-Speaker-Portrait.webp"
                alt="Motivational speaker portrait Phoenix Arizona personal branding photography"
                width={400}
                height={600}
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
            <div className="space-y-6 lg:order-2">
              <div className="space-y-8">
                <div>
                  <h3 
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500 }}
                  >
                    Lifestyle Brand Photography
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    Beyond traditional headshots - we capture you in action, working with clients, presenting, or engaging in activities that showcase your expertise. These lifestyle images add depth and authenticity to your brand narrative.
                  </p>
                </div>

                <div>
                  <h3 
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500 }}
                  >
                    Strategic Visual Consistency
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    Every image is designed to work together as part of your brand ecosystem. From formal executive portraits to behind-the-scenes lifestyle shots, we ensure visual cohesion across all your marketing channels.
                  </p>
                </div>
              </div>
              
              {/* Book Now Button */}
              <div className="mt-8">
                <Link 
                  href="/pricing"
                  className="inline-block px-8 py-3 border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
                  style={{ 
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-24">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-start">
            <Image
              src="/images/Branding/Tony-Dufresne-Website-Rebrand-Photos.webp"
              alt="Anthony Dufresne personal branding photography Phoenix Arizona Wes Anderson aesthetic"
              width={600}
              height={600}
              className="h-[600px] w-auto object-contain"
            />
          </div>
          <div 
            className="flex-1 flex items-center justify-center p-8 md:p-12 h-[600px]"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <div className="max-w-md text-center">
              <p 
                className="text-lg leading-relaxed mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Anthony needed brand photography that matched his Wes Anderson-inspired aesthetic and signature color palette for his website launch. Working together, we created a cohesive series of images that brought his creative vision to life - from the playful props to the precise color coordination he envisioned.
              </p>
              <blockquote 
                className="text-lg leading-relaxed mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 400 }}
              >
                "Marie went out of her way to make that happen. The pics are great! Thanks so much for making the process easy and fun."
              </blockquote>
              <cite 
                className="text-base font-medium not-italic"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 'bold' }}
              >
                — Anthony Dufresne
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24 px-8">
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
  const filePath = path.join(process.cwd(), 'content', 'personal-branding.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}