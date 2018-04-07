var express = require('express');
var router = express.Router();
// click on view source icon to copy code.
class Block{
  constructor(index, data, prevHash){
    this.index = index;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.data = data;
    this.prevHash = prevHash;
  }
  getHash(){
    return sha(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
  }
}

class BlockChain{
  constructor(){
    this.chain = [];
  }
  addBlock(data){
    let index = this.chain.length;
    let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
    let block = new Block(index, data, prevHash);

    this.chain.push(block);
  }
  chainIsValid(){

    for(var i=0;i<this.chain.length;i++){

      if(this.chain[i].hash !== this.chain[i].getHash())
        return false;

      if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
        return false;
    }

    return true;
  }
}

const CILCoin = new BlockChain();

router.get('/diagnosis', function(req, res, next) {
  var data = CILCoin.chain;
  console.log(data);

  res.render('diagnosis', { title: 'Express' ,data:data});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  CILCoin.addBlock({name: "Hemant H Kumar", doctor: "Shubham Chaudhary", amount: 100, symptoms:["Cough","Sneezing","Runny Nose"], diagnosis: ["Common Cold"]});
  CILCoin.addBlock({name: "Hemant H Kumar", doctor: "Shubham Chaudhary", amount: 100, symptoms:["Fever","Weakness","Joint Pain","Low Appetite","Profuse Vomiting"], diagnosis: ["Malaria","AIDS"]});
  CILCoin.addBlock({name: "Hemant H Kumar", doctor: "Shubham Chaudhary", amount: 100, symptoms:["Low Platelet Count","Diarrhoea"], diagnosis: ["Dengue"]});
  console.log(JSON.stringify(CILCoin, null, 4));
  res.render('index', { title: 'Express' });
});

router.post('/submit',(req,res,next)=>{
  var data = req.body;
  CILCoin.addBlock(data);
  console.log(JSON.stringify(CILCoin, null, 7));
res.redirect('/diagnosis');
});

module.exports = router;
