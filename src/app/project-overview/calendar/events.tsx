import { EventStatus, EventType } from "@/types";

const events: EventType[] = [
  {
    title: "All Day Task very long title",
    allDay: true,
    start: new Date(2025, 1, 0),
    end: new Date(2025, 1, 1),
    status: EventStatus.backlog,
  },
  {
    title: "Long Task",
    start: new Date(2025, 1, 7),
    end: new Date(2025, 1, 10),
    status: EventStatus.completed,
  },

  {
    title: "DTS STARTS",
    start: new Date(2025, 1, 11, 0, 0, 0),
    end: new Date(2025, 1, 20, 0, 0, 0),
    status: EventStatus.on_going,
  },

  {
    title: "DTS ENDS",
    start: new Date(2025, 1, 6, 0, 0, 0),
    end: new Date(2025, 1, 11, 0, 0, 0),
    status: EventStatus.upcoming,
  },

  {
    title: "Some Task",
    start: new Date(2025, 1, 9, 0, 0, 0),
    end: new Date(2025, 1, 9, 0, 0, 0),
    status: EventStatus.backlog,
  },

  {
    title: "Conference",
    start: new Date(2025, 1, 11),
    end: new Date(2025, 1, 13),
    desc: "Big conference for important people",
    status: EventStatus.completed,
  },
  {
    title: "Meeting",
    start: new Date(2025, 1, 11, 1, 30, 0, 0),
    end: new Date(2025, 1, 11, 11, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
    status: EventStatus.on_going,
  },
  {
    title: "Discussion",
    start: new Date(2025, 1, 11, 11, 0, 0, 0),
    end: new Date(2025, 1, 11, 11, 0, 0, 0),
    desc: "Power discussion",
    status: EventStatus.upcoming,
  },

  {
    title: "Meeting",
    start: new Date(2025, 1, 11, 14, 0, 0, 0),
    end: new Date(2025, 1, 11, 15, 0, 0, 0),
    status: EventStatus.backlog,
  },
  {
    title: "Happy Hour",
    start: new Date(2025, 1, 11, 17, 0, 0, 0),
    end: new Date(2025, 1, 11, 17, 30, 0, 0),
    desc: "Most important meal of the day",
    status: EventStatus.completed,
  },
  {
    title: "Dinner",
    start: new Date(2025, 1, 11, 20, 0, 0, 0),
    end: new Date(2025, 1, 11, 21, 0, 0, 0),
    status: EventStatus.on_going,
  },
  {
    title: "Lunch Date",
    start: new Date(2025, 1, 11, 7, 0, 0),
    end: new Date(2025, 1, 11, 1, 30, 0),
    status: EventStatus.upcoming,
  },
  {
    title: "Lunch Date 2",
    start: new Date(2025, 1, 11, 7, 0, 0),
    end: new Date(2025, 1, 11, 1, 30, 0),
    status: EventStatus.backlog,
  },
  {
    title: "Lunch Date 3",
    start: new Date(2025, 1, 11, 7, 0, 0),
    end: new Date(2025, 1, 11, 1, 30, 0),
    status: EventStatus.completed,
  },
  {
    title: "Late Night Task",
    start: new Date(2025, 1, 17, 19, 30, 0),
    end: new Date(2025, 1, 18, 1, 0, 0),
    status: EventStatus.on_going,
  },
  {
    title: "Multi-day Task",
    start: new Date(2025, 1, 20, 19, 30, 0),
    end: new Date(2025, 1, 21, 1, 0, 0),
    status: EventStatus.upcoming,
  },
];

export default events;
