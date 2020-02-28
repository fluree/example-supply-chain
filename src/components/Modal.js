import React, { Component } from 'react';
import {  Modal, Button, Alert } from 'react-bootstrap';
import { flureeFetch } from '../flureeFetch';


export default class SmartFunctionModal extends Component {
    state = {}

    componentDidMount(){
        const predicate = this.props.predicate;
        const collection = predicate.split("/")[0];

        const query = { "collection": {
            "selectOne": ["specDoc", {"spec": ["doc", "code"]}],
            "from": [ "_collection/name", collection] },
            "predicate":             {
                "selectOne": ["specDoc", {"spec": ["doc", "code"]}],
                "from": [ "_predicate/name", predicate]},
        }

        flureeFetch("multi-query", query)
        .then(res => this.setState({ collection: res.collection, predicate: res.predicate}))
    }
  
    render(){
      const {handleClose} = this.props;
      const { collection, predicate} = this.state;
      return(
        <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Smart Functions For {this.props.predicate} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                collection && 
            <div>
                <h3>Collection Smart Functions for {this.props.predicate.split("/")[0]}</h3>
                <p>{collection["specDoc"]}</p>
                <div>{collection.spec &&
                collection.spec.map(fn => <Alert variant="secondary">
                    <p>Function Doc: {fn.doc}</p>
                    <p>Function Code: {fn.code}</p>
                    </Alert>)}
                </div>
            </div>
            }
            {
                predicate && 
            <div>
                <h4>Predicate Smart Functions</h4>
                <p>{predicate["specDoc"]}</p>
                <div>{predicate.spec && 
                predicate.spec.map(fn => <Alert variant="secondary">
                    <p>Function Doc: {fn.doc}</p>
                    <p>Function Code: {fn.code}</p>
                    </Alert>)}
                </div>
            </div>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      )
    }
  }