import React, { ReactNode, useEffect, useState } from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { homeOutline, personOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";

interface BaseLayoutProps {
  children?: ReactNode;
  title?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, title }) => {
  const history = useHistory();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<"categories" | "products">("categories");

  // ✅ Corregido: detecta correctamente la ruta activa
  useEffect(() => {
    if (
      location.pathname === "/categories" ||
      location.pathname === "/" // por si la ruta base va a inicio
    ) {
      setActiveTab("categories");
    } else if (location.pathname.includes("/products")) {
      setActiveTab("products");
    }
  }, [location.pathname]);

  const handleTabClick = (tab: "categories" | "products") => {
    setActiveTab(tab);
    if (tab === "categories") {
      history.push("/categories");
    } else {
      history.push("/products");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#c8c2bdff",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "90vh",
              background: "#f9e4d1ff",
              borderRadius: "24px",
              boxShadow: "0 8px 20px rgba(26, 25, 25, 0.2)",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                overflowY: "scroll",
              }}
            >
              {title && (
                <h1
                  style={{
                    color: "#1b1b1b",
                    textAlign: "center",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "2rem",
                    marginBottom: "20px",
                    fontWeight: 700,
                  }}
                >
                  {title}
                </h1>
              )}
              {children}
            </div>

            <div
              style={{
                backgroundColor: "#9b9b9b",
                borderRadius: "40px",
                padding: "0px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0 auto",
                width: "90%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              {/* Botón Home */}
              <div
                onClick={() => handleTabClick("categories")}
                style={{
                  flex: 1,
                  backgroundColor:
                    activeTab === "categories" ? "#e39a87" : "transparent",
                  borderRadius: "40px",
                  padding: "8px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "background 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <IonIcon
                  icon={homeOutline}
                  style={{ color: "#fff", fontSize: "24px" }}
                />
              </div>

              {/* Botón Gestión */}
              <div
                onClick={() => handleTabClick("products")}
                style={{
                  flex: 1,
                  backgroundColor:
                    activeTab === "products" ? "#e39a87" : "transparent",
                  borderRadius: "40px",
                  padding: "8px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "background 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <IonIcon
                  icon={personOutline}
                  style={{ color: "#fff", fontSize: "24px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BaseLayout;
