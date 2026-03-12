# 💻 The Vision Board
<img width="1046" height="594" alt="image" src="https://github.com/user-attachments/assets/941693a0-d8ac-4e69-ab2c-f0ec1eb161f6" />

A **real-time collaborative drawing application** that empowers organizations to create and collaborate on drawing boards, much like Figma! ✏️✨

## 🚀 Features
- **Real-time Collaboration**: Multiple users can draw and interact on the same board simultaneously. 🖌️👥
- **Organization-Based Access**: Manage boards within organizations for structured collaboration. 🏢📂
- **User Authentication**: Powered by Clerk for seamless and secure sign-ins. 🔒👤
- **Fast & Scalable**: Backed by Hono.js, Liveblocks, and Neon DB for robust performance. ⚡🌐
- **Modern UI**: Built with Tailwind CSS and Shadcn UI for a sleek and intuitive interface. 🎨💎
- **Functionalites**: Selection, Tanslating, Resizing, Moving, Undo, Redo etc...
- Advanced drawing tools (Ellipse, Rectangle, line, Sticky note etc) ✍️
- Real-time drawing 🎨
- Multi-user collaboration 🤝
-  Mobile support 📱

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 15, React.js 19, Tailwind CSS, Shadcn UI 🌟
- **Backend**: Hono.js, Liveblocks, Drizzle ORM 🛡️
- **Database**: PostgreSQL (Neon DB) 🗄️
- **Authentication**: Clerk 🔑

---

## 🎯 How It Works
1. **Sign Up**: Create an account and join an organization. ✍️
2. **Create a Board**: Start a new board or join an existing one. 🖼️
3. **Collaborate**: Draw, brainstorm, and ideate with your team in real-time! 💡🤝

---

## 📦 Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/khalidkhankakar/vision-board.git](https://github.com/khalidkhankakar/vision-board.git)
   cd the-vision-board
   ```
2. **Setup the Enviroment key**:
   ```bash
    Postgress database key 
    DATABASE_URL=postgresql://neondb_owner:***********************

    # Clerk Env Keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_****************
    CLERK_SECRET_KEY=*********************
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   
    #Liveblocks project key
    LIVEBLOCKS_PUBLIC_API_KEY=pk_prod_*****************
   ```
3. **Install Dependencies**:
   ```bash
    npm install
   ```
4. **Run the Development Server**:
   ```bash
    npm install
   ```
## 🤝 Contribution Guidelines
  We welcome contributions! Follow these steps:

  1. Fork the repository 🍴
  2. Create a new branch: git checkout -b feature-name 🌿
  3. Commit changes: git commit -m "Add new feature" 📝
  4. Push to branch: git push origin feature-name 🚀
  5. Submit a pull request 🔄

## 👩‍💻 Authors
  [khalidkhankakar](https://github.com/khalidkhankakar/) 💻

## 🌐 Connect With Us
  💬 Have questions or feedback? Open an issue.
  ⭐ Enjoyed the project? Give us a star!

## 📌 Note
This project is under active development. Stay tuned for updates! 🚧✨
