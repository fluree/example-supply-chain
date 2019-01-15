/* The following transaction can be done as one or, 
as they are portrayed below, sequentially. */

// Block 11
// Grower adds info to purchaseOrder/grower

[{
    "_id": ["purchaseOrder/id", "123"],
    "grower": ["organization/name", "McDonald's Farm"]
},
{
    "_id": "_tx",
    "auth": "mcDonaldsFarm"
}]

// Block 12
// Grower adds info to purchaseOrder/harvestDate and approved

[{
    "_id": ["purchaseOrder/id", "123"],
    "harvestDate": "#(now)",
    "approved": [["organization/name", "McDonald's Farm"]]
},
{
    "_id": "_tx",
    "auth": "mcDonaldsFarm"
}]

// Block 13
// Grower creates a shipment and links to purchaseOrder

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
},
{
    "_id": "_tx",
    "auth": "mcDonaldsFarm"
}]
