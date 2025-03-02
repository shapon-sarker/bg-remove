from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
# Configure CORS for production
CORS(app, resources={
    r"/*": {
        "origins": ["https://your-frontend-domain.com", "http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Add size limit for uploads
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

@app.route('/')
def home():
    return jsonify({"message": "Background Removal API", "status": "active"})

@app.route('/remove-bg', methods=['POST'])
def remove_background():
    if 'image' not in request.files:
        return {'error': 'No image provided'}, 400
    
    file = request.files['image']
    if not file.filename:
        return {'error': 'No selected file'}, 400

    # Validate file type
    allowed_extensions = {'png', 'jpg', 'jpeg'}
    if not '.' in file.filename or \
       file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
        return {'error': 'Invalid file type'}, 400

    try:
        # Secure the filename
        filename = secure_filename(file.filename)
        
        # Read input image
        input_image = Image.open(file.stream)
        
        # Remove background
        output_image = remove(input_image)
        
        # Save to bytes
        img_byte_arr = io.BytesIO()
        output_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        return send_file(
            img_byte_arr,
            mimetype='image/png',
            as_attachment=True,
            download_name='removed_bg.png'
        )
    
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    # Use environment variables for production settings
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
