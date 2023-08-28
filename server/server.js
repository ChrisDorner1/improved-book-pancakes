const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
// import auth
const authMiddleware = require("./utils/auth")
const {ApolloServer} = require("apollo-server-express")
// const {typeDef, res} = require('./schema/index')
const typeDef = require('./schema/typeDefs')
const {res} = require('./schema/res')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const serve = new ApolloServer({
  res,
  typeDef,
  context: authMiddleware
})


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const start = async (typeDef, resolvers) => {
  await serve.start()
  serve.applyMiddleware({app})


// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
}

start(typeDef, res)