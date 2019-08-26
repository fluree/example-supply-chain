/* INVALID TRANSACTIONS
These invalid transactions demonstrate some of the things you CAN'T do at this point in time. 
In an application, you should have a user interface that makes it very easy to perform the
right transactions at the right time. Smart functions prevent a rogue participant from 
intentionally or accidentally going around the allowed steps.  */

// Step 1. A roaster creates a purchase order.

// Doesn't work - not a cafe
// Signed with The Roastery's _auth/id: TfA6vquJMH65oQttpuURWvGnMdPPdAA69PF 
// And private key: 36abfcd2da19781550d6c9296ada95e11ef0ebfe9acdf3723e59098dc41fe8a5

[{
    "_id": "purchaseOrder",
    "id": "124",
    "name": "myPurchaseOrder2",
    "issuer": ["organization/name", "The Roastery"],
    "issueDate": "#(now)",
    "product": {
        "_id": "product",
        "id": "a4t57",
        "name": "Tuesday Coffee",
        "description": "Our regular monday shipment of roasted coffee",
        "category": "coffee",
        "strain": "Colombian Arabica",
        "quantity": 100,
        "unitOfMeasure": "lb"
    }
}]

// Doesn't work - attempting to list purchaseOrder issuer as someone other than themselves
// Signed with McDonald's Farm's _auth/id: Tf2hxnc1FzAXtmk8ptwQ5V68zJjfd4tLwXL 
// And private key: 5ce7259de6397b6dbdd727fc62e9a920f41fe3017dbd76cba3f8d0c1f0275113
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
        "description": "Our regular monday shipment of roasted coffee",
        "category": "coffee",
        "strain": "Colombian Arabica",
        "quantity": 100,
        "unitOfMeasure": "lb"
    }
}]

// Doesn't work - not all necessary predicates
// Signed with Coffee on the Block's _auth/id: Tf2j3SoemdjeTfi8t1CxjaYNmUZpWT3A8RD 
// And private key: 8a9077ab011fb152b5a043abc24c535810b5dd1d87ecd6ace7cb454dd046670b
[{
    "_id": "purchaseOrder",
    "id": "124",
    "issuer": ["organization/name", "Coffee on the Block"],
    "issueDate": "#(now)",
    "product": {
        "_id": "product",
        "id": "a4t57",
        "name": "Tuesday Coffee",
        "description": "Our regular monday shipment of roasted coffee",
        "category": "coffee",
        "strain": "Colombian Arabica",
        "quantity": 100,
        "unitOfMeasure": "lb"
    }
}]

// Doesn't work - Can't create a shipment without connecting it to a purchase order
// Signed with McDonald's Farm's _auth/id: Tf2hxnc1FzAXtmk8ptwQ5V68zJjfd4tLwXL 
// And private key: 5ce7259de6397b6dbdd727fc62e9a920f41fe3017dbd76cba3f8d0c1f0275113

[{
    "_id": "shipment$1",
    "id": "growShip123",
    "name": "123BeanShip",
    "sentBy": ["organization/name", "McDonald's Farm"],
    "sentDate": "#(now)",
    "sentLocation": "McDonLand",
    "itemDescription": "Got the beans harvested!",
    "intendedRecipient": ["organization/name", "The Roastery"],
    "intendedReceiptLocation": "Miami, FL"
}]