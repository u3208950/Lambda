getSavedCart -  Retrieving a saved cart

Sample utterances are below
1) I want to get cart { cartName }
2) get my cart
3) I want to get my saved cart


User can save their cart, we need to give them a way to get the cart that they saved. We can then change the cart so that it matches their userId, 
and then they can continue to add more items or checkout.

Create a new getSavedCart intent in Lex, and we're only going to be asking for the cartName of the cart they saved. As we did in the saveCart intent, we can set 
the cartName slot type to AMAZON.Musician to allow any values through. We can also set this slot to be required and have a prompt of "What was the name you saved your cart to?".

Lambda Function -  Lambda is to get our userId, slots, and our cartName slot. We can then check that we have a cartName or ask the user for it

const handleGetSavedCart = event => {
    let { userId, currentIntent: { slots } } = event;
    let { cartName } = slots;

    if (!cartName) {
        let message = `What name did you save your cart as?`;
        let intentName = 'getSavedCart';
        let slotToElicit = 'cartName';
        let slots = { cartName: null };
        return Lex.elicitSlot({ intentName, slots, slotToElicit, message });
    }
}


Slot types

cartName - Custome or User define slot
userId - Built-in function 

DB.get - Different gets an array of matching carts, which is why we're looking for carts[0]. We also need to extract our cart by adding  error-handler.

elicitIntent  - we can try to get the cart with that name. If we can't get a cart with that name, then we need to ask whether they want to try another name or start a new cart. 

