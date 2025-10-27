import React, { useEffect, useState } from "react";
import { IonToast } from "@ionic/react";
import { getCategorias, deleteCategoria } from "../services/categoriesService";
import { getProductos, deleteProducto } from "../services/productsService";

interface DeleteSectionProps {
  type: "category" | "product";
  onDeleted?: () => void; // callback para recargar lista
}

const DeleteSection: React.FC<DeleteSectionProps> = ({ type, onDeleted }) => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  // Estados para el Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger">("success");

  useEffect(() => {
    const fetchData = async () => {
      const res = type === "category" ? await getCategorias() : await getProductos();
      setItems(res.data);
    };
    fetchData();
  }, [type]);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      if (type === "category") {
        await deleteCategoria(selectedId);
      } else {
        await deleteProducto(selectedId);
      }

      setToastMessage(`${type === "category" ? "Categoría" : "Producto"} eliminada/o correctamente`);
      setToastColor("success");
      setShowToast(true);

      onDeleted && onDeleted();
      setSelectedId("");
    } catch (error) {
      setToastMessage("Error al eliminar. Verifica la conexión con el servidor.");
      setToastColor("danger");
      setShowToast(true);
    }
  };

  const selectStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#c85b5b",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div style={{ width: "100%", maxWidth: "300px" }}>
      <h3>Eliminar {type === "category" ? "Categoría" : "Producto"}</h3>
      <select
        style={selectStyle}
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Seleccione uno</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>

      {selectedId && (
        <button style={buttonStyle} onClick={handleDelete}>
          Aceptar
        </button>
      )}

      {/* Toast de confirmación */}
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        color={toastColor}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </div>
  );
};

export default DeleteSection;
