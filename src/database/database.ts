import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/auth',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('database is connected'))
    .catch(err => console.error(err));

