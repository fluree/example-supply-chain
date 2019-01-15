/* At any point in the supply chain, regardless of who 
has control of the product, any of the actors can add events.
Events are anything that the supply chain actors think is
important and is an intentionally flexible collection. 

For example, events might be:
- We realized a shipment we sent out was contaminated.
- There was with package inspection issue at customs that 
other members of the supply chain should know about. 
- There was a natural disaster. 

By design, these events can be added during or after an event
occurs. There is also an event/notify predicate where you 
can list organizations to notify of this event. 

A good end user application will listen for these types of 
updates, and notify the relevant organizations. 

For example, the below event was added by the cafe. In 
Portland, where the cafe is located, there was a big rain 
storm, so the cafe wants both the roaster and the shipper 
to know about this, as well as to have the event recorded 
in the blockchain. 
*/

[{
    "_id": ["purchaseOrder/id", "123"],
    "events": [{
        "_id": "event",
        "id": "1",
        "category": "weather",
        "description": "Big rain storm in Portland.",
        "date": "#(now)",
        "notify": [
            ["organization/name", "Ship Shape"],
            ["organization/name", "The Roastery"]]
    
    }]
},
{
    "_id": "_tx",
    "auth": "coffeeOnTheBlock"
}]
