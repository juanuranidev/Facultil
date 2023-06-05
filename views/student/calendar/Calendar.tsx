import React from "react";
import esAr from "rsuite/locales/es_AR";
import { CustomProvider, Calendar as CalendarComponent } from "rsuite";
import BottomNavbar from "layout/navbar/bottomNavbar/BottomNavbar";

export default function Calendar() {
  return (
    <CustomProvider locale={esAr}>
      <BottomNavbar />
      <CalendarComponent />;
    </CustomProvider>
  );
}
