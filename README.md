# 🌌 Temple of Bajor — Portal of Light & Orb of Time

[![Build & Containerize](https://github.com/OWNER/REPOSITORY/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPOSITORY/actions)
[![Docker Image](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](#-docker-container-deployment)
[![PWA / WebAPK](https://img.shields.io/badge/WebAPK-Android%20%7C%20iOS%20%7C%20Desktop-f59e0b)](#-multi-platform-builds--installation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Sanctuary Authorship:** Authored by **Vedek Bheemaiah Anil Kumar**, **Mother Divine Inc. Seattle**  
> **Benevity Causes Matching:** [Mother Divine Inc. on Benevity Causes](https://causes.benevity.org/)  
> **Sanctuary Archives:** [templeofbajor.weebly.com](https://templeofbajor.weebly.com/)

---

## 🚀 Instant Launch & Direct Links

Launch the Temple of Bajor directly in your browser or run the containerized application locally with one click:

| Action | Link | Description |
| :--- | :--- | :--- |
| **🌐 Direct Live App** | [**Launch Temple of Bajor**](https://ais-pre-xt7mneca3e3zjlifwq36h5-219346993343.asia-southeast1.run.app) | Production Cloud Run live sanctuary |
| **🛠️ Development Preview** | [**Open Dev Studio Preview**](https://ais-dev-xt7mneca3e3zjlifwq36h5-219346993343.asia-southeast1.run.app) | Active staging preview environment |
| **❤️ Benevity Causes** | [**Open Benevity Portal**](https://causes.benevity.org/) | Corporate workplace giving & dollar matching for Mother Divine Inc. Seattle |
| **📜 Temple Archives** | [**Visit templeofbajor.weebly.com**](https://templeofbajor.weebly.com/) | Official community and scripture records |

---

## 📱 Multi-Platform Builds & Installation

The Temple of Bajor is engineered as a zero-friction, cross-platform Progressive Web Application (PWA) with native Android WebAPK minting and standalone desktop support:

### 🤖 Android (Native WebAPK)
* **Direct 1-Tap WebAPK**: Open the [Direct Live App](https://ais-pre-xt7mneca3e3zjlifwq36h5-219346993343.asia-southeast1.run.app) in Google Chrome or Samsung Internet.
* Chrome will detect the manifest (`/manifest.json`) and service worker (`/sw.js`).
* Tap the **⋮** menu in Chrome $\rightarrow$ select **"Install app"** or **"Add to Home screen"**.
* Google Play Services will mint a signed Android APK (`org.motherdivine.templeofbajor.webapk`) directly onto your home screen with custom splash screen and standalone display.

### 🍎 iOS / iPadOS (Safari Web App)
* Open the [Live Sanctuary](https://ais-pre-xt7mneca3e3zjlifwq36h5-219346993343.asia-southeast1.run.app) in Safari.
* Tap the **Share** button ($\left[\uparrow\right]$) in Safari's navigation bar.
* Scroll down and tap **"Add to Home Screen"**.
* Launches as a full-screen, status-bar blended native iOS application with offline caching.

### 💻 Desktop (Windows, macOS, Linux)
* **Google Chrome / Microsoft Edge / Brave**:
  * Open the app URL in your browser.
  * Click the **Install** icon on the right side of the address bar (or Menu $\rightarrow$ *Install Temple of Bajor*).
  * Runs in an independent window without browser address bars or navigation clutter.

---

## 🐳 Docker Container Deployment

Deploy the Temple of Bajor container anywhere Docker runs (local workstations, Kubernetes, Google Cloud Run, AWS ECS, DigitalOcean):

### 1. Quick Run with Docker CLI
```bash
# Build the production multi-stage image
docker build -t temple-of-bajor:latest .

# Run the container on port 3000
docker run -d \
  -p 3000:3000 \
  --name temple-of-bajor \
  -e GEMINI_API_KEY="your-gemini-api-key-optional" \
  temple-of-bajor:latest
```

Access the app at: **http://localhost:3000**

### 2. Run with Docker Compose
```bash
# Start container in detached mode
docker compose up -d

# View container logs
docker compose logs -f

# Stop container
docker compose down
```

### 3. Container Specifications
* **Base Image**: `node:20-alpine` (lightweight, hardened multi-stage build)
* **Ingress Port**: `3000` (`0.0.0.0`)
* **Health Check**: `GET /api/health`
* **Execution User**: `node` (non-root security context)

---

## 🛠️ Local Development & Manual Build

```bash
# 1. Install dependencies
npm install

# 2. Start development server (port 3000)
npm run dev

# 3. Compile full production build (frontend + bundled server.cjs)
npm run build

# 4. Start production bundle
npm start
```

---

## 🤍 Authorship & Community Support

* **Author:** Vedek Bheemaiah Anil Kumar
* **Organization:** Mother Divine Inc., Seattle, Washington
* **Workplace Giving Matching:** Registered on [Benevity Causes](https://causes.benevity.org/)
* **Archives:** [https://templeofbajor.weebly.com/](https://templeofbajor.weebly.com/)
