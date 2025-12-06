import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
                color: "#e6eef8",
                padding: "2rem",
                fontFamily: `Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Fondo decorativo */}
            <div
                style={{
                    position: "absolute",
                    top: "-50%",
                    right: "-10%",
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-30%",
                    left: "-5%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }}
            />

            {/* Contenido principal */}
            <div
                style={{
                    maxWidth: "900px",
                    width: "100%",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                {/* Ilustración SVG mejorada */}
                <div style={{ marginBottom: "2rem" }}>
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ margin: "0 auto" }}
                    >
                        {/* Película */}
                        <rect
                            x="20"
                            y="40"
                            width="160"
                            height="120"
                            rx="12"
                            fill="#071336"
                            stroke="#0ea5a4"
                            strokeWidth="2"
                        />
                        {/* Perforaciones laterales */}
                        <circle cx="30" cy="60" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="30" cy="80" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="30" cy="100" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="30" cy="120" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="30" cy="140" r="5" fill="#0ea5a4" opacity="0.6" />

                        <circle cx="170" cy="60" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="170" cy="80" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="170" cy="100" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="170" cy="120" r="5" fill="#0ea5a4" opacity="0.6" />
                        <circle cx="170" cy="140" r="5" fill="#0ea5a4" opacity="0.6" />

                        {/* Número 404 */}
                        <text
                            x="100"
                            y="105"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontSize="56"
                            fontWeight="800"
                            fill="#8b5cf6"
                            opacity="0.9"
                        >
                            404
                        </text>
                    </svg>
                </div>

                {/* Título */}
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "800",
                        margin: "0 0 1rem 0",
                        background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Película no encontrada
                </h1>

                {/* Descripción */}
                <p
                    style={{
                        fontSize: "1.1rem",
                        color: "#c9d7e6",
                        maxWidth: "500px",
                        margin: "0 auto 2rem",
                        lineHeight: "1.6",
                    }}
                >
                    Parece que esta página se perdió en el streaming. Vuelve al inicio o explora nuestro catálogo de películas.
                </p>

                {/* Botones de acción */}
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
                    <Link
                        to="/"
                        style={{
                            display: "inline-block",
                            background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
                            color: "white",
                            padding: "12px 28px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "700",
                            fontSize: "1rem",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 8px 24px rgba(139, 92, 246, 0.25)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 12px 32px rgba(139, 92, 246, 0.35)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 8px 24px rgba(139, 92, 246, 0.25)";
                        }}
                    >
                        🏠 Ir al inicio
                    </Link>

                    <Link
                        to="/discover"
                        style={{
                            display: "inline-block",
                            color: "#06b6d4",
                            padding: "12px 28px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "700",
                            fontSize: "1rem",
                            border: "2px solid #06b6d4",
                            background: "rgba(6, 182, 212, 0.1)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "rgba(6, 182, 212, 0.2)";
                            e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "rgba(6, 182, 212, 0.1)";
                            e.target.style.transform = "translateY(0)";
                        }}
                    >
                        🎬 Explorar películas
                    </Link>
                </div>

                {/* Footer */}
                <p style={{ color: "#8fa6c1", fontSize: "0.95rem" }}>
                    movieMatch • Encuentra tu próxima película favorita
                </p>
            </div>
        </div>
    );
}