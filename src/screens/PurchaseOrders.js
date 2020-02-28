import React, { Component } from 'react';
import { Form, Row, Col, ProgressBar } from 'react-bootstrap';
import { flureeFetch } from '../flureeFetch';
import Harvest from '../components/Harvest';
import ShipOne from '../components/ShipOne';
import ShipTwo from '../components/ShipTwo';
import Roast from '../components/Roast';
import Complete from '../components/Complete';
import AcceptShipment from '../components/AcceptShipment';

function anyRecipientSignatures(po){
    return po["purchaseOrder/shipments"] && po["purchaseOrder/shipments"].some(shipment => shipment["shipment/receivedSignature"])
}


function PurchaseOrderStage(po){
    if(!po["purchaseOrder/harvestDate"]){
        // growing
        return 1
    } 

    const receivedShipment = anyRecipientSignatures(po);

    if (po["purchaseOrder/harvestDate"] && !receivedShipment && !po["purchaseOrder/shipments"]){
        // shipping
        return 2
    } else if (po["purchaseOrder/shipments"]  && !receivedShipment){
        // Accept shipment
        return 3
    } else if (receivedShipment && !po["purchaseOrder/roastDate"]){
        // roasting
        return 4
    } else if (po["purchaseOrder/roastDate"] && po["purchaseOrder/shipments"].length === 1){
        // shipping
        return 5
    } else if(po["purchaseOrder/shipments"].length !== 1 && !po["purchaseOrder/closed"]){
        // closed
        return 6;
    } else if (po["purchaseOrder/closed"]){
        return 7
    }

}

class PurchaseOrders extends Component {
    state = {
        pos: [],
        orgs: []
    }

    componentDidMount(){
        let po = this.props.po;
        
        if(po){
            let query = { "pos": { "select": "?name", "where": [["?purchaseOrder", "purchaseOrder/name", "?name"]] },
            "orgs": { "select": "?name", "where": [["?org", "organization/name", "?name"]] },
            "po": {"selectOne": ["*", {"purchaseOrder/shipments": ["*"]}], "from": ["purchaseOrder/name", po] }}
            
            flureeFetch("multi-query", query)
            .then(res => {
                const stage = PurchaseOrderStage(res.po);
                let shipmentId; 
                if(stage === 3) {
                    shipmentId = res["purchaseOrder/shipments"][0]["shipment/id"]
                } else if (stage === 6){
                    shipmentId = res["purchaseOrder/shipments"][1]["shipment/id"]
                }
                this.setState({ pos: res.pos, po: po, stage: stage, orgs: res.orgs, shipmentId: shipmentId })
            })
        } else {
            let query = {"pos": { "select": "?name", "where": [["?purchaseOrder", "purchaseOrder/name", "?name"]] },
            "orgs": { "select": "?name", "where": [["?org", "organization/name", "?name"]] } }

            flureeFetch("multi-query", query)
            .then(res => this.setState({ pos: res.pos, orgs: res.orgs }))
        }
      }

      setPurchaseOrder = (po) => {
            let query = {"selectOne": ["*", {"purchaseOrder/shipments": ["*"]}], "from": ["purchaseOrder/name", po] }
            
            flureeFetch("query", query)
            .then(res => {
                const stage = PurchaseOrderStage(res);

                let shipmentId; 
                if(stage === 3) {
                    shipmentId = res["purchaseOrder/shipments"][0]["shipment/id"]
                } else if (stage === 6) {
                    shipmentId = res["purchaseOrder/shipments"][1]["shipment/id"]
                }
                this.setState({  po: po, stage: stage, shipmentId: shipmentId})
            })
        } 

        setShipmentPO = (shipmentId, po) => {
            let query = {"selectOne": ["*", {"purchaseOrder/shipments": ["*"]}], "from": ["purchaseOrder/name", po] }
            
            flureeFetch("query", query)
            .then(res => {
                const stage = PurchaseOrderStage(res);
                this.setState({  po: po, stage: stage, shipmentId: shipmentId })
            })
        } 

  render(){
      const { stage, po, orgs, shipmentId } = this.state;
    return(
      <>
        <Row style={{margin: "40px 0px"}}>
            <Col  xs={12} sm={{span: 2, offset: 1}} className="text-right">
              <Form inline>
                <Form.Group>
                  <Form.Label style={{ padding: "10px", fontSize: "20px"}}>View Purchase Order</Form.Label>
                  <Form.Control as="select" 
                  value={this.state.po}
                  onChange={(e) => this.setPurchaseOrder(e.target.value)}>
                      <option>Select a Purchase Order</option>
                      {
                         this.state.pos.map(po => <option>{po}</option>)
                      }
                      </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={{span: 10, offset: 1}}> 
          {
              po && 
              <ProgressBar style={{height: "50px", fontSize: "18px"}}>
                <ProgressBar variant="info" animated={stage === 1} now={(100/6)} label={"Growing"} key={1} />

                <ProgressBar now={stage > 1 ? (100/6) : 0 }  animated={stage === 2} 
                label={stage > 1 ? "Shipping" : null} key={2} />

                <ProgressBar variant="secondary" now={stage > 2 ? (100/6) : 0}  animated={stage === 3} 
                label={stage > 2 ? "Accept Shipment" : null} key={3} />

                <ProgressBar variant="danger" now={stage > 3 ? (100/6) : 0}  animated={stage === 4} 
                label={stage > 3 ? "Roasting" : null} key={4} />

                <ProgressBar now={stage > 4 ? (100/6) : 0 }  animated={stage === 5} 
                label={stage > 4 ? "Shipping" : null} key={5} />

                <ProgressBar variant="success" now={stage > 5 ? (100/6) : 0}  
                animated={stage === 6} label={stage > 5 ? "Complete" : null} key={6} />
              </ProgressBar>
            }
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={{span: 10, offset: 1}}>
                {
                    this.state.stage === 1 && <Harvest orgs={orgs} po={po} setPo={this.setPurchaseOrder}/>
                }
                {
                    this.state.stage === 2 && <ShipOne orgs={orgs}  po={po} setPo={this.setPurchaseOrder} setShipmentPO={this.setShipmentPO}/>
                }
                                {
                    this.state.stage === 3 && <AcceptShipment orgs={orgs} po={po} shipmentId={shipmentId}
                    setPo={this.setPurchaseOrder}/>
                }
                                {
                    this.state.stage === 4 && <Roast orgs={orgs} po={po} setPo={this.setPurchaseOrder}/>
                }
                {
                    this.state.stage === 5 && <ShipTwo orgs={orgs}  po={po} setPo={this.setPurchaseOrder} setShipmentPO={this.setShipmentPO}/>
                }
                {
                    this.state.stage === 6 && <Complete orgs={orgs}  shipmentId={shipmentId}
                    po={po} setPo={this.setPurchaseOrder} 
                    setShipmentPO={this.setShipmentPO}/>
                }
            </Col>
          </Row>
      </>
    )
  }
}

export default PurchaseOrders;
