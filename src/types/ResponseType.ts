import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    stack: string;
    message: string;
    success: boolean;
  };
  status?: number;
  message?: string;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  success?: boolean;
  message?: string;
};

export type TresponseWithQuery<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = { name: string; value: boolean | React.Key };

export type TbookingForm = {
  date: Date;
  room: string;
  slots: string[];
  user: string;
  totalAmount?: number;
  phone?: number;
  address?: string;
};
