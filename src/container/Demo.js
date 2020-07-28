import React from 'react';
import logo from '../logo.svg';
import { Grid } from "semantic-ui-react";
import "../config"
import * as firebase from 'firebase'
import BillForm from '../components/BillForm';
import AddFriendsModal from '../components/addFriendsModal';
import BillTable from '../components/billTable';
import ShowFriendListModal from '../components/showFriendListModal';
import { clearUser } from '../actions';
import { connect } from 'react-redux';


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
    var billRef = firebase.database().ref(`records/${this.props.currentUser.user.uid}`)
    billRef.on('value', (childSnapShot) => {
      const billResult = [];
      childSnapShot.forEach((data) => {
        billResult.push({ key: data.key, data: data.val() })
      })
      this.setState({
        biller: billResult
      })
    })

  }

  collectAmount = (e) => {
    const { collectionFriend, collectAmount, description, setKey } = this.state
    if (collectionFriend && collectAmount && description) {
      this.setState({ setModalisOpen: false })
      e.preventDefault()
      firebase
        .database()
        .ref(`records/${setKey}/friendList`)
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
    var ref = firebase.database().ref(`records/${key}/friendList`);
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
    this.props.clearUser();
    firebase.auth().signOut().then(() =>  {
      this.props.history.push('/login')
      this.props.clearUser()
  })
  }

  removeData = (key) => {
    firebase.database().ref(`records/${this.props.currentUser.user.uid}/${key}`).remove()
    firebase.database().ref(`records/${key}`).remove()

  }
  render() {
    const { biller, setModalisOpen, collectionFriend, collectAmount, description, openModal, renderFriendList } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>

          <BillForm />

          <BillTable renderList={this.renderList} addFriends={this.addFriends} biller={biller} removeData={this.removeData}/>

          <AddFriendsModal addFriendModalOpen={setModalisOpen} collectionFriend={collectionFriend} handleAddFriends={this.handleAddFriends} collectAmount={collectAmount} description={description}
            closeAddFriendsModal={this.closeAddFriendsModal} collectdata={this.collectAmount}
          />

          <ShowFriendListModal closeFriendListModal={this.closeFriendListModal} openModal={openModal} renderFriendList={renderFriendList} />
          <div style={{paddingTop:20}}>
           <button onClick={() => this.logOut()} class="small ui button">LogOut</button>
          </div>
        </Grid.Column>
      </Grid >
    );
  }
}
const mapStateFromProps = state => ({
  currentUser: state.auth.currentUser
})
export default connect(mapStateFromProps, { clearUser })(Demo);

