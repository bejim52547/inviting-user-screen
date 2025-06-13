import logo from "../assets/logo.png"; // If you need to use the logo
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Navbar, Newsletter, Footer } from "./index";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { debounce } from "lodash";
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';
import SessionCard from './sessions/SessionCard';
import DateSelector from './calendar/DateSelector';
import MealTypeSelector from './hotel/MealTypeSelector';

function HotelViewPage() {
  const { hotelId } = useParams();
  const [date, setDate] = useState(new Date());
  const [roomData, setRoomData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [selectedRoomData, setSelectedRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [error, setError] = useState(null);
  const [mealType, setMealType] = useState("FB");

  const fetchHotelData = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/hotel/${hotelId}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch hotel data');
      }
      
      const data = await response.json();
      setHotelData(data[0]);
      fetchRoomData(new Date());
    } catch (err) {
      console.error('Hotel data fetch error:', err);
      setError("Failed to load hotel data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  const fetchRoomData = useCallback(
    async (selectedDate) => {
      const formattedDate = formatDate(selectedDate);
      setLoadingRooms(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/hotel?hotel_id=${hotelId}&date=${formattedDate}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch room data');
        }
        
        const data = await response.json();
        const roomDataForDate = data[0]?.Sessions || [];
        
        const availableSession = roomDataForDate.find((session) => {
          const startDate = new Date(session.start_date);
          const endDate = new Date(session.end_date);
          return selectedDate >= startDate && selectedDate <= endDate;
        });

        if (availableSession) {
          const roomsForSelectedMeal =
            availableSession.Meals.find((meal) => meal.meal_type === mealType)
              ?.Rooms || [];
          setSelectedRoomData(roomsForSelectedMeal);
        } else {
          setSelectedRoomData([]);
        }
      } catch (err) {
        console.error('Room data fetch error:', err);
        setSelectedRoomData([]);
      } finally {
        setLoadingRooms(false);
      }
    },
    [hotelId, mealType]
  );

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  useEffect(() => {
    if (hotelData) {
      fetchRoomData(date);
    }
  }, [mealType, date, fetchRoomData, hotelData]);

  const handleDateChange = debounce((newDate) => {
    setDate(newDate);
  }, 300);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEnquireClick = useCallback(() => {
    const hotelNameString = hotelData?.Hotel?.hotel_name || "Hotel";
    const inputMessage = `Hello, I would like to enquire about booking a room at ${hotelNameString}.`;
    const phoneNumber = "+966536258731";
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(inputMessage)}`;
    window.open(whatsappUrl, "_blank");
  }, [hotelData]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };

  if (loading) {
    return (
      <section className="bg-[#FEFCFB] min-h-screen">
        <Navbar />
        <LoadingSpinner className="my-56" size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#FEFCFB] min-h-screen">
        <Navbar />
        <ErrorMessage 
          message={error} 
          onRetry={fetchHotelData}
          className="my-56"
        />
      </section>
    );
  }

  return (
    <section className="bg-[#FEFCFB]">
      <Navbar />
      
      <main className="ml-4 md:ml-24 mr-4 md:mr-32">
        {/* Breadcrumb Navigation */}
        <nav className="flex mt-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-500 font-medium "
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/hotelsearch"
                  className="ms-1 text-sm text-gray-500 font-medium"
                >
                  Hotel Search
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link to="/fetchhotel" className="ms-1 text-sm font-medium">
                  Hotel view
                </Link>
              </div>
            </li>
          </ol>
        </nav>

        {/* Hotel Header */}
        <header className="mt-4">
          <h1 className="text-2xl md:text-4xl font-semibold text-[#05073C]">
            {hotelData.Hotel.hotel_name}
          </h1>
          <div className="flex items-center py-4 text-gray-600">
            <PlaceOutlinedIcon className="text-[#FA9F36]" />
            <span className="ml-2 text-lg">{hotelData.Hotel.hotel_location}</span>
          </div>
        </header>

        {/* Hotel Images Carousel */}
        <section className="py-2" aria-label="Hotel Images">
          {hotelData.Images && hotelData.Images.length > 0 ? (
            <Slider {...carouselSettings} className="carousel-container">
              {hotelData.Images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <img
                    src={image.image_path}
                    alt={`${hotelData.Hotel.hotel_name} - Image ${index + 1}`}
                    className="w-full h-[550px] object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://cdn.icon-icons.com/icons2/2490/PNG/512/hotel_icon_150155.png";
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="flex justify-center items-center h-96 bg-gray-100 rounded-md">
              <img
                src="https://cdn.icon-icons.com/icons2/2490/PNG/512/hotel_icon_150155.png"
                alt="No hotel images available"
                className="w-32 h-32 opacity-50"
              />
            </div>
          )}
        </section>

        {/* Accommodation Details Section */}
        <section className="mt-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4 md:mb-0">
              Accommodation Details
            </h2>
            <MealTypeSelector 
              mealType={mealType}
              onMealTypeChange={setMealType}
              className="w-full md:w-auto"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sessions Column */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">All Sessions</h3>
              {hotelData.Sessions && hotelData.Sessions.length > 0 ? (
                <div className="space-y-4">
                  {hotelData.Sessions.map((session, index) => (
                    <SessionCard
                      key={index}
                      session={session}
                      mealType={mealType}
                      onEnquireClick={() => handleEnquireClick()}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No sessions available for this hotel.</p>
                </div>
              )}
            </div>

            {/* Date Selector Column */}
            <div className="lg:col-span-1">
              <DateSelector
                date={date}
                onDateChange={handleDateChange}
                roomData={selectedRoomData}
                loading={loadingRooms}
                onEnquireClick={handleEnquireClick}
              />
            </div>
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </section>
  );
}

export default HotelViewPage;
