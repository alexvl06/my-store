const express = require('express');
const cors = require('cors')
const routerAPI = require('./routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT|3001;
app.use(express.json())
app.use(cors())

app.get('/api', (req,res)=>{
  res.send('Hi, this is my server in Express')
})

routerAPI(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`My port ${port}`);
});
