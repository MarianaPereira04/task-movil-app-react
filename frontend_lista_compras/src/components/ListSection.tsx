import React, { useEffect, useState } from "react";
import { getCategorias } from "../services/categoriesService";
import { getProductos } from "../services/productsService";

interface ListSectionProps {
  type: "category" | "product";
  refresh?: boolean;
}

const ListSection: React.FC<ListSectionProps> = ({ type, refresh }) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = type === "category" ? await getCategorias() : await getProductos();
      setItems(res.data);
    };
    fetchData();
  }, [type, refresh]); // recarga cuando refresh cambia

  const boxStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: "12px",
    padding: "12px",
    width: "100%",
    maxWidth: "320px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div style={boxStyle}>
      <h3 style={{ marginBottom: "10px" }}>
        Listado de {type === "category" ? "categorías" : "productos"}
      </h3>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "8px" }}>
          <strong>{item.nombre}</strong>{" "}
          {type === "category"
            ? `- ${item.descripcion}`
            : `(${item.cantidad} unidades - $${item.precio})`}
        </div>
      ))}
    </div>
  );
};

export default ListSection;
