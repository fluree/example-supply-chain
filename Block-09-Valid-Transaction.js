// Step 1. A cafe creates a purchase order.

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
},
{
    "_id": "_tx",
    "auth": "coffeeOnTheBlock"
}]

