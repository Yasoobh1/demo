import React from 'react';
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import PayerForm from './payerForm';
import { connect } from 'react-redux';

class BillForm extends React.Component {
    state = {
        bill: '',
        amount: '',
        showInput: false
    }

    Submit = (e) => {
        const { amount, bill } = this.state
        if (bill && amount) {
            this.setState({ showInput: true })
            e.preventDefault()
            firebase
                .database()
                .ref(`users/${this.props.currentUser.user.uid}`)
                .push({
                    bill: bill,
                    amount: amount,
                })
            alert("Record Saved To Firebase")
        } else {
            alert("Record Not saved Please fill ALl fields")
        }

    }
    render() {
        const { showInput } = this.state

        return (
            <Grid.Column style={{ maxWidth: 450 }}>
                {!showInput ?

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
                {showInput ? <PayerForm /> : ''}

            </Grid.Column>
        )
    }
}
const mapStateFromProps = state => ({
    currentUser: state.auth.currentUser
  })

export default connect(mapStateFromProps)(BillForm);