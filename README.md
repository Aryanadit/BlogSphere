# ✍️ BlogSphere - Modern Full-Stack Blogging Platform

A beautiful, modern blogging platform built with React, Redux, and Appwrite. Create, edit, and share your blog posts with a rich text editor and seamless user experience.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-21.5.0-F02E65?logo=appwrite&logoColor=white)

## 🚀 Features

- 🔐 **User Authentication** - Secure signup and login system
- ✏️ **Rich Text Editor** - Create beautiful blog posts with TinyMCE
- 📝 **CRUD Operations** - Create, read, update, and delete posts
- 🖼️ **Image Upload** - Upload and manage featured images
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Modern UI/UX** - Clean, gradient-based design with smooth animations
- 🔒 **Protected Routes** - Secure routes for authenticated users
- 📊 **State Management** - Redux Toolkit for efficient state handling

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Redux Toolkit** - State management
- **React Router v7** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Tailwind CSS 4** - Utility-first CSS framework
- **TinyMCE** - Rich text editor
- **Vite** - Fast build tool and dev server

### Backend
- **Appwrite** - Backend as a Service (BaaS)
  - Authentication
  - Database (TablesDB)
  - File Storage
  - Cloud functions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogsphere.git
   cd blogsphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_URL=your_appwrite_url
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. **Configure Appwrite**
   
   - Create an Appwrite project
   - Set up a database with a table for posts
   - Configure storage bucket for images
   - Set appropriate permissions

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
blogsphere/
├── public/              # Static assets
├── src/
│   ├── appwrite/        # Appwrite service configuration
│   │   ├── auth.js      # Authentication service
│   │   └── config.js    # Database and storage service
│   ├── components/      # Reusable React components
│   │   ├── Header/      # Navigation header
│   │   ├── Footer/      # Footer component
│   │   ├── post-form/   # Blog post form
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Home page with post listings
│   │   ├── AddPost.jsx  # Create new post
│   │   ├── EditPost.jsx # Edit existing post
│   │   ├── Post.jsx     # Individual post view
│   │   └── ...
│   ├── store/           # Redux store configuration
│   │   ├── store.js     # Store setup
│   │   └── authSlice.js # Auth state slice
│   ├── conf/            # Configuration files
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── package.json
└── README.md
```

## 🎯 Usage

### Creating a Post

1. Sign up or log in to your account
2. Navigate to "Add Post" from the header
3. Fill in the post details:
   - Title
   - Slug (auto-generated from title)
   - Content (using rich text editor)
   - Featured image
   - Status (active/inactive)
4. Click "Submit" to publish

### Editing a Post

1. Navigate to any post you've created
2. Click the "Edit" button (visible only to post author)
3. Make your changes
4. Click "Update" to save

### Deleting a Post

1. Navigate to your post
2. Click the "Delete" button (visible only to post author)
3. Confirm deletion

## 🎨 Key Features Showcase

### Rich Text Editor
- Full formatting options (bold, italic, headings, lists)
- Image insertion
- Code blocks
- Links and media embedding

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions

### Modern UI Elements
- Gradient backgrounds
- Smooth animations and transitions
- Card-based layouts
- Hover effects and interactive buttons

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## 📸 Screenshots

_Add screenshots of your application here_

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

⭐ If you found this project helpful, please give it a star on GitHub!
