/* Some of the following transaction can be done combined, 
but they are portrayed separately here for clarity. */

// Block 18
// Roaster signs for the package.

// Auth Id:            TfA6vquJMH65oQttpuURWvGnMdPPdAA69PF
// Private Key:        36abfcd2da19781550d6c9296ada95e11ef0ebfe9acdf3723e59098dc41fe8a5

[{
    "_id": ["shipment/id", "growShip123"],
    "receivedSignature": ["organization/name", "The Roastery"]
}]

// Block 19
// Roaster adds info to purchaseOrder/roaster, /roastDate, and /approved

// Auth Id:            TfA6vquJMH65oQttpuURWvGnMdPPdAA69PF
// Private Key:        36abfcd2da19781550d6c9296ada95e11ef0ebfe9acdf3723e59098dc41fe8a5

[{
    "_id": ["purchaseOrder/id", "123"],
    "roaster": ["organization/name", "The Roastery"],
    "roastDate": "#(now)",
    "approved": [["organization/name", "The Roastery"]]
}]


// Block 21
// Roaster creates shipment

// Auth Id:            TfA6vquJMH65oQttpuURWvGnMdPPdAA69PF
// Private Key:        36abfcd2da19781550d6c9296ada95e11ef0ebfe9acdf3723e59098dc41fe8a5

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

// Blocks 22 - 25, Shipper updates location

// Block 22
// Auth Id:        TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// Private Key:    9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7

[{
    "_id": ["shipment/id", "roasterShip123"],
    "shipper": ["organization/name", "Ship Shape"],
    "GPSLocation": "32.8205865,-96.8716267"
}]


// Block 23
// Auth Id:        TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// Private Key:    9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7

[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "38.9764554,-107.7937101"
}]

// Block 24

// Auth Id:        TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// Private Key:    9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7

[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "38.4162652,-121.5129772"
}]

// Block 25
// Auth Id:        TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG
// Private Key:    9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7

[{
    "_id": ["shipment/id", "roasterShip123"],
    "GPSLocation": "45.5426225,-122.7944694"
}]