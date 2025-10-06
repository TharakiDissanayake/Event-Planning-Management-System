import React, { useState } from "react";

const Calendar = ({ events = [], onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get current month and year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days in month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Check if date has events
  const hasEvent = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateString);
  };

  // Get events for a specific date
  const getEventsForDate = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events.filter(event => event.date === dateString);
    
    // Log events for this date for debugging
    if (dayEvents.length > 0) {
      console.log(`Events for ${dateString}:`, dayEvents);
    }
    
    return dayEvents;
  };
  
  // Check if a date has events of a specific status
  const hasEventWithStatus = (day, status) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateString && event.status === status);
  };
  
  // Get background color for a day cell based on events
  const getDayCellColor = (day) => {
    const hasCompletedEvent = hasEventWithStatus(day, 'COMPLETED');
    const hasPendingEvent = hasEventWithStatus(day, 'PENDING');
    
    if (hasCompletedEvent && hasPendingEvent) {
      // Both statuses present - use gradient or different color
      return 'bg-gradient-to-r from-green-50 to-yellow-50';
    } else if (hasCompletedEvent) {
      return 'bg-green-50'; // Light green for completed events
    } else if (hasPendingEvent) {
      return 'bg-yellow-50'; // Light yellow for pending events
    } else {
      return 'bg-white'; // Default background for days without events
    }
  };

  // Generate calendar days
  const renderCalendarDays = () => {
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-36 border border-gray-200"></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvents = hasEvent(day);
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      const dayCellColor = getDayCellColor(day);

      days.push(
        <div
          key={day}
          className={`h-36 border border-gray-200 p-1 relative ${
            isToday ? 'bg-blue-100' : dayCellColor
          } hover:bg-gray-50 transition-colors`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          {hasEvents && (
            <div className="mt-2">
              {dayEvents.slice(0, 2).map((event, idx) => (
                <div
                  key={idx}
                  className={`text-xs rounded px-2 py-1 mb-1 ${
                    event.status === 'COMPLETED' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  } cursor-pointer hover:opacity-80 transition-opacity shadow-sm`}
                  title={`${event.eventCategory || ''} - ${event.title} - ${event.customerId || ''} (${event.customerName || ''})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    if (onEventClick) {
                      onEventClick(event);
                    }
                  }}
                >
                  <div className="flex flex-col">
                    {/* Event Category */}
                    {event.eventCategory && (
                      <div className="text-[10px] uppercase font-bold opacity-90 tracking-wide truncate">
                        {event.eventCategory}
                      </div>
                    )}
                    
                    {/* Event Title */}
                    <div className="font-semibold truncate">{event.title}</div>
                    
                    {/* Customer Info */}
                    <div className="text-xs opacity-90 truncate">
                      {event.customerId ? (
                        <>
                          <span className="font-medium">{event.customerId}</span>
                          {event.customerName && <span> - {event.customerName}</span>}
                        </>
                      ) : 'No customer info'}
                    </div>
                  </div>
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-600 font-medium">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">
          {monthNames[month]} {year}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center font-semibold text-gray-600 bg-gray-100">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 border border-gray-200">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center mt-4 space-x-6 text-sm flex-wrap">
        <div className="flex items-center m-1">
          <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded mr-2"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center m-1">
          <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded mr-2"></div>
          <span>Pending Events</span>
        </div>
        <div className="flex items-center m-1">
          <div className="w-4 h-4 bg-green-50 border border-green-200 rounded mr-2"></div>
          <span>Completed Events</span>
        </div>
        <div className="flex items-center m-1">
          <div className="w-4 h-4 bg-gradient-to-r from-green-50 to-yellow-50 border border-gray-200 rounded mr-2"></div>
          <span>Mixed Events</span>
        </div>
      </div>
      
      {/* Event Types Legend */}
      <div className="flex items-center justify-center mt-2 space-x-6 text-sm flex-wrap">
        <div className="flex items-center m-1">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span>Pending Event</span>
        </div>
        <div className="flex items-center m-1">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span>Completed Event</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;