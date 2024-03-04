const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  
  .get('/', (req, res) => res.render('pages/index'))
  
  .post("/new_contact", function(req, res) { 

  console.log(req.body);
    
    var notification = req.body["soapenv:envelope"]["soapenv:body"][0]["notifications"][0]; var sessionId = notification["sessionid"][0]; var data = {}; if (notification["notification"] !== undefined) { var sobject = notification["notification"][0]["sobject"][0]; Object.keys(sobject).forEach(function(key) { if (key.indexOf("sf:") == 0) { var newKey = key.substr(3); data[newKey] = sobject[key][0]; } }); } res.status(201).end(); })
  
  
  
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
