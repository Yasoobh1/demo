import React from 'react';
import logo from '../logo.svg';
import { Grid } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
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
    const { collectionFriend, collectAmount, description, setKey } = this.state
    if (collectionFriend && collectAmount && description) {
      this.setState({ setModalisOpen: false })
      e.preventDefault()
      firebase
        .database()
        .ref(`users/${setKey}/friendList`)
        .push({
          collectionFriend: collectionFriend,
          collectAmount: collectAmount,
          description: description
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

  logOut = () => {
    this.props.history.push('/login')
  }
  render() {
    const { biller, setModalisOpen, collectionFriend, collectAmount, description, openModal, renderFriendList } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>

          <BillForm />

          <BillTable renderList={this.renderList} addFriends={this.addFriends} biller={biller} />

          <AddFriendsModal addFriendModalOpen={setModalisOpen} collectionFriend={collectionFriend} handleAddFriends={this.handleAddFriends} collectAmount={collectAmount} description={description}
            closeAddFriendsModal={this.closeAddFriendsModal} collectdata={this.collectAmount}
          />

          <ShowFriendListModal closeFriendListModal={this.closeFriendListModal} openModal={openModal} renderFriendList={renderFriendList} />
          <button onClick={() => this.logOut()} class="small ui button">LogOut</button>
        </Grid.Column>
      </Grid >
    );
  }
}
export default Demo;
