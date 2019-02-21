const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/auth/google', 
    {   changeOrigin: true,
        target: 'http://localhost:5000/' }
    ));
    
    app.use(proxy('/api/*', 
        {   changeOrigin: true,
            target: 'http://localhost:5000/' }
    )); 
    
}