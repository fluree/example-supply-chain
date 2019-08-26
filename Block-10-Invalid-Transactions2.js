/* INVALID TRANSACTIONS
These invalid transactions demonstrate some of the things you CAN'T do at this point in time. 
In an application, you should have a user interface that makes it very easy to perform the
right transactions at the right time. Smart functions prevent a rogue participant from 
intentionally or accidentally going around the allowed steps.  */

// Step 2. Once the cafe is happy with their order, they approve the PO. 

/* Without the cafe's name in purchaseOrder/approved, the following transactions 
cannot be issued: */

// Can't add a grower to the purchaseOrder
// Signed with McDonald's Farm's _auth/id: Tf2hxnc1FzAXtmk8ptwQ5V68zJjfd4tLwXL 
// And private key: 5ce7259de6397b6dbdd727fc62e9a920f41fe3017dbd76cba3f8d0c1f0275113

[{
    "_id": ["purchaseOrder/id", "123"],
    "grower": ["organization/name", "McDonald's Farm"]
}]


// Can't create a shipment
// Signed with Coffee on the Block's _auth/id: Tf2j3SoemdjeTfi8t1CxjaYNmUZpWT3A8RD 
// And private key: 8a9077ab011fb152b5a043abc24c535810b5dd1d87ecd6ace7cb454dd046670b
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
}]