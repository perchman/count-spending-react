module.exports = (req, res) => {
    res.send = (data) => {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data));
    };

    res.sendError = (err) => {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ err: err.message }));
    };
}