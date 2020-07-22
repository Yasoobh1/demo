

import React from 'react';
import { Grid, Label, Table } from "semantic-ui-react";

const BillTable = ({ billName, billAmount, renderList, addFriends, firebaseKey }) => {

    return <Grid.Column style={{ maxWidth: 450 }}>

        <div className='rowC'>
            <Table celled >
                <Table.Body>
                    <Table.Row>
                        <Table.Cell >
                            <Label ribbon> {billName}</Label>
                        </Table.Cell>
                        <Table.Cell>{billAmount}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
        <div class="ui small buttons" style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', width: 20, marginLeft: "20%" }}>
            <button onClick={() => addFriends(firebaseKey)} class="ui button">Add friends</button>
            <div class="or"></div>
            <button onClick={() => renderList(firebaseKey)} class="ui button">Show Friends</button>
        </div>
    </Grid.Column>
}
export default BillTable;