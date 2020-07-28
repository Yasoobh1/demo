import React from 'react';
import { Grid, Table, Label } from "semantic-ui-react";
import Modal from 'react-modal';


const ShowFriendListModal = ({ closeFriendListModal, openModal, renderFriendList }) => {
    return (
        <Grid.Column style={{ maxWidth: 450 }}>
            <Modal isOpen={openModal}>
                <h3 style={{ textAlign: 'center' }}>Take Amount From Friends</h3>
                <Table called>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Bill</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {renderFriendList && renderFriendList.map((list) =>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell >
                                    <Label ribbon> {list && list.data.collectionFriend}</Label>
                                </Table.Cell>
                                <Table.Cell>{list && list.data.description}</Table.Cell>
                                <Table.Cell>{list && list.data.collectAmount}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )}
                </Table>
                <div style={{ justifyContent: 'center', display: 'flex', paddingTop: 10 }}>
                    <button onClick={() => closeFriendListModal()} class="small ui button">Close</button>
                </div>
            </Modal>
        </Grid.Column>
    )
}

export default ShowFriendListModal