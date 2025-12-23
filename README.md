# GiftTracker

GiftTracker is a desktop application designed to help you organize your holiday shopping, track gift ideas, manage recipients, and monitor your spending. Built with modern web technologies and wrapped in Tauri for a native experience.

[**Download Latest Installer (Windows)**](./releases/GiftTracker_1.0.0_x64-setup.exe)

## 🚀 Features

-   **Dashboard**: View real-time statistics on total spending, gifts purchased, and upcoming occasions.
-   **Recipient Management**: Add and track individuals, families, and organizations you are buying for.
-   **Gift Tracking**: Log purchased gifts, their prices, and their current status (Purchased, Wrapped, Shipped, Delivered).
-   **Idea Capture**: Quickly jot down gift ideas for specific people or general inspiration, with priority levels and URLs.
-   **Reports**: Visualize your spending habits with charts showing "Spending by Recipient" and "Gift Status Distribution".
-   **Settings**: Toggle between Light and Dark themes.

## 🛠️ Tech Stack

-   **Frontend**: React (v19), TypeScript, Vite
-   **State Management**: React Query (TanStack Query), Zustand (for local settings)
-   **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
-   **Visualization**: Recharts
-   **Backend/Native**: Tauri v2 (Rust)
-   **Database**: SQLite (via `tauri-plugin-sql`)

## 📦 Installation & Usage

### Running the Installer
1.  Download the [setup.exe](./releases/GiftTracker_1.0.0_x64-setup.exe) file.
2.  Run the installer on your Windows machine.
3.  Launch **GiftTracker** from your desktop or start menu.

### Development Setup
If you want to build the project from source:

1.  **Prerequisites**:
    -   Node.js (v18+)
    -   Rust (latest stable)
    -   C++ Build Tools (Windows)

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run in Development Mode**:
    ```bash
    npm run tauri dev
    ```

4.  **Build for Production**:
    ```bash
    npm run tauri build
    ```

## 📄 License
Open Source.
