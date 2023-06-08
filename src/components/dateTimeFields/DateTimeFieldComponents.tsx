import "./styles.sass";

import * as React from 'react';
import moment, { Moment } from 'moment';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

interface DateFieldComponentProps {
  label?: string;
  onChange: (value: Date | null) => void;
  value: Date | null;
}

const DateFieldComponent: React.FC<DateFieldComponentProps> = ({ label, onChange, value }) => {
  const [date, setDate] = React.useState<Moment | null>(moment(value) || null);

  const handleDateChange = (newDate: Moment | null) => {
    setDate(newDate);

    if (newDate && newDate.isValid()) {
      onChange(moment(newDate).toDate());
      
    } else {
      onChange(null);
    }
  };

  return (
    <DateField
      label={label || ""}
      value={date}
      onChange={handleDateChange}
      format="DD.MM.YYYY"
      InputProps={{ className: "myInput" }}
      InputLabelProps={{ shrink: true, className: "myLabel" }}
      className="dateField"
      sx={{
        ":hover": {
          outline: "none"
        }
      }}
    />
  );
}

interface TimeFieldComponentProps {
  label?: string;
  onChange: (value: Date | null) => void;
  value: Date | null;
}

const TimeFieldComponent: React.FC<TimeFieldComponentProps> = ({ label, onChange, value }) => {
  const [time, setTime] = React.useState<Moment | null>(moment(value) || null);

  const handleTimeChange = (newTime: Moment | null) => {
    setTime(newTime);

    if (newTime && newTime.isValid()) {
      onChange(moment(newTime).toDate());
      
    } else {
      onChange(null);
    }
  };

  return (
    <TimeField
      label={label || ""}
      value={time}
      onChange={handleTimeChange}
      format="hh:mm"
      InputProps={{ className: "myInput" }}
      InputLabelProps={{ shrink: true, className: "myLabel" }}
      className="timeField"
    />
  );
}

export { DateFieldComponent, TimeFieldComponent };
