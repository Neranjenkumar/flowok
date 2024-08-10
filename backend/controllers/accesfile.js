const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongoURI = 'your-mongodb-uri';

let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

exports.getFile = (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'No file exists' });
        }

        // Check if the file is an image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ message: 'Not an image' });
        }
    });
};
