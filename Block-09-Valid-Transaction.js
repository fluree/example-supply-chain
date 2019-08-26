// Step 1. A cafe creates a purchase order.
// Private Key: 8a9077ab011fb152b5a043abc24c535810b5dd1d87ecd6ace7cb454dd046670b
// Auth id: Tf2j3SoemdjeTfi8t1CxjaYNmUZpWT3A8RD
[{
    "_id": "purchaseOrder",
    "id": "123",
    "name": "myPurchaseOrder",
    "issuer": ["organization/name", "Coffee on the Block"],
    "issueDate": "#(now)",
    "product": {
        "_id": "product",
        "id": "a4t56",
        "name": "Monday Coffee",
        "description": "Our regular monday shipment of roasted coffee",
        "category": "coffee",
        "strain": "Colombian Arabica",
        "quantity": 100,
        "unitOfMeasure": "lb"
    }
}]

