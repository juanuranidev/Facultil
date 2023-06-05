import BottomNavbar from "layout/navbar/bottomNavbar/BottomNavbar";
import React from "react";
import Calendar from "views/student/calendar/Calendar";

export default function index() {
  return (
    <>
      <Calendar />
      <BottomNavbar />;
    </>
  );
}
