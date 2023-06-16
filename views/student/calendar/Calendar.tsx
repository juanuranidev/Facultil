import React, { useState } from "react";
import esAr from "rsuite/locales/es_AR";
import {
  CustomProvider,
  Calendar as CalendarComponent,
  Whisper,
  Popover,
  Badge,
} from "rsuite";
import BottomNavbar from "layout/navbar/bottomNavbar/BottomNavbar";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import ModalCalendarEvents from "components/modals/modalCalendarEvents/ModalCalendarEvents";

const eventsTEST = [
  {
    date: "10/06/2023",
    events: [
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      { time: "12:30", title: "Client entertaining" },
      { time: "02:00", title: "Product design discussion" },
      { time: "05:00", title: "Product test and acceptance" },
      { time: "06:30", title: "Reporting" },
      { time: "10:00", title: "Going home to walk the dog" },
    ],
  },
  {
    date: "12/06/2023",
    events: [
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      { time: "06:30", title: "Reporting" },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      { time: "05:00", title: "Product test and acceptance" },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      {
        time: "09:30",
        title:
          "Products Introduction Meeting Products Introduction Meeting s Introduction Meeting s Introduction Meeting s Introduction Meeting s Introduction Meeting",
      },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      { time: "12:30", title: "Client entertaining" },
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      { time: "02:00", title: "Product design discussion" },
      { time: "10:00", title: "Going home to walk the dog" },
    ],
  },
  {
    date: "15/06/2023",
    events: [
      {
        time: "09:30",
        title: "Products Introduction Meeting Products Introduction Meeting",
      },
      { time: "12:30", title: "Client entertaining" },
      { time: "02:00", title: "Product design discussion" },
      { time: "05:00", title: "Product test and acceptance" },
      { time: "06:30", title: "Reporting" },
      { time: "10:00", title: "Going home to walk the dog" },
    ],
  },
];

function formatEvents(events: any) {
  const formattedEvents: any = {};

  for (const event of events) {
    const formattedDate: any = moment(event.date, "DD/MM/YYYY").format(
      "DD/MM/YYYY"
    );
    formattedEvents[formattedDate] = event.events;
  }

  return formattedEvents;
}

function getTodoList(date: Date) {
  const formattedDate: any = moment(date).format("DD/MM/YYYY");
  const formattedEvents = formatEvents(eventsTEST);

  return formattedEvents[formattedDate] || [];
}

function renderCell(date: any) {
  const list = getTodoList(date);
  const displayList = list.filter((item: any, index: any) => index < 2);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {list.map((item: any, index: any) => (
                <p key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <a>{moreCount} more</a>
        </Whisper>
      </li>
    );

    return (
      <ul className="calendar-todo-list">
        {displayList.map((item: any, index: any) => (
          <li key={index}>
            <Badge /> <b>{item.time}</b> - {item.title}
          </li>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}

export default function Calendar() {
  const [dayEvents, setDayEvents] = useState([]);
  const [monthEvents, setMonthEvents] = useState(eventsTEST);
  const [dateSelected, setDateSelected] = useState<string>("");
  const [modalCalendarEvents, setModalCalendarEvents] = useState(false);

  const handleOpenCalendarEvents = (date: Date) => {
    const selectedDate = moment(date).format("DD/MM/YYYY");

    setDateSelected(selectedDate);
    setModalCalendarEvents(true);

    const dayEvents: any = monthEvents.find(
      (monthEvent: any) => monthEvent.date === selectedDate
    );

    if (dayEvents?.events?.length) {
      setDayEvents(dayEvents.events);
    }
  };

  const handleChangeMonth = (date: Date) => {
    const firstDayOfMonth = moment(date).startOf("month").format("DD/MM/YYYY");
    const lastDayOfMonth = moment(date).endOf("month").format("DD/MM/YYYY");
    console.log(moment(date).format("DD/MM/YYYY"));
  };

  const handleCloseModalCalendarEventes = () => {
    setDayEvents([]);
    setDateSelected("");
    setModalCalendarEvents(false);
  };

  return (
    <CustomProvider locale={esAr}>
      <BottomNavbar />
      <CalendarComponent
        renderCell={renderCell}
        onMonthChange={(date) => handleChangeMonth(date)}
        // onSelect={(date: string) => handleChangeMonth(date)}
        // defaultValue={new Date()}
        onSelect={(date) => handleOpenCalendarEvents(date)}
      />
      {modalCalendarEvents ? (
        <ModalCalendarEvents
          isOpen={modalCalendarEvents}
          onClose={handleCloseModalCalendarEventes}
          events={dayEvents}
          dateSelected={dateSelected}
        />
      ) : null}
    </CustomProvider>
  );
}
