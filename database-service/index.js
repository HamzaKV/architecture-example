const port = 5000;
const Strings = require('./constants/Strings');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./routes/user');
const bugRouter = require('./routes/bug');

app.use(Strings.routes.user.root, userRouter);
app.use(Strings.routes.bug.root, bugRouter);

app.listen(port, () => console.log(`Now listening on http://localhost:${port}`));