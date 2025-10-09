import http from "./http";

export async function getFiles() {
  const response = await http.get("/files/files");
  return response.data;
}

export async function getAvatars() {
  const response = await http.get("/files/all-avatars");
  return response.data;
}

export async function createAvatar(
  filePath: string,
  isPremium: boolean,
  stars: number
) {
  const response = await http.post("/files/create-avatar", {
    filePath: filePath,
    isPremium: isPremium,
    stars: stars,
  });
  return response;
}

export async function deleteAvatar(avatarId: string) {
  const response = await http.delete(`/files/avatar/${avatarId}`);
  return response;
}
