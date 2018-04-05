import express from 'express';
import path from 'path';
import open from 'open';
import compression from "compression";
import bodyParser from "body-parser";
import apiRoutes from "./apiRoutes";

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static("dist"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes.hook());

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
