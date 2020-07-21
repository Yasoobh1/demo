import React from 'react';
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import Modal from 'react-modal';


class AddFriendsModal extends React.Component {
    state = {
        collectAmount: '',
        collectionFriend: '',
        description: '',
        setModalisOpen: false

    }

    collectAmount = (e) => {
        if (this.state.collectionFriend && this.state.collectAmount && this.state.description) {
            this.setState({ setModalisOpen: false })
            e.preventDefault()
            firebase
                .database()
                .ref(`users/${this.state.setKey}/friendList`)
                .push({
                    collectionFriend: this.state.collectionFriend,
                    collectAmount: this.state.collectAmount,
                    description: this.state.description
                })
            alert("Record Saved To Firebase")
        } else {
            alert("Record Not saved Please fill All fields")
        }


    }

    render() {
        console.log(this.props.addFriendModalOpen)
        return (
            <Grid.Column style={{ maxWidth: 450 }}>

                <Modal isOpen={this.state.setModalisOpen}>
                    <Form onSubmit={(e) => this.collectAmount(e)} size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="collectionfriend"
                                iconPosition="left"
                                placeholder="Friend Name"
                                onChange={e => this.setState({ collectionFriend: e.target.value })}
                                type="text" />
                            <Form.Input
                                fluid
                                name="collection"
                                iconPosition="left"
                                placeholder="Colect Amount"
                                onChange={e => this.setState({ collectAmount: e.target.value })}
                                type="text" />
                            <Form.Input
                                fluid
                                name="description"
                                placeholder="Description"
                                onChange={e => this.setState({ description: e.target.value })}
                                type="text" />
                            <Button
                                color="orange"
                                fluid
                                size="large">
                                Submit
                        </Button>
                        </Segment>
                    </Form>
                </Modal>
            </Grid.Column>
        )
    }
}

export default AddFriendsModal