# Azure Text-to-Speech API

## Overview
This API converts text into speech using Azure's Cognitive Services Text-to-Speech API. It returns an audio file (.wav) that contains the spoken version of the input text.

## Endpoints

### POST /api/tts/convert
Converts the provided text into speech.

#### Request
```json
{
  "text": "Hello world!"
}
Response
json
{
  "message": "Text-to-Speech synthesis completed.",
  "audioUrl": "/path/to/generated-audio.wav"
}


tts-api/
├── /docs
│   ├── API_REFERENCE.md      # Endpoint specs
│   ├── SETUP.md              # Installation guide
|   |___Postmantest.png
├── /src
│   ├── /controllers
│   │   └── tts.controller.js
│   ├── /middlewares
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── validate.js
│   ├── /routes
│   │   ├── tts.js
│   │   └── auth.js
│   ├── /services
│   │   └── azure-tts.js
soap
rpc
│   ├── /utils
│   │   ├── logger.js
│   │ 
│   └── app.js                # Main app
├── /tests
│   ├── /unit
│   │   ├── auth.test.js
│   │   └── azure-tts.test.js
│   └── /integration
│       └── api.test.js
├── .env            
├── .gitignore
├── package.json              # Updated scripts
├── README.md                 # Project overview
└── node_modules
