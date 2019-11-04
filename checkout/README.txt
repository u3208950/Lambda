checkout - This intent is a simple intent. If a user says Yes to adding the item to the cart, then it adds the item to a cart in Dynamo and asks whether they want to 
	   checkout or add another item. If the user says no to adding the item to the cart, then it asks the user whether they want to find another product.

DynamoDB - Store the cart information. We are going to have two Dynamo tables, one for current carts and one for placed orders. 
	   To create these, we need to go onto the AWS console and navigate to the DynamoDB

As we're using the same Lex.confirmIntent function as in productFind, we need to copy the LexResponses.js file.
With the confirmation status dealt with, we can focus on adding the item to the cart. We need to create the handleAddToCart function; 
the first thing that this needs to do is check that we have an itemNumber. This check will be very similar to the checks at the start of our productFind Lambda, 
except a missing itemNumber will trigger confirmIntent on productFind

ID is a string of the conversation ID
Items is a list of itemNumbers
name is a name you can give to your cart to save it
TTL is the time to live for the data

We can ask the user whether they want to add another product, checkout, or save the cart. Unlike when we've asked them whether they want to find another product or add this item to a cart, it isn't a yes/no question. They should answer with I want to checkout, I want to save my cart, or I want to add another item, 
which we will set as example utterances for the checkout, saveCart, and productFind intents.

