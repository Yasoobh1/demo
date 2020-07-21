import React from 'react';
import { Grid, Form, Segment, Header, Button, Message, Icon, Label, Menu, Table } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import PayerForm from './payerForm';

class BillForm extends React.Component {
    state = {
        bill: '',
        amount: '',
        showInput: false
    }

    Submit = (e) => {
        if (this.state.bill && this.state.amount) {
            this.setState({ showInput: true })
            e.preventDefault()
            firebase
                .database()
                .ref("users")
                .push({
                    bill: this.state.bill,
                    amount: this.state.amount,
                })
            alert("Record Saved To Firebase")
        } else {
            alert("Record Not saved Please fill ALl fields")
        }

    }
    render() {
        return (
            <Grid.Column style={{ maxWidth: 450 }}>
                {!this.state.showInput ?

                    <Form onSubmit={(e) => this.Submit(e)} size="large">
                        <h1>Total Bill</h1>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="bill"
                                iconPosition="left"
                                placeholder="Bill"
                                onChange={e => this.setState({ bill: e.target.value })}
                                type="text" />

                            <Form.Input
                                fluid
                                name="amount"
                                iconPosition="left"
                                placeholder="Amount"
                                onChange={e => this.setState({ amount: e.target.value })}
                                type="text" />

                            <Button
                                color="orange"
                                fluid
                                size="large">
                                Submit
            </Button>

                        </Segment>

                    </Form>
                    : ''}
                {this.state.showInput ? <PayerForm /> : ''}

            </Grid.Column>
        )
    }
}

export default BillForm;