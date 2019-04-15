/*module.exports = function Product(){

}*/
const Fridge= require('./fridge');
const db= require('../util/database');

module.exports = class Item{

	constructor(id,name,imageUrl,dop,expire_after){
		this.item_id=id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.date_of_purchase = dop;
		this.expire_after = expire_after;
	}

	save(){ //function/method
		
		//products.push(this);
	}

	static deleteById(id){
		
	}
	static fetchAll(){ //static to call the method on the class and not on the Instance
		return db.execute('SELECT * FROM items');
		//return Promise 
	}

	//use promise and not callbacks
	static findById(id){ 
		return db.execute('SELECT * from items WHERE item_id='+id);
	}



}