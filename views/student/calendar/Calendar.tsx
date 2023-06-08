import React, { useState } from "react";
import esAr from "rsuite/locales/es_AR";
import { CustomProvider, Calendar as CalendarComponent } from "rsuite";
import BottomNavbar from "layout/navbar/bottomNavbar/BottomNavbar";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState();

  const handleOpenEvents = (date: string) => {};

  return (
    <CustomProvider locale={esAr}>
      <BottomNavbar />
      <CalendarComponent onSelect={(date) => console.log("SELECT", date)} />;
    </CustomProvider>
  );
}
