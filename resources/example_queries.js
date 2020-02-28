// 1. Selecting all purchase orders

const basicQuery = 

{ 
    "select": ["*"], 
    "from": "purchaseOrder"
}


// 2. Selecting all purchase orders approved by roasters, as of block 25 and block 30

const roasterApprovedBlock25 = 

{
    "select": ["?purchaseOrder", "?name"],
    "where": [
        ["?purchaseOrder", "purchaseOrder/approved", "?organization"],
        ["?organization", "organization/type", "organization/type:roaster"],
        ["?organization", "organization/name", "?name"]],
    "block": 25
}


const roasterApprovedBlock30 = 

{
    "select": ["?purchaseOrder", "?name"],
    "where": [
        ["?purchaseOrder", "purchaseOrder/approved", "?organization"],
        ["?organization", "organization/type", "organization/type:roaster"],
        ["?organization", "organization/name", "?name"]],
    "block": 30
}



// 3. For each strain of coffee in purchaseOrder approved by a cafe as of block 25, 
// returns the strain name, sum of pounds, and count of purchase orders.

const roasterApprovedBlock25MoreInfo = 
{
    "select": ["?strain", "(as (sum ?pounds) ?weight)", "(as (count ?purchaseOrder) ?numPOs)"],
    "where": [
        ["?purchaseOrder", "purchaseOrder/approved", "?organization"],
        ["?organization", "organization/type", "organization/type:cafe"],
        ["?purchaseOrder", "purchaseOrder/product", "?product"],
        ["?product", "product/strain", "?strain"],
        [ "?product", "product/quantity", "?pounds"],
        ["?product", "product/unitOfMeasure", "lb"]
        ],
    "block": 25,
    "prettyPrint": true
}

// 4. Any updates the auth record, `TfA6vquJMH65oQttpuURWvGnMdPPdAA69PF` , has made 
// to any `purchaseOrder/roastDate`. Must be submitted to the `/history` endpoint.

const roastDateUpdates = 
{
    "history": [null, "purchaseOrder/roastDate"],
    "auth": ["TfA6vquJMH65oQttpuURWvGnMdPPdAA69PF"]
  }

