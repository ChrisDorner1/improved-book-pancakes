const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const authMiddleware = require("./utils/auth")
const {ApolloServer} = require("apollo-server-express")
const {typeDefs, res} = require('./schema/index')


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const serve = new ApolloServer({
  typeDefs,
  res,
  context: authMiddleware
})


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const startSever = async (typeDefs, res) => {
  await serve.start()
  serve.applyMiddleware({app})

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
}
console.log()
startSever(typeDefs, res)