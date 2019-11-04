addtocart- This intent is a simple intent. If a user says Yes to adding the item to the cart, then it adds the item to a cart in Dynamo and asks whether they want 
	   to checkout or add another item. If the user says no to adding the item to the cart, then it asks the user whether they want to find another product.


Lambda Function -  addToCart with an index.js file inside. In this folder, we need to run npm install --save aws-sdk to make sure that we have access to AWS. We start, as normal, with our default node 8.10 function, and there are two things we need to do at the 
start of this function: check whether there is a Denied confirmation status, and call a handleAddToCart function.

Denied confirmation status - To add an item to the user's cart, we need to check whether the user already has a cart. If they don't, the request will error and we need to create a new cart for them.

If the confirmation status is denied, we can ask the user whether they want to find another product, using Lex.confirmIntent.
productFind Lambda to deal with confirmIntent triggers

 

DynamoDB - Store the cart information. We are going to have two Dynamo tables, one for current carts and one for placed orders. 
	   To create these, we need to go onto the AWS console and navigate to the DynamoDB

