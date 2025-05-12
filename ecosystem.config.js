// ecosystem.config.js
module.exports = {
    apps: [{
      name: 'tts-api',
      script: './src/app.js',
      instances: 2,               // 2 workers for load balancing
      exec_mode: 'cluster',       // Cluster mode
      max_memory_restart: '1.5G', // Prevent memory leaks
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--enable-source-maps --tls-min-v1.2',
      },
      error_file: '/var/log/tts-api/error.log',
      out_file: '/var/log/tts-api/out.log',
      merge_logs: true,
      time: true
    }]
  };