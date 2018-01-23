import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Home extends React.Component {

  _onPressButton() {
    this.props.navigation.navigate('Question');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.h1}>Welcome to the</Text>
          <Text style={styles.h1}>Trivia Challenge!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.p}>You will be presented with 10 True or False questions.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.p}>Can you score 100%?</Text>
        </View>

        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
          <Text style={styles.p}>BEGIN</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60
  },
  header: {
    flex: 1
  },
  section: {
    flex: 1
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  p: {
    fontSize: 20,
    textAlign: 'center',
  }
});
