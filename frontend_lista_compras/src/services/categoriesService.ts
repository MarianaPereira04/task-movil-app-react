import api from "./api";

export const getCategorias = () => api.get("/categories");
export const createCategoria = (data: any) => api.post("/categories", data);
export const updateCategoria = (id: string, data: any) => api.put(`/categories/${id}`, data);
export const deleteCategoria = (id: string) => api.delete(`/categories/${id}`);

