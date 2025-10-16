import { GroupRoom, PersonalRoom } from "@/types/room";
import http from "./http";

export async function getAllPersonalRooms(
  page: number = 1,
  limit: number = 10,
  sortBy: string,
  order: "ASC" | "DESC" = "ASC"
) {
  const response = await http.get<{
    message: string;
    result: {
      data: PersonalRoom[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
  }>("/rooms/all-personal-rooms", {
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data;
}

export async function getAllGroupRooms(
  page: number = 1,
  limit: number = 10,
  sortBy: string,
  order: "ASC" | "DESC" = "ASC"
) {
  const response = await http.get<{
    message: string;
    result: {
      data: GroupRoom[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
  }>("/rooms/all-group-rooms", {
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data;
}
