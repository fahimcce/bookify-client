import { createSlice } from "@reduxjs/toolkit";

// Define the MeetingRoom type
type MeetingRoom = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  images: string[];
};

// Define the initial state interface
interface MeetingRoomState {
  rooms: MeetingRoom[];
  loading: boolean;
  error: string | null;
}

// Set the initial state
const initialState: MeetingRoomState = {
  rooms: [],
  loading: false,
  error: null,
};

// Create the slice
const meetingRoomSlice = createSlice({
  name: "meetingRoom",
  initialState,
  reducers: {},
});

// Define selectors for accessing state properties
export const selectMeetingRooms = (state: { meetingRoom: MeetingRoomState }) =>
  state.meetingRoom.rooms;
export const selectLoading = (state: { meetingRoom: MeetingRoomState }) =>
  state.meetingRoom.loading;
export const selectError = (state: { meetingRoom: MeetingRoomState }) =>
  state.meetingRoom.error;

export default meetingRoomSlice.reducer;
