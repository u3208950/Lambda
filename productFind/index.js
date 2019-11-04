const lex = require('./LexResponses');
const Lex = new lex();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


exports.handler = async (event) => {
    if (event.currentIntent && event.currentIntent.confirmationStatus) {
        let confirmationStatus = event.currentIntent.confirmationStatus;
        if (confirmationStatus == "Denied") {
            console.log('got denied status');
            let message = `Thank you for shopping with us today. Have a nice day`
            return Lex.close({ message })
        }
        if (confirmationStatus == 'Confirmed') {
            console.log('got confirmed status');
        }
    }
    return handleProductFind(event);
}

const handleProductFind = event => {
    let { slots } = event.currentIntent;
    let { itemNumber, type, cost, brand, colour } = slots;

    if (itemNumber) return getItem(slots);
    // No item number so using normal product find
    if (!type) {
        let message = 'Are you looking for a frames, glassLens or eyeLens?';
        let intentName = 'productFind';
        let slotToElicit = 'type';
        return Lex.elicitSlot({ message, intentName, slotToElicit, slots })
    }
    if (!cost) {
        let message = `What cost of ${type} are you looking for?`;
        let intentName = 'productFind';
        let slotToElicit = 'cost';
        return Lex.elicitSlot({ message, intentName, slotToElicit, slots })
    }
    if (!brand) {
        let message = 'What brand would you like?';
        let intentName = 'productFind';
        let slotToElicit = 'brand';
        return Lex.elicitSlot({ message, intentName, slotToElicit, slots })
    }
    if (!colour && type === 'eyeLens') {
        let message = 'Are you looking for green, brown or grey eyeLens?';
        let intentName = 'productFind';
        let slotToElicit = 'colour';
        return Lex.elicitSlot({ message, intentName, slotToElicit, slots })
    }

    return getItem(slots);
}

const getItem = async slots => {
    console.log('slots', slots);
    let { itemNumber, type, cost, brand, colour } = slots;
    let stock = await getStock();
    let matching = stock.find(item =>
        itemNumber === item.itemNumber ||
        type == item.type &&
        cost == item.cost &&
        brand == item.brand &&
        (item.colour == colour || item.type != 'eyeLens'));
    if (matching.colour !== 1) {
         let message = `Unfortunately we couldn't find the item you were looking for`;
        return Lex.close({ message })
    }
            
    if (!matching) {
        let message = `Unfortunately we couldn't find the item you were looking for`;
        return Lex.close({ message })
    }
    if (matching.stock < 1) {
          let message = `Unfortunately we couldn't find the item you were looking for`;
        return Lex.close({ message })
    }
    
    let item = matching[0];
    if (item.stock < 1) {
        let message = `Unfortunately we don't have anything matching your request in stock. Would you like to search again?`;
        let intentName = 'productFind';
        slots = { type: null, cost: null, brand: null, colour: null, itemNumber: null };
        return Lex.confirmIntent({ intentName, slots, message })
    }
    
    let message = `There are ${item.stock} ${item.brand} ${units(item.type, item.stock)} in stock. Would you like to add one to your basket?`;
    let responseCard = Lex.createCardFormat([{
        title: `${cost}, ${brand}${type === 'contactLens' ? ', ' + colour : ''}${type}`,
        subTitle: `${item.stock} in stock`,
        imageUrl: item.imageUrl,
        buttons: [{ text: 'Add to Cart', value: 'Yes' }, { text: 'Not Now', value: 'No' }]
    }]);
    
    
    
    
    let intentName = 'addToCart';
    slots = { itemNumber: matching.itemNumber };
    return Lex.confirmIntent({ intentName, slots, message });
}

const units = (type, stock) => {
    if (type === 'eyeLens') {
        return `pair${stock === 1 ? 's': ''} of eyeLens`
    }
    return `${type}${stock === 1 ? 's': ''}`;
}

const getStock = () => {
    var params = {
        Bucket: 'shoppingstock',
        Key: `stock.json`
    };

    return new Promise((resolve, reject) => {
        s3.getObject(params, function(err, data) {
            if (err) { // an error occurred
                reject(err)
            } else { // successful response
                resolve(JSON.parse(data.Body).stock)
            }
        });
    })
}