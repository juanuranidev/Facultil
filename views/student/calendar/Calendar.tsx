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
import { useToast, useMediaQuery, Flex, Text } from "@chakra-ui/react";

export default function Calendar() {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [isMovibile] = useMediaQuery("(max-width: 800px)");

  const [dayEvents, setDayEvents] = useState([]);
  const [monthEvents, setMonthEvents] = useState([]);
  const [dateSelected, setDateSelected] = useState<any>("");
  const [modalCalendarEvents, setModalCalendarEvents] = useState(false);
  console.log(isMovibile);
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

  function renderDesktopCell(date: any) {
    const list = getTodoList(date);
    const displayList = list.slice(0, 2);
    const moreCount = list.length - displayList.length;

    return (
      <ul className="calendar-todo-list">
        {displayList.map((item: any, index: number) => (
          <li key={index}>
            <Badge /> <b>{item.time}</b> - {item.title}
          </li>
        ))}
        {moreCount > 0 ? "..." : null}
      </ul>
    );
  }

  function renderMobileCell(date: any) {
    const list = getTodoList(date);
    const displayList = list.slice(0, 2);
    const moreCount = list.length - displayList.length;

    return (
      <Flex alignItems="center" direction="column">
        {displayList.map((item: any) => (
          <Badge key={item._id} style={{ marginBottom: "0.1rem" }} />
        ))}

        {moreCount > 0 ? <Text>...</Text> : null}
      </Flex>
    );
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
        renderCell={isMovibile ? renderMobileCell : renderDesktopCell}
        onMonthChange={(date) => handleGetEvents(date)}
        // onSelect={(date: string) => handleChangeMonth(date)}
        // defaultValue={new Date()}
        onSelect={(date) => handleOpenCalendarEvents(date)}
      />
      {modalCalendarEvents ? (
        <ModalCalendarEvents
          user={user}
          events={dayEvents}
          dateSelected={dateSelected}
          isOpen={modalCalendarEvents}
          handleGetEvents={handleGetEvents}
          onClose={handleCloseModalCalendarEventes}
        />
      ) : null}
    </CustomProvider>
  );
}
