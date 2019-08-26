/* Some of the following transaction can be done combined, 
but they are portrayed separately here for clarity. */

// Block 18
// Roaster signs for the package.
[{
    "_id": ["shipment/id", "growShip123"],
    "receivedSignature": ["organization/name", "The Roastery"]
}]

// Block 19
// Roaster adds info to purchaseOrder/roaster, /roastDate, and /approved

[{
    "_id": ["purchaseOrder/id", "123"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(now)",
    "approved": [["organization/name", "The Roastery"]]
}]

// Block 20
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
        "intendedReceiptLocation": "Portland, OR"
    }]
}]

// Blocks 21 - 24, Shipper updates location

// Block 21
// Signed with Ship Shape's _auth/id: TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// And private key: 9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7
[{
    "_id": ["shipment/id", "roasterShip123"],
    "shipper": ["organization/name", "Ship Shape"],
    "GPSLocation": "32.8205865,-96.8716267"
}]

// Block 22
// Signed with Ship Shape's _auth/id: TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// And private key: 9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7
[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "38.9764554,-107.7937101"
}]

// Block 23
// Signed with Ship Shape's _auth/id: TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// And private key: 9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7
[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "38.4162652,-121.5129772"
}]

// Block 24
// Signed with Ship Shape's _auth/id: TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// And private key: 9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7
[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "45.5426225,-122.7944694"
}]
