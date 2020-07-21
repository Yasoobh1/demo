import React from 'react';
import logo from '../logo.svg';
import { Grid, Form, Segment, Header, Button, Message, Icon, Label, Menu, Table } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import Modal from 'react-modal';
import BillForm from '../components/BillForm';
import PayerForm from '../components/payerForm';
import AddFriendsModal from '../components/addFriendsModal';
// import '../App.css'
var billArray = [];
var friendList = []
class Demo extends React.Component {
  state = {
    data: [],
    collectAmount: '',
    collectionFriend: '',
    setModalisOpen: false,
    description: '',
    renderBill: [],
    showBill: false,
    openModal: false,
    renderPayer: [],
    biller: [],
    setKey: '',
    renderFriendList: []
  }
  componentDidMount() {
    var billRef = firebase.database().ref('users')
    billRef.on('child_added', this.gotBill)

  }
  gotBill = (data) => {
    billArray.push({ data: data.val(), key: data.key });
    this.setState({ biller: billArray })
  }
  gotData = (data) => {
    friendList.push({ data: data.val(), key: data.key });
    this.setState({ renderFriendList: friendList })
  }

  errData = (err) => {
    console.log(err, "ERorrr")
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
  renderList = (key) => {
    this.setState({ openModal: true })
    var ref = firebase.database().ref(`users/${key}/friendList`);
    ref.on('child_added', this.gotData, this.errData)
  }

  addFriends = (key) => {
    this.setState({ setModalisOpen: true, setKey: key })
  }
  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <BillForm />

          <Table called>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>List OF Bills</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.state.biller && this.state.biller.map((data, i) =>
              <>
                <div className='rowC'>
                  <Table celled >
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell >
                          <Label ribbon> {data.data.bill}</Label>
                        </Table.Cell>
                        <Table.Cell>{data.data.amount}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
                <div class="ui small buttons" style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', width: 20, marginLeft: "20%" }}>
                  <button onClick={() => this.addFriends(data.key)} class="ui button">Add friends</button>
                  <div class="or"></div>
                  <button onClick={() => this.renderList(data.key)} class="ui button">Show Friends</button>
                </div>
              </>
            )}
          </Table>
          {/* <AddFriendsModal addFriendModalOpen={this.state.setModalisOpen} /> */}
          <Modal isOpen={this.state.setModalisOpen}>
            <Form size="large">
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
              </Segment>
            </Form>
            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'center' }}>
              <div style={{ alignContent: 'center', width: 100 }}>
                <Button
                  onClick={(e) => this.collectAmount(e)}
                  color="orange"
                  fluid
                  size="small">
                  Submit
                        </Button>
              </div>
              <div style={{ paddingLeft: 10, alignContent: 'center', width: 100 }}>
                <Button
                  onClick={() => this.setState({ setModalisOpen: false })}
                  color="grey"
                  fluid
                  size="small">
                  Cancel
                        </Button>
              </div>
            </div>
          </Modal>
          <div>
            <Modal isOpen={this.state.openModal}>
              <h3 style={{ textAlign: 'center' }}>Take Amount From Friends</h3>
              <Table called>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Order</Table.HeaderCell>
                    <Table.HeaderCell>Bill</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {this.state.renderFriendList && this.state.renderFriendList.map((list) =>
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
                <button onClick={() => this.setState({ openModal: false })} class="small ui button">Close</button>
              </div>

            </Modal>
          </div>
        </Grid.Column>
      </Grid >
    );
  }
}
export default Demo;
