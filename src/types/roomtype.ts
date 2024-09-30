/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TRoomData {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  roomImg?: string[] | any;
  _id?: string;
  isDeleted?: boolean;
}
