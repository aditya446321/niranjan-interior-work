/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X,
  Clock,
  ShieldCheck,
  Compass,
  Sparkles
} from 'lucide-react';

const WHATSAPP_PHONE = '919967355478';
const WHATSAPP_DEFAULT_URL = `https://wa.me/${WHATSAPP_PHONE}?text=Hi%20Niranjan%20Interior%20Work%2C%20I%27d%20like%20to%20discuss%20an%20interior%20project%20and%20arrange%20a%20site%20visit`;
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_PHONE}?text=`;

interface ServiceItem {
  id: string;
  title: string;
  img: string;
  alt: string;
  desc: string;
}

interface PortfolioItem {
  title: string;
  img: string;
  alt: string;
  tag: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'kitchens',
    title: 'Modular Kitchens',
    img: '/images/modular_kitchen.webp',
    alt: 'Modular Kitchen modern Indian',
    desc: 'Custom kitchen planning, storage solutions and practical layouts designed for Indian cooking habits.',
  },
  {
    id: 'wardrobes',
    title: 'Wardrobes',
    img: '/images/luxury_wardrobe.webp',
    alt: 'Wardrobe premium bedroom wardrobe',
    desc: 'Built-in sliding and hinged wardrobes optimized for Mumbai bedroom layouts and maximum storage.',
  },
  {
    id: 'renovation',
    title: 'Home Renovation',
    img: '/images/home_renovation.webp',
    alt: 'Home renovation',
    desc: 'Complete renovation support for residential spaces - flooring, civil works, electrical, and painting.',
  },
  {
    id: 'contracting',
    title: 'Interior Contracting',
    img: '/images/interior_contracting.webp',
    alt: 'Interior finishing carpentry detail',
    desc: 'End-to-end site execution with coordinated carpenters, electricians, plumbers, and polishers.',
  },
  {
    id: 'sitevisit',
    title: 'Site Visit / Consultation',
    img: '/images/site_visit_consultation.webp',
    alt: 'Contractor inspecting site',
    desc: 'On-site assessment, accurate measurements, and practical guidance tailored to your space.',
  },
];

const PORTFOLIO: PortfolioItem[] = [
  { title: 'Modern Kitchen', img: '/images/modular_kitchen.webp', alt: 'Modular Kitchen modern Indian', tag: 'Kitchen' },
  { title: 'Luxury Wardrobe', img: '/images/luxury_wardrobe.webp', alt: 'Wardrobe premium bedroom wardrobe', tag: 'Storage' },
  { title: 'Living Room', img: '/images/living_room.webp', alt: 'Living Room modern residential', tag: 'Living' },
  { title: 'Compact Mumbai Home', img: '/images/compact_mumbai_home.webp', alt: 'Mumbai Home compact modern Mumbai apartment', tag: 'Full Home' },
  { title: 'Contemporary Bedroom', img: '/images/contemporary_bedroom.webp', alt: 'Bedroom contemporary bedroom', tag: 'Bedroom' },
  { title: 'Full Home', img: '/images/full_home_apartment.webp', alt: 'Full Home wide-angle premium apartment', tag: 'Residence' },
];

const AREAS = [
  'South Mumbai',
  'Bandra',
  'Andheri',
  'Powai',
  'Thane',
  'Navi Mumbai',
  'Borivali',
  'Dadar',
];

const PROCESS_STEPS = [
  {
    n: '01',
    t: 'Consultation',
    d: 'Share your space details, floor plan, and vision. We listen to your practical requirements first.',
  },
  {
    n: '02',
    t: 'Site Visit',
    d: 'On-site measurements, wall and plumbing inspections, and practical feasibility check across Mumbai.',
  },
  {
    n: '03',
    t: 'Design & Estimate',
    d: 'Functional layouts, material choices (plywood, laminates, hardware) and crystal-clear itemized cost estimation.',
  },
  {
    n: '04',
    t: 'Execution',
    d: 'Timely on-site fabrication, meticulous finishing checks, deep clean, and smooth handover.',
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    service: '',
    requirement: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for smooth reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      errors.phone = 'Enter valid 10-digit number';
    }
    if (!formData.area) errors.area = 'Please select your area';
    if (!formData.service) errors.service = 'Please select a service';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fill all required fields');
      return;
    }

    const text = `Hi Niranjan Interior Work,\n\nI'd like to arrange a site visit.\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n📍 *Area:* ${formData.area}\n🛠️ *Service:* ${formData.service}\n📐 *Requirement:* ${formData.requirement || 'N/A'}\n💬 *Message:* ${formData.message || 'N/A'}`;
    const encoded = encodeURIComponent(text);
    
    showToast('Opening WhatsApp with your details...');
    window.open(`${WHATSAPP_BASE_URL}${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#121212] antialiased selection:bg-[#E6D5C3]">
      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFBF7]/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(18,18,18,0.06)] border-[#E8E0D8]'
            : 'bg-[#FFFBF7]/40 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[11px] bg-[#121212] grid place-items-center relative overflow-hidden shadow-[0_4px_12px_rgba(18,18,18,0.12)] shrink-0 transition-transform group-hover:scale-105">
              <span className="serif text-[22px] leading-none text-white tracking-[-0.02em] relative z-10 translate-y-[1px]">
                N
              </span>
              <span className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-[#B86B4E] rounded-tl-[8px]" />
            </div>
            <span className="flex flex-col leading-[0.95]">
              <span className="serif text-[17px] md:text-[19px] tracking-[-0.02em] font-normal text-[#121212]">
                NIRANJAN INTERIOR WORK
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[#6B6B6B] mt-[3px] font-semibold">
                MUMBAI &bull; CONTRACTOR
              </span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-7 text-[14px] font-medium text-[#121212]/80">
              <a href="#services" className="hover:text-[#121212] hover:underline underline-offset-4 transition">
                Services
              </a>
              <a href="#portfolio" className="hover:text-[#121212] hover:underline underline-offset-4 transition">
                Portfolio
              </a>
              <a href="#process" className="hover:text-[#121212] hover:underline underline-offset-4 transition">
                Process
              </a>
              <a href="#contact" className="hover:text-[#121212] hover:underline underline-offset-4 transition">
                Contact
              </a>
            </nav>
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#121212] text-white text-[14px] font-medium tracking-[-0.01em] hover:bg-black transition-all shadow-sm hover:shadow active:scale-95"
            >
              Request Site Visit
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-11 h-11 rounded-full bg-white border border-[#E8E0D8] flex items-center justify-center text-[#121212] shadow-sm"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E0D8] bg-[#FFFBF7] px-6 py-6 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 text-[16px] font-medium">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#E8E0D8]/40"
              >
                Services
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#E8E0D8]/40"
              >
                Portfolio
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#E8E0D8]/40"
              >
                Process
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#E8E0D8]/40"
              >
                Contact
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex h-12 rounded-full bg-[#121212] text-white items-center justify-center font-medium"
              >
                Request Site Visit
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-16 md:py-20">
        <div className="absolute inset-0 dot-grid opacity-5 pointer-events-none" />
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="md:col-span-6 reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E0D8] text-[11px] tracking-[0.14em] uppercase font-semibold text-[#6B6B6B] mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B86B4E] animate-pulse" />
              Interior Contractor &bull; Mumbai
            </div>
            
            <h1 className="serif text-[44px] md:text-[66px] leading-[0.92] tracking-[-0.03em] font-normal text-[#121212]">
              Beautiful Interiors.
              <br />
              <span className="italic font-normal text-[#B86B4E]">Built Around</span>
              <br />
              Your Lifestyle.
            </h1>

            <p className="mt-6 text-[16px] md:text-[18px] leading-[1.6] text-[#6B6B6B] max-w-[48ch]">
              Modular kitchens, wardrobes, and complete interior renovation solutions across Mumbai. Practical planning, clean execution, and honest guidance from start to finish.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <a
                href="#contact"
                className="inline-flex h-[52px] px-8 rounded-full bg-[#121212] text-white items-center justify-center text-[15px] font-medium tracking-[-0.01em] hover:bg-black transition shadow-[0_4px_16px_rgba(18,18,18,0.15)] active:scale-95"
              >
                Get a Free Site Visit
              </a>
              <a
                href={WHATSAPP_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] px-8 rounded-full bg-white border border-[#E8E0D8] items-center justify-center text-[15px] font-medium gap-2.5 hover:border-[#121212] transition shadow-xs active:scale-95 text-[#121212]"
              >
                <span className="w-6 h-6 rounded-full bg-[#25D366] grid place-items-center text-white text-[13px] font-bold">
                  W
                </span>
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-[#E8E0D8] flex flex-wrap items-center gap-3 text-[11px] tracking-[0.18em] uppercase font-semibold text-[#6B6B6B]">
              <span>Design</span>
              <span className="w-1 h-1 rounded-full bg-[#E8E0D8]" />
              <span>Execution</span>
              <span className="w-1 h-1 rounded-full bg-[#E8E0D8]" />
              <span>Renovation</span>
              <span className="w-1 h-1 rounded-full bg-[#E8E0D8]" />
              <span>Site Visit</span>
            </div>
          </div>

          {/* Hero Right Media */}
          <div className="md:col-span-6 relative reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-[180px] h-[180px] dot-grid rounded-[24px] opacity-10" />
              <div className="absolute -bottom-6 -left-6 w-[220px] h-[220px] bg-[#E6D5C3] rounded-[28px] -z-10" />
              
              <div className="relative rounded-[24px] overflow-hidden bg-white border border-[#E8E0D8] shadow-[0_24px_64px_rgba(18,18,18,0.12)] h-[440px] sm:h-[520px] md:h-[560px]">
                <img
                  src="/images/hero_living_room.webp"
                  alt="Luxury modern living room complete home interior Mumbai"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={1280}
                  height={854}
                />
                
                {/* Floating pill badges on hero image */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-end gap-2">
                  <div className="bg-white/95 backdrop-blur-md border border-white/60 rounded-full px-4 py-2 flex items-center gap-2 text-[12px] font-medium shadow-sm text-[#121212]">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    Serving Mumbai &amp; Nearby Areas
                  </div>
                  <div className="bg-[#121212] text-white rounded-full px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-semibold">
                    Premium &bull; Practical
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 border-t border-[#E8E0D8]/60 bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          
          {/* Header */}
          <div className="max-w-[680px] mx-auto text-center reveal">
            <div className="inline-flex px-3.5 py-1.5 rounded-full bg-[#E6D5C3]/60 border border-[#E8E0D8] text-[11px] tracking-[0.14em] uppercase font-semibold text-[#121212]">
              Services
            </div>
            <h2 className="serif text-[36px] md:text-[48px] leading-[0.95] tracking-[-0.03em] mt-5">
              Interior Solutions Tailored
              <br />
              For Mumbai Homes
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#6B6B6B]">
              From compact apartments to spacious residences &mdash; practical layouts with clean finishing and durable materials.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Top 3 services */}
            {SERVICES.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="md:col-span-4 reveal group bg-white rounded-[22px] border border-[#E8E0D8] overflow-hidden hover:shadow-[0_16px_40px_rgba(18,18,18,0.08)] transition-all duration-300 flex flex-col"
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="h-[240px] overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={854}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#121212]">
                    Mumbai
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="serif text-[24px] leading-[1.1] tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#6B6B6B]">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E8E0D8]/50">
                    <a
                      href={WHATSAPP_DEFAULT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[0.02em] text-[#121212] group-hover:text-[#B86B4E] transition-colors"
                    >
                      Get Quote <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom 2 services centered */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 md:col-start-3">
                <div
                  className="reveal group bg-white rounded-[22px] border border-[#E8E0D8] overflow-hidden hover:shadow-[0_16px_40px_rgba(18,18,18,0.08)] transition-all duration-300 h-full flex flex-col"
                  style={{ transitionDelay: '0.24s' }}
                >
                  <div className="h-[240px] overflow-hidden relative">
                    <img
                      src={SERVICES[3].img}
                      alt={SERVICES[3].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      width={1280}
                      height={854}
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#121212]">
                      Contracting
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="serif text-[24px] leading-[1.1] tracking-[-0.01em]">
                        {SERVICES[3].title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.6] text-[#6B6B6B]">
                        {SERVICES[3].desc}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#E8E0D8]/50">
                      <a
                        href={WHATSAPP_DEFAULT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#121212] group-hover:text-[#B86B4E] transition-colors"
                      >
                        Get Quote <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 md:col-start-7">
                <div
                  className="reveal group bg-white rounded-[22px] border border-[#E8E0D8] overflow-hidden hover:shadow-[0_16px_40px_rgba(18,18,18,0.08)] transition-all duration-300 h-full flex flex-col"
                  style={{ transitionDelay: '0.32s' }}
                >
                  <div className="h-[240px] overflow-hidden relative">
                    <img
                      src={SERVICES[4].img}
                      alt={SERVICES[4].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      width={1280}
                      height={854}
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#121212]">
                      Consultation
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="serif text-[24px] leading-[1.1] tracking-[-0.01em]">
                        {SERVICES[4].title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.6] text-[#6B6B6B]">
                        {SERVICES[4].desc}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#E8E0D8]/50">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#121212] group-hover:text-[#B86B4E] transition-colors"
                      >
                        Book Visit <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white border-y border-[#E8E0D8]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          <div className="md:col-span-6 reveal">
            <div className="inline-flex px-3.5 py-1.5 rounded-full bg-[#FFFBF7] border border-[#E8E0D8] text-[11px] tracking-[0.14em] uppercase font-semibold text-[#121212]">
              Why Choose Us
            </div>
            
            <h2 className="serif text-[36px] md:text-[46px] leading-[0.95] tracking-[-0.03em] mt-5">
              Built for real Mumbai homes.
              <br />
              <span className="text-[#B86B4E] italic font-normal">Not just showroom looks.</span>
            </h2>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: 'Quality-focused execution',
                  desc: 'Coordinated workmanship with sharp attention to alignment, laminate edges, and long-lasting finishing.',
                  icon: Sparkles,
                },
                {
                  title: 'Practical space planning',
                  desc: 'Layouts engineered for daily Indian cooking, moisture resistance, clever corner storage, and smooth movement.',
                  icon: Compass,
                },
                {
                  title: 'Transparent communication',
                  desc: 'Detailed itemized quotes, agreed material specs, realistic timelines, and no surprise add-ons.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Mumbai-focused expertise',
                  desc: 'Deep understanding of local society guidelines, work-hour limits, moisture challenges, and compact floorplans.',
                  icon: Clock,
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-full bg-[#FFFBF7] border border-[#E8E0D8] grid place-items-center text-[#B86B4E] shrink-0 shadow-xs">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-[#121212]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[14px] leading-[1.6] text-[#6B6B6B]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="h-11 px-7 rounded-full bg-[#121212] text-white inline-flex items-center justify-center text-[14px] font-medium hover:bg-black transition shadow-sm active:scale-95"
              >
                Book a Site Visit
              </a>
              <a
                href={WHATSAPP_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-7 rounded-full bg-[#FFFBF7] border border-[#E8E0D8] inline-flex items-center justify-center text-[14px] font-medium text-[#121212] hover:border-[#121212] transition shadow-xs active:scale-95"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="md:col-span-6 reveal relative" style={{ transitionDelay: '0.1s' }}>
            <div className="rounded-[24px] overflow-hidden border border-[#E8E0D8] bg-[#FFFBF7] shadow-[0_20px_60px_rgba(18,18,18,0.08)] h-[500px] md:h-[600px] relative">
              <img
                src="/images/site_visit_consultation.webp"
                alt="Niranjan Interior Work contractor inspecting site in Mumbai"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1280}
                height={854}
              />
              
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/95 backdrop-blur-md rounded-[18px] border border-white/60 p-4 shadow-[0_12px_32px_rgba(18,18,18,0.12)]">
                  <div className="grid grid-cols-3 divide-x divide-[#E8E0D8]">
                    <div className="px-3 text-center">
                      <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#121212]">
                        Quality
                      </div>
                      <div className="serif text-[15px] leading-[1.2] mt-1 text-[#6B6B6B]">
                        Execution
                      </div>
                    </div>
                    <div className="px-3 text-center">
                      <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#121212]">
                        On-Time
                      </div>
                      <div className="serif text-[15px] leading-[1.2] mt-1 text-[#6B6B6B]">
                        Handover
                      </div>
                    </div>
                    <div className="px-3 text-center">
                      <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#121212]">
                        Transparent
                      </div>
                      <div className="serif text-[15px] leading-[1.2] mt-1 text-[#6B6B6B]">
                        Pricing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-[#121212] text-white">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] tracking-[0.14em] uppercase font-semibold text-white/90">
                Portfolio
              </div>
              <h2 className="serif text-[38px] md:text-[50px] leading-[0.9] tracking-[-0.03em] mt-5">
                Recent Work
              </h2>
              <p className="mt-3 text-[15px] text-white/60 max-w-[50ch]">
                Selected interiors completed for Mumbai homes &mdash; kitchens, wardrobes, living rooms, and full turnkey residential execution.
              </p>
            </div>
            
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-white/90 hover:text-white border-b border-white/30 pb-1 self-start md:self-auto"
            >
              Discuss your project <ArrowRight size={16} />
            </a>
          </div>

          {/* Gallery Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO.map((item, idx) => (
              <div
                key={item.title}
                className="reveal group rounded-[22px] overflow-hidden bg-[#1A1A1A] border border-white/10 shadow-lg"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div className="relative h-[290px] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={854}
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] tracking-wider uppercase font-medium text-white/90 border border-white/10">
                    {item.tag}
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between bg-[#171717]">
                  <h4 className="serif text-[20px] text-white tracking-[-0.01em]">
                    {item.title}
                  </h4>
                  <span className="text-[11px] tracking-[0.14em] uppercase text-white/50 font-medium">
                    Mumbai Home
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner inside Dark Section */}
          <div className="mt-14 reveal rounded-[22px] border border-white/15 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-xs">
            <div>
              <h4 className="serif text-[24px] text-white">
                Want something similar for your home?
              </h4>
              <p className="mt-1 text-[14px] text-white/70">
                Share your space dimensions and ideas &mdash; we provide customized planning and on-site guidance.
              </p>
            </div>
            <a
              href="#contact"
              className="h-12 px-7 rounded-full bg-white text-[#121212] inline-flex items-center justify-center text-[14px] font-semibold shrink-0 hover:bg-[#FFFBF7] transition active:scale-95 shadow-sm"
            >
              Book Site Visit &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 border-b border-[#E8E0D8] bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          
          <div className="text-center max-w-[640px] mx-auto reveal">
            <div className="inline-flex px-3.5 py-1.5 rounded-full bg-white border border-[#E8E0D8] text-[11px] tracking-[0.14em] uppercase font-semibold text-[#121212]">
              Process
            </div>
            <h2 className="serif text-[36px] md:text-[46px] leading-[0.95] tracking-[-0.03em] mt-5">
              Simple, transparent, on-site first
            </h2>
            <p className="mt-3 text-[15px] text-[#6B6B6B]">
              No guesswork or confusing promises. We follow a clear, 4-step execution flow.
            </p>
          </div>

          <div className="mt-16 relative">
            <div className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-px bg-[#E8E0D8]" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.n}
                  className="reveal relative bg-white md:bg-transparent p-6 md:p-0 rounded-[20px] border border-[#E8E0D8] md:border-none shadow-xs md:shadow-none"
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#121212] text-white grid place-items-center serif text-[20px] relative z-10 shadow-md">
                    {step.n}
                  </div>
                  <h4 className="serif text-[22px] mt-5 text-[#121212]">
                    {step.t}
                  </h4>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#6B6B6B]">
                    {step.d}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 grid md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-6 reveal">
            <div className="inline-flex px-3.5 py-1.5 rounded-full bg-[#FFFBF7] border border-[#E8E0D8] text-[11px] tracking-[0.14em] uppercase font-semibold text-[#121212] mb-4">
              Local Presence
            </div>
            
            <h2 className="serif text-[34px] md:text-[44px] leading-[0.95] tracking-[-0.03em]">
              Interior Solutions Across Mumbai
            </h2>
            
            <p className="mt-4 text-[16px] leading-[1.6] text-[#6B6B6B]">
              We serve all major localities in Mumbai and surrounding suburbs. Whether it is a compact 1BHK, a full 3BHK renovation, or customized modular cabinetry, we handle execution smoothly.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {AREAS.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-full bg-[#FFFBF7] border border-[#E8E0D8] text-[13px] font-medium text-[#121212]"
                >
                  {area}
                </span>
              ))}
              <span className="px-4 py-2 rounded-full bg-[#E6D5C3]/40 border border-[#E8E0D8] text-[13px] font-medium text-[#121212]">
                + Other Suburbs
              </span>
            </div>

            <div className="mt-8">
              <a
                href={WHATSAPP_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-7 rounded-full bg-[#121212] text-white inline-flex items-center justify-center text-[14px] font-medium hover:bg-black transition shadow-xs active:scale-95"
              >
                Check Availability in My Area &rarr;
              </a>
            </div>
          </div>

          {/* Coverage Map Representation */}
          <div className="md:col-span-6 reveal relative" style={{ transitionDelay: '0.1s' }}>
            <div className="rounded-[24px] border border-[#E8E0D8] bg-[#FFFBF7] p-8 md:p-10 relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 dot-grid opacity-10" />
              
              <div className="relative grid grid-cols-12 gap-3 place-items-center h-[300px]">
                {Array.from({ length: 72 }).map((_, i) => {
                  const isHighlight = [14, 15, 26, 27, 28, 38, 39, 40, 50, 51].includes(i);
                  const isCenter = i === 39;
                  return (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-300 ${
                        isCenter
                          ? 'w-4 h-4 bg-[#B86B4E] shadow-[0_0_0_8px_rgba(184,107,78,0.2)]'
                          : isHighlight
                          ? 'w-2.5 h-2.5 bg-[#121212]'
                          : 'w-2 h-2 bg-[#E8E0D8]'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-[#E8E0D8] rounded-[16px] p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E6D5C3] grid place-items-center text-[#121212]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#121212]">
                      Mumbai Coverage Active
                    </div>
                    <div className="text-[12px] text-[#6B6B6B]">
                      Mumbai, Navi Mumbai, Thane &amp; Suburbs
                    </div>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contact & Consultation Form */}
      <section id="contact" className="py-16 md:py-24 bg-[#FFFBF7] border-t border-[#E8E0D8]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 grid md:grid-cols-12 gap-10 items-start">
          
          {/* Form Card */}
          <div className="md:col-span-7 reveal bg-white rounded-[24px] border border-[#E8E0D8] p-6 md:p-10 shadow-[0_12px_32px_rgba(18,18,18,0.04)]">
            <h2 className="serif text-[32px] md:text-[42px] leading-[0.95] tracking-[-0.03em]">
              Planning Your Home Interior?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#6B6B6B]">
              Tell us what you are looking for. Our team will review your requirements and schedule an on-site visit.
            </p>

            <form onSubmit={handleFormSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#121212]">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  placeholder="Your full name"
                  className={`w-full h-12 px-4 rounded-[12px] border bg-[#FFFBF7] text-[14px] outline-none focus:border-[#121212] transition ${
                    formErrors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E8E0D8]'
                  }`}
                />
                {formErrors.name && (
                  <span className="text-[11px] text-red-500 font-medium">{formErrors.name}</span>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#121212]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                  }}
                  placeholder="10-digit mobile number"
                  className={`w-full h-12 px-4 rounded-[12px] border bg-[#FFFBF7] text-[14px] outline-none focus:border-[#121212] transition ${
                    formErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E8E0D8]'
                  }`}
                />
                {formErrors.phone && (
                  <span className="text-[11px] text-red-500 font-medium">{formErrors.phone}</span>
                )}
              </div>

              {/* Area */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#121212]">
                  Area in Mumbai *
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => {
                    setFormData({ ...formData, area: e.target.value });
                    if (formErrors.area) setFormErrors({ ...formErrors, area: '' });
                  }}
                  className={`w-full h-12 px-4 rounded-[12px] border bg-[#FFFBF7] text-[14px] outline-none focus:border-[#121212] transition ${
                    formErrors.area ? 'border-red-400' : 'border-[#E8E0D8]'
                  }`}
                >
                  <option value="">Select area</option>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                  <option value="Other">Other Mumbai Area</option>
                </select>
                {formErrors.area && (
                  <span className="text-[11px] text-red-500 font-medium">{formErrors.area}</span>
                )}
              </div>

              {/* Service */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#121212]">
                  Service Required *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => {
                    setFormData({ ...formData, service: e.target.value });
                    if (formErrors.service) setFormErrors({ ...formErrors, service: '' });
                  }}
                  className={`w-full h-12 px-4 rounded-[12px] border bg-[#FFFBF7] text-[14px] outline-none focus:border-[#121212] transition ${
                    formErrors.service ? 'border-red-400' : 'border-[#E8E0D8]'
                  }`}
                >
                  <option value="">Select service</option>
                  <option value="Modular Kitchens">Modular Kitchens</option>
                  <option value="Wardrobes">Wardrobes</option>
                  <option value="Home Renovation">Home Renovation</option>
                  <option value="Interior Contracting">Interior Contracting</option>
                  <option value="Site Visit / Consultation">Site Visit / Consultation</option>
                </select>
                {formErrors.service && (
                  <span className="text-[11px] text-red-500 font-medium">{formErrors.service}</span>
                )}
              </div>

              {/* Requirement */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#121212]">
                  Approximate Requirement
                </label>
                <textarea
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  placeholder="e.g., 2BHK kitchen + 2 wardrobes, approx 650 sq ft, estimated timeline"
                  rows={2}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#E8E0D8] bg-[#FFFBF7] text-[14px] outline-none focus:border-[#121212] resize-none"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#121212]">
                  Additional Notes
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any specific material preferences, society constraints, or questions..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#E8E0D8] bg-[#FFFBF7] text-[14px] outline-none focus:border-[#121212] resize-none"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full h-[52px] rounded-full bg-[#121212] text-white text-[15px] font-semibold hover:bg-black transition shadow-sm active:scale-95 cursor-pointer"
                >
                  Request Site Visit
                </button>
                <p className="mt-3 text-[11px] text-center text-[#6B6B6B] tracking-[0.04em]">
                  By submitting, you will be redirected to WhatsApp with your details pre-filled for quick reply.
                </p>
              </div>

            </form>
          </div>

          {/* Right Info Box */}
          <div className="md:col-span-5 reveal space-y-6" style={{ transitionDelay: '0.08s' }}>
            
            <div className="rounded-[24px] bg-[#121212] text-white p-7 md:p-8 border border-white/10 shadow-xl">
              <h3 className="serif text-[26px] leading-[1.1]">
                Niranjan Interior Work
              </h3>
              <p className="mt-2 text-[13px] leading-[1.5] text-white/70">
                Interior Contractor &bull; Modular Kitchens &bull; Wardrobes &bull; Renovation
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-[14px]">
                  <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center text-white/90 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <span>Mumbai, Maharashtra</span>
                </div>

                <div className="flex items-center gap-3 text-[14px]">
                  <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center text-white/90 shrink-0">
                    <Phone size={18} />
                  </div>
                  <a href="tel:+919967355478" className="hover:text-white/80 transition underline font-medium">
                    +91 9967355478
                  </a>
                </div>

                <div className="flex items-center gap-3 text-[14px]">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 grid place-items-center text-[#25D366] shrink-0">
                    <MessageCircle size={18} />
                  </div>
                  <span>WhatsApp Available (Fast Response)</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['Mumbai-wide', 'Site Visit', 'Transparent Pricing', 'Clean Execution'].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] tracking-[0.06em] text-white/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <a
                href={WHATSAPP_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full h-12 rounded-full bg-white text-[#121212] inline-flex items-center justify-center gap-2 text-[14px] font-semibold hover:bg-[#FFFBF7] transition active:scale-95"
              >
                <span className="w-5 h-5 rounded-full bg-[#25D366] grid place-items-center text-white text-[12px] font-bold">
                  W
                </span>
                Chat on WhatsApp
              </a>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[12px] leading-[1.6] text-white/60">
                  Response within a few hours. Share photos of your current space or floor plans on WhatsApp for faster guidance.
                </p>
              </div>
            </div>

            {/* Side Image */}
            <div className="rounded-[20px] overflow-hidden border border-[#E8E0D8] h-[220px] shadow-sm">
              <img
                src="/images/full_home_apartment.webp"
                alt="Niranjan Interior Work full apartment finished interior in Mumbai"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1280}
                height={854}
              />
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-white border-t border-[#E8E0D8]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 flex flex-col md:flex-row justify-between gap-8">
          
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#121212] grid place-items-center relative overflow-hidden">
                <span className="serif text-[18px] text-white">N</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#B86B4E] rounded-tl-[6px]" />
              </div>
              <div className="serif text-[19px] tracking-[-0.01em] font-normal text-[#121212]">
                NIRANJAN INTERIOR WORK
              </div>
            </div>
            <div className="mt-3 text-[13px] text-[#6B6B6B] leading-[1.5]">
              Interior Contracting &bull; Modular Kitchens &bull; Wardrobes &bull; Renovation
            </div>
            <div className="mt-1 text-[13px] text-[#6B6B6B]">
              Mumbai, Maharashtra, India
            </div>
          </div>

          <div className="text-[13px] text-[#6B6B6B] leading-[1.6]">
            <div>
              WhatsApp / Direct:{' '}
              <a
                href={WHATSAPP_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212] font-semibold underline underline-offset-2 hover:text-[#B86B4E]"
              >
                +91 9967355478
              </a>
            </div>
            <div className="mt-2 max-w-[40ch]">
              Mumbai-based interior contractor. Modular kitchens, wardrobes, and full home interiors. Serving Mumbai and nearby areas.
            </div>
            <div className="mt-4 text-[11px] tracking-[0.08em] uppercase font-semibold text-[#121212]/70">
              &copy; {new Date().getFullYear()} Niranjan Interior Work &bull; Mumbai
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Action on Desktop */}
      <a
        href={WHATSAPP_DEFAULT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_12px_24px_rgba(37,211,102,0.35)] items-center justify-center text-[24px] hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle size={28} />
      </a>

      {/* Bottom Sticky Action Bar on Mobile */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E8E0D8] p-3 flex gap-3 shadow-lg"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <a
          href="#contact"
          className="flex-1 h-12 rounded-full bg-[#121212] text-white inline-flex items-center justify-center text-[14px] font-semibold shadow-xs"
        >
          Request Site Visit
        </a>
        <a
          href={WHATSAPP_DEFAULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 rounded-full bg-[#25D366] text-white inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold shadow-xs"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-white px-6 py-3 rounded-full text-[13px] font-medium shadow-2xl border border-white/10 animate-slide-up flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#25D366]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
