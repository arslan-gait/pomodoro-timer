import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import vibrate from "./components/utils/vibrate";

type Props = {};

const chillLongTime = 10;
const workTime = 2;
const chillShortTime = 1;
const chillLongText = 'Chilling long, woohoo!!!';
const chillText = 'Chilling, yay!!!';
const workText = 'You should work now!!!';
const cycles = 1;

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      value: workTime,
      isPaused: true,
      statusText: 'Pomodoro timer',
      status: 'START',
      isRelax: false,
      cycleNumber: 0
    };
  }

  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  componentDidMount(): void {
    this.timer = setInterval(() =>
    {
      this.decrementClock();
    }, 1000);
  }

  decrementClock = () => {
    if (!this.state.isPaused && this.state.value > 0)
      this.setState({
        value: this.state.value - 1,
      });
    else if (this.state.value === 0) {
      vibrate();
      if (this.state.cycleNumber === cycles) {
        this.setState({
          value: chillLongTime,
          isRelax: true,
          statusText: chillLongText,
          cycleNumber: -1
        });
      }
      else if (!this.state.isRelax) {
        this.setState({
          value: chillShortTime,
          isRelax: true,
          statusText: chillText,

        });
      }
      else if (this.state.cycleNumber < cycles) {
        this.setState({
          value: workTime,
          isRelax: false,
          statusText: workText,
          cycleNumber: this.state.cycleNumber + 1
        });
      }
    }
  };

  pause = () => {
    this.setState({
      isPaused: !this.state.isPaused,
      statusText: this.state.isRelax ? chillText : workText,
      status: this.state.isPaused === true ? 'PAUSE' : 'CONTINUE',
    })
  };

  reset = () => {
    this.setState({
      value: workTime,
      isPaused: true,
      statusText: 'Pomodoro timer',
      status: 'START',
      isRelax: false,
      cycleNumber: 0
    })
  };

  getTime = () => {
    return new Date(1000 * this.state.value).toISOString().substr(11, 8);
  };

  render() {
    return (
        <View style={styles.container}>
          <Text h1>{this.state.statusText}</Text>
          <Text style={{fontSize: 70}}>
            {this.getTime()}
          </Text>
          <Button
              onPress={this.pause}
              title={this.state.status}
              color="green"
          />

          <Button
              onPress={this.reset}
              title={'RESET'}
              color='red'
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
