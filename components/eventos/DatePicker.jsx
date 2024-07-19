import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div class="form-group">
      <label htmlFor="datePicker">Date{"\u00A0"}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        class="form-control"
        id="datePicker"
      />
    </div>
  );
};

export default DatePickerComponent;
