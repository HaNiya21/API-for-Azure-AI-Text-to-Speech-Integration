tts-api/
├── /docs
│   ├── API_REFERENCE.md      # Endpoint specs
│   ├── SETUP.md              # Installation guide
├── /src
│   ├── /controllers
│   │   └── tts.controller.js
│   ├── /middlewares
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── validate.js
│   ├── /models
│   ├── /routes
│   │   ├── tts.js
│   │   └── auth.js
│   ├── /services
│   │   └── azure-tts.js
│   ├── /utils
│   │   ├── logger.js
│   │   └── errors.js
│   └── app.js                # Main app
├── /tests
│   ├── /unit
│   │   ├── auth.test.js
│   │   └── azure-tts.test.js
│   └── /integration
│       └── api.test.js
├── .env.example              # Env template
├── .gitignore
├── package.json              # Updated scripts
├── README.md                 # Project overview
└── node_modules
