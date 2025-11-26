# Guidance Plus - Course Management System

A comprehensive web-based platform for managing courses, agents, and educational resources with real-time collaboration using Supabase as the backend.

## 🌟 Features

- **User Management**: Admin, Agent, and Student roles
- **Course Management**: Create, edit, delete, and search courses
- **Resource Library**: Upload and manage images, PDFs, and links
- **Real-time Chat**: Admin-Agent communication
- **Activity Logging**: Track all system activities
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes
- **Supabase Backend**: Cloud database with real-time capabilities

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Supabase account (free tier available)
- Basic understanding of HTML/JavaScript

### Step 1: Setup Supabase

1. **Create Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up for a free account

2. **Create New Project**
   - Click "New Project"
   - Name: `guidance-plus`
   - Set a strong database password
   - Choose a region close to you
   - Wait for project setup to complete (1-2 minutes)

3. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy your `Project URL`
   - Copy your `anon/public` key

4. **Run SQL Schema**
   - Open SQL Editor in Supabase dashboard
   - Copy all SQL from `SUPABASE_SETUP.md`
   - Paste and click "Run"
   - Verify tables are created (users, courses, chat, etc.)

### Step 2: Configure the Application

1. **Create config.js file**
   ```bash
   cp config.example.js config.js
   ```

2. **Add your Supabase credentials to config.js**
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

3. **Update HTML files**
   - Add Supabase CDN script to all HTML files:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="config.js"></script>
   ```

### Step 3: Deploy

**Option A: GitHub Pages**
```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```
- Go to repository Settings > Pages
- Select main branch
- Your site will be live at `https://username.github.io/final-guidance-plus/`

**Option B: Local Testing**
- Use a local server (VS Code Live Server, Python HTTP server, etc.)
- Do NOT open HTML files directly (causes CORS issues)

## 📦 Project Structure

```
final-guidance-plus/
├── index.html          # Login page
├── regester.html       # Registration page
├── admin.html          # Admin dashboard
├── agent.html          # Agent dashboard
├── config.example.js   # Configuration template
├── config.js           # Your Supabase credentials (DO NOT COMMIT)
├── SUPABASE_SETUP.md   # Database schema and setup instructions
├── .gitignore          # Prevents committing sensitive files
└── README.md           # This file
```

## 👥 User Roles

### Admin
- **Default Credentials**: username: `admin`, password: `admin123`
- Manage all users (approve/reject agents)
- Create and manage courses
- Upload resources (images, PDFs, links)
- Chat with agents
- View activity logs
- Export data

### Agent
- View approved courses
- Access resource library
- Receive messages from admin
- Download resources
- Request additional permissions

### Student
- View courses (after implementation)
- Request agent status upgrade

## 🛠️ Key Features Explained

### Courses
- Add course title, name, category, link, and reference book
- Search and filter courses
- Edit/Delete courses
- Export to CSV

### Resources
- **Images**: Upload PNG/JPG files
- **PDFs**: Upload PDF documents
- **Links**: Save external URLs
- All resources are base64 encoded for storage

### Chat System
- Real-time admin-agent messaging
- Read/unread status
- Notification indicators
- Message history

### Activity Log
- Tracks all system actions
- Timestamps for auditing
- Auto-refresh every 2.5 seconds

## 📝 Next Steps (Implementation Required)

The HTML files need to be updated to use Supabase instead of localStorage. Here's what needs to be done:

### For Each HTML File:

1. **Add Supabase Scripts** (in `<head>` section):
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="config.js"></script>
```

2. **Replace localStorage calls with Supabase**:

**Example - Getting users:**
```javascript
// OLD (localStorage)
const users = JSON.parse(localStorage.getItem('users') || '[]');

// NEW (Supabase)
const { data: users, error } = await supabase
  .from('users')
  .select('*');
```

**Example - Adding a course:**
```javascript
// OLD
const courses = JSON.parse(localStorage.getItem('courses') || '[]');
courses.push(newCourse);
localStorage.setItem('courses', JSON.stringify(courses));

// NEW
const { data, error } = await supabase
  .from('courses')
  .insert([newCourse]);
```

## ⚠️ Important Security Notes

1. **Change Default Admin Password** immediately after first login
2. **Never commit config.js** to public repositories
3. **Enable Row Level Security (RLS)** in Supabase for production
4. **Use environment variables** for production deployments
5. **Implement proper password hashing** (current setup is for demo)

## 🐛 Troubleshooting

### "Supabase is not defined"
- Make sure Supabase CDN script is loaded before config.js
- Check browser console for errors

### "Invalid API key"
- Verify your SUPABASE_URL and SUPABASE_ANON_KEY in config.js
- Make sure there are no extra spaces or quotes

### "Table does not exist"
- Run the SQL schema from SUPABASE_SETUP.md in SQL Editor
- Check that all tables were created successfully

### CORS Errors
- Don't open HTML files directly (file:// protocol)
- Use a local web server
- For GitHub Pages, no CORS issues

### Data not saving
- Check browser console for errors
- Verify RLS policies in Supabase allow the operation
- Make sure you're using `await` with async Supabase calls

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 💬 Support

For questions and support:
1. Check SUPABASE_SETUP.md for detailed setup instructions
2. Review Supabase documentation
3. Check browser console for error messages

## 📦 License

This project is open source and available for educational purposes.

---

**Made with ❤️ for learning and education**
