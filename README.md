

/tts-api
├── /src
│   ├── /controllers          # Route controllers
│   │   └── tts.controller.js
│   ├── /middlewares          # Auth, validation, etc.
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── validate.js
│   ├── /models               # Data models (if any)
│   ├── /routes               # API endpoints
│   │   ├── tts.js
│   │   └── auth.js
│   ├── /services             # Business logic
│   │   └── azure-tts.js      # Updated to use @microsoft package
│   ├── /utils                # Helpers
│   │   ├── logger.js
│   │   └── errors.js
│   └── app.js                # Main app
├── /tests                    # Comprehensive tests
│   ├── /unit
│   │   ├── auth.test.js
│   │   └── azure-tts.test.js
│   └── /integration
│       └── api.test.js
├── /docs                     # Enhanced documentation
│   ├── API_REFERENCE.md      # Endpoint specs
│   ├── SETUP.md              # Installation guide
│   ├── /screenshots          # Demo images/GIFs
│   └── swagger.json          # Auto-generated OpenAPI spec
├── /github                   # CI/CD workflows
│   └── /workflows
│       └── tests.yml
├── Dockerfile                # Containerization
├── docker-compose.yml        # Multi-container setup
├── .env.example              # Env template
├── .gitignore
├── package.json              # Updated scripts
├── README.md                 # Project overview
└── LICENSE





/tts-api
  ├── /tests
  │   ├── unit/
  │   │   ├── auth.test.js       # Auth middleware tests
  │   │   ├── azure-tts.test.js  # Azure service mock tests
  │   │   └── validate.test.js   # Validation tests
  │   └── integration/
  │       ├── tts-api.test.js    # API endpoint tests
  │       └── auth-api.test.js   # Auth flow tests