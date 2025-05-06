/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TimesheetInfo from "./timesheetInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import { FiPlus } from "react-icons/fi";
import { LinearProgress, Modal, Box, TextField, Button } from "@mui/material";
import { Icons } from "@/icons";

interface DateType {
  date: string;
  type: string;
}

interface CustomDayProps extends PickersDayProps<Dayjs> {
  dateTypeMap?: DateType[];
}

const Timesheet = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const startOfWeek = dayjs().startOf("week");
  const endOfWeek = dayjs().endOf("week");

  const dateTypeMap: DateType[] = [
    { date: "2025-01-01", type: "Tracked" },
    { date: "2025-01-02", type: "Manual" },
    { date: "2025-01-03", type: "Overtime" },
  ];

  const loggedHours = [
    { day: "Monday", hours: 6 },
    { day: "Tuesday", hours: 8 },
    { day: "Wednesday", hours: 4 },
    { day: "Thursday", hours: 7 },
    { day: "Friday", hours: 5 },
    { day: "Saturday", hours: 0 },
    { day: "Sunday", hours: 0 },
  ];

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "Tracked":
        return "var(--green-500)";
      case "Manual":
        return "var(--blue-500)";
      case "Overtime":
        return "var(--red-500)";
      default:
        return "";
    }
  };

  const CustomDay = (props: CustomDayProps) => {
    const { dateTypeMap = [], day, outsideCurrentMonth, ...other } = props;

    const dayString = day.format("YYYY-MM-DD");
    const dayTypeObj = dateTypeMap.find((d) => d.date === dayString);
    const backgroundColor = dayTypeObj
      ? getBackgroundColor(dayTypeObj.type)
      : "";

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent=""
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor,
            borderRadius: "4px",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            transform: "none",
            WebkitTransform: "none",
          },
          "& .MuiPickersDay-root": {
            zIndex: 10,
          },
        }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    handleClose();
  };

  return (
    <div className="flex-1 flex flex-col items-center gap-8 bg-gray100 pt-5 pb-20">
      <div className="w-full max-w-[1480px] px-5">
        <TimesheetInfo />
      </div>
      <div className="flex w-full max-w-[1480px] px-5 gap-5">
        <div className="flex flex-col max-w-[352px] gap-5">
          <h2 className="text-xl leading-none">Work diary</h2>
          <div className="flex flex-col justify-center items-center border border-gray400 px-4 pt-4 pb-2 rounded">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                showDaysOutsideCurrentMonth
                views={["day"]}
                slots={{
                  day: CustomDay,
                }}
                slotProps={{
                  day: {
                    dateTypeMap,
                  } as any,
                }}
                sx={{
                  height: "auto",
                  ".MuiPickersCalendarHeader-root": {
                    height: "40px",
                    padding: "0 0 16px 0",
                    marginTop: 0,
                    marginBottom: "16px",
                    borderBottom: "1px solid var(--gray-400)",
                  },
                  ".MuiDayCalendar-header": {
                    justifyContent: "space-between",
                    WebkitJustifyContent: "space-between",
                  },
                  ".MuiDayCalendar-monthContainer": {
                    position: "static",
                  },
                  ".MuiDayCalendar-weekContainer": {
                    justifyContent: "space-between",
                    WebkitJustifyContent: "space-between",
                  },
                  ".MuiPickersSlideTransition-root": {
                    minHeight: "auto",
                  },
                }}
              />
            </LocalizationProvider>
            <div className="flex h-10 mt-4 px-2 border-t border-gray400 w-full gap-2.5">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green500"></div>
                <div className="text-sm">Tracked</div>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue500"></div>
                <div className="text-sm">Manual</div>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red500"></div>
                <div className="text-sm">Overtime</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex justify-between items-center w-full">
            <div className="text-xl font-medium text-black">
              {`${startOfWeek.format("MMM D")} - ${endOfWeek.format("MMM D")}`}
            </div>
            <button
              onClick={handleOpen}
              className="flex items-center px-4 py-2 text-sm text-green500 rounded border border-green500 hover:bg-green500 hover:text-white transition-all"
            >
              <FiPlus className="w-6 h-6" />
              &nbsp;Add Time
            </button>
          </div>
          <div className="flex flex-col">
            {loggedHours.map(({ day, hours }, index) => (
              <>
                <div key={day} className="flex items-center px-2.5 py-4 gap-10">
                  <div className="text-sm w-20">{day}</div>
                  <LinearProgress
                    className="flex-1 !mt-0"
                    variant="determinate"
                    value={(hours / 8) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      marginTop: 1,
                      backgroundColor: "var(--gray-200)",
                      ".MuiLinearProgress-bar": {
                        backgroundColor: "var(--green-500)",
                      },
                    }}
                  />
                  <div className="w-20 text-end">{hours} hrs</div>
                </div>
                {loggedHours.length - 1 !== index && <hr />}
              </>
            ))}
          </div>
          <div className="flex gap-2.5 w-full px-4">
            <div className="flex-1 flex gap-10">
              <div className="flex basis-1/3 gap-2.5">
                <div className="w-5 h-5 rounded bg-green500" />
                <div className="flex flex-col gap-2.5">
                  <div className="leading-5">Tracked</div>
                  <div className="font-semibold text-context text-2xl leading-none">
                    0:00 hrs
                  </div>
                </div>
              </div>
              <div className="flex basis-1/3 gap-2.5">
                <div className="w-5 h-5 rounded bg-blue500" />
                <div className="flex flex-col gap-2.5">
                  <div className="leading-5">Manual</div>
                  <div className="font-semibold text-context text-2xl leading-none">
                    0:00 hrs
                  </div>
                </div>
              </div>
              <div className="flex basis-1/3 gap-2.5">
                <div className="w-5 h-5 rounded bg-red500" />
                <div className="flex flex-col gap-2.5">
                  <div className="leading-5">Overtime</div>
                  <div className="font-semibold text-context text-2xl leading-none">
                    0:00 hrs
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center min-w-40 p-5 border border-black rounded gap-2.5">
              <div className="leading-none">Total hours</div>
              <div className="font-semibold text-2xl leading-none">$0.00</div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 480,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: "20px",
            borderRadius: 2,
          }}
        >
          <div className="flex flex-col gap-2.5">
            <Icons.clockincircle />
            <div className="text-sm font-semibold">Time</div>
            <TextField
              fullWidth
              margin="normal"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              sx={{
                margin: 0,
                ".MuiInputBase-input": {
                  padding: 1,
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--green-500)",
                },
              }}
            />
            <div className="flex gap-2.5">
              <TextField
                fullWidth
                margin="normal"
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                sx={{
                  margin: 0,
                  ".MuiInputBase-input": {
                    padding: 1,
                  },
                  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--green-500)",
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                sx={{
                  margin: 0,
                  ".MuiInputBase-input": {
                    padding: 1,
                  },
                  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--green-500)",
                  },
                }}
              />
            </div>
            <div className="text-sm font-semibold">Description</div>
            <TextField
              fullWidth
              margin="normal"
              multiline
              rows={3}
              name="description"
              placeholder="Details about time log"
              value={formData.description}
              onChange={handleInputChange}
              sx={{
                fontSize: "14px",
                margin: 0,
                ".MuiInputBase-root": {
                  padding: 1,
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--green-500)",
                },
              }}
            />
            <div className="flex justify-end gap-2.5">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid var(--gray-400)",
                  boxShadow: "none",
                  fontSize: "16px",
                  color: "var(--context-color)",
                  textTransform: "none",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "var(--green-500)",
                  boxShadow: "none",
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: "6px",
                }}
              >
                Add time
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Timesheet;
