import React, { useContext, useState, useEffect } from "react";
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
import { UserContext } from "context/UserContext";
import { getEventsService } from "services/client/event.services";
import { useToast } from "@chakra-ui/react";

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

      { time: "12:30", title: "Client entertaining" },
      { time: "02:00", title: "Product design discussion" },
      { time: "05:00", title: "Product test and acceptance" },
      { time: "06:30", title: "Reporting" },
      { time: "10:00", title: "Going home to walk the dog" },
    ],
  },
];

export default function Calendar() {
  const toast = useToast();
  const { user } = useContext(UserContext);

  const [dayEvents, setDayEvents] = useState([]);
  const [monthEvents, setMonthEvents] = useState([]);
  const [dateSelected, setDateSelected] = useState<any>("");
  const [modalCalendarEvents, setModalCalendarEvents] = useState(false);

  const handleOpenCalendarEvents = (date: Date) => {
    // const selectedDate = moment(date).format("DD/MM/YYYY");

    setDateSelected(date);
    setModalCalendarEvents(true);

    // const dayEvents: any = monthEvents.find(
    //   (monthEvent: any) => monthEvent.date === selectedDate
    // );

    // if (dayEvents?.events?.length) {
    //   setDayEvents(dayEvents.events);
    // }
  };

  const handleChangeMonth = (date: Date) => {
    console.log("wadaoidnawoidnaoidnaoid");
    const firstDayOfMonth = moment(date).startOf("month").format("DD/MM/YYYY");
    const lastDayOfMonth = moment(date).endOf("month").format("DD/MM/YYYY");
    console.log(moment(date).format("DD/MM/YYYY"));
  };

  const handleCloseModalCalendarEventes = () => {
    setDayEvents([]);
    setDateSelected("");
    setModalCalendarEvents(false);
  };

  const handleGetEvents = async (date: Date) => {
    try {
      const dateFormatted: string = new Date(date).toISOString();
      const response: any = await getEventsService(user._id, dateFormatted);
      setMonthEvents(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function formatEvents(events: any) {
    const formattedEvents: any = [];

    for (const event of events) {
      const formattedDate = moment(event.date).format("DD/MM/YYYY");
      const formattedTime = moment(event.date).format("HH:mm");

      const formattedEvent = {
        time: formattedTime,
        title: event.title,
      };

      const existingEvent = formattedEvents.find(
        (item: any) => item.date === formattedDate
      );

      if (existingEvent) {
        existingEvent.events.push(formattedEvent);
      } else {
        formattedEvents.push({
          date: formattedDate,
          events: [formattedEvent],
        });
      }
    }

    return formattedEvents;
  }

  function getTodoList(date: any) {
    const formattedDate = moment(date).format("DD/MM/YYYY");
    const formattedEvents = formatEvents(monthEvents);

    const selectedEvent = formattedEvents.find(
      (item: any) => item.date === formattedDate
    );

    return selectedEvent ? selectedEvent.events : [];
  }

  function renderCell(date: any) {
    const list = getTodoList(date);
    const displayList = list.slice(0, 2);

    if (list.length > 0) {
      const moreCount = list.length - displayList.length;

      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item: any, index: number) => (
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
          {displayList.map((item: any, index: number) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount > 0 ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  console.log(monthEvents);

  useEffect(() => {
    if (user) {
      handleGetEvents(new Date());
    }
  }, [user]);

  return (
    <CustomProvider locale={esAr}>
      <BottomNavbar />
      <CalendarComponent
        renderCell={renderCell}
        onMonthChange={(date) => handleGetEvents(date)}
        // onSelect={(date: string) => handleChangeMonth(date)}
        // defaultValue={new Date()}
        onSelect={(date) => handleOpenCalendarEvents(date)}
      />
      {modalCalendarEvents ? (
        <ModalCalendarEvents
          isOpen={modalCalendarEvents}
          onClose={handleCloseModalCalendarEventes}
          events={dayEvents}
          user={user}
          dateSelected={dateSelected}
        />
      ) : null}
    </CustomProvider>
  );
}
