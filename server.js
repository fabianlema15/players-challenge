const port = process.env.PORT || 3000;
const app = require('./app');

// start app
app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', `app listening on port ${port}...`);
    console.log('\x1b[33m%s\x1b[0m', `Open http://localhost:${port}/ in your browser`);
});