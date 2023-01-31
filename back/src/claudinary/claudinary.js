require('dotenv').config();
const { API_KEY , API_SECRET, CLOUD_NAME} = process.env;
const cloudinary = require('cloudinary').v2


cloudinary.config({
  cloud_name:CLOUD_NAME,
  api_key: API_KEY,
  api_secret:API_SECRET,
  secure:true
})

 const uploadImageProduct = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'imageProduct-LaDionisia'
  })
}

module.exports = {uploadImageProduct}
