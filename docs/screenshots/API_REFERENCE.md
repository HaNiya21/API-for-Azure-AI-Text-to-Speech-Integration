# API Reference

## Overview
This API provides Text-to-Speech (TTS) functionality using the **Azure AI Text-to-Speech** service. It converts the input text into a synthesized audio file, which can be returned as a downloadable `.wav` file.

## Base URL
The base URL for the API is:
http://localhost:3000/api

csharp

## Endpoints

### POST /api/tts/convert
Converts the provided text into speech.

#### Request Body:
```json
{
  "text": "Hello, this is a test of the Azure Text-to-Speech service."
}
Request Parameters:
text (required): The text that should be converted into speech.

Response:
json

{
  "message": "Text-to-Speech synthesis completed.",
  "audioUrl": "/path/to/generated-audio.wav"
}
message: A message indicating that the synthesis was completed successfully.

audioUrl: The file path or URL to the generated audio file.

Error Responses:
400 Bad Request: Missing text parameter or invalid input.

json

{
  "error": "Text is required"
}
500 Internal Server Error: General server error, could be related to Azure service or other internal issues.

json

{
  "error": "An unexpected error occurred."
}
Example cURL Request:
bash
curl -X POST http://localhost:3000/api/tts/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, this is a test of the Azure Text-to-Speech service."}'
Notes:
Ensure you have the correct Azure API keys and region set in the .env file to authenticate with Azure's Text-to-Speech service.