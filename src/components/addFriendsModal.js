import React from 'react';
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import Modal from 'react-modal';


const AddFriendsModal = ({ addFriendModalOpen, collectionFriend, handleAddFriends, collectAmount, description, closeAddFriendsModal, collectdata }) => {
    return (
        <Grid.Column style={{ maxWidth: 450 }}>

            <Modal isOpen={addFriendModalOpen}>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="collectionFriend"
                            placeholder="Friend Name"
                            value={collectionFriend}
                            onChange={handleAddFriends}
                            type="text" />
                        <Form.Input
                            fluid
                            name="collectAmount"
                            placeholder="Colect Amount"
                            value={collectAmount}
                            onChange={handleAddFriends}
                            type="text" />
                        <Form.Input
                            fluid
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={handleAddFriends}
                            type="text" />
                    </Segment>
                </Form>
                <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ alignContent: 'center', width: 100 }}>
                        <Button
                            onClick={(e) => collectdata(e)}
                            color="orange"
                            fluid
                            size="small">
                            Submit
                        </Button>
                    </div>
                    <div style={{ paddingLeft: 10, alignContent: 'center', width: 100 }}>
                        <Button
                            onClick={closeAddFriendsModal}
                            color="grey"
                            fluid
                            size="small">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </Grid.Column>
    )
}

export default AddFriendsModal