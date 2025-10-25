import api from "../axios";

export const fetchAllUsers = async (
  page: number,
  filters: { search: string }
) => {
  const response = await api.get(`/admin/users?page=${page}`, {
    params: filters,
  });
  return response.data;
};

export const updateUserStatus = async ({ id }: { id: string }) => {
  const response = await api.patch(`/admin/users/${id}/status`);
  return response.data;
};
