# StarHook Online Shopping Hub 🛍️ (MERN Stack E-commerce Application)

<img width="988" height="1000" alt="image" src="https://github.com/user-attachments/assets/864fcb71-8f3b-4db4-a4b0-0ff647a85b19" />

<img width="500" height="449" alt="image" src="https://github.com/user-attachments/assets/f197fe07-03a3-446b-9918-dadd7b4ca27f" />
<img width="500" height="395" alt="image" src="https://github.com/user-attachments/assets/3e77df32-19ea-4e15-8afb-efb025b7aef5" />
<img width="500" height="498" alt="image" src="https://github.com/user-attachments/assets/100b244a-83ca-4667-a908-0e63f4a45f43" />
<img width="500" height="593" alt="image" src="https://github.com/user-attachments/assets/8615767b-0f76-4f0b-9d1e-472b287487cd" />

## 📖 Overview

**StarHook Online Shopping Hub** is a comprehensive, full-stack e-commerce platform designed to provide a seamless and robust online buying and selling experience. This project serves as a real-world application showcasing proficiency in the **MERN stack** (MongoDB, Express.js, React.js, Node.js) to manage the entire life cycle of an online delivery service, from product supply to management.

### Project Aim

The primary aim of developing the StarHook Online Shopping Hub is to gain practical knowledge and hands-on experience in building a scalable e-commerce solution and understanding its actual performance in the supply and management of online delivery services.

---

## ✨ Key Objectives & Features

The platform is built around core e-commerce objectives, focusing on business growth and an excellent customer experience:

* **Generate Revenue:** Primary goal is to create a channel for selling products or services online.
* **Increase Sales & Customer Base:** Implement strategies for expanding the customer base and driving revenue growth.
* **Improve Customer Experience:** Allow customers to quickly and easily find the best solutions for their needs through an intuitive interface.
* **Enhance Customer Loyalty:** Focus on building a loyal customer base, rewarding repeat purchases, and improving customer lifetime value.
* **Data-Driven Marketing:** Utilise available data for better marketing and product development decisions.
* **Intuitive Online Shopping:** Provide a popular, secure, and easy-to-use platform for consumers to purchase goods and services.
* **Mobile Responsiveness:** Ensure full compatibility across all device sizes for a consistent user experience (A good feature to mention).
---

## 🛠️ Tech Stack (MERN)

This application is built using the following modern web technologies, collectively known as the **MERN stack**:

### Frontend

| Technology | Description |
| :--- | :--- |
| **React.js** | For building the dynamic, single-page user interface (SPA). |
| **JavaScript** | Core language for interactivity. |
| **HTML / CSS** | Standard markup and styling languages. |
| **Bootstrap** | For responsive and fast front-end design. |

### Backend

| Technology | Description |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment for the server-side logic. |
| **Express.js** | Minimalist, flexible Node.js web application framework. |
| **MongoDB** | A NoSQL database used for storing user, product, and order data. |

---

## Configure Environment Variables

Create a file named **`.env`** in the **root directory** (for the server) and a separate **`.env`** file inside the **`client`** directory (if your React app is nested). **You must provide your own MongoDB connection string and API keys.**

**Server (`.env`) Example:**

```env
# General Configuration
PORT=8090
NODE_ENV=development
DEV_MODE=development

# Database Configuration
MONGODB_URI=[YOUR_MONGODB_CONNECTION_STRING_HERE]

# Authentication (JSON Web Token)
JWT_SECRET=[A_RANDOM_SECRET_STRING_FOR_JWT] 
# Use a long, complex string for security. Generate one online or use a tool.

# Payment Gateway (Braintree)
BRAINTREE_MERCHANT_ID=[YOUR_BRAINTREE_MERCHANT_ID]
BRAINTREE_PUBLIC_KEY=[YOUR_BRAINTREE_PUBLIC_KEY]
BRAINTREE_PRIVATE_KEY=[YOUR_BRAINTREE_PRIVATE_KEY]

```

**Client (`.env`) Example:**

```env
REACT_APP_SERVER_URL=http://localhost:8090
REACT_APP_ACT=[YOUR_FRONTEND_API_KEY_OR_SETTING]
REACT_APP_BRAINTREE_PUBLIC_KEY=[YOUR_BRAINTREE_PUBLIC_KEY]
```


## Install Dependencies & Run

#### **A. Install Dependencies**

Navigate to both the root and `client` directories to install dependencies:

```bash
# In the root directory:
npm install 

# Then, in the client directory:
cd client
npm install
cd ..
```

#### **B. Start the Application**

Start the server and client in separate terminals (or use your custom run command):

```bash
# To start the server (in the root directory):
npm start  
# OR: node server.js

# To start the client (in the client directory):
cd client
npm start
```

The application will typically be accessible at `http://localhost: [Your Client Port, e.g., 3000]`.

-----
## 📜 License
This project is distributed under the MIT License. See the LICENSE file in the repository root for full details.

-----
## 📧 Contact

**Mahale Rajesh** - [rajeshmahale103@gmail.com](mailto:rajeshmahale103@gmail.com)

**Project Link**:  https://github.com/rajesh2004-source/StarHook-Ecommerce-App

-----

