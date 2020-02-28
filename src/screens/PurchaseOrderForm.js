import React, { Component } from 'react';
import { Alert, Form, Row, Col, Modal, Button } from 'react-bootstrap';
import { signTransaction } from 'fluree-cryptography';
import { flureeFetch } from '../flureeFetch';
import SmartFunctionModal from '../components/Modal';

// Utility Function 

export function randomString(){
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function randomOrderName(){
  var adjective = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Midnight',
'Dawn', 'Noon', 'Afternoon'];
  var randomAdjective = Math.floor(Math.random()* adjective.length);

  var noun = [ 'Java', 'Coffee', 'Dirt', 'Mud', 'Cuppa', 'Brew', 'Jitter Juice',];
  var randomNoun = Math.floor(Math.random()* noun.length);

  return adjective[randomAdjective] + " " + noun[randomNoun] + "----" + randomString();
}

function randomProductName(){
  var adjective = [ 'Burnt', 'Piney', 'Chocolatey', 'Sweet', 'Bitter', 'Acidic', 'Tangy', 'Herby'];
  var randomAdjective = Math.floor(Math.random()* adjective.length);

  var noun = [ 'Java', 'Coffee', 'Dirt', 'Mud', 'Cuppa', 'Brew', 'Jitter Juice',];
  var randomNoun = Math.floor(Math.random()* noun.length);

  return adjective[randomAdjective] + " " + noun[randomNoun] + "----" + randomString();
}

export function ifEmptyNil(str){
  const trimmed = str.trim()
  if(trimmed === ""){
    return null
  }

  return trimmed;
}

export function cleanObj(obj){
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }

    return obj;
}

const coffeeStrains = [ "Arusha Arabica", "Blue Mountain Arabica", "Bourbon Arabica", "Pacamara Arabica", 
"Sagada Arabica", "Robusta", "Kahawa Sug Robusta"]

function randomCoffeeStrain(){
  var randStrain = Math.floor(Math.random()* coffeeStrains.length);

  return coffeeStrains[randStrain];
}

export const privateKeys = {
  "Coffee on the Block": 
  { 
    "auth": "Tf2j3SoemdjeTfi8t1CxjaYNmUZpWT3A8RD", 
    "privateKey": "8a9077ab011fb152b5a043abc24c535810b5dd1d87ecd6ace7cb454dd046670b"
  },
  "The Roastery": 
  { 
    "auth": "TfA6vquJMH65oQttpuURWvGnMdPPdAA69PF", 
    "privateKey": "36abfcd2da19781550d6c9296ada95e11ef0ebfe9acdf3723e59098dc41fe8a5"
  },
  "McDonald's Farm": 
  { 
    "auth": "Tf2hxnc1FzAXtmk8ptwQ5V68zJjfd4tLwXL", 
    "privateKey": "5ce7259de6397b6dbdd727fc62e9a920f41fe3017dbd76cba3f8d0c1f0275113"
  },
  "Ship Shape": 
  { 
    "auth": "TfBq3t6AZ6ibCs3uxVAkW6CtPaWy7isrcRG", 
    "privateKey": "9ba0454eab8057f4e69a27e8ea9ab6344c73f4f1a7a829a9b521869073e92cb7"
  },
  "Salem Slurps": 
  { 
    "auth": "Tf2MXfoJsnS2HEieec1VS3Yzc8p5mpVGiQv", 
    "privateKey": "ef1ca73339e8fd77acfd8ead435d9dbdf656aeca3ffb16dd97bbc0ac67f932d4"
  },
  "The Encrypted Cup":
  { 
    "auth": "Tf8zN7MSTrzZAHnJrrjK1WHxkkvkyQZcQ7X", 
    "privateKey": "1c2e1a542f79924e34b0e828d924d89f342afabe70f41084ed4818b669873dc4"
  }
}

class PurchaseOrderForm extends Component {
    state = {
      organizations: [],
      smartFunctionModal: false
    }

    componentDidMount(){
      let query = { "select": "?name", "where": [["?organization", "organization/name", "?name"]] };
      const  name = randomOrderName();
      const productName = randomProductName();

      flureeFetch("query", query)
      .then(res => this.setState({ 
        organizations: res, 
        id: randomString(), 
        name: name,
        issuingOrg: "Coffee on the Block",
        signingOrg: "Coffee on the Block",
        productName: productName,
        productId: randomString(), 
        productDescription: "Our regular " + name + " order of " + productName,
        productStrain: randomCoffeeStrain(),
        productPounds: Math.floor(Math.random()* 3000)
      }))
    }

    handleClose = () => this.setState({ smartFunctionModal: false })

    submitForm = (e) => {
      e.preventDefault();
      let { id, name, issuingOrg, productName, 
        productId, productDescription, productStrain, productPounds,
        signingOrg } = this.state;

        let product = {
          "_id": "product",
          "id": ifEmptyNil(productId),
          "name": ifEmptyNil(productName),
          "description": ifEmptyNil(productDescription),
          "category": "coffee",
          "strain": ifEmptyNil(productStrain),
          "quantity": productPounds,
          "unitOfMeasure": "lb"
      };

      product = cleanObj(product);

      const org = issuingOrg === "Select an Issuing Organization" ? null : ["organization/name", issuingOrg];

      let po = {
          "_id": "purchaseOrder",
          "id": ifEmptyNil(id),
          "name": ifEmptyNil(name),
          "issuer": org,
          "issueDate": "#(now)",
          "product": product,
          "approved": [org]
        }

        po = cleanObj(po);

      const txn = [po];

      const db = "supply/chain";
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
          this.props.setPo(name)
        } else {
          this.setState({ error: res[0]})
        }
      })
      .catch(err => this.setState({ error: err.message }))
    }

  render(){
    return(
      <Row>
        { this.state.smartFunctionModal && <SmartFunctionModal predicate={this.state.predicate}
          handleClose={this.handleClose}/>}
        <Col xs={12} sm={{span: 10, offset: 1}}>
          { this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
          <Form onSubmit={this.submitForm}>

          {/* Purchase Order Id */}
          <Form.Group controlId="id">
            <Form.Label>Purchase Order ID*</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "purchaseOrder/id"})}>
               View Smart Functions
              </Button>
            <Form.Control type="string" placeholder="Unique ID for this purchase order."
              value={this.state.id} onChange={e => this.setState({ id: e.target.value })} />
          </Form.Group>

          {/* Purchase Order Name */}
          <Form.Group controlId="name">
            <Form.Label>Name*</Form.Label> &nbsp;
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "purchaseOrder/name"})}>
               View Smart Functions
              </Button>
            <Form.Control type="string" placeholder="Name for this purchase order." 
            value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
            />
          </Form.Group>

          {/* Purchase Order Issuer */}
           <Form.Group>
            <Form.Label>Issuer*</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "purchaseOrder/issuer"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.issuingOrg} 
              onChange={e => this.setState({ issuingOrg: e.target.value })}>
                  <option>Select an Issuing Organization</option>
                  {
                      this.state.organizations.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>

            {/* Product ID */}
            <Form.Group controlId="productId">
              <Form.Label>Product ID</Form.Label> &nbsp;
              <Form.Control type="string" placeholder="Unique ID for the product being ordered."
                value={this.state.productId} onChange={e => this.setState({ productId: e.target.value })} />
            </Form.Group>

            {/* Product Name */}
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label> &nbsp;
              <Form.Control type="string" placeholder="Name for this product." 
              value={this.state.productName} onChange={e => this.setState({ productName: e.target.value })}
              />
            </Form.Group>

            {/* Product Description */}
            <Form.Group controlId="productDesc">
              <Form.Label>Product Description</Form.Label> &nbsp;
              <Form.Control type="string" placeholder="Description for this product" 
              value={this.state.productDescription} onChange={e => this.setState({ productDescription: e.target.value })}
              />
            </Form.Group>

            {/* Product Strain*/}
           <Form.Group>
            <Form.Label>Product Strain</Form.Label>
              <Form.Control as="select" value={this.state.productStrain} 
              onChange={e => this.setState({ productStrain: e.target.value })}>
                  <option>Select an Coffee Strain</option>
                  {
                      coffeeStrains.map(strain => <option>{strain}</option>)
                  }
                  </Form.Control>
            </Form.Group>

            {/* Product Pounds */}
            <Form.Group controlId="productPounds">
              <Form.Label>Pounds of Coffee</Form.Label> &nbsp;
              <Form.Control type="number" placeholder="Pounds of Coffee" 
              value={this.state.productPounds} onChange={e => this.setState({ productPounds: e.target.value })}
              />
            </Form.Group>

          {/* Sign Transaction with this Organization's Private Key */}
           <Form.Group>
            <Form.Label>Sign With The Following Organization's Private Key</Form.Label>
              <Form.Control as="select" value={this.state.signingOrg} 
              onChange={e => this.setState({ signingOrg: e.target.value })}>
                  <option>Select an Organization</option>
                  {
                      this.state.organizations.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>

            <Button type="submit">Create Purchase Order</Button>
            
          </Form>
        </Col>
      </Row>
    )
  }
}

export default PurchaseOrderForm;
