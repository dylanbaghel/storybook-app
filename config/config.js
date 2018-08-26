const env = process.env.NODE_ENV || 'development';
console.log('env ********* ', env);

if (env === 'development') {
    process.env.PORT = 8100;
    process.env.MONGO = 'mongodb://localhost:27017/StorybookApp';
} else if (env === 'production') {
    process.env.MONGO = 'mongodb://dylan:dylananya2692@ds133252.mlab.com:33252/storybook-app'
}