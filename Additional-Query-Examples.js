// Selecting all purchase orders

{ 
    "select": ["*"], 
    "from": "purchaseOrder"
}


// Selecting all purchase orders approved by roasters, as of block 95

{
    "select": ["?purchaseOrder", "?name"],
    "where": [
        ["?purchaseOrder", "purchaseOrder/approved", "?organization"],
        ["?organization", "organization/type", "organization/type:roaster"],
        ["?organization", "organization/name", "?name"]],
    "block": 25
}



// For each strain of coffee in purchaseOrder approved by a cafe as of block 95, returns the strain name, sum of pounds, and count of purchase orders.

{
    "select": ["?strainName", "(sum ?pounds)", "(count ?purchaseOrder)"],
    "where": [
        ["?purchaseOrder", "purchaseOrder/approved", "?organization"],
        ["?organization", "organization/type", "organization/type:cafe"],
        ["?purchaseOrder", "purchaseOrder/product", "?product"],
        ["?product", "product/strain", "?strain"],
        ["?strain", "_tag/id", "?strainName"],
        [ "?product", "product/quantity", "?pounds"],
        ["?product", "product/unitOfMeasure", "lb"]
        ],
    "prettyPrint": true
}
