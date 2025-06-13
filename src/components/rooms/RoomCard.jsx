
import React from 'react';

const RoomCard = ({ room, onSelect, isSelected = false, className = '' }) => {
  return (
    <div 
      className={`
        flex flex-col items-start bg-[#F6F6F6] p-4 rounded-lg cursor-pointer
        transition-all duration-200 hover:bg-[#EAEAEA] hover:shadow-md
        ${isSelected ? 'ring-2 ring-[#FA9F36] bg-[#FFF5E6]' : ''}
        ${className}
      `}
      onClick={() => onSelect?.(room)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(room);
        }
      }}
      aria-label={`Select ${room.room_type} room for ${room.room_price > 0 ? `${room.room_price} SAR per night` : 'Not Available'}`}
    >
      <div className="flex justify-between items-start w-full mb-2">
        <h3 className="text-lg font-medium text-gray-800">{room.room_type}</h3>
        {isSelected && (
          <div className="w-5 h-5 bg-[#FA9F36] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
        {room.room_price > 0 ? (
          <div className="flex items-baseline gap-1">
            <span className="text-[#FA9F36]">{room.room_price}</span>
            <span className="text-sm text-gray-600">SAR/night</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500">Not Available</span>
        )}
      </div>
      {room.room_price > 0 && (
        <div className="mt-2 text-xs text-gray-600">
          Includes taxes and fees
        </div>
      )}
    </div>
  );
};

export default RoomCard;
