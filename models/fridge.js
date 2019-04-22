const db = require('../util/database.js');

module.exports = class Fridge{
	/*constructor(){
		this.products =[];
		this.totalPrice=0.0;

	}*/ //1st approach by creating a constructor

	//2nd approach by creating a static function
	static addItem(f_id,i_id){
		return db.execute('INSERT INTO fridge (fridge_id, item_id) values (?,?)',[f_id,i_id]);
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

	static getFridge(id){
		return db.execute('SELECT * from fridge WHERE fridge_id = ?',[id]);
	}

};

/*
	Object Spread Operator- Next Gen javaScript---
	updatedProduct = {...existingProduct}
*/