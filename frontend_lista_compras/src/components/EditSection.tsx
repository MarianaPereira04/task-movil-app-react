import React, { useEffect, useState } from "react";
import { IonToast } from "@ionic/react";
import { getCategorias, updateCategoria } from "../services/categoriesService";
import { getProductos, updateProducto } from "../services/productsService";

interface EditSectionProps {
  type: "category" | "product";
  onUpdated?: () => void;
}

const EditSection: React.FC<EditSectionProps> = ({ type, onUpdated }) => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [formData, setFormData] = useState<any>({});

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const item = items.find((i) => i.id === id);
    if (item) {
      if (type === "category") {
        setFormData({
          name: item.nombre,
          description: item.descripcion,
        });
      } else {
        setFormData({
          name: item.nombre,
          quantity: item.cantidad,
          price: item.precio,
        });
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      if (type === "category") {
        await updateCategoria(selectedId, {
          nombre: formData.name,
          descripcion: formData.description,
        });
      } else {
        await updateProducto(selectedId, {
          nombre: formData.name,
          cantidad: Number(formData.quantity),
          precio: Number(formData.price),
        });
      }

      setToastMessage(`${type === "category" ? "Categoría" : "Producto"} actualizada/o correctamente`);
      setToastColor("success");
      setShowToast(true);

      onUpdated && onUpdated();
      setSelectedId("");
      setFormData({});
    } catch (error) {
      setToastMessage("Error al actualizar. Verifica la conexión con el servidor.");
      setToastColor("danger");
      setShowToast(true);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#9b9b9b",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div style={{ width: "100%", maxWidth: "300px" }}>
      <h3>Editar {type === "category" ? "Categoría" : "Producto"}</h3>
      <select
        style={inputStyle}
        value={selectedId}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Seleccione uno</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>

      {selectedId && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name || ""}
            onChange={handleChange}
            style={inputStyle}
          />
          {type === "category" ? (
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={formData.description || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          ) : (
            <>
              <input
                type="number"
                name="quantity"
                placeholder="Cantidad"
                value={formData.quantity ?? 0}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price ?? 0}
                onChange={handleChange}
                style={inputStyle}
              />
            </>
          )}

          <button style={buttonStyle} onClick={handleUpdate}>
            Aceptar
          </button>
        </>
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

export default EditSection;
