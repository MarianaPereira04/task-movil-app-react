import React from "react";
import BaseLayout from "../components/BaseLayout";
import CrudButtons from "../components/CrudButtons";

const Categories: React.FC = () => {
  return (
    <BaseLayout title="Gestión de Categorías">
      <p style={{ textAlign: "justify", color: "#333", marginBottom: "16px" }}>
        Desde aquí puedes listar, crear, editar y eliminar categorías.
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
      
      <CrudButtons type="category" />
    </BaseLayout>
  );
};

export default Categories;
