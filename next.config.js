const path = require('path');
// const withOffline = require('next-offline');
const webpack = require('webpack');

require('dotenv').config({
  path: path.resolve(
    __dirname,
    `.env.${process.env.NODE_ENV}`,
  ),
});
