var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;

var rendr       = require('rendr');
var rendrServer = rendr.createServer({
    dataAdapterConfig: {
        default: {
            host: 'api.github.com',
            protocol: 'https'
        }
    }
});

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(rendrServer);
app.listen(port, function () {
    console.log('listening on port %s', port);
});
