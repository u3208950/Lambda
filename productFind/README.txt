productFind - This intent will deal with users who want to find a product to add to their cart, as well as users just 
checking the stock levels.

S3 is used store data and check the stock levels of the item requested.

Used slot types are

type - custom slot type
size - custom slot type
length - custom slot type
colour - custom slot type
itemNumber - Built in slot type - AMAZON.NUMBER


handleProductFind - Start by checking the slot values. The first one to check is itemNumber, because if that one is present, we don't need any of the other slots. 
		    After that, we check the type, size, and color before finally checking the length if the slot type.

Denied Condition - If there is stock, it will ask the user whether they want to add it to their cart. 
		   If there's no stock, it will tell the user and ask whether they want to find another product.
