
import Hero1 from "../assets/Hero_images/Hero1.jpg";
import Hero2 from "../assets/Hero_images/Hero2.jpg";
import Hero3 from "../assets/Hero_images/Hero3.jpg";
import Hero4 from "../assets/Hero_images/Hero4.jpg";
import Hero5 from "../assets/Hero_images/Hero5.jpg";
import Hero6 from "../assets/Hero_images/Hero6.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHotels } from "../components/utils/apiutils";
import Slider from "react-slick";
import Select from "react-select";
import "../CustomStyles.css";
import { useLanguage } from "../LanguageContext";
import GlassCard from "./ui/GlassCard";
import AnimatedButton from "./ui/AnimatedButton";
import GradientText from "./ui/GradientText";
import FloatingElement from "./ui/FloatingElement";

const Hero = ({ onDataUpdate, handleExploreClick }) => {
  const { language } = useLanguage();
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption.value);
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption.value);
  };

  const handleSearchClick = async () => {
    const endpoint = `/hotel?location=${location}&month=${month}`;
    try {
      const data = await fetchHotels(endpoint);
      console.log("Hero---", data);
      navigate("/hotelsearch", {
        state: {
          hotels: data,
          location: location,
          month: month,
        },
      });
      onDataUpdate(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const images = [Hero3, Hero4, Hero5, Hero6];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)"
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(new Date(0, i)),
  }));

  const locations = [
    { value: "Madina", label: language === "en" ? "Madina" : "Madinah" },
    { value: "Makkah", label: language === "en" ? "Makkah" : "Mekah" },
  ];

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      padding: '8px 12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#FA9F36',
        boxShadow: '0 8px 32px rgba(250, 159, 54, 0.2)',
      }
    }),
    menu: (base) => ({
      ...base,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? 'rgba(250, 159, 54, 0.1)' : 'transparent',
      color: '#333',
      padding: '12px 16px',
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider with Overlay */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="relative h-screen">
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-gradient-to-br from-[#FA9F36]/20 to-transparent rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={2} className="absolute bottom-32 right-16">
          <div className="w-48 h-48 bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={4} className="absolute top-1/2 right-1/4">
          <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-lg"></div>
        </FloatingElement>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Begin Your Sacred</span>
              <br />
              <GradientText className="text-6xl md:text-8xl">
                {language === "en" ? "Journey" : "Perjalanan"}
              </GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Experience a transformative spiritual journey with our premium Hajj & Umrah packages, crafted with devotion and expertise."
                : "Rasakan perjalanan spiritual yang transformatif dengan paket Haji & Umrah premium kami, dibuat dengan pengabdian dan keahlian."}
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <AnimatedButton
              size="lg"
              onClick={handleExploreClick}
              className="mb-12"
            >
              {language === "en" ? "✨ Start Your Journey" : "✨ Mulai Perjalanan Anda"}
              <svg className="inline ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </AnimatedButton>
          </div>

          {/* Search Form */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <GlassCard className="p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                {language === "en" ? "Find Your Perfect Stay" : "Temukan Penginapan Sempurna Anda"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="space-y-3">
                  <label className="block text-white/90 font-medium text-sm uppercase tracking-wider">
                    {language === "en" ? "Destination" : "Tujuan"}
                  </label>
                  <Select
                    options={locations}
                    value={locations.find((loc) => loc.value === location)}
                    onChange={handleLocationChange}
                    placeholder={language === "en" ? "Select Location" : "Pilih Lokasi"}
                    styles={customSelectStyles}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-white/90 font-medium text-sm uppercase tracking-wider">
                    {language === "en" ? "Travel Month" : "Bulan Perjalanan"}
                  </label>
                  <Select
                    options={months}
                    value={months.find((m) => m.value === parseInt(month))}
                    onChange={handleMonthChange}
                    placeholder={language === "en" ? "Select Month" : "Pilih Bulan"}
                    styles={customSelectStyles}
                    className="text-sm"
                  />
                </div>

                <AnimatedButton
                  onClick={handleSearchClick}
                  size="lg"
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  {language === "en" ? "Search Hotels" : "Cari Hotel"}
                </AnimatedButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
