# 🛠️ CivicPulse

**CivicPulse** is a full-stack civic issue reporting and tracking web application designed to empower citizens to report local community problems such as potholes, streetlight failures, sanitation issues, drainage problems, and more, while providing administrators with tools to manage and resolve these issues efficiently through a centralized dashboard.

🔗 **Live Demo:** https://civic-pulse-gilt.vercel.app  
📦 **GitHub Repository:** https://github.com/netacodes69/CivicPulse  

CivicPulse bridges the gap between citizens and local authorities by offering a transparent, user-friendly platform where users can quickly raise complaints with relevant details and view issues reported in their community, while admins can filter, monitor, and manage reports using role-based access control.

### 🚀 Features
- User authentication (Login / Signup) using JWT  
- Role-based access (Citizen & Admin)  
- Submit and view civic issues  
- Admin dashboard for issue management  
- Scalable backend for future analytics and real-time features  

### 🧱 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  

### ⚙️ Setup & Installation
```bash
git clone https://github.com/netacodes69/CivicPulse.git
cd CivicPulse
npm install
npm run dev

Create a .env file inside the backend/ directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Open the app at:
http://localhost:5173


🧩 Future Enhancements
Image uploads for issue reporting
Real-time notifications
Issue status tracking (Pending / In-Progress / Resolved)
Analytics dashboard and location-based insights

