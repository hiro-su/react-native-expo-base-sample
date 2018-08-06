import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Button,
} from 'react-native';
import Expo, { Permissions, Notifications } from 'expo';
import _ from 'lodash';

import * as masterActions from '../actions/master';

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications: null,
      token: null,
    };
  }

  componentDidMount() {
    this._registerPushNotificationService();
    this.listeners = Notifications.addListener(this._onPushNotification);
  }

  _registerPushNotificationService = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') return;

    const token = await Notifications.getExpoPushTokenAsync();
    this.setState({ token });
    console.warn(`!!!!! my token is: ${token}`);
  }

  _onPushNotification = notifications => {
    this.setState({ notifications });

    const localNotification = {
      title: '通知だよ',
      body: JSON.stringify(notifications.data)
    };

    Notifications.presentLocalNotificationAsync(localNotification);
  }

  _onPressChangeState = () => {
    const { requestProcess } = this.props;
    requestProcess();
  }

  render() {
    const { isProcessing } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>test! state => {isProcessing ? 'true' : 'false'} </Text>
          {
            this.state.notifications && <Text>{JSON.stringify(this.state.notifications)}</Text>
          }
          <Button
            onPress={this._onPressChangeState}
            title="change state!"
            color="#841584"
            accessibilityLabel="Learn more abount this purple button"
          />
          <Text>token { this.state.token }</Text>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View>
            <Text>navigation/MainTabNavigator.js</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  }, 
})

function mapStateToProps(state, props) {
  const {
    isProcessing
  } = state.rootReducer.master;

  return {
    isProcessing,
    master: state.rootReducer.master,
  };
}

export default connect(
  mapStateToProps,
  { ..._.pickBy(masterActions, a => _.isFunction(a)) }
)(HomeScreen);