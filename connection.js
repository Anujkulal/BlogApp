const mongoose = require('mongoose');

async function mongoDBConnection(url) {
    await mongoose.connect(url)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}
module.exports = { mongoDBConnection };