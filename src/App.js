import React from 'react';
import logo from './logo.svg';
import { Grid, Form, Segment, Header, Button, Message, Icon, Label, Menu, Table } from "semantic-ui-react";
import "./config"
import * as firebase from 'firebase'
import Modal from 'react-modal';
import './App.css';
var billArray = [];
var friendList = []
class App extends React.Component {

  state = {
    bill: '',
    amount: '',
    data: [],
    friendName: '',
    friendsAmount: '',
    showInput: false,
    collectAmount: '',
    showCollect: false,
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


    var ref = firebase.database().ref('payer');
    ref.on('value', this.gotPayer)

  }

  gotPayer = (data) => {
    if (data) {
      var users = data.val();
      if (users) {
        var keys = Object.keys(users)
        if (keys) {
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            this.setState({
              renderPayer: this.state.renderPayer.concat(users[k])
            })
          }
        }
      }
    }
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

  Submit = (e) => {
    if (this.state.bill && this.state.amount) {
      this.setState({ showInput: true })

    }
    e.preventDefault()
    firebase
      .database()
      .ref("users")
      .push({
        bill: this.state.bill,
        amount: this.state.amount,
      })
  }

  friendSubmit = (e) => {
    if (this.state.friendName && this.state.friendsAmount) {
      this.setState({ showCollect: true })
    }
    e.preventDefault()
    firebase
      .database()
      .ref("payer")
      .push({
        friendName: this.state.friendName, friendsAmount: this.state.friendsAmount
      })
  }

  collectAmount = (e) => {
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
          {!this.state.showInput ? <Form onSubmit={(e) => this.Submit(e)} size="large">
            <h1>Total Bill</h1>

            <Segment stacked>
              <Form.Input
                fluid
                name="bill"
                iconPosition="left"
                placeholder="Bill"
                onChange={e => this.setState({ bill: e.target.value })}
                type="text" />

              <Form.Input
                fluid
                name="amount"
                iconPosition="left"
                placeholder="Amount"
                onChange={e => this.setState({ amount: e.target.value })}
                type="text" />

              <Button
                color="orange"
                fluid
                size="large">
                Submit
            </Button>

            </Segment>

          </Form> : ''}


          {this.state.showInput ? <Form onSubmit={(e) => this.friendSubmit(e)} size="large">
            <Segment stacked>
              <h1>Pay Total Amount</h1>
              <Form.Input
                fluid
                name="friendname"
                // icon="user"
                iconPosition="left"
                placeholder="Friend Name"
                onChange={e => this.setState({ friendName: e.target.value })}
                type="text" />

              <Form.Input
                fluid
                name="amount"
                iconPosition="left"
                placeholder="Amount"
                onChange={e => this.setState({ friendsAmount: e.target.value })}
                type="text" />

              <Button
                color="orange"
                fluid
                size="large">
                Submit
            </Button>

            </Segment>
          </Form> : ''}
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
                  {/* <div style={{ paddingRight: '100%' }}><h3>{data.data.bill}</h3></div> */}
                  {/* <div><h3>{data.data.amount}</h3></div> */}
                  {/* <div><Icon name="plus square outline" color="violet" onClick={() => this.renderList(data.key)} /></div> */}

                  {/* <Button onClick={() => this.addFriends(data.key)}>Add Friends</Button> */}

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


                </div>
                <div><Icon name="plus square outline" color="violet" onClick={() => this.renderList(data.key)} /></div>
              </>

            )}
          </Table>


          <>
            <Modal isOpen={this.state.openModal}>

              <h1>Take Amount From Friends</h1>
              {this.state.renderFriendList && this.state.renderFriendList.map((list) =>
                <div className='rowC'>
                  {console.log(list, "LISTTTTTTTTTTTTTT IN RENDER")}
                  <div style={{ paddingRight: '20%' }} >
                    <h3 >{list && list.data.collectionFriend}</h3>
                  </div>
                  <div style={{ paddingRight: '20%' }}>
                    <h3>{list && list.data.description}</h3>
                  </div>
                  <div style={{ paddingRight: '20%' }}>
                    <h3>{list && list.data.collectAmount}</h3>
                  </div>
                </div>
              )}

            </Modal>
          </>
          {/* <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label ribbon> COmpany</Label>
                </Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table> */}
        </Grid.Column>
      </Grid >
    );
  }
}
export default App;
