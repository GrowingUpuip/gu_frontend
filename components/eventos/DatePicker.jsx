import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="form-group">
      <label htmlFor="datePicker">Date{"\u00A0"}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="form-control"
        id="datePicker"
      />
    </div>
  );
};

export default DatePickerComponent;
