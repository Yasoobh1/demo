import React from 'react';
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'

class PayerForm extends React.Component {
    state = {
        friendName: '',
        friendsAmount: '',
        showCollect: false
    }

    friendSubmit = (e) => {
        const { friendName, friendsAmount } = this.state

        if (friendName && friendsAmount) {
            this.setState({ showCollect: true })
            e.preventDefault()
            firebase
                .database()
                .ref("payer")
                .push({
                    friendName: friendName, friendsAmount: friendsAmount
                })
            alert("Record Saved To Firebase")
        } else {
            alert("Record Not saved Please fill ALl fields")
        }
    }

    render() {
        return (
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={(e) => this.friendSubmit(e)} size="large">
                    <Segment stacked>
                        <h1>Pay Total Amount</h1>
                        <Form.Input
                            fluid
                            name="friendname"
                            // icon="user"
                            iconPosition="left"
                            placeholder="Friend Name"
                            onChange={e => this.setState({ friendName: e.target.value })}
                            type="text" />

                        <Form.Input
                            fluid
                            name="amount"
                            iconPosition="left"
                            placeholder="Amount"
                            onChange={e => this.setState({ friendsAmount: e.target.value })}
                            type="text" />

                        <Button
                            color="orange"
                            fluid
                            size="large">
                            Submit
</Button>

                    </Segment>
                </Form>
            </Grid.Column>
        )
    }
}

export default PayerForm;