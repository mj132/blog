const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk')
const blog = express();
blog.use(express.static(path.resolve(__dirname, './dist')))

blog.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
blog.listen(6666, res => {
  console.log(chalk.green('Start Service On 6666'));
});