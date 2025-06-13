
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SessionCard = ({ 
  session, 
  mealType, 
  onEnquireClick, 
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString("en", { month: "short" }).toUpperCase(),
      day: date.getDate(),
      year: date.getFullYear()
    };
  };

  const startDate = formatDate(session.start_date);
  const endDate = formatDate(session.end_date);

  // Get rooms for selected meal type
  const roomsForMeal = session.Meals?.find(meal => meal.meal_type === mealType)?.Rooms || [];
  const roomOrder = ["Double", "Triple", "Quad", "Quint", "Jr Suites"];
  const sortedRooms = roomsForMeal.sort((a, b) => 
    roomOrder.indexOf(a.room_type) - roomOrder.indexOf(b.room_type)
  );

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4
        transition-all duration-300 hover:shadow-md
        ${className}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-6 lg:space-y-0">
        {/* Date Range */}
        <div className="flex items-center bg-gray-50 p-4 rounded-lg min-w-fit">
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded">
              {startDate.month}
            </span>
            <span className="text-2xl font-bold text-gray-800 mt-1">
              {startDate.day}
            </span>
            <span className="text-sm text-gray-600">
              {startDate.year}
            </span>
          </div>
          
          <div className="mx-4">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[#FA9F36] text-lg"
            />
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded">
              {endDate.month}
            </span>
            <span className="text-2xl font-bold text-gray-800 mt-1">
              {endDate.day}
            </span>
            <span className="text-sm text-gray-600">
              {endDate.year}
            </span>
          </div>
        </div>

        {/* Room Pricing Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedRooms.length > 0 ? (
              sortedRooms.map((room, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200"
                >
                  <h4 className="font-medium text-gray-800 mb-2">
                    {room.room_type}
                  </h4>
                  <div className="text-lg font-semibold">
                    {room.room_price > 0 ? (
                      <div>
                        <span className="text-[#FA9F36]">{room.room_price}</span>
                        <span className="text-sm text-gray-600 ml-1">SAR/night</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not Available</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-4">
                No rooms available for {mealType} meal type
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Actions */}
      <div 
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? 'max-h-32 opacity-100 mt-6' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Meal Plan:</span> {mealType === 'FB' ? '3 Meals/Day' : '1 Meal/Day'}
            </p>
            <button
              onClick={onEnquireClick}
              className="
                px-6 py-3 bg-[#FA9F36] text-white rounded-lg font-medium
                hover:bg-[#e8903a] transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#FA9F36] focus:ring-offset-2
              "
            >
              Enquire to Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
