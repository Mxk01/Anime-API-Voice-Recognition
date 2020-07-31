let router = require('express').Router();
const fetch = require('node-fetch');

router.get('/',(req,res)=>{
res.render('main');
  })


module.exports = router;
