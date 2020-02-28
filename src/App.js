import React, { Component } from 'react';
import { Row, Col, ProgressBar, Form, FormGroup, Button, ButtonGroup } from 'react-bootstrap';
import { flureeFetch } from './flureeFetch';

import PurchaseOrderForm from './screens/PurchaseOrderForm';
import PurchaseOrders from './screens/PurchaseOrders';

class Main extends Component {
  state = {
    view: "purchaseOrderForm"
  }

  componentDidMount(){
    let query = {
      "numPos": { "selectOne": "(count ?purchaseOrder)", "where": [["?purchaseOrder", "purchaseOrder/id", "?id"]] },
      "shipments": { "selectOne": "(count ?shipment)", "where": [["?shipment", "shipment/id", "?id"]] }
    }

    flureeFetch("multi-query", query)
    .then(res => this.setState({ numPOs: res.numPos, numShipments: res.shipments, pos: res.pos
     }))
  }

  setPo = ( po  )=> {
    this.setState({ view: "purchaseOrders", po: po })
  }

  render(){
      return(
        <div>
          <Row>
            <Col xs={12} className="text-center"  style={{margin: "30px"}}>
              <h2>Supply Chain Demo</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 6, offset: 3}}>
              <div style={{border: "1px solid black", padding: "10px", marginBottom: "20px"}}>
                <div>Tracking Purchase Orders: {this.state.numPOs} </div>
                <div>Tracking Shipments: {this.state.numShipments} </div>
              </div>
            </Col>
          </Row>
          <Row>
          <Col xs={12} className="text-left" style={{margin: "10px"}}> 
            <ButtonGroup>
              <Button variant="secondary" onClick={() => this.setState({ view: "purchaseOrders"})}
              disabled={this.state.view === "purchaseOrders"}>View Purchase Orders</Button>
              <Button variant="secondary" onClick={() => this.setState({ view: "purchaseOrderForm"})}
              disabled={this.state.view === "purchaseOrderForm"}>Create Purchase Order</Button>
            </ButtonGroup>
          </Col>
        </Row>
            {
              this.state.view === "purchaseOrderForm" && 
              <PurchaseOrderForm setPo={this.setPo}/>
            }
            {
              this.state.view === "purchaseOrders" && <PurchaseOrders po={this.state.po}/>
            }
        </div>
      )
    }
  }

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
