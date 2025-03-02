# Background Removal Web Application

A powerful web application that removes backgrounds from images using AI. Built with Flask, React, and the rembg library.

## Features

- Drag and drop image upload
- Supports PNG, JPG, and JPEG formats
- Real-time progress tracking
- Instant background removal
- Download processed images
- Mobile-responsive design
- File size limit: 16MB
- 

 ![03](https://github.com/user-attachments/assets/28d00e3c-e08e-4d49-b8a3-dd37bba3ac54)
![01](https://github.com/user-attachments/assets/a7704661-0f11-4cc6-baae-bfcc3076bed2)
![02](https://github.com/user-attachments/assets/97a77992-90ba-4622-96cd-e6f1a4d01362)




## Tech Stack

- **Backend:**
  - Flask (Python web framework)
  - rembg (Background removal library)
  - Pillow (Image processing)
  - Flask-CORS (Cross-Origin Resource Sharing)

- **Frontend:**
  - React (UI library)
  - Vite (Build tool)
  - Tailwind CSS (Styling)
  - Axios (HTTP client)
  - React-Dropzone (File upload)

## Deployment Guide

### Backend Deployment (Python Flask)

1. Choose a hosting platform (e.g., Heroku, DigitalOcean, AWS):

```bash
# Example for Heroku
heroku create your-app-name
git push heroku main
```

2. Set environment variables:
```bash
# Heroku example
heroku config:set PORT=8080
```

3. Configure your domain in `app.py`:
```python
CORS(app, resources={
    r"/*": {
        "origins": ["https://your-frontend-domain.com"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

### Frontend Deployment (React)

1. Update the `.env.production` file with your backend URL:
```
VITE_API_URL=https://your-backend-domain.com
```

2. Build the frontend:
```bash
cd frontend
npm install
npm run build
```

3. Deploy the `dist` folder to a static hosting service (e.g., Netlify, Vercel, GitHub Pages)

#### Netlify Deployment
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

#### Vercel Deployment
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd background-removal-app
```

2. Set up the backend:
```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Run the backend
python app.py
```

3. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Production Considerations

1. **Security:**
   - Implement rate limiting
   - Add user authentication if needed
   - Use secure headers
   - Regular security updates

2. **Performance:**
   - Use a production-grade WSGI server (e.g., Gunicorn)
   - Implement caching
   - Use CDN for static assets
   - Optimize image processing

3. **Monitoring:**
   - Set up error tracking (e.g., Sentry)
   - Implement logging
   - Monitor server resources

4. **Scaling:**
   - Use load balancers
   - Implement horizontal scaling
   - Consider using cloud storage for processed images

## License

MIT License

## Support

For support, email: shapon1408@gmail.com or create an issue in the repository.
