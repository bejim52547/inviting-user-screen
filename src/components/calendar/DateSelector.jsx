
import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/CalendarStyles.css";
import LoadingSpinner from '../ui/LoadingSpinner';
import RoomsList from '../rooms/RoomsList';

const DateSelector = ({ 
  date, 
  onDateChange, 
  roomData = [], 
  loading = false, 
  onEnquireClick,
  className = '' 
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Specific Date</h2>
      
      <div className="mb-6">
        <Calendar
          onChange={onDateChange}
          value={date}
          className="border border-gray-200 rounded-lg w-full"
          minDate={new Date()}
          formatShortWeekday={(locale, date) => 
            date.toLocaleDateString(locale, { weekday: 'narrow' })
          }
        />
      </div>

      {loading ? (
        <LoadingSpinner className="my-8" />
      ) : (
        <>
          <RoomsList 
            rooms={roomData}
            title="Rooms for Selected Date"
            className="mb-6"
          />
          
          {roomData.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                All prices include taxes and applicable fees
              </p>
              <button
                onClick={onEnquireClick}
                className="
                  w-full py-3 bg-[#FA9F36] text-white rounded-lg font-medium
                  hover:bg-[#e8903a] transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-[#FA9F36] focus:ring-offset-2
                "
              >
                Enquire to Book Now
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DateSelector;
