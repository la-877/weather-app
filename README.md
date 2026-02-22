# weather-app

## 🚦 How to Run the App

### Option 1: Using a Live Server (Recommended)

This is the most reliable method for development. It creates a local development server so the API and Geolocation work exactly like a real website.

1. **If using VS Code:** Install the **Live Server** extension.
2. Right-click your `index.html` file.
3. Select **"Open with Live Server"**.
4. The app will launch at `http://127.0.0.1:5500`.

### Option 2: The "Double-Click" Method

If you just want to open the file directly:

1. Navigate to your project folder.
2. Open `index.html` in a modern browser (Chrome, Firefox, or Edge).
3. **Note:** When the browser asks "Allow location access?", you **must click Allow** for the initial weather to load.

### Option 3: Python Quick Server

If you have Python installed, you can run a server from your terminal/command prompt:

```bash
# Navigate to your project folder first, then:
python -m http.server 8000

```

Then visit `localhost:8000` in your browser.

---

## ⚠️ Troubleshooting Tips

* **Missing Icons:** Ensure your folder structure matches the code. The script looks for images in a folder named `images` that is **one level up** (`../images/`) from the script's location.
* **API Key:** The key `9NG57RXYMHCK8BH8HTVRY8P2L` is currently hardcoded in your `fetchApi` function. If the weather doesn't load, check the browser console () to see if the API limit has been reached.
* **C++ Comparison:** Just like when you compile with `-std=c++17`, JavaScript is sensitive to environment. Ensure you are using a modern browser that supports ES6 features (like `const`, `let`, and arrow functions).

---
