// Selecting all purchase orders

{ 
    "select": ["*"], 
    "from": "purchaseOrder"
}


// Selecting all purchase orders approved by roasters, as of block 95

{
    "select": ["?purchaseOrder", "?name"],
    "where": [
        ["$fdb95", "?purchaseOrder", "purchaseOrder/approved", "?organization"],
        ["$fdb95", "?organization", "organization/type", "organization/type:roaster"],
        ["$fdb95", "?organization", "organization/name", "?name"]]
}



// For each strain of coffee in purchaseOrder approved by a cafe as of block 95, returns the strain name, sum of pounds, and count of purchase orders.

{
    "select": ["?strainName", "(sum ?pounds)", "(count ?purchaseOrder)"],
    "where": [
        ["$fdb95", "?purchaseOrder", "purchaseOrder/approved", "?organization"],
        ["$fdb95", "?organization", "organization/type", "organization/type:cafe"],
        ["$fdb95", "?purchaseOrder", "purchaseOrder/product", "?product"],
        ["$fdb95", "?product", "product/strain", "?strain"],
        ["$fdb95", "?strain", "_tag/id", "?strainName"],
        ["$fdb95", "?product", "product/quantity", "?pounds"],
        ["$fdb95", "?product", "product/unitOfMeasure", "lb"]
        ],
    "prettyPrint": true
}
