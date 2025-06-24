import api from "../axios";

export const fetchAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const updateUserStatus = async ({ id }: { id: string }) => {
  const response = await api.patch(`/admin/users/${id}/status`);
  return response.data;
};
