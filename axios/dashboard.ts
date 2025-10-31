import http from "./http";

export async function getDashboardInfo(range: string) {
  const response = await http.get(`/dashboard/infomation?range=${range}`);
  return response.data;
}
