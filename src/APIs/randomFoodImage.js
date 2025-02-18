const axios = require('axios');

const API_URL = "https://foodish-api.com/api/"; // Corrección en la URL

const randomImageFood = async () => {
    const response = await axios.get(`${API_URL}`);
     const urlImage = response.data.image;

     return urlImage;
}

module.exports = randomImageFood;