# 💰 PayTasker - Micro-Task and Earning Platform

## 🚀 Overview  

Welcome to **PayTasker**, a micro-task and earning platform that enables users to complete small tasks and earn money. The platform accommodates three distinct roles: **Worker, Buyer, and Admin**, each with specific functionalities to manage tasks, coins, and system operations.

---

## 🔗 Live Demo  

🌍 **Live Site:** [PayTasker Live](https://server-drab-nine.vercel.app)  

---

## 🔑 Admin Credentials  

- **Username:** `admin@example.com`  
- **Password:** `1234qQ`  

*(Use these credentials to access the admin dashboard.)*  

---

## 📸 Screenshot  

![PayTasker Screenshot](https://i.postimg.cc/904rksvb/Screenshot-2025-02-05-023433.png) 

---

## 🛠️ Technologies Used  

### **Frontend**  
- React.js (for UI development)  
- Tailwind CSS (for responsive design)  
- React Router (for navigation)  
- Swiper.js (for carousels & sliders)  
- React Hook Form (for validation)  
- Firebase (for authentication)  
- Moment.js (for date & time formatting)  
- SweetAlert (for pop-up notifications)  
- Motion (for animations)  

### **Backend**  
- Node.js (for server-side logic)  
- Express.js (for building RESTful APIs)  
- MongoDB (for database storage)  
- JWT (for secure authentication)  

### **Authentication**  
- Firebase Authentication (for email/password & Google Sign-In)  

### **Payment Integration**  
- Stripe API (for purchasing coins)  

### **Notification System**  
- Real-time notifications for task submission updates and withdrawal approvals  

---

## 🚀 Core Features  

✔️ **User Roles**: Three distinct roles: **Worker, Buyer, Admin**, each with specific functionalities.  
✔️ **User Authentication**: Secure login with email/password or Google Sign-In.  
✔️ **Task Management**:  
   - **Workers** can view tasks, submit work, and track earnings.  
   - **Buyers** can create tasks, approve/reject submissions, and manage coins.  
   - **Admins** can manage users, tasks, and platform operations.  
✔️ **Coins System**: Workers earn coins for tasks; buyers use coins to create tasks.  
✔️ **Stripe Payment Integration**: Buyers can purchase coins securely.  
✔️ **Task Submission & Review**: Workers submit tasks; buyers approve or reject.  
✔️ **Withdrawal System**: Workers can withdraw earnings (minimum 200 coins = $10).  
✔️ **Admin Dashboard**: Full control over users, tasks, and withdrawal approvals.  
✔️ **Responsive Design**: Works on all devices (mobile, tablet, desktop).  

---

## 📦 Dependencies  

### **Production Dependencies**  
```json
{
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "lucide-react": "^0.471.1",
  "moment": "^2.30.1",
  "motion": "^11.18.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.5.1",
  "react-responsive-carousel": "^3.2.23",
  "react-router": "^7.1.1",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1"
}
```

---

## 🛠️ Getting Started (Run Locally)  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/paytasker.git
cd paytasker
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory and add the following:  
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_IMGBB_KEY=your_imgbb_api_key
VITE_STRIPE_PK=your_stripe_public_key
```

### 4️⃣ Start the Development Server  
```sh
npm run dev
```

### 5️⃣ Open in Browser  
Visit **[http://localhost:3000](http://localhost:3000)** to see the app in action.

---

## 🔗 Live Demo & Resources  

🚀 **Live Project:** [PayTasker Live](https://server-drab-nine.vercel.app)

---

## 🤝 Contributing  

Contributions are welcome!  

1. **Fork the repository**  
2. **Create a new branch** (`git checkout -b feature-name`)  
3. **Commit your changes** (`git commit -m 'Add new feature'`)  
4. **Push to the branch** (`git push origin feature-name`)  
5. **Open a Pull Request**  

---

⭐ **Like this project?** Give it a star on GitHub!  
