
### **2. Setup Guide Documentation (SETUP.md)**

In the **SETUP.md** file, you'll provide detailed steps to help users set up the project locally, ensuring that all dependencies are installed, and environment variables are configured.

#### **/docs/SETUP.md**
```markdown
# Setup Guide

## Requirements
- **Node.js** (version 16.x or higher)
- **npm** (Node Package Manager)
- **Azure Account**: An Azure account with the **Cognitive Services Text-to-Speech API** enabled.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tts-api.git
   cd tts-api
Install dependencies:

bash

npm install
Set up environment variables:

Create a .env file in the root of the project directory.

Add your Azure Speech API Key and Region:

plaintext

SPEECH_KEY=your_azure_speech_key
SPEECH_REGION=your_azure_region
PORT=3000
Start the server:

bash

npm start
The server should now be running at http://localhost:3000.


### **3. Postman Test**

To ensure everything is tested correctly using **Postman**, follow these steps:

#### **3.1. Create a New Request in Postman**

1. **Open Postman** and click on **New** > **Request**.
2. **Name the request** (e.g., "TTS Text-to-Speech Conversion").
3. **Select POST** as the HTTP method.
4. In the **URL field**, enter:
   ```plaintext
   http://localhost:3000/api/tts/convert

#### **3.1 Set the Request Body:

Click on the Body tab.

Select raw and choose JSON as the format.

Add the following JSON body:

json

{
  "text": "Hello, this is a test of the Azure Text-to-Speech service."
}

#### ** 3.2. Send the Request
Click on Send to send the POST request. You should receive a response similar to this:

json
Copy code
{
  "message": "Text-to-Speech synthesis completed.",
  "audioUrl": "/path/to/generated-audio.wav"
}