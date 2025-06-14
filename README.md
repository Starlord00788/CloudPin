# CloudPin

CloudPin is a modern file-sharing web application built with a **Vite + React** frontend and a **Node.js + Express** backend, backed by **MongoDB** for data storage and **Cloudinary** for file hosting. It allows users to upload files, share them via short links, and download or view them seamlessly.

---

## 📦 Tech Stack

* **Frontend:** Vite, React, React Router (BrowserRouter), Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB (via Mongoose)
* **File Storage:** Cloudinary
* **Authentication:** JWT with email/password (optional OTP flow)
* **Deployment:** Render (Static Site for frontend, Web Service for backend)

---

## 🚀 Features

* **User Authentication:** Register, log in, and protected routes using JWT.
* **File Upload:** Drag & drop or select files to upload; PDF, image, and video support.
* **Short Links:** Every file receives a unique short ID (via NanoID) for sharing.
* **View / Download:** Users can view or download files; PDF downloads force attachment.
* **Dashboard:** Users can see and manage their uploaded files.
* **Copy Link:** Easily copy shareable links to clipboard.
* **Responsive UI:** Mobile-first design with Tailwind CSS.

---

🖼️ Screenshots

Below are some screenshots showcasing the CloudPin UI and features. 

![image](https://github.com/user-attachments/assets/bd12cf00-3412-4593-992a-d8bf5bcadf2a)
![image](https://github.com/user-attachments/assets/df252909-5d88-4e31-9f5d-ebac625fdba9)
![image](https://github.com/user-attachments/assets/4c267341-55aa-4f55-ac04-d8d18535bf38)
![image](https://github.com/user-attachments/assets/f5346afe-140c-428b-9221-4a3463bd3684)


## 📋 Prerequisites

* Node.js (v16+)
* npm
* MongoDB database URI (e.g., MongoDB Atlas)
* Cloudinary account (API credentials)

---

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Starlord00788/CloudPin.git
   cd CloudPin
   ```

2. **Install dependencies**

   * **Backend**

     ```bash
     cd Backend
     npm install
     ```
   * **Frontend**

     ```bash
     cd ../Frontend
     npm install
     ```

3. **Environment Variables**

   * **Backend**: Create a `.env` file in `Backend/`:

     ```text
     PORT=8000
     MONGODB_URI=<YOUR_MONGODB_URI>
     JWT_SECRET=<YOUR_JWT_SECRET>
     CLOUDINARY_CLOUD_NAME=<YOUR_CLOUD_NAME>
     CLOUDINARY_API_KEY=<YOUR_API_KEY>
     CLOUDINARY_API_SECRET=<YOUR_API_SECRET>
     CLIENT_BASE_URL=http://localhost:5173
     ```
   * **Frontend**: Create a `.env` at `Frontend/`:

     ```text
     VITE_API_BASE_URL=http://localhost:8000/api/v1
     ```

4. **Build & Run**

   * **Backend**

     ```bash
     cd Backend
     npm start
     ```
   * **Frontend (development mode)**

     ```bash
     cd ../Frontend
     npm run dev
     ```

   Your app will be available at `http://localhost:5173` and API at `http://localhost:8000/api/v1`.

---

## 🔍 Project Structure

```
CloudPin/
├─ Backend/               # Express API
│  ├─ controllers/        # Route handlers
│  ├─ middlewares/        # Auth, file upload
│  ├─ models/             # Mongoose schemas
│  ├─ utils/              # Helpers (Cloudinary, error)
│  ├─ routes/             # Express routers
│  ├─ app.js              # Express app setup
│  └─ server.js           # Server entrypoint
│
├─ Frontend/              # Vite + React SPA
│  ├─ public/             # Static assets + _redirects (for SPA)
│  ├─ src/
│  │  ├─ components/      # UI components (Navbar, Footer, PrivateRoute)
│  │  ├─ context/         # React Context (Auth)
│  │  ├─ pages/           # Route pages (Upload, MyFiles, FileViewer, Login, Register)
│  │  ├─ api/             # Axios instance
│  │  ├─ App.jsx          # Routes definition
│  │  └─ main.jsx         # Entry with BrowserRouter
│  ├─ vite.config.js      # Vite config
│  └─ package.json        # Frontend dependencies & scripts
│
└─ render.yaml            # Render deployment config
```

---

## 📡 API Endpoints

> All endpoints are prefixed with `/api/v1/files` unless otherwise noted.

| Method | Path              | Description                   | Auth Required |
| ------ | ----------------- | ----------------------------- | ------------- |
| POST   | `/files/upload`   | Upload a new file             | Yes           |
| GET    | `/files/my`       | List files for current user   | Yes           |
| GET    | `/files/:shortId` | Get file metadata by short ID | No            |
| DELETE | `/files/:id`      | Delete a file by database ID  | Yes           |

---


## 🤝 Contributing

Feel free to open issues or submit pull requests. Please adhere to the existing code style and write tests for new features.

---
