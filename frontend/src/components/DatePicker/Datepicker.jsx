import React from 'react';
import Flatpickr from 'react-flatpickr';

function Datepicker({ selectedDate, setSelectedDate }) {

  const options = {
    dateFormat: 'M j, Y',
    defaultDate: new Date(selectedDate),
    position: "above",
    prevArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDate, dateStr, instance) => {
      setSelectedDate(selectedDate);
      instance.element.value = dateStr.replace('to', '-');
    },
    onChange: (selectedDate, dateStr, instance) => {
      setSelectedDate(selectedDate);
      instance.element.value = dateStr.replace('to', '-');
    },
  }

  return (
    <div className="relative">
      <Flatpickr 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 
        leading-tight focus:outline-none focus:shadow-outline" options={options} />
      <div className="absolute right-3 top-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
    </div>
  );
}

export default Datepicker;
