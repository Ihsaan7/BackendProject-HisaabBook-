# HisaabBook - Personal Finance Tracker

A modern, responsive web application for tracking personal finances and expenses with a beautiful dark/light theme interface.

## Features

- ✨ Modern UI with dark/light theme toggle
- 📱 Responsive design for all devices
- 📝 Create, view, edit, and delete financial records
- 🎨 Beautiful card-based layout
- 💾 File-based storage system
- 🚀 Fast and lightweight

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, Tailwind CSS
- **Storage**: File-based system
- **Icons**: Font Awesome

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hisaabBook
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:8000`

## Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Node.js project
   - Click "Deploy"
   - Your app will be live in minutes!

### Option 2: Deploy to Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create a Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Add start script to package.json** (if not already present):
   ```json
   {
     "scripts": {
       "start": "node app.js"
     }
   }
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 3: Deploy to Railway

1. Visit [railway.app](https://railway.app)
2. Connect your GitHub account
3. Select your repository
4. Railway will automatically deploy your app

## Environment Variables

For production deployment, you may want to set:

- `PORT`: The port number (default: 8000)
- `NODE_ENV`: Set to 'production' for production builds

## File Structure

```
hisaabBook/
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
├── vercel.json         # Vercel deployment configuration
├── files/              # Storage directory for hisaab files
└── views/              # EJS templates
    ├── index.ejs       # Dashboard
    ├── showCreate.ejs  # Create form
    ├── showHisaab.ejs  # Detail view
    └── edit.ejs        # Edit form
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy tracking! 📊💰**