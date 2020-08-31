const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

mongoose.connect("mongodb+srv://admin-amine:amine1997@cluster0-mdmcw.mongodb.net/todolistDB",{useNewUrlParser:true ,useUnifiedTopology: true});
const itemsSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
});
const itemm=mongoose.model("Item",itemsSchema);
const milk=new itemm({name:"Type your list"});

const defaultItems=[milk];



module.exports = function(app) {
  var today = new Date();
  var options={weekday :'long' ,year:'numeric',month:'long',day:'numeric'}
  var day = today.toLocaleDateString("en-US",options);

  app.get('/', function(req, res) {
    itemm.find(function(err,items) {
      if (items.length==0) {
        itemm.insertMany(defaultItems,function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("done");
          }
          res.redirect('/')
        })
      }else {
        res.render('todo', {
          todos: items,
          day : day
        });
      }
    });
  });

  app.post('/', urlencodedParser, function(req, res) {
    const itema=req.body.item;
    const newitem=new itemm({name:itema.replace(/\-/g," ")});

    newitem.save();
    res.redirect('/');


  });

  app.delete('/:item', function(req, res) {
    itemm.find({name:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data) {
      if (err) {
        console.log(err);
      }else {
        res.json(data);
      }
    })
  });
};
