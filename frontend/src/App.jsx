import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

// API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [image, setImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    // Validate file size (max 16MB)
    if (file.size > 16 * 1024 * 1024) {
      setError('File size too large. Maximum size is 16MB.')
      return
    }
    setImage(URL.createObjectURL(file))
    setProcessedImage(null)
    setError(null)
    setUploadProgress(0)
    handleUpload(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false,
    maxSize: 16 * 1024 * 1024 // 16MB
  })

  const handleUpload = async (file) => {
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(`${API_URL}/remove-bg`, formData, {
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percentCompleted)
        }
      })

      const url = URL.createObjectURL(response.data)
      setProcessedImage(url)
    } catch (err) {
      setError(err.response?.data?.error || 'Error processing image. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      link.download = 'removed_bg.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Background Removal Tool
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            <u>Remove background from your images instantly</u> 
            <br /> *Created by Md_Shapon_Sarker* 
            <br /> <a href="https://wa.me/+8801616910136?text=Hello%20there!" target="_blank"><i className="fab fa-whatsapp text-green-500"></i></a>
            &nbsp; &nbsp; <a href="https://github.com/shapon-sarker" target="_blank"><i className="fab fa-github text-green-500"></i></a>

          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6">
          <div {...getRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400">
            <div className="space-y-1 text-center">
              <input {...getInputProps()} />
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <span>{isDragActive ? "Drop the image here" : "Drag 'n' drop an image here, or click to select"}</span>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 16MB</p>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-center">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                      Processing
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {uploadProgress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <div 
                    style={{ width: `${uploadProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300"
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {image && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Original Image</h3>
                <img src={image} alt="Original" className="rounded-lg shadow-lg" />
              </div>
            )}
            
            {processedImage && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Processed Image</h3>
                <img src={processedImage} alt="Processed" className="rounded-lg shadow-lg" />
                <button
                  onClick={downloadImage}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
