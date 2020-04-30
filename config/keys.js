dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

module.exports = {
    mongoURI: 'mongodb://erickmgongo:lenovot61@myfullstack-shard-00-00-udupi.mongodb.net:27017,myfullstack-shard-00-01-udupi.mongodb.net:27017,myfullstack-shard-00-02-udupi.mongodb.net:27017/test?ssl=true&replicaSet=myfullstack-shard-0&authSource=admin&retryWrites=true&w=majority'
};
