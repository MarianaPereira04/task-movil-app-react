import React, { useState } from "react";
import CreateForm from "./CreateForm";
import ListSection from "./ListSection";
import EditSection from "./EditSection";
import DeleteSection from "./DeleteSection";

interface CrudButtonsProps {
  type: "category" | "product";
  categorias?: { id: string; nombre: string }[]; // <-- agregamos esta prop
}

const CrudButtons: React.FC<CrudButtonsProps> = ({ type, categorias = [] }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleActionClick = (action: string) => {
    setActiveAction(activeAction === action ? null : action);
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginTop: "20px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "300px",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e39a87",
    color: "#fff",
    fontWeight: 600,
    fontFamily: "Outfit, sans-serif",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={() => handleActionClick("create")}>
        Crear
      </button>
      {activeAction === "create" && <CreateForm type={type} categorias={categorias} />}

      <button style={buttonStyle} onClick={() => handleActionClick("list")}>
        Consultar todo
      </button>
      {activeAction === "list" && <ListSection type={type} />}

      <button style={buttonStyle} onClick={() => handleActionClick("edit")}>
        Editar
      </button>
      {activeAction === "edit" && <EditSection type={type} />}

      <button style={buttonStyle} onClick={() => handleActionClick("delete")}>
        Eliminar
      </button>
      {activeAction === "delete" && <DeleteSection type={type} />}
    </div>
  );
};

export default CrudButtons;
