import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { privateKeys } from '../screens/PurchaseOrderForm'; 
import SmartFunctionModal from '../components/Modal';
import { signTransaction } from 'fluree-cryptography';
import { flureeFetch } from '../flureeFetch';

class Roast extends Component {
    state = {
    }

    componentDidMount(){
      this.setState({ roaster: "The Roastery", approvingOrg: "The Roastery", signingOrg: "The Roastery"})
    }

    submitForm = (e) => {
        e.preventDefault();
        let { roaster, approvingOrg, signingOrg } = this.state;

          let txn = [{
            "_id": ["purchaseOrder/name", this.props.po],
            "roaster": ["organization/name", roaster],
            "roastDate": "#(now)",
            "approved": [["organization/name", approvingOrg]]
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
          <h3>Ready to Roast!</h3>
        </div>
        { this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        <Form onSubmit={this.submitForm}>

          {/* Purchase Order Issuer */}
           <Form.Group>
            <Form.Label>Roaster</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "purchaseOrder/roaster"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.roaster} 
              onChange={e => this.setState({ grower: e.target.value })}>
                  <option>Select a Roaster</option>
                  {
                      orgs.map(org => <option>{org}</option>)
                  }
                  </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Approved By*</Form.Label>
            <Button variant="outline-primary" size="sm" style={{marginLeft: "20px"}}
            onClick={() => this.setState({smartFunctionModal: true , predicate: "purchaseOrder/approved"})}>
               View Smart Functions
              </Button>
              <Form.Control as="select" value={this.state.approvingOrg} 
              onChange={e => this.setState({ approvingOrg: e.target.value })}>
                  <option>Select an Aproving Organization</option>
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

            <Button type="submit">Submit Roast</Button>

        </Form>
      </>
    )
  }
}

export default Roast;
