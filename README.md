<!-- Hero Section -->
<h1 align="center">
  🚕 RideShare
</h1>
<p align="center">
  <b>Empowering Smart Mobility in Semi-Urban Cities</b>  
</p>
<p align="center">
  <img src="https://img.shields.io/badge/frontend-react-blue?logo=react" />
  <img src="https://img.shields.io/badge/backend-springboot-green?logo=springboot" />
  <img src="https://img.shields.io/badge/styling-tailwind-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/database-postgresql-blue?logo=postgresql" />
  <img src="https://img.shields.io/badge/auth-jwt-orange" />
</p>

---

## 🧭 TL;DR

> **RideShare** is a cross-functional ridesharing app designed for real-world issues in India’s semi-urban areas: unreliable transit, unconnected drivers, and missing last-mile delivery.  
Built for scale with a clean frontend (React + Tailwind) and modular backend (Spring Boot).

---

## 🧱 Architecture Blueprint

```mermaid
graph LR;
  A[React Frontend] -->|Axios API| B(Spring Boot Backend);
  B --> C[JWT Auth];
  B --> D[H2];
  B --> E[Service Layer];
  C --> F[User Roles];
  F --> G[Driver 👨‍✈️];
  F --> H[Rider 🧑‍🦯];
