import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import routes from './routes';
import path from 'path';

db.connect();


const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

// use cors => 因為跨port資料
// use express.json() => 資料用json 傳輸
// use bodyParser.json() => decode req.body => it is json file
if (process.env.NODE_ENV === "development") {
  app.use(cors());
 }

app.use(express.json());
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);