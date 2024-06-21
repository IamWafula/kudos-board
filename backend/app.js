require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const cors = require('cors');

// cors stuff
app.use(cors());
app.use(express.json());

const filterRoutes = require('./routes/filter-routes.js');
const boardRoutes = require('./routes/board-routes.js');
const cardRoutes = require('./routes/card-routes.js');
const commentRoutes = require('./routes/comment-routes.js');
const userRoutes = require('./routes/user-routes.js');


// error handling
const { NotFoundError, ExistingUserError } = require('./middleware/CustomErrors.js');


const req = require('express/lib/request.js');



app.get('/', (req, res) => {
    res.send('Hello World, getting all boards work');
});


// routes
app.use('/filter', filterRoutes);
app.use('/board', boardRoutes);
app.use('/cards', cardRoutes);
app.use('/comments', commentRoutes);
app.use('/users',userRoutes);

// error handling
app.use((req, res, next) => {
  next(new NotFoundError());
});


app.use((err, req, res, next) => {
    if (err instanceof NotFoundError) {
      return res.json({ error: err.message });
    } else if (err instanceof ExistingUserError) {
      return res.json({ error: err });
    } else {
      return res.json({ error: 'Something went wrong!' });
    }

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
