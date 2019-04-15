/*module.exports = function Product(){

}*/
const Fridge= require('./fridge');
const db= require('../util/database');

module.exports = class Item{

	constructor(id,name,imageUrl,dop,expire_after){
		this.item_id=id;
		this.itemName = name;
		this.imageUrl = imageUrl;
		this.date_of_purchase = dop;
		this.expire_after = expire_after;
	}

	save(){ //function/method
		if(this.id){
			console.log('Inside Save Update data');
			db.execute('')
		}else{
			return db.execute('INSERT INTO items (name,imageurl,date_of_purchase,expire_after) VALUES (?,?,?,?)',
			[this.itemName,this.imageUrl,this.date_of_purchase,this.expire_after]
			);
		}
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
		return db.execute('SELECT * from items WHERE item_id = ?',[id]);
	}



}