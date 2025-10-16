import http from "./http";

export async function getAvatars() {
  const response = await http.get("/files/avatars");
  return response.data;
}

export async function getAllAvatars() {
  const response = await http.get("/files/all-avatars");
  return response.data;
}

export async function getBackgrounds() {
  const response = await http.get("/files/backgrounds");
  return response.data;
}

export async function getAllBackgrounds() {
  const response = await http.get("/files/all-backgrounds");
  return response.data;
}

export async function createAvatar(
  name: string,
  filePath: string,
  isPremium: boolean,
  stars: number
) {
  const response = await http.post("/files/create-avatar", {
    name: name,
    filePath: filePath,
    isPremium: isPremium,
    stars: stars,
  });
  return response;
}

export async function deleteAvatar(backgroundId: string) {
  const response = await http.delete(`/files/avatar/${backgroundId}`);
  return response;
}

export async function createBackground(
  name: string,
  filePath: string,
  isPremium: boolean,
  stars: number
) {
  const response = await http.post("/files/create-background", {
    name: name,
    filePath: filePath,
    isPremium: isPremium,
    stars: stars,
  });
  return response;
}

export async function deleteBackground(backgroundId: string) {
  const response = await http.delete(`/files/background/${backgroundId}`);
  return response;
}
