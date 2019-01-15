[{
    "_id": "_fn$required",
    "name": "required",
    "params": ["predicate"],
    "code": "(boolean (get (?s) predicate))",
    "doc": "This predicate is required. Add to collection spec"
},
{
    "_id": "_fn$new?",
    "name": "new?",
    "code": "(nil? (?pO))",
    "doc": "Checks whether previous value was nil."
},
{
    "_id": "_fn$authOrganizationType",
    "name": "authOrganizationType", 
    "code": "(query \"[{organization/_auth [{organization/type [_tag/id] }]}]\" (?auth_id) nil nil nil)"
},
{
    "_id": "_fn$organizationType",
    "name": "organizationType", 
    "code": "(query \"[{organization/type [_tag/id]}]\" (?o) nil nil nil)"
},
{
    "_id": "_fn$organizationAuth",
    "name": "organizationAuth", 
    "code": "(query \"[{organization/auth  [_id]}]\" (?o) nil nil nil)"
},
{
    "_id": "_fn$shipmentPOApproved",
    "name": "shipmentPOApproved",
    "code": "(get-all (?s \"[{purchaseOrder/_shipments [{purchaseOrder/approved [_id]}] }]\") [\"purchaseOrder/_shipments\" \"purchaseOrder/approved\" \"_id\"])",
    "doc": "Gets all of the PO approved from the PO a shipment is connected to."
},
{
    "_id": "_fn$approvedOrgTypes",
    "name": "approvedOrgTypes",
    "code": "(get-all (?s \"[{purchaseOrder/approved [{organization/type [_tag/id] }] }]\") [\"purchaseOrder/approved\" \"organization/type\" \"_tag/id\"] )"
},
{
    "_id": "_fn$shipmentSentBy",
    "name": "shipmentSentBy",
    "code": "(get (get (?s \"[{shipment/sentBy [_id]}]\") \"shipment/sentBy\") \"_id\")",
    "doc": "Gets shipment/sentBy."
},
{
    "_id": "_fn$shipmentConnectedToPO?",
    "name": "shipmentConnectedToPO?",
    "code": "(if-else (nil? (get-all (?s \"[{purchaseOrder/_shipments [*]}]\") [\"purchaseOrder/_shipments\" \"_id\"])) false true)"
},
{
    "_id": "_fn$sentSignature?",
    "name": "sentSignature?",
    "code": "(if-else (nil? (get-all (?s) [\"shipment/sentSignature\" \"_id\"])) false true)"
},
{
    "_id": "_fn$GPSLocation?",
    "name": "GPSLocation?",
    "code": "(if-else (nil? (get (?s) \"shipment/GPSLocation\")) false true)"
},
{
    "_id": "_fn$shipper?",
    "name": "shipper?",
    "code": "(if-else (nil? (get (?s) \"shipment/shipper\")) false true)"
},
{
    "_id": "_fn$purchaseOrderReceivedSignaturesAuth",
    "name": "purchaseOrderReceivedSignaturesAuth",
    "code": "(get-all (?s \"[{purchaseOrder/shipments [{shipment/receivedSignature [{ organization/auth [_id ]}]}]}]\") [\"purchaseOrder/shipments\" \"shipment/receivedSignature\" \"organization/auth\" \"_id\"]))",
    "doc": "Gets all the auth records from the receivedSignatures from purchaseOrder/shipments."
}]
