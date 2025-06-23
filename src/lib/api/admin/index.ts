import api from "../axios";

export const fetchAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};
