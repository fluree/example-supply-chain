// Additional players

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
    "id": "salemSlurps",
    "roles": [["_role/id", "root"]]
},
{
    "_id": "_auth$2",
    "id": "theEncryptedCup",
    "roles": [["_role/id", "root"]]
}]

// Create five purchaseOrders

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
},
{
    "_id": "_tx",
    "auth": "coffeeOnTheBlock"
}]

//PO 2
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
},
{
    "_id": "_tx",
    "auth": "salemSlurps"
}]


//PO 3
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
},
{
    "_id": "_tx",
    "auth": "theEncryptedCup"
}]


//PO 4
[{
    "_id": "purchaseOrder",
    "id": "127",
    "name": "myPurchaseOrder5",
    "issuer": ["organization/name", "Salem Slurps"],
    "issueDate": "#(now)",
    "product": ["product/id", "a4t58"],
    "approved": [["organization/name", "Salem Slurps"]]
},
{
    "_id": "_tx",
    "auth": "salemSlurps"
}]

// PO 5
[{
    "_id": "purchaseOrder",
    "id": "128",
    "name": "myPurchaseOrder6",
    "issuer": ["organization/name", "Coffee on the Block"],
    "issueDate": "#(now)",
    "product": ["product/id", "a4t57"],
    "approved": [["organization/name", "Coffee on the Block"]]
},
{
    "_id": "_tx",
    "auth": "coffeeOnTheBlock"
}]
