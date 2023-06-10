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

const fecha = new Date();
const formatoEntrada = "DD/MM/YYYY";
const formatoSalida = "YYYY-MM-DDTHH:mm:ssZ";

const objetoMoment = moment.utc(fecha, formatoEntrada);
const fechaISO8601 = objetoMoment.format(formatoSalida);

console.log(fechaISO8601);

const events = [
  {
    date: "12/11/2000",
    events: [
      { time: "09:30 pm", title: "Products Introduction Meeting" },
      { time: "12:30 pm", title: "Client entertaining" },
      { time: "02:00 pm", title: "Product design discussion" },
      { time: "05:00 pm", title: "Product test and acceptance" },
      { time: "06:30 pm", title: "Reporting" },
      { time: "10:00 pm", title: "Going home to walk the dog" },
    ],
  },
  {
    date: "13/11/2000",
    events: [
      { time: "09:30 pm", title: "Products Introduction Meeting" },
      { time: "12:30 pm", title: "Client entertaining" },
      { time: "02:00 pm", title: "Product design discussion" },
      { time: "05:00 pm", title: "Product test and acceptance" },
      { time: "06:30 pm", title: "Reporting" },
      { time: "10:00 pm", title: "Going home to walk the dog" },
    ],
  },
  {
    date: "14/11/2000",
    events: [
      { time: "09:30 pm", title: "Products Introduction Meeting" },
      { time: "12:30 pm", title: "Client entertaining" },
      { time: "02:00 pm", title: "Product design discussion" },
      { time: "05:00 pm", title: "Product test and acceptance" },
      { time: "06:30 pm", title: "Reporting" },
      { time: "10:00 pm", title: "Going home to walk the dog" },
    ],
  },
];

function formatEvents(events: any) {
  const formattedEvents: Record<string, any[]> = {};

  events.forEach((event: any) => {
    const formattedDate = moment(event.date, "DD/MM/YYYY").format("MM/DD/YYYY");
    formattedEvents[formattedDate] = event.events;
  });

  return formattedEvents;
}

console.log(formatEvents(events));

function getTodoList(date: Date) {
  const formattedDate: any = moment(date).format("MM/DD/YYYY");

  const events: any = {
    "06/10/2023": [
      { time: "10:30 am", title: "Meeting" },
      { time: "12:00 pm", title: "Lunch" },
    ],
    "06/15/2023": [
      { time: "09:30 pm", title: "Products Introduction Meeting" },
      { time: "12:30 pm", title: "Client entertaining" },
      { time: "02:00 pm", title: "Product design discussion" },
      { time: "05:00 pm", title: "Product test and acceptance" },
      { time: "06:30 pm", title: "Reporting" },
      { time: "10:00 pm", title: "Going home to walk the dog" },
    ],
    // Agrega más fechas y eventos según sea necesario
  };

  return events[formattedDate] || [];
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
  const [actualMonth, setActualMonth] = useState();
  const [modalCalendarEvents, setModalCalendarEvents] = useState(false);

  const handleOpenCalendarEvents = (date: Date) => {
    setModalCalendarEvents(true);
  };

  const handleChangeMonth = (date: Date) => {
    const firstDayOfMonth = moment(date).startOf("month");
    const lastDayOfMonth = moment(date).endOf("month").format("YYYY-MM-DD");
    console.log(firstDayOfMonth, lastDayOfMonth);
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

      <ModalCalendarEvents
        isOpen={modalCalendarEvents}
        onClose={() => setModalCalendarEvents(false)}
      />
    </CustomProvider>
  );
}
