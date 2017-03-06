import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class TimePicker extends Component {
  constructor (props) {
    super(props)
    const dateNow = moment().format('DD MM YYYY, h:mm:ss').toString()
    this.state = {
      date: dateNow,
      dateNow: dateNow
    }
  }
  static propTypes = {
    input: PropTypes.any,
    label: PropTypes.any,
    children: PropTypes.any,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.any,
    meta: PropTypes.any,
    minDate: PropTypes.any
  }
  render = () => {
    const {
      input: { onChange },
      meta: { touched, error } } = this.props
    return (
      <View>
        <DatePicker style={styles.picker}
          date={this.state.date}
          mode='datetime'
          placeholder='select date'
          format='DD MM YYYY, h:mm:ss'
          minDate={this.state.dateNow}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          onDateChange={value => {
            this.state.date = value
            onChange(value)
          }}
      />
        {touched && error &&
        <View>
          <Text>{error}</Text>
        </View>}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  picker: {
    width: 300
  }
})

export { TimePicker }
