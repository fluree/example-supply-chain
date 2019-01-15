// Grower fills all purchase orders, and ships them out

[{
    "_id": ["purchaseOrder/id", "124"],
    "grower": ["organization/name", "McDonald's Farm"],
    "harvestDate": "#(+ (now) 10000)",
    "approved": [["organization/name", "McDonald's Farm"]],
    "shipments": [{
        "_id": "shipment",
        "id": "growShip124",
        "name": "124BeanShip",
        "sentBy": ["organization/name", "McDonald's Farm"],
        "sentDate": "#(+ (now) 15000)",
        "sentLocation": "McDonLand",
        "itemDescription": "Got the beans harvested!",
        "intendedRecipient": ["organization/name", "The Roastery"],
        "intendedReceiptLocation": "Miami, FL",
        "sentSignature": ["organization/name", "McDonald's Farm"]
    }]
},
{
    "_id": ["purchaseOrder/id", "125"],
    "grower": ["organization/name", "McDonald's Farm"],
    "harvestDate": "#(+ (now) 20000)",
    "approved": [["organization/name", "McDonald's Farm"]],
    "shipments": [{
        "_id": "shipment",
        "id": "growShip125",
        "name": "125BeanShip",
        "sentBy": ["organization/name", "McDonald's Farm"],
        "sentDate": "#(+ (now) 25000)",
        "sentLocation": "McDonLand",
        "itemDescription": "Got the beans harvested!",
        "intendedRecipient": ["organization/name", "The Roastery"],
        "intendedReceiptLocation": "Miami, FL",
        "sentSignature": ["organization/name", "McDonald's Farm"]
    }]
},
{
    "_id": ["purchaseOrder/id", "126"],
    "grower": ["organization/name", "McDonald's Farm"],
    "harvestDate": "#(+ (now) 30000)",
    "approved": [["organization/name", "McDonald's Farm"]],
    "shipments": [{
        "_id": "shipment",
        "id": "growShip126",
        "name": "126BeanShip",
        "sentBy": ["organization/name", "McDonald's Farm"],
        "sentDate": "#(+ (now) 35000)",
        "sentLocation": "McDonLand",
        "itemDescription": "Got the beans harvested!",
        "intendedRecipient": ["organization/name", "The Roastery"],
        "intendedReceiptLocation": "Miami, FL",
        "sentSignature": ["organization/name", "McDonald's Farm"]
    }]
},
{
    "_id": ["purchaseOrder/id", "127"],
    "grower": ["organization/name", "McDonald's Farm"],
    "harvestDate": "#(+ (now) 40000)",
    "approved": [["organization/name", "McDonald's Farm"]],
    "shipments": [{
        "_id": "shipment",
        "id": "growShip127",
        "name": "127BeanShip",
        "sentBy": ["organization/name", "McDonald's Farm"],
        "sentDate": "#(+ (now) 45000)",
        "sentLocation": "McDonLand",
        "itemDescription": "Got the beans harvested!",
        "intendedRecipient": ["organization/name", "The Roastery"],
        "intendedReceiptLocation": "Miami, FL",
        "sentSignature": ["organization/name", "McDonald's Farm"]
    }]
},
{
    "_id": ["purchaseOrder/id", "128"],
    "grower": ["organization/name", "McDonald's Farm"],
    "harvestDate": "#(+ (now) 50000)",
    "approved": [["organization/name", "McDonald's Farm"]],
    "shipments": [{
        "_id": "shipment",
        "id": "growShip128",
        "name": "128BeanShip",
        "sentBy": ["organization/name", "McDonald's Farm"],
        "sentDate": "#(+ (now) 55000)",
        "sentLocation": "McDonLand",
        "itemDescription": "Got the beans harvested!",
        "intendedRecipient": ["organization/name", "The Roastery"],
        "intendedReceiptLocation": "Miami, FL",
        "sentSignature": ["organization/name", "McDonald's Farm"]
    }]
},
{
    "_id": "_tx",
    "auth": "mcDonaldsFarm"
}]