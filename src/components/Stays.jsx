import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Star from "lucide-react";
import MapPin from "lucide-react";
import ArrowRight from "lucide-react";
import fallbackImage from "../assets/Dummy.png";
import { useLanguage } from "../LanguageContext";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorMessage from "./ui/ErrorMessage";
import GlassCard from "./ui/GlassCard";
import AnimatedButton from "./ui/AnimatedButton";
import GradientText from "./ui/GradientText";
import "../CustomStyles.css";

const Stays = forwardRef(({ hotels: propHotels }, ref) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/hotel`);
      setHotels(response.data);
    } catch (err) {
      console.error('Hotels fetch error:', err);
      setError("Failed to fetch hotel data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const showMoreItems = (hotelId) => {
    navigate(`/hotelviewpage/${hotelId}`);
  };

  const showAllItems = () => {
    navigate("/hotelsearch", { state: { hotels } });
  };

  const getLowestPricedRoom = (sessions) => {
    if (!Array.isArray(sessions)) return null;

    let lowestPrice = Infinity;
    let lowestRoom = null;

    sessions.forEach((session) => {
      if (session.Meals && Array.isArray(session.Meals)) {
        session.Meals.forEach((meal) => {
          if (meal.Rooms && Array.isArray(meal.Rooms)) {
            meal.Rooms.forEach((room) => {
              if (room.room_price > 0 && room.room_price < lowestPrice) {
                lowestPrice = room.room_price;
                lowestRoom = room;
              }
            });
          }
        });
      }
    });

    return lowestRoom;
  };

  const content = {
    en: {
      heading: "Premium ",
      heading_span: "Accommodations",
      subheading: "Discover exceptional stays designed for your spiritual journey with world-class amenities and sacred proximity.",
      viewMore: "Explore",
      noRooms: "Contact for availability",
      viewAll: "View All Hotels",
      startingFrom: "Starting from",
      perNight: "/night",
    },
    id: {
      heading: "Premium ",
      heading_span: "Akomodasi",
      subheading: "Temukan penginapan luar biasa yang dirancang untuk perjalanan spiritual Anda dengan fasilitas kelas dunia dan kedekatan yang sakral.",
      viewMore: "Jelajahi",
      noRooms: "Hubungi untuk ketersediaan",
      viewAll: "Lihat Semua Hotel",
      startingFrom: "Dimulai dari",
      perNight: "/malam",
    },
  };

  if (loading) {
    return (
      <section ref={ref} className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <LoadingSpinner size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section ref={ref} className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <ErrorMessage message={error} onRetry={fetchHotels} />
      </section>
    );
  }

  if (!Array.isArray(hotels) || hotels.length === 0) {
    return (
      <section ref={ref} className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FA9F36] to-[#FF6B35] rounded-full mx-auto mb-6 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Hotels Available</h2>
          <p className="text-gray-600">Please check back later for available accommodations.</p>
        </div>
      </section>
    );
  }

  const displayedHotels = hotels.slice(0, 6);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FA9F36]/10 to-[#FF6B35]/10 px-4 py-2 rounded-full mb-6">
            <Star className="w-5 h-5 text-[#FA9F36]" />
            <span className="text-[#FA9F36] font-medium">Premium Selection</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {content[language].heading}
            <GradientText className="block">
              {content[language].heading_span}
            </GradientText>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {content[language].subheading}
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedHotels.map((hotel, index) => {
            const lowestRoom = getLowestPricedRoom(hotel.Sessions);
            const hotelImage = hotel.Hotel.cover_image;

            return (
              <article
                key={hotel.Hotel.hotel_id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => showMoreItems(hotel.Hotel.hotel_id)}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={hotelImage}
                      alt={hotel.Hotel.hotel_name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-[#FA9F36] transition-colors line-clamp-2">
                      {hotel.Hotel.hotel_name}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 text-[#FA9F36] mr-2" />
                      <span className="text-sm">{hotel.Hotel.hotel_location}</span>
                    </div>

                    {lowestRoom ? (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {lowestRoom.room_type}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {content[language].startingFrom}
                            </span>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-[#FA9F36]">
                                <span className="text-sm">SAR</span> {lowestRoom.room_price}
                              </div>
                              <span className="text-xs text-gray-500">{content[language].perNight}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            showMoreItems(hotel.Hotel.hotel_id);
                          }}
                          className="w-full bg-gradient-to-r from-[#FA9F36] to-[#FF6B35] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          {content[language].viewMore}
                          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <span className="text-gray-500 text-sm">{content[language].noRooms}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            showMoreItems(hotel.Hotel.hotel_id);
                          }}
                          className="w-full mt-3 bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                        >
                          Contact Us
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <AnimatedButton
            onClick={showAllItems}
            variant="outline"
            size="lg"
            className="group"
          >
            {content[language].viewAll}
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
});

Stays.displayName = "Stays";
export default Stays;
