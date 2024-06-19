const express = require('express');
const routes = require('./routes');
const { json, urlencoded } = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
