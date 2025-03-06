const express = require('express');
const saticRouter = require('./routes/staticRouter');
const PORT = 3000;
const app = express();

app.use(saticRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})