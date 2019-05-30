const express = require('express');
const http = require('http');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const port = 3001;

const app = express();

app.use(cors());

const server = http.createServer(app);

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		if (fs.existsSync(`./upload/${file.originalname}`)) {
			const re = /(?:\.([^.]+))?$/;
			const ext = re.exec(file.originalname)[1];
			const filename = `${file.originalname}`.replace(`.${ext}`, '');
			let id = 1;
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
