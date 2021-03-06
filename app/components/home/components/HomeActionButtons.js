import React, { Component, PropTypes } from 'react'
import {
  View,
  Button
} from 'react-native'

export default class HomeActionButtons extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight'
  }
  render () {
    const { navigation, logout, createNotification } = this.props
    return (
      <View>
        <Button
          onPress={() => navigation.navigate('AddFlight')}
          title='Add Flight'
            />
        <Button
          onPress={() => navigation.navigate('ViewFlights')}
          title='View Flights at risk'
            />
        <Button
          onPress={() => createNotification()}
          title='Create Notification'
            />
        <Button
          onPress={() => logout()}
          title='Log Out'
            />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
// })
