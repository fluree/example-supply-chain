// Additional players

// Salem Slurps
// Auth id: Tf2MXfoJsnS2HEieec1VS3Yzc8p5mpVGiQv
// Private Key: ef1ca73339e8fd77acfd8ead435d9dbdf656aeca3ffb16dd97bbc0ac67f932d4

// The Encrypted Cup
// Auth id: Tf8zN7MSTrzZAHnJrrjK1WHxkkvkyQZcQ7X
// Private Key: 1c2e1a542f79924e34b0e828d924d89f342afabe70f41084ed4818b669873dc4

[{
    "_id": "organization",
    "name": "Salem Slurps",
    "type": "cafe",
    "auth": "_auth$1"
},
{
    "_id": "organization",
    "name": "The Encrypted Cup",
    "type": "cafe",
    "auth": "_auth$2"
},
{
    "_id": "_auth$1",
    "id": "Tf2MXfoJsnS2HEieec1VS3Yzc8p5mpVGiQv",
    "descId": "salemSlurps",
    "roles": [["_role/id", "root"]]
},
{
    "_id": "_auth$2",
    "id": "Tf8zN7MSTrzZAHnJrrjK1WHxkkvkyQZcQ7X",
    "descId": "theEncryptedCup",
    "roles": [["_role/id", "root"]]
}]

// Create five purchaseOrders
// Private Key: 8a9077ab011fb152b5a043abc24c535810b5dd1d87ecd6ace7cb454dd046670b
// Auth id: Tf2j3SoemdjeTfi8t1CxjaYNmUZpWT3A8RD

// PO 1
[{
    "_id": "purchaseOrder",
    "id": "124",
    "name": "myPurchaseOrder2",
    "issuer": ["organization/name", "Coffee on the Block"],
    "issueDate": "#(now)",
    "product": {
        "_id": "product",
        "id": "a4t57",
        "name": "Tuesday Coffee",
        "description": "Our regular tuesday shipment of roasted coffee",
        "category": "coffee",
        "strain": "Ethiopian Arabica",
        "quantity": 90,
        "unitOfMeasure": "lb"
    },
    "approved": [["organization/name", "Coffee on the Block"]]
}]

//PO 2
// Auth id: Tf2MXfoJsnS2HEieec1VS3Yzc8p5mpVGiQv
// Private Key: ef1ca73339e8fd77acfd8ead435d9dbdf656aeca3ffb16dd97bbc0ac67f932d4
[{
    "_id": "purchaseOrder",
    "id": "125",
    "name": "myPurchaseOrder3",
    "issuer": ["organization/name", "Salem Slurps"],
    "issueDate": "#(now)",
    "product": {
        "_id": "product",
        "id": "a4t58",
        "name": "Salem Regular",
        "description": "Our regular weekly shipment of roasted coffee",
        "category": "coffee",
        "strain": "Colombian Arabica",
        "quantity": 200,
        "unitOfMeasure": "lb"
    },
    "approved": [["organization/name", "Salem Slurps"]]
}]


//PO 3
// Auth id: Tf8zN7MSTrzZAHnJrrjK1WHxkkvkyQZcQ7X
// Private Key: 1c2e1a542f79924e34b0e828d924d89f342afabe70f41084ed4818b669873dc4
[{
    "_id": "purchaseOrder",
    "id": "126",
    "name": "myPurchaseOrder4",
    "issuer": ["organization/name", "The Encrypted Cup"],
    "issueDate": "#(now)",
    "product": {
        "_id": "product",
        "id": "a4t59",
        "name": "Weekend Special",
        "description": "Our weekend special shipment of roasted coffee",
        "category": "coffee",
        "strain": "Hawaiian Kona",
        "quantity": 80,
        "unitOfMeasure": "lb"
    },
    "approved": [["organization/name", "The Encrypted Cup"]]
}]


//PO 4
// Auth id: Tf2MXfoJsnS2HEieec1VS3Yzc8p5mpVGiQv
// Private Key: ef1ca73339e8fd77acfd8ead435d9dbdf656aeca3ffb16dd97bbc0ac67f932d4
[{
    "_id": "purchaseOrder",
    "id": "127",
    "name": "myPurchaseOrder5",
    "issuer": ["organization/name", "Salem Slurps"],
    "issueDate": "#(now)",
    "product": ["product/id", "a4t58"],
    "approved": [["organization/name", "Salem Slurps"]]
}]

// PO 5
// Private Key: 8a9077ab011fb152b5a043abc24c535810b5dd1d87ecd6ace7cb454dd046670b
// Auth id: Tf2j3SoemdjeTfi8t1CxjaYNmUZpWT3A8RD
[{
    "_id": "purchaseOrder",
    "id": "128",
    "name": "myPurchaseOrder6",
    "issuer": ["organization/name", "Coffee on the Block"],
    "issueDate": "#(now)",
    "product": ["product/id", "a4t57"],
    "approved": [["organization/name", "Coffee on the Block"]]
}]
