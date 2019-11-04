SaveCart - At the end of the addToCart intent, we ask the user whether they want to add another product, save your cart, or checkout. We need to handle the utterances that the user might say to save their cart. Add utterances such assave my cartandI want to save my cart for later.
	   Thecartandbasket words are very similar in meaning, so add some utterances.

slot types - 

cartName - with a slot type of AMAZON.Musician and a prompt of What name would you like to save your cart as?. Using a slot type of Musician might seem strange, but this slot type allows any value to be accepted, thereby allowing users to name their basket whatever they want. We can set the cartName slot to be required, 
	 as we'll always need a name to save the cart as.

Lambda - saveCart, with an index.js file in it. In that index.js file, we're going to start, as normal, with the node 8.10 async handler. We know that we are going to be using Lex responses and accessing dynamo, so we add those files and require them into our index.js

Dynamo -  DB.get using the cartName instead of the ID. To get this working, we need to index our table by cartName. Creating an index for a key allow us to search by the values. This is also why we set the default name for a cart to uuidv4(). Because we can search by the name, it needs to be unique.