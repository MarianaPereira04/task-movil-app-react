import api from "./api";

// Productos
export const getProductos = () => api.get("/products");
export const createProducto = (data: any) => api.post("/products", data);
export const updateProducto = (id: string, data: any) => api.put(`/products/${id}`, data);
export const deleteProducto = (id: string) => api.delete(`/products/${id}`);

