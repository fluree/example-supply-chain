import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { privateKeys, randomString } from '../screens/PurchaseOrderForm'; 
import SmartFunctionModal from '../components/Modal';
import { signTransaction } from 'fluree-cryptography';
import { flureeFetch } from '../flureeFetch';


export function randomShipmentName(){
    var adjective = [ 'Speedy', 'Slow', 'Lightning Fast', 'Godspeed', 'Ludicrous Speed', 'Hyperspeed', 
    'Slow Down!', 'Turtle-Pace', 'Snail Mail'];
    var randomAdjective = Math.floor(Math.random()* adjective.length);
  
    var noun = [ 'Packet', 'Barrels', 'Bags', 'Mailings'];
    var randomNoun = Math.floor(Math.random()* noun.length);
  
    return adjective[randomAdjective] + " " + noun[randomNoun] + "----" + randomString();
  }

export function randomLocation(){
    var locations = [ 'Seattle', 'Buenos Aires', 'Lima', 'Havana', 'Paris', 'Moscow', 'Lagos', 'Nairobi', 'Hanoi'];
    return locations[Math.floor(Math.random()* locations.length)];
  }

export function randomDescription(){
    var desc = [ 'A big shipment of coffee.', 
    'It rained and snowed, but we delivered it!', 
    'We got three speeding tickets, but it arrived!'];
    return desc[Math.floor(Math.random()* desc.length)];
  }


class ShipOne extends Component {
    state = {
    }

    componentDidMount(){
        this.setState({ 
            id: randomString(), 
            name: randomShipmentName(),
            sentBy: "McDonald's Farm",
            location: randomLocation(),
            itemDescription: randomDescription(),
            intendedRecipient: 'The Roastery', 
            intendedReceiptLocation: randomLocation(),
            shipper: 'Ship Shape',
            sentSignature:  "McDonald's Farm",
            signingOrg: "McDonald's Farm" });
    }

    submitForm = (e) => {
        e.preventDefault();
        let { id, name, sentBy, location, itemDescription,
            intendedRecipient, intendedReceiptLocation, shipper,
            sentSignature, signingOrg } = this.state;

          let txn = [{
                "_id": ["purchaseOrder/name", this.props.po],
                "shipments": ["shipment$1"]
            },
            {
                "_id": "shipment$1",
                "id": id,
                "name": name,
                "sentBy": ["organization/name", sentBy],
                "sentDate": "#(now)",
                "sentLocation": location,
                "itemDescription": itemDescription,
                "intendedRecipient": ["organization/name", intendedRecipient],
                "intendedReceiptLocation": intendedReceiptLocation,
                "sentSignature": ["organization/name", sentSignature]
            }]
  
        const db = process.env.REACT_APP_FLUREE_DB;
        const expire = Date.now() + 1000;
        const fuel = 100000;
        const nonce = Math.floor(Math.random() * 1000) 
        const auth = privateKeys[signingOrg]["auth"];
        const pk = privateKeys[signingOrg]["privateKey"];
  
        const tx = JSON.stringify(txn)
        const command = signTransaction(auth, db, expire, fuel, nonce, pk, tx, null)
  
        flureeFetch("command", command)
        .then(res => new Promise(resolve => setTimeout(() => resolve(res), 1000)))
        .then(res => {
            const query = { "select": "?err", "where": [["?tx", "_tx/id", res], ["?tx", "_tx/error", "?err"]]}; 
            return flureeFetch("query", query)
        })
        .then(res => {
          if(res.length === 0 ){
            let txn = [{
              "_id": ["shipment/id", id],
              "GPSLocation": "123,23123",
              "shipper": ["organization/name", shipper]
          }]

          const db = process.env.REACT_APP_FLUREE_DB;
          const expire = Date.now() + 1000;
          const fuel = 100000;
          const nonce = Math.floor(Math.random() * 1000) 
          const auth = privateKeys["Ship Shape"]["auth"];
          const pk = privateKeys["Ship Shape"]["privateKey"];

          const tx = JSON.stringify(txn)
          const command = signTransaction(auth, db, expire, fuel, nonce, pk, tx, null);
           return flureeFetch("command", command)
          } else {
            this.setState({ error: res[0]})
            return null;
          }
        })
        .then(res => {
          if(res === null){
            return null;
          } else {
            return new Promise(resolve => setTimeout(() => resolve(res), 1000));
          }
        })
        .then(res => {
          if(res === null){
            return null;
          } else {
            const query = { "select": "?err", "where": [["?tx", "_tx/id", res], ["?tx", "_tx/error", "?err"]]}; 
            return flureeFetch("query", query)
          }
        })
        .then(res => {
          if(res === null){
            return null;
          } else if(res.length !== 0){
            this.setState({ error: res[0]})
          } else {
            this.props.setShipmentPO(id, this.props.po)
          }
        })
        .catch(err => this.setState({ error: err.message }))
      }

    handleClose = () => this.setState({ smartFunctionModal: false })

  render(){
      const { orgs } = this.props;
    return(
      <>
      { this.state.smartFunctionModal && <SmartFunctionModal predicate={this.state.predicate}
          handleClose={this.handleClose}/>}
      <div style={{margin: "20px"}} className="text-center">
          <h3>Ship to the Roaster</h3>
        </div>
        { this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        <Form onSubmit={this.submitForm}>
        {/* Shipment Id */}
          <Form.Group controlId="id">
            <Form.Label>Shipment ID*</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/id"})}>
               View Smart Functions
              </Button>
            <Form.Control type="string" placeholder="Unique ID for this shipment."
              value={this.state.id} onChange={e => this.setState({ id: e.target.value })} />
          </Form.Group>

          {/* Purchase Order Name */}
          <Form.Group controlId="name">
            <Form.Label>Name*</Form.Label> &nbsp;
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/name"})}>
               View Smart Functions
              </Button>
            <Form.Control type="string" placeholder="Name for this shipment." 
            value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
            />
          </Form.Group>

          {/* Shipment SentBy */}
           <Form.Group>
            <Form.Label>Sent By</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/sentBy"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.sentBy} 
              onChange={e => this.setState({ sentBy: e.target.value })}>
                  <option>Select a Organization that Sent This Shipment:</option>
                  {
                      orgs.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>

            {/* Shipment Location */}
            <Form.Group controlId="id">
                <Form.Label>Shipment Location</Form.Label>
                <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
                onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/location"})}>
                View Smart Functions
                </Button>
                <Form.Control type="string" placeholder="Shipment location."
                value={this.state.location} onChange={e => this.setState({ location: e.target.value })} />
            </Form.Group>

            {/* Description Location */}
            <Form.Group controlId="id">
                <Form.Label>Shipment Description</Form.Label>
                <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
                onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/itemDescription"})}>
                View Smart Functions
                </Button>
                <Form.Control type="string" placeholder="Shipment description."
                value={this.state.itemDescription} onChange={e => this.setState({ itemDescription: e.target.value })} />
            </Form.Group>

          {/* Shipment Intended Recipient */}
           <Form.Group>
            <Form.Label>Intended Recipient</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/intendedRecipient"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.intendedRecipient} 
              onChange={e => this.setState({ intendedRecipient: e.target.value })}>
                  <option>Select the Intended Recipient</option>
                  {
                      orgs.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>

            {/* Intended Receipt Location */}
            <Form.Group controlId="id">
                <Form.Label>Intended Receipt Location</Form.Label>
                <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
                onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/intendedReceiptLocation"})}>
                View Smart Functions
                </Button>
                <Form.Control type="string" placeholder="Shipment Intended Receipt Location."
                value={this.state.intendedReceiptLocation} onChange={e => this.setState({ intendedReceiptLocation: e.target.value })} />
            </Form.Group>

        {/* Shipper */}
           <Form.Group>
            <Form.Label>Shipper</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/shipper"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.shipper} 
              onChange={e => this.setState({ shipper: e.target.value })}>
                  <option>Select the shipper</option>
                  {
                      orgs.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>

        {/* Shipment SentSignature */}
           <Form.Group>
            <Form.Label>Sent Signature</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/sentSignature"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.sentSignature} 
              onChange={e => this.setState({ sentSignature: e.target.value })}>
                  <option>Select a Organization that Signed This Shipment:</option>
                  {
                      orgs.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>

            {/* Sign Transaction with this Organization's Private Key */}
           <Form.Group>
            <Form.Label>Sign With The Following Organization's Private Key</Form.Label>
              <Form.Control as="select" value={this.state.signingOrg} 
              onChange={e => this.setState({ signingOrg: e.target.value })}>
                  <option>Select an Organization</option>
                  {
                      orgs.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>
            
            <Button type="submit">Submit Harvest</Button>

        </Form>
      </>
    )
  }
}

export default ShipOne;
