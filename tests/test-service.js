require('dotenv').config();
const azureTTS = require('../src/services/azure-tts');
const fs = require('fs');

(async () => {
  try {
    console.log('Testing Azure TTS Service...');
    
    // Test initialization
    console.log('Service initialized successfully');
    
    // Test synthesis
    const audioData = await azureTTS.synthesize('Hello, this is a test of the Azure Text-to-Speech service');
    
    // Save to file
    fs.writeFileSync('output.mp3', audioData);
    console.log('Audio saved to output.mp3');
    
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
})();