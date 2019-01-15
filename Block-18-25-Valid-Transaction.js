/* Some of the following transaction can be done combined, 
but they are portrayed separately here for clarity. */

// Block 18
// Roaster signs for the package.
[{
    "_id": ["shipment/id", "growShip123"],
    "receivedSignature": ["organization/name", "The Roastery"]
},
{
    "_id": "_tx",
    "auth": "roastery"
}]

// Block 19
// Roaster adds info to purchaseOrder/roaster, /roastDate, and /approved

[{
    "_id": ["purchaseOrder/id", "123"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(now)",
    "approved": [["organization/name", "The Roastery"]]
},
{
    "_id": "_tx",
    "auth": "roastery"
}]

// Block 21
// Roaster creates shipment

[{
    "_id": ["purchaseOrder/id", "123"],
    "shipments": [{
        "_id": "shipment",
        "id": "roasterShip123",
        "name": "123RoastShip",
        "sentBy": ["organization/name", "The Roastery"],
        "sentDate": "#(now)",
        "sentLocation": "Miami, FL",
        "sentSignature": ["organization/name", "The Roastery"],
        "itemDescription": "Got the beans roasted!",
        "intendedRecipient": ["organization/name", "Coffee on the Block"],
        "intendedReceiptLocation": "Portland, OR",
        "shipper": ["organization/name", "Ship Shape"],
        "GPSLocation": "25.7825453,-80.2994987"
    }]
},
{
    "_id": "_tx",
    "auth": "roastery"
}]

// Blocks 22 - 25, Shipper updates location

// Block 22
[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "32.8205865,-96.8716267"
},
{
    "_id": "_tx",
    "auth": "shipShape"
}]


// Block 23
[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "38.9764554,-107.7937101"
},
{
    "_id": "_tx",
    "auth": "shipShape"
}]

// Block 24
[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "38.4162652,-121.5129772"
},
{
    "_id": "_tx",
    "auth": "shipShape"
}]

// Block 25
[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "45.5426225,-122.7944694"
},
{
    "_id": "_tx",
    "auth": "shipShape"
}]
