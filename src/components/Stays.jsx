
import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import fallbackImage from "../assets/Dummy.png";
import { useLanguage } from "../LanguageContext";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorMessage from "./ui/ErrorMessage";
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
      heading: "Our affordable ",
      heading_span: "Stays",
      subheading: "Discover your perfect accommodation with our all-inclusive packages.",
      viewMore: "View More",
      noRooms: "No rooms available",
      viewAll: "View All",
      startingFrom: "Starting from",
      perNight: "/night",
    },
    id: {
      heading: "Penginapan terjangkau",
      heading_span: "Tetap",
      subheading: "Temukan akomodasi sempurna Anda dengan paket all-inclusive kami.",
      viewMore: "lagi",
      noRooms: "Tidak ada kamar tersedia",
      viewAll: "Lihat Semua",
      startingFrom: "Dimulai dari",
      perNight: "/malam",
    },
  };

  if (loading) {
    return (
      <section ref={ref} className="h-full bg-white mt-8 py-16">
        <LoadingSpinner size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section ref={ref} className="h-full bg-white mt-8 py-16">
        <ErrorMessage message={error} onRetry={fetchHotels} />
      </section>
    );
  }

  if (!Array.isArray(hotels) || hotels.length === 0) {
    return (
      <section ref={ref} className="h-full bg-white mt-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No Hotels Available</h2>
          <p className="text-gray-600">Please check back later for available accommodations.</p>
        </div>
      </section>
    );
  }

  const displayedHotels = hotels.slice(0, 6);

  return (
    <section ref={ref} className="h-full bg-white mt-8">
      <div className="text-center py-4">
        <h1 className="text-4xl font-semibold">
          {content[language].heading}
          <span className="text-4xl text-[#FA9F36] font-semibold">
            {content[language].heading_span}
          </span>
        </h1>
        <p className="text-[#666666] mt-4 max-w-2xl mx-auto">
          {content[language].subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12 bg-white">
        {displayedHotels.map((hotel) => {
          const lowestRoom = getLowestPricedRoom(hotel.Sessions);
          const hotelImage = hotel.Hotel.cover_image;

          return (
            <article
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              key={hotel.Hotel.hotel_id}
              onClick={() => showMoreItems(hotel.Hotel.hotel_id)}
            >
              <div className="relative">
                <img
                  src={hotelImage}
                  alt={hotel.Hotel.hotel_name}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {hotel.Hotel.hotel_name}
                </h2>

                <div className="flex items-center text-gray-600 mb-4">
                  <PlaceOutlinedIcon className="text-[#FA9F36] mr-1" />
                  <span className="text-sm">{hotel.Hotel.hotel_location}</span>
                </div>

                {lowestRoom ? (
                  <div className="flex justify-between items-end">
                    <div className="bg-gray-50 p-3 rounded-lg flex-1 mr-3">
                      <h3 className="font-medium text-gray-800 mb-1">
                        {lowestRoom.room_type}
                      </h3>
                      <div className="text-sm text-gray-600">
                        <span>{content[language].startingFrom}</span>
                        <div className="font-semibold text-lg text-[#FA9F36]">
                          <span className="text-xs">SAR</span> {lowestRoom.room_price}
                          <span className="text-sm font-normal">{content[language].perNight}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showMoreItems(hotel.Hotel.hotel_id);
                      }}
                      className="text-[#FA9F36] hover:text-[#e8903a] transition-colors p-2"
                      aria-label={`View more details about ${hotel.Hotel.hotel_name}`}
                    >
                      {content[language].viewMore}
                      <svg className="inline ml-1 w-4 h-4 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="text-gray-500 text-sm">{content[language].noRooms}</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex justify-center py-8">
        <button
          onClick={showAllItems}
          className="px-8 py-3 text-[#FA9F36] border-2 border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white rounded-lg transition-all duration-300 font-medium"
        >
          {content[language].viewAll}
          <svg className="inline ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
});

Stays.displayName = "Stays";
export default Stays;
