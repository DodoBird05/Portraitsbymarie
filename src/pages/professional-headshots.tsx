import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

interface ProfessionalHeadshotsProps {
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

export default function ProfessionalHeadshotsPage({ frontmatter, content }: ProfessionalHeadshotsProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqData = [
    {
      question: "What should I wear for my headshots?",
      answer: "Dress for the position you want, not necessarily the one you have. If you're aiming for a leadership role, choose clothing that conveys authority and professionalism. You'll receive my worksheet guide 'Align Your Outfits to Your Brand' to help you make strategic wardrobe choices that support your career goals."
    },
    {
      question: "Will you help me choose which photos work best for different platforms?",
      answer: "Absolutely! I'll guide you on which images work best for LinkedIn versus Instagram, Facebook, or your company website. Each platform has different cropping requirements and audience expectations - what works for a professional LinkedIn profile might not be ideal for a more casual Facebook presence."
    },
    {
      question: "How many headshots do I actually need?",
      answer: "I recommend at least 2-3 different looks, but you can purchase as many or as few as you want. Many clients love having options - a formal one for corporate communications, a friendlier version for networking, and maybe something with personality for organizations like Toastmasters."
    },
    {
      question: "What's the difference between a LinkedIn photo and a corporate headshot?",
      answer: "LinkedIn photos tend to be more approachable and personable, while corporate headshots are typically more formal and authoritative. We'll capture both styles during your session."
    },
    {
      question: "Can I use these photos for marketing materials and websites?",
      answer: "Yes, your images come with full usage rights for all business and marketing purposes - websites, social media, business cards, brochures, advertisements, and more. The only restriction is you cannot sell the actual image files to others."
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
            src="/images/Hero/Professional-Headshots-Hero.webp"
            alt="Professional headshots photographer Phoenix Arizona corporate business portraits"
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
                Professional Headshots
              </div>
            </div>
            
            {/* Middle Column - Empty */}
            <div></div>
            
            {/* Third Column - Tagline bottom left */}
            <div className="flex flex-col justify-end items-start pb-16">
              <div className="text-left">
                <h1 className="text-lg font-light text-black mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                  Professional Headshots | Phoenix, Arizona
                </h1>
                <div className="text-4xl font-light text-black" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                  Elevate your professional presence
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Centered Stacked Layout */}
          <div className="md:hidden flex flex-col justify-between min-h-screen w-full py-20 px-8">
            {/* Mobile Title - Left Aligned */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-4xl font-light text-black text-left mb-4" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Professional Headshots
              </div>
            </div>
            
            {/* Mobile Tagline - At Bottom */}
            <div className="text-left pb-8">
              <h1 className="text-sm font-light text-black mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Professional Headshots | Phoenix, Arizona
              </h1>
              <div className="text-xl font-light text-black" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'black', fontWeight: 300 }}>
                Elevate your professional presence
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
            {/* LinkedIn Headshot 1 - Barbara */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Executive-LinkedIn-Headshots-Phoenix-Arizona.webp"
                  alt="Professional LinkedIn headshot of Barbara, business executive with confident smile, studio lighting Phoenix Arizona"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Executive LinkedIn Headshots
              </h3>
            </div>
            
            {/* LinkedIn Headshot 2 - Bobbi */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Corporate-LinkedIn-Photos-Phoenix-Arizona.webp"
                  alt="Professional LinkedIn profile photo of Bobbi, corporate headshot with warm expression Phoenix Arizona photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Corporate LinkedIn Photos
              </h3>
            </div>
            
            {/* LinkedIn Headshot 3 - Dave */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Business-Executive-Headshots-Phoenix-Arizona.webp"
                  alt="Professional business headshot of Dave, male executive LinkedIn profile photo Phoenix Arizona studio"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Business Executive Headshots
              </h3>
            </div>
            
            {/* LinkedIn Headshot 4 - David Gailey */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Professional-Corporate-Portraits-Phoenix-Arizona.webp"
                  alt="Professional LinkedIn headshot of David Gailey, corporate business portrait with professional attire Phoenix Arizona"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Professional Corporate Portraits
              </h3>
            </div>
            
            {/* LinkedIn Headshot 5 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/LinkedIn-Profile-Headshots-Phoenix-Arizona.webp"
                  alt="LinkedIn profile headshot professional business portrait clean background Phoenix Arizona photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                LinkedIn Profile Headshots
              </h3>
            </div>
            
            {/* LinkedIn Headshot 6 */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Professional-Photos-for-Resume-Phoenix-Arizona.webp"
                  alt="Professional photos for resume job search headshot corporate business portrait Phoenix Arizona photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Professional Photos for Resume
              </h3>
            </div>

            {/* LinkedIn Headshot 7 - Lisa */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Female-Executive-Headshots-Phoenix-Arizona.webp"
                  alt="Professional LinkedIn headshot of Lisa, female executive with approachable smile Phoenix Arizona photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Female Executive Headshots
              </h3>
            </div>

            {/* LinkedIn Headshot 8 - Peter */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Professional-Business-Portraits-Phoenix-Arizona.webp"
                  alt="Professional business headshot of Peter, LinkedIn profile photo with professional attire Phoenix Arizona studio"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Professional Business Portraits
              </h3>
            </div>

            {/* LinkedIn Headshot 9 - Business Professional */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Professional-Business-Headshots-Phoenix-Arizona.webp"
                  alt="Professional business headshot male executive with glasses corporate Phoenix Arizona photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Professional Business Headshots
              </h3>
            </div>

            {/* LinkedIn Headshot 10 - Tommy */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/Male-Executive-Headshots-Phoenix-Arizona.webp"
                  alt="Professional LinkedIn headshot of Tommy, male business executive with confident expression Phoenix Arizona studio"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                Male Executive Headshots
              </h3>
            </div>

            {/* LinkedIn Headshot 11 - Trevor */}
            <div className="flex-shrink-0">
              <div className="w-80 h-96 bg-gray-200 rounded-none overflow-hidden mb-4">
                <Image
                  src="/images/LinkedIn/LinkedIn-Business-Headshots-Phoenix-Arizona.webp"
                  alt="Professional LinkedIn profile photo of Trevor, business headshot with approachable expression Phoenix Arizona photographer"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-normal text-center" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                LinkedIn Business Headshots
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* First Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Text Content */}
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{ 
                    fontFamily: '"Gilda Display", serif', 
                    color: '#1C1C1C', 
                    fontWeight: 300 
                  }}
                >
                  Positioning You For Your Next Opportunity
                </h2>
              </div>
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Corporate & Executive Portraits
              </h3>
              <p 
                className="text-lg mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Professional headshots that command respect and convey leadership. Perfect for company websites, annual reports, and executive communications where authority and competence matter.
              </p>
              
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                LinkedIn Profile Picture
              </h3>
              <p 
                className="text-lg"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Polished images optimized for digital platforms that help you stand out in a competitive professional landscape. Clean, approachable, and designed to make the right first impression.
              </p>
              
              {/* Book Today Button */}
              <div className="mt-8">
                <Link 
                  href="/pricing"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ 
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Book Today
                </Link>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="flex justify-center items-center h-full">
              <Image
                src="/images/LinkedIn/Profile Pictures on Color Background.webp"
                alt="Professional headshot gallery showing diverse Phoenix business professionals against colorful studio backgrounds"
                width={500}
                height={600}
                className="object-contain max-h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Image */}
            <div className="flex justify-center items-center h-full lg:order-1">
              <Image
                src="/images/LinkedIn/Nurse-Headshot.webp"
                alt="Professional nurse headshot Phoenix Arizona healthcare professional LinkedIn photo"
                width={500}
                height={600}
                className="object-contain max-h-full"
              />
            </div>
            {/* Right Column - Text Content */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Business Development Photography
              </h3>
              <p 
                className="text-lg mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Versatile headshots for networking, speaking engagements, and client-facing materials. Images that build trust and credibility across all your professional touchpoints.
              </p>
              
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Multiple Professional Looks
              </h3>
              <p 
                className="text-lg"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Every session captures various styles and expressions - from formal boardroom presence to approachable team member - giving you options for different professional contexts and career stages.
              </p>
              
              {/* Book Today Button */}
              <div className="mt-8">
                <Link 
                  href="/pricing"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ 
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Book Today
                </Link>
              </div>
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
              src="/images/LinkedIn/Professional-Women-Headshots-Phoenix-Arizona.webp"
              alt="Rachel Schurz professional headshot testimonial client Phoenix Arizona photographer"
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
                "This is my second time using Marie and as expected she is a delight to work with and I'm so happy with my headshot!!"
              </blockquote>
              
              {/* Client Name */}
              <cite 
                className="text-base font-medium not-italic"
                style={{ fontFamily: '"Gilda Display", serif', color: '#1C1C1C', fontWeight: 'bold' }}
              >
                — Rachel Schurz
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
  const filePath = path.join(process.cwd(), 'content', 'professional-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}