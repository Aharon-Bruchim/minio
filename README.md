# 📌 Project Documentation

This project is managed using **Docker Compose**, and consists of multiple services including a frontend, backend, MinIO (S3-compatible storage), and MongoDB Atlas (cloud-based database). Below are the details of each service and its assigned ports.

---

## 🚀 Services & Ports
| **Service** | **Local Port (Host Machine)** | **Internal Port (Docker Container)** | **Description** |
|------------|-----------------------------|--------------------------------------|----------------|
| **Frontend (React + Vite)** | `5173` | `5173` | The web UI, accessible at [http://localhost:5173](http://localhost:5173) |
| **Backend (Express API)** | `3000` | `3000` | The backend server, accessible at [http://localhost:3000](http://localhost:3000) |
| **MongoDB (Atlas - Cloud)** | **Cloud-Based** | **Cloud-Based** | The database is hosted on MongoDB Atlas (No local port needed) |
| **MinIO API (S3-Compatible Storage)** | `9000` | `9000` | The API for file storage, accessible at [http://localhost:9000](http://localhost:9000) |
| **MinIO Console (Web UI)** | `9001` | `9001` | The admin dashboard for MinIO, accessible at [http://localhost:9001](http://localhost:9001) |

---

## 🔍 How to Check Running Services
To check which services are currently running, use the following command:
```bash
docker ps
```
This will display all active containers along with their **ports** and **status**.

---

## 🛠️ How to Restart All Services
If you need to restart all services, run the following commands:
```bash
docker-compose down
docker-compose up --build
```
This will stop all running services and rebuild them from scratch.

---

## 📌 Notes
- The **MongoDB database is hosted on MongoDB Atlas**, so there is no local port for it.
- MinIO provides **S3-compatible storage**, which you can access via API (`9000`) or the web UI (`9001`).
- The **backend communicates with MinIO and MongoDB**, ensuring that uploaded files are stored and referenced correctly.

---

## 🔍 Debugging
If a service is not working, check its logs using:
```bash
docker logs <container_name>
```
For example, to check the backend logs:
```bash
docker logs back-container
```

---

🚀 **Enjoy working with this project!** 🚀