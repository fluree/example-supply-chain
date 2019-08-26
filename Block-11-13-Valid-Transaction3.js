/* The following transaction can be done as one or, 
as they are portrayed below, sequentially. */

// Block 11
// Grower adds info to purchaseOrder/grower
// Signed with McDonald's Farm's _auth/id: Tf2hxnc1FzAXtmk8ptwQ5V68zJjfd4tLwXL 
// And private key: 5ce7259de6397b6dbdd727fc62e9a920f41fe3017dbd76cba3f8d0c1f0275113
[{
    "_id": ["purchaseOrder/id", "123"],
    "grower": ["organization/name", "McDonald's Farm"]
}]

// Block 12
// Grower adds info to purchaseOrder/harvestDate and approved
// Signed with McDonald's Farm's _auth/id: Tf2hxnc1FzAXtmk8ptwQ5V68zJjfd4tLwXL 
// And private key: 5ce7259de6397b6dbdd727fc62e9a920f41fe3017dbd76cba3f8d0c1f0275113

[{
    "_id": ["purchaseOrder/id", "123"],
    "harvestDate": "#(now)",
    "approved": [["organization/name", "McDonald's Farm"]]
}]

// Block 13
// Grower creates a shipment and links to purchaseOrder
// Signed with McDonald's Farm's _auth/id: Tf2hxnc1FzAXtmk8ptwQ5V68zJjfd4tLwXL 
// And private key: 5ce7259de6397b6dbdd727fc62e9a920f41fe3017dbd76cba3f8d0c1f0275113

[{
    "_id": ["purchaseOrder/id", "123"],
    "shipments": ["shipment$1"]
},
{
    "_id": "shipment$1",
    "id": "growShip123",
    "name": "123BeanShip",
    "sentBy": ["organization/name", "McDonald's Farm"],
    "sentDate": "#(now)",
    "sentLocation": "McDonLand",
    "itemDescription": "Got the beans harvested!",
    "intendedRecipient": ["organization/name", "The Roastery"],
    "intendedReceiptLocation": "Miami, FL",
    "sentSignature": ["organization/name", "McDonald's Farm"]
}]
