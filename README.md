# 🔒 LockIN: Smart Event Management System

**LockIN** is a MERN based application developed for the **ICT 3230 Full Stack Web Development Tools** course at **Manipal Institute of Technology**. It provides a comprehensive solution for event lifecycle management, featuring dynamic discovery, registration, and hardware-integrated QR verification.

## 🚀 Key Features

* **Dynamic Event Discovery:** A high-tech, dark-themed landing page that fetches and displays real-time event listings using asynchronous data fetching via the `useEffect` hook.
* **Instant QR Synthesis:** Upon registration, the system generates a unique digital ticket with an SVG-based QR code for the attendee using the `react-qr-code` library.
* **Hardware-Integrated Scanner:** A custom-built **Staff Scanner** module that interfaces with the device's webcam to verify tickets instantly using the `html5-qrcode` library.
* **Optimized Viewfinder:** Engineered with a 1:1 aspect ratio to ensure consistent scanning performance across both mobile devices and laptop webcams.
* **Role-Based Access:** Implements protected routing and global state management via the Context API to separate Organizer, Staff, and Attendee experiences.



## 🛠️ Technical Stack

* [cite_start]**Frontend Library:** React.js (Functional Components, Hooks, Context API)[cite: 12].
* **Routing:** React Router v6 (Dynamic & Protected Routes).
* **Hardware Integration:** `html5-qrcode` (Scanner), `react-qr-code` (Generator).
* **Design:** Custom CSS3 with an Emerald Green "LockIN" aesthetic.

## 📁 Project Structure

| Component | Purpose |
| :--- | :--- |
| `Home.jsx` | Landing page with Hero section and Event Grid. |
| `AttendeeRegister.jsx` | Dynamic form for user data collection and ticket triggering. |
| `Ticket.jsx` | UI for displaying unique QR codes and ticket identifiers. |
| `StaffScanner.jsx` | Real-time camera verification module with square viewfinder. |
| `Footer.jsx` | Global footer containing group and platform details. |

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/lockin-frontend.git](https://github.com/yourusername/lockin-frontend.git)
   cd lockin-frontend ```

2. **Install dependencies:**
 ```bash
    npm install
 ```

3. **Start the application**:
 ```
    npm start
 ```

## Contributors
    Siya Rath - Frontend Developer & System Architect.
    Saanvi Bhattacharya — Backend Developer & Logic Architect.
