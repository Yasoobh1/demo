

import React from 'react';
import { Grid, Label, Table, Icon } from "semantic-ui-react";

const BillTable = ({ renderList, addFriends, biller,removeData }) => {

    return (
        <Grid.Column style={{ maxWidth: 450, paddingTop: 50 }}>
            <Table called>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>List OF Bills</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {biller && biller.map((data, i) =>
                    <>  <div className='rowC'>
                        <Table celled >
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell >
                                        <Label ribbon> {data.data.bill}</Label>
                                    </Table.Cell>
                                    <Table.Cell>{data.data.amount}</Table.Cell>
                                    <Table.Cell>
                                    <Icon onClick= {() => removeData(data.key)} name="window close" color="orange" />
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                        <div class="ui small buttons" style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', width: 20, marginLeft: "20%" }}>
                            <button onClick={() => addFriends(data.key)} class="ui button">Add friends</button>
                            <div class="or"></div>
                            <button onClick={() => renderList(data.key)} class="ui button">Show Friends</button>
                        </div>
                    </>
                )}
            </Table>

        </Grid.Column>
    )
}
export default BillTable;