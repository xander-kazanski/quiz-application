const Weekdays = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="grid grid-cols-7 bg-blue-500 text-white font-bold text-center">
      {days.map((day, index) => (
        <div key={index} className="py-3 px-1 md:py-4">
          <span className="hidden sm:inline">{day}</span>
          <span className="sm:hidden">{day.substring(0, 3)}</span>
        </div>
      ))}
    </div>
  );
};

export default Weekdays;