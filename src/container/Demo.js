import React from 'react';
import logo from '../logo.svg';
import { Grid, Form, Segment, Button, Label, Table } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import Modal from 'react-modal';
import BillForm from '../components/BillForm';
import AddFriendsModal from '../components/addFriendsModal';
import BillTable from '../components/billTable';
import ShowFriendListModal from '../components/showFriendListModal';

var billArray = [];
class Demo extends React.Component {
  state = {
    collectAmount: '',
    collectionFriend: '',
    setModalisOpen: false,
    description: '',
    openModal: false,
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
    ref.on('value', (childSnapShot) => {
      const result = [];
      childSnapShot.forEach((data) => {
        result.push({ key: data.key, data: data.val() })
      })
      this.setState({
        renderFriendList: result
      })
    })
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

  closeFriendListModal = () => this.setState({ openModal: false })
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

          <AddFriendsModal addFriendModalOpen={this.state.setModalisOpen} collectionFriend={this.state.collectionFriend} handleAddFriends={this.handleAddFriends} collectAmount={this.state.collectAmount} description={this.state.description}
            closeAddFriendsModal={this.closeAddFriendsModal} collectdata={this.collectAmount}
          />

          <ShowFriendListModal closeFriendListModal={this.closeFriendListModal} openModal={this.state.openModal} renderFriendList={this.state.renderFriendList} />
        </Grid.Column>
      </Grid >
    );
  }
}
export default Demo;
