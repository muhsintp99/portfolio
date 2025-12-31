# 🚀 Pro Dashboard Backend (Node.js + MongoDB)

A **professional personal dashboard & portfolio backend** built with:

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Access + Refresh Token)
- Multer (Image Upload)
- Nodemon (Development)
- dotenv (Environment Security)

This backend powers:
- Personal Profile
- Portfolio (Experience, Certificates, Brand)
- Blog System
- Notes & Todo
- Expense Tracker
- Secure Authentication
- Image Uploads
- Dashboard Analytics

---

## 📁 Project Structure

```
pro_dashboard_backend/
│
├── config/
│   ├── db.js
│   └── jwt.js
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
│
├── .env
├── .gitignore
├── nodemon.json
├── server.js
└── package.json
```

---

## 🔐 Authentication System

### Tokens
| Token | Purpose | Expiry |
|-----|--------|-------|
| Access Token | API access | 15 minutes |
| Refresh Token | Generate new access token | 7 days |

- Refresh token stored securely in **httpOnly cookie**
- Access token sent via `Authorization: Bearer <token>`

---

## 🔑 API AUTH ROUTES

| Method | Endpoint | Description |
|-----|--------|------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Get new access token |
| POST | `/api/auth/logout` | Logout |

---

## 📦 MAIN API MODULES

- Experience → `/api/experience`
- Certificates → `/api/certificates`
- Social Media → `/api/socials`
- Brand → `/api/brand`
- Blogs → `/api/blogs`
- Notes → `/api/notes`
- Todos → `/api/todos`
- Expenses → `/api/expenses`
- Dashboard → `/api/dashboard`

---

## 🖼 Image Upload

```
POST /api/upload/:folder
```

Supported folders:
- profile
- certificates
- social
- brand
- blog
- experience
- note

---

## ⚙️ Environment Variables

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pro_dashboard
JWT_ACCESS_SECRET=ACCESS_SECRET
JWT_REFRESH_SECRET=REFRESH_SECRET
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

---

## 🔒 MongoDB Security

- Enable authentication
- Use strong passwords
- Restrict port 27017
- Use firewall

---

## 💾 MongoDB Backup

### Backup
```
mongodump --db pro_dashboard --out ./backup
```

### Restore
```
mongorestore --db pro_dashboard ./backup/pro_dashboard
```

---

## 🧪 Development

```
npm install
npm run dev
```

---

## 🚀 Production

```
npm start
```

---

## 🛡 Security Checklist

✔ .env protected  
✔ JWT refresh token  
✔ Password hashing  
✔ MongoDB backup  

---

## 👤 Author
Muhsin

---

## ✅ Status
Production Ready