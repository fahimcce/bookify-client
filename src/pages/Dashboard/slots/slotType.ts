export type Tsolts = {
  _id: string;
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  __v?: number;
};

export interface Room {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  roomImg: string[];
  isDeleted: boolean;
  __v: number;
}
