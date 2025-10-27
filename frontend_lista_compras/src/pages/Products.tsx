import React, { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import CrudButtons from "../components/CrudButtons";
import { getCategorias } from "../services/categoriesService";

const Products: React.FC = () => {
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    // Cargar categorías existentes para el select en CreateForm
    const fetchCategorias = async () => {
      const res = await getCategorias();
      setCategorias(res.data);
    };
    fetchCategorias();
  }, []);

  return (
    <BaseLayout title="Gestión de Productos">
      <p style={{ textAlign: "justify", color: "#333", marginBottom: "16px" }}>
        Desde aquí puedes listar, crear, editar y eliminar productos.
      </p>

      {/* Línea decorativa */}
      <div
        style={{
          height: "3px",
          width: "100%",
          backgroundColor: "#d6a77a",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      ></div>

      {/* Botones CRUD para productos */}
      <CrudButtons type="product" categorias={categorias} />
    </BaseLayout>
  );
};

export default Products;
