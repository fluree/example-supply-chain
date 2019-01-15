// Roaster receives shipments, updates and approves purchase order, 
// sends out new shipment

[{
    "_id": ["shipment/id", "growShip124"],
    "receivedSignature": ["organization/name", "The Roastery"]
},
{
    "_id": ["shipment/id", "growShip125"],
    "receivedSignature": ["organization/name", "The Roastery"]
},
{
    "_id": ["shipment/id", "growShip126"],
    "receivedSignature": ["organization/name", "The Roastery"]
},
{
    "_id": ["shipment/id", "growShip127"],
    "receivedSignature": ["organization/name", "The Roastery"]
},
{
    "_id": ["shipment/id", "growShip128"],
    "receivedSignature": ["organization/name", "The Roastery"]
},
{
    "_id": ["purchaseOrder/id", "124"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(+ (now) 90000)",
    "approved": [["organization/name", "The Roastery"]],
    "shipments": [{
        "_id": "shipment",
        "id": "roasterShip124",
        "name": "124RoastShip",
        "sentBy": ["organization/name", "The Roastery"],
        "sentDate": "#(+ (now) 95000)",
        "sentLocation": "Miami, FL",
        "itemDescription": "Got the beans roasted!",
        "intendedRecipient": ["organization/name", "Coffee on the Block"],
        "intendedReceiptLocation": "Portland, OR",
        "sentSignature": ["organization/name", "The Roastery"]
    }]
},
{
    "_id": ["purchaseOrder/id", "125"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(+ (now) 100000)",
    "approved": [["organization/name", "The Roastery"]],
    "shipments": [{
        "_id": "shipment",
        "id": "roasterShip125",
        "name": "125RoastShip",
        "sentBy": ["organization/name", "The Roastery"],
        "sentDate": "#(+ (now) 105000)",
        "sentLocation": "Miami, FL",
        "itemDescription": "Got the beans roasted!",
        "intendedRecipient": ["organization/name", "Salem Slurps"],
        "intendedReceiptLocation": "Portland, OR",
        "sentSignature": ["organization/name", "The Roastery"]
    }]
},
{
    "_id": ["purchaseOrder/id", "126"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(+ (now) 110000)",
    "approved": [["organization/name", "The Roastery"]],
    "shipments": [{
        "_id": "shipment",
        "id": "roasterShip126",
        "name": "126RoastShip",
        "sentBy": ["organization/name", "The Roastery"],
        "sentDate": "#(+ (now) 115000)",
        "sentLocation": "Miami, FL",
        "itemDescription": "Got the beans roasted!",
        "intendedRecipient": ["organization/name", "The Encrypted Cup"],
        "intendedReceiptLocation": "Portland, OR",
        "sentSignature": ["organization/name", "The Roastery"]
    }]
},
{
    "_id": ["purchaseOrder/id", "127"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(+ (now) 120000)",
    "approved": [["organization/name", "The Roastery"]],
    "shipments": [{
        "_id": "shipment",
        "id": "roasterShip127",
        "name": "127RoastShip",
        "sentBy": ["organization/name", "The Roastery"],
        "sentDate": "#(+ (now) 125000)",
        "sentLocation": "Miami, FL",
        "itemDescription": "Got the beans roasted!",
        "intendedRecipient": ["organization/name", "Salem Slurps"],
        "intendedReceiptLocation": "Portland, OR",
        "sentSignature": ["organization/name", "The Roastery"]
    }]
},
{
    "_id": ["purchaseOrder/id", "128"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(+ (now) 130000)",
    "approved": [["organization/name", "The Roastery"]],
    "shipments": [{
        "_id": "shipment",
        "id": "roasterShip128",
        "name": "128RoastShip",
        "sentBy": ["organization/name", "The Roastery"],
        "sentDate": "#(+ (now) 135000)",
        "sentLocation": "Miami, FL",
        "itemDescription": "Got the beans roasted!",
        "intendedRecipient": ["organization/name", "Coffee on the Block"],
        "intendedReceiptLocation": "Portland, OR",
        "sentSignature": ["organization/name", "The Roastery"]
    }]
},
{
    "_id": "_tx",
    "auth": "roastery"
}]
