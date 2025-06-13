
import React from 'react';

const MealTypeSelector = ({ mealType, onMealTypeChange, className = '' }) => {
  const mealOptions = [
    { value: 'BB', label: 'BB (1 Meal/Day)', description: 'Breakfast included' },
    { value: 'FB', label: 'FB (3 Meals/Day)', description: 'All meals included' }
  ];

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Meal Type</h3>
      
      <div className="space-y-3">
        {mealOptions.map((option) => (
          <label 
            key={option.value}
            className="
              flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer
              transition-all duration-200 hover:bg-gray-50
              has-[:checked]:border-[#FA9F36] has-[:checked]:bg-[#FFF5E6]
            "
          >
            <input
              type="radio"
              value={option.value}
              checked={mealType === option.value}
              onChange={(e) => onMealTypeChange(e.target.value)}
              className="w-4 h-4 text-[#FA9F36] border-gray-300 focus:ring-[#FA9F36] focus:ring-2"
            />
            <div className="ml-3">
              <div className="font-medium text-gray-800">{option.label}</div>
              <div className="text-sm text-gray-600">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MealTypeSelector;
