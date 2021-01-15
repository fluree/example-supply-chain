import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { privateKeys, randomString } from '../screens/PurchaseOrderForm'; 
import SmartFunctionModal from '../components/Modal';
import { signTransaction } from 'fluree-cryptography';
import { flureeFetch } from '../flureeFetch';


class AcceptShipment extends Component {
    state = {
    }

    componentDidMount(){
        this.setState({ 
            receivedSignature: 'The Roastery',
            signingOrg: 'The Roastery'
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        let { receivedSignature, signingOrg } = this.state;

          let txn = [{
            "_id": ["shipment/id", this.props.shipmentId],
            "receivedSignature": ["organization/name", receivedSignature]
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
            this.props.setPo(this.props.po)
          } else {
            this.setState({ error: res[0]})
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

          {/* Shipment Received By */}
           <Form.Group>
            <Form.Label>Shipment Received By</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "shipment/receivedSignature"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.receivedSignature} 
              onChange={e => this.setState({ receivedSignature: e.target.value })}>
                  <option>Select a Organization that Received this Shipment:</option>
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

            <Button type="submit">Accept Shipment</Button>

        </Form>
      </>
    )
  }
}

export default AcceptShipment;
