import React, { useState, useCallback, FC } from "react";
import { Button, Stack } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ITask } from "../Interfaces/ITask";

const EventCell = (props: Event) => {
  return (
    <div
      style={{
        backgroundColor: "#E2ECF5",
        height: "100%",
        width: "100%",
        fontSize: "14px",
        padding: "0.5rem",
        color: "black",
        textAlign: "left",
        borderLeft: "2px solid #6E9ECF",
        fontWeight: "200",
        margin: "0",
        fontFamily: "Open Sans, sans-serif",
      }}
    >
      <div>{props.event.title}</div>
      <div>{props.event.extendedProps.description}</div>
      <div>Status: {props.event.extendedProps.status}</div>
    </div>
  );
};

interface ICalendarProps {
  tasks: ITask[];
}

const Calendar: FC<ICalendarProps> = ({ tasks }) => {
  const [calendarView, setCalendarView] = useState("timeGridWeek");

  const switchToWeekView = useCallback(() => {
    setCalendarView("timeGridWeek");
  }, []);

  const switchToDayView = useCallback(() => {
    setCalendarView("timeGridDay");
  }, []);

  return (
    <div>
      <Stack direction="horizontal" gap={2} style={{ marginBottom: "20px" }}>
        <Button onClick={switchToWeekView}>Неделя</Button>
        <Button onClick={switchToDayView}>День</Button>
      </Stack>
      <FullCalendar
        key={calendarView}
        plugins={[timeGridPlugin]}
        initialView={calendarView}
        slotMinTime={"08:00:00"}
        slotMaxTime={"20:01:00"}
        slotDuration="00:30:00"
        slotLabelInterval={{ minutes: 30 }}
        slotEventOverlap={false}
        eventBackgroundColor="transparent"
        events={tasks}
        eventContent={EventCell}
        eventMaxStack={
          calendarView === "timeGridWeek"
            ? 1
            : calendarView === "timeGridDay"
            ? 5
            : 1
        }
      />
    </div>
  );
};

export default Calendar;
