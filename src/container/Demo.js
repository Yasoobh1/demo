import React from 'react';
import logo from '../logo.svg';
import { Grid, Form, Segment, Button, Label, Table } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import Modal from 'react-modal';
import BillForm from '../components/BillForm';
import AddFriendsModal from '../components/addFriendsModal';
import BillTable from '../components/billTable';

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
  handleAddFriends = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  closeAddFriendsModal = () => {
    this.setState({ setModalisOpen: false })
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
              <BillTable renderList={this.renderList} addFriends={this.addFriends} firebaseKey={data.key} billName={data.data.bill} billAmount={data.data.amount} />
            )}
          </Table>

          <AddFriendsModal addFriendModalOpen={this.state.setModalisOpen} collectionFriend={this.state.collectionFriend}
            handleAddFriends={this.handleAddFriends} collectAmount={this.state.collectAmount} description={this.state.description}
            closeAddFriendsModal={this.closeAddFriendsModal} collectdata={this.collectAmount}
          />

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
        </Grid.Column>
      </Grid >
    );
  }
}
export default Demo;
