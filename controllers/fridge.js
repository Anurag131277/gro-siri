const Item =require('../models/product');

const Fridge = require('../models/fridge');

/*const dateFormat = require('dateformat');
var day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");*/


//controller method to get item list
exports.getItems=(req, res, next) => {
    //calling static function
   Item.fetchAll()
   .then(([rows])=>{
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
    path : '/add-item',
    editing : false
  });
};


//controller to add item in AllItems
exports.postAddItem = (req,res,next) =>{
  //console.log("Inside Post add item");
  const name=req.body.itemName;
  const imageUrl = req.body.imageUrl;
  const dof= req.body.dof;
  const expire_after =req.body.expire_after;
  const item = new Item(null,name,imageUrl,dof,expire_after);
  item.save()
  .then( ()=> {
    res.redirect('/');
  })
  .catch(err =>{
    console.log("Post Add Item | Error",err);
  });
}

//1.controller method to get fridge items

exports.getFridge = (req,res,next) => {
  const Fid= 1;
  FridgeItemData=[];
  Fridge.getFridge(Fid)
  .then(([rows])=>{
    const FridgeItems=[];
    for(row of rows){
      FridgeItems.push(row.item_id);
    }
    //console.log('FridgeItems-',FridgeItems);

    Item.fetchAll()
    .then(([rows])=>{
      //console.log(rows);
      for(product in rows){
        //console.log('product-',rows[product]);
        if(FridgeItems.includes(rows[product].item_id)){
          FridgeItemData.push(rows[product]);
        }
      }
     // console.log('Fridge Item Data',FridgeItemData);
      res.render('fridge',{
        pageTitle: 'Your Fridge',
        path: '/fridge',
        products: FridgeItemData
      }); 
    });
  })
  .catch(err=>{
    console.log("GET FRIDGE ERR---",err);
  });
};


//controller to show addtofridge page with all items
exports.addToFridge = (req,res,next) =>{
  Item.fetchAll()
  .then(([rows])=>{
    res.render('item-list',{
      pageTitle: 'Add To Fridge',
      path: '/addtofridge',
      tofridge : true,
      prods: rows
    })
  })
  .catch(err=>{
    console.log("Fetch | AddtoFridge Error",err);
  })
};


//controller to add item in fridge
exports.postFridge =(req,res,next)=>{
  let prodId= req.body.productId;
  prodId = parseInt(prodId);
  const FridgeId = 1;
  let isAdd= false;
  let products = [];
  console.log('PRODUCT ID-',prodId);
  Fridge.getFridge(FridgeId)
  .then(([rows]) =>{
    for(i in rows){
      let prod = rows[i];
      products.push(prod.item_id);
    }
    let isAdd = products.includes(prodId);
    console.log('Item Present in fridge?=',isAdd);
    if(!isAdd){
      Fridge.addItem(FridgeId,prodId)
    }
  })
  .then(()=>{
       console.log('Add item to fridge successfull...');
       res.redirect('/fridge');
      })
  .catch(err=>{
    console.log('Err-',err);
  });
 
};



//controller function to get item details
exports.getItem = (req,res,next)=>{
  const prodId = req.params.productId;
  Item.findById(prodId)
  .then(([rows])=>{
    res.render('item-detail',{
      product: rows[0],
      pageTitle: rows[0].name,
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
    return res.redirect('/');
  }
  //console.log('req-',req.params);
  const prodId = req.params.productId;
  
  Item.findById(prodId)
  .then(([rows,fieldData])=>{
    
    const date_x= new Date(rows[0].date_of_purchase);
    temp=date_x.toISOString().split('T')[0];
   rows[0].date_of_purchase = temp;
    res.render('add-item',{
      pageTitle : 'Edit Item | '+rows[0].name,
      path: '/edit-item',
      product: rows[0],
      editing : editMode
    });
  })
  .catch((err)=>{ console.log('findbyId ERROR',err);});
   
};

exports.postEditItem = (req,res,next)=>{
  console.log('Inside post Edit item');
  //console.log(req.body);
  let itemId= req.body.item_id;
  let itemName=req.body.itemName;
  let imageUrl = req.body.imageUrl;
  let dof = req.body.dof;
  let expire_after = req.body.expire_after;
//console.log('POST DATA');
//console.log(itemId,itemName,imageUrl,dof,expire_after);
    Item.findById(itemId)
    .then(([rows])=>{
      if(rows[0].item_id == itemId){
        dof = new Date(dof);
        expire_after = parseInt(expire_after);
        //console.log("Formatted Date--",dof);
        //console.log("Formatted ExpireAfter---",expire_after);

        //console.log("ITEM ID found in DB-- Updating the Product--OLD DATA",rows);
        const newItem = new Item(rows[0].item_id,itemName,imageUrl,dof,expire_after);
        //console.log('NEW DATA----',newItem.itemName,newItem.imageUrl,newItem.date_of_purchase,newItem.expire_after);
        newItem.save()
      }else{
        console.log("NO ITEm ID found");
      }
    })
    .then(() =>{
        console.log("Item Edit successfull");
        return res.redirect('/');
      })
    .catch(err=>{
      console.log("ERROR | FETCH By ID | Editsave---",err);
    });


};