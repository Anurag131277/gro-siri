const fs= require('fs');

const path=require('path');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'fridge.json'
	);


module.exports = class Fridge{
	/*constructor(){
		this.products =[];
		this.totalPrice=0.0;

	}*/ //1st approach by creating a constructor

	//2nd approach by creating a static function
	static addProduct(id,productPrice){
		//Fetch the provious Fridge(from file)
		fs.readFile(p,(err,fileContent)=>{
			let fridge= {products:[], totalPrice: 0.0};
			if(!err){ //create new cart
				fridge = JSON.parse(fileContent);
			}
			//Analyze the Fridge => Find existing products
			const existingProductIndex=fridge.products.findIndex(prod=> prod.id === id);
			const existingProduct= fridge.products[existingProductIndex];
			let updatedProduct;
			//Add new product/increase quantity
			if(existingProduct){
				updatedProduct = {...existingProduct};
				updatedProduct.qty = updatedProduct.qty+1;
				fridge.products=[...fridge.products];
				fridge.products[existingProductIndex] =updatedProduct;
			}else{
				updatedProduct = {id:id , qty: 1};
				fridge.products = [...fridge.products,updatedProduct];
			}
			fridge.totalPrice=fridge.totalPrice+ +productPrice;
			fs.writeFile(p,JSON.stringify(fridge),err =>{
				if(err)
					console.log('Error writing to Cart...',err);
			});
		});
	}

	static deleteProduct(id,productPrice){
		fs.readFile(p,(err,fileContent)=>{
			if(err){
				return;
			}
			console.log('Delete product cart');
			//let cart = JSON.parse(fileContent);
			const updatedFridge={...JSON.parse(fileContent) };
			console.log('Updated Fridge: '+updatedFridge);
			const updatedProducts = updatedFridge.products;

			const product = updatedProducts.find(prod => prod.id === id);
			const productQty = product.qty;
			updatedFridge.products = updatedProducts.filter(prod => prod.id !== id);
			updatedFridge.totalPrice = updatedFridge.totalPrice - productPrice*productQty;
			fs.writeFile(p,JSON.stringify(updatedFridge),err=>{
				console.log('Update Fridge Error:',err);
			});
		});

	}

	static getFridge(cb){
		fs.readFile(p,(err,fileContent)=>{
			const fridge = JSON.parse(fileContent);
			if(err){
				cb(null);
			}else{
				cb(fridge);
			}
		});
	}


};

/*
	Object Spread Operator- Next Gen javaScript---
	updatedProduct = {...existingProduct}
*/