/* INVALID TRANSACTIONS
These invalid transactions demonstrate some of the things you CAN'T do at this point in time. 
In an application, you should have a user interface that makes it very easy to perform the
right transactions at the right time. Smart functions prevent a rogue participant from 
intentionally or accidentally going around the allowed steps.  */

// Step 2. Once the cafe is happy with their order, they approve the PO. 

// Doesn't work, purchaseOrder not signed yet

[{
    "_id": ["purchaseOrder/id", "123"],
    "grower": ["organization/name", "McDonald's Farm"]
},
{
    "_id": "_tx",
    "auth": "mcDonaldsFarm"
}]


// Step 1.5 Cafe Needs to Sign PurchaseOrder

[{
    "_id": ["purchaseOrder/id", "123"],
    "approved": [["organization/name", "Coffee on the Block"]]
},
{
    "_id": "_tx",
    "auth": "coffeeOnTheBlock"
}]

// 

[{
    "_id": "shipment$1",
    "id": "growShip123",
    "name": "123BeanShip",
    "sentBy": ["organization/name", "McDonald's Farm"],
    "sentDate": "#(now)",
    "sentLocation": "McDonLand",
    "itemDescription": "Got the beans harvested!",
    "intendedRecipient": ["organization/name", "The Roastery"],
    "intendedReceiptLocation": "Miami, FL"
},
{
    "_id": ["purchaseOrder/id", "123"],
    "shipments": ["shipment$1"]
},
{
    "_id": "_tx",
    "auth": "mcDonaldsFarm"
}]