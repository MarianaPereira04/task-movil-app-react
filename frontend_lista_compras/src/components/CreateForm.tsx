import React, { useState } from "react";
import { IonToast } from "@ionic/react";
import { createCategoria } from "../services/categoriesService";
import { createProducto } from "../services/productsService";

interface CreateFormProps {
  type: "category" | "product";
  categorias?: { id: string; nombre: string }[];
  onCreated?: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ type, categorias = [], onCreated }) => {
  const [formData, setFormData] = useState<any>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (type === "category") {
        await createCategoria({
          nombre: formData.name,
          descripcion: formData.description,
        });
        setToastMessage("Categoría creada exitosamente");
      } else {
        if (!formData.categoryId) {
          setToastMessage("Debes seleccionar una categoría");
          setToastColor("danger");
          setShowToast(true);
          return;
        }
        await createProducto({
          nombre: formData.name,
          cantidad: Number(formData.quantity),
          precio: Number(formData.price),
          categoryId: formData.categoryId,
        });
        setToastMessage("Producto creado exitosamente");
      }

      setToastColor("success");
      setShowToast(true);
      setFormData({});
      onCreated && onCreated();
    } catch (error) {
      setToastMessage("Error al crear. Verifica la conexión con el servidor.");
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
    <div style={{ width: "100%", maxWidth: "300px", textAlign: "left" }}>
      <h3>Crear {type === "category" ? "Categoría" : "Producto"}</h3>

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
          <select
            name="categoryId"
            value={formData.categoryId || ""}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Seleccione categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Cantidad"
            value={formData.quantity || ""}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </>
      )}

      <button style={buttonStyle} onClick={handleSubmit}>
        Aceptar
      </button>

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

export default CreateForm;
