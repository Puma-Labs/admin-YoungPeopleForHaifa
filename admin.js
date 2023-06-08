const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/admin/f/*', function (req, res) {
    const file = req.path.replace('/admin/f', '')
    res.sendFile(path.join(__dirname, 'build', file));
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
