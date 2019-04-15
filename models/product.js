/*module.exports = function Product(){

}*/
const fs= require('fs');
const path= require('path');

const Fridge= require('./fridge');


const p=path.join(
			path.dirname(process.mainModule.filename),
			'data',
			'products.json'
			);

const getProductsFromFile = (cb)=>{
		fs.readFile(p,(err,filecontent)=>{
			if(err){
				return cb([]);
			}
			cb(JSON.parse(filecontent));
		});
}
module.exports = class Product{

	constructor(id,title,imageUrl,description,price){
		this.id=id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save(){ //function/method
		
		getProductsFromFile(products => {
			if(this.id){
				console.log('updating existing product...');
				const existingProductIndex = products.findIndex(prod=>prod.id === this.id);
				const updatedProducts= [...products];
				updatedProducts[existingProductIndex]= this;
				fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
					console.log('writeError: '+err);
				});
			}else{
				console.log('Creating new Product...');
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(p,JSON.stringify(products),(err)=>{
					console.log('writeError: '+err);
				});
			}
		});
		//products.push(this);
	}

	static deleteById(id){
		getProductsFromFile(products =>{
			const product = products.find(prod => prod.id === id );
			const updatedProducts = products.filter( prod=> prod.id !== id);
			fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
				if(!err){ //remove product from cart
					console.log('no error... Updating cart');
					Fridge.deleteProduct(id,product.price);
				}
			});
		});
	}
	static fetchAll(cb){ //static to call the method on the class and not on the Instance
		getProductsFromFile(cb);
	}

	static findById(id,cb){
		getProductsFromFile(products =>{
			const product = products.find(p => p.id === id );
			cb(product);
		});
	}



}