
import React from 'react';
import RoomCard from './RoomCard';

const RoomsList = ({ 
  rooms = [], 
  onRoomSelect, 
  selectedRoom = null, 
  className = '',
  title = "Available Rooms"
}) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <p className="text-gray-600">No rooms available for this date</p>
        <p className="text-sm text-gray-500 mt-1">Try selecting a different date</p>
      </div>
    );
  }

  // Sort rooms by a predefined order for consistency
  const roomOrder = ["Double", "Triple", "Quad", "Quint", "Jr Suites"];
  const sortedRooms = [...rooms].sort((a, b) => {
    const orderA = roomOrder.indexOf(a.room_type);
    const orderB = roomOrder.indexOf(b.room_type);
    return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
  });

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {sortedRooms.map((room, index) => (
          <RoomCard
            key={`${room.room_type}-${index}`}
            room={room}
            onSelect={onRoomSelect}
            isSelected={selectedRoom?.room_type === room.room_type}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
