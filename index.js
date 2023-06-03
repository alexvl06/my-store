const express = require('express');
const cors = require('cors')
const routerAPI = require('./routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = 3001;
app.use(express.json())
app.use(cors())

routerAPI(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`My port ${port}`);
});
