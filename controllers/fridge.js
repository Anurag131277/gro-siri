const Item =require('../models/product');

const Fridge = require('../models/fridge');


//controller method to get item list
exports.getItems=(req, res, next) => {
    //calling static function
   Item.fetchAll()
   .then(([rows,fieldData])=>{
      res.render('item-list', {
        prods: rows,
        pageTitle: 'All Items',
        path: '/viewitems',
        tofridge : false
      });
   })
   .catch(err =>{ console.log(err);});
};

//controller method to get index page
exports.getIndex = (req,res,next)=>{
      res.render('index', {
        pageTitle: 'Gro_SIRI',
        path: '/'
      });
       //calling static function
};

//controller to display add item page
exports.getAddItem = (req,res,next)=>{
  res.render('add-item',{
    pageTitle : 'Add Item',
    path : '/add-item'
  });
};


//controller to add item in AllItems
exports.postAddItem = (req,res,next) =>{
  const title=req.body.title;
  const imageUrl = req.body.imageUrl;
  const price= req.body.price;
  const description =req.body.description;
  const item = new Item(null,title,imageUrl,description,price);
  item.save();
  res.redirect('/');
}

//1.controller method to get fridge items
exports.getFridge = (req,res,next)=>{
    Fridge.getFridge(cart =>{
      Item.fetchAll(products=>{
        const fridgeItems=[];
        for(product of products){
          const fridgeItemData = cart.products.find(prod=> prod.id === product.id);
          if(fridgeItemData){
            let p1 ={productData: product, qty: fridgeItemData.qty};
            fridgeItems.push(p1);
          }
        }        
          res.render('fridge',{
            pageTitle: 'Your Fridge',
            path: '/fridge',
            products: fridgeItems
          }); 
      });
    });
};


//controller to show addtofridge page with all items
exports.addToFridge = (req,res,next) =>{
  Item.fetchAll(products => {
      res.render('item-list',{
      pageTitle: 'Add To Fridge',
      path: '/addtofridge',
      tofridge : true,
      prods: products
    });
  });
};


//controller to add item in fridge
exports.postFridge =(req,res,next)=>{
  const prodId= req.body.productId;
  Item.findById(prodId,(product)=>{
    Fridge.addProduct(prodId,product.price);
  });
  res.redirect('/addtofridge');
};



//controller function to get item details
exports.getItem = (req,res,next)=>{
  const prodId = req.params.productId;
  Item.findById(prodId)
  .then(([rows,fieldData])=>{
    res.render('item-detail',{
      product: rows[0],
      pageTitle: rows.name,
      path:'/products',
      edit:false
    }); 
  })
  .catch(err =>{
    console.log('GET ITEM |error..',err);
  });
};

exports.getEditItem = (req,res,next) =>{
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  //edit the item details and save the changes to Product/Item table/file
  console.log("Logic for GetEditPage here ");
  const prodId= req.body.productId;
  console.log('ProductId:-',prodId);
  Item.findById(prodId, item =>{
    res.render('add-item',{
      product : item,
      pageTitle : 'Edit Item',
      path: '/item-detail',
      edit : true
    });
  });
};