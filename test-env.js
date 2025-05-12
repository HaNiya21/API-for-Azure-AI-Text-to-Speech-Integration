require('dotenv').config();
console.log('Azure Key:', process.env.AZURE_API_KEY ? 'Exists' : 'Missing');
console.log('Azure Region:', process.env.AZURE_REGION);