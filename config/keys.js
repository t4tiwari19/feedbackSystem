// figure out which enviroment related keys to use
if( process.env.NODE_ENV === 'production'){

    // we are in the production environment - Return the prod credential keys
    module.exports =  require('./prod');
} else {
     // we are in the development environment - Return the development credential keys
     module.exports =  require('./dev');
}