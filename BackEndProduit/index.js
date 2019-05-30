var express = require('express');
var http = require('http');
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');
var port = 3001;

var app = express();

app.use(cors());

var server = http.createServer(app);

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		if (fs.existsSync(`./upload/${file.originalname}`)) {
			let id = 1;
			var re = /(?:\.([^.]+))?$/;
			var ext = re.exec(file.originalname)[1];
			let filename = `${file.originalname}`.replace(`.${ext}`, '');

			while (fs.existsSync(`./upload/${filename}(${id}).${ext}`)) {
				id++;
			}
			file.originalname = `${filename}(${id}).${ext}`;
		}
		callback(null, './upload');
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), function(req, res, next) {
    res.status(200).send('File saved');
});

server.listen(port, () => console.log(`Listening on port ${port}`));
