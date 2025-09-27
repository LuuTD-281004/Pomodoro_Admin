import http from "./http";

export async function getAllUsers(
  page: number = 1,
  limit: number = 10,
  sortBy: string = "username",
  order: "ASC" | "DESC" = "ASC"
) {
  const response = await http.get("/users/all-users", {
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data.result;
}
