import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const window = Dimensions.get('window');

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.score = 0;
  }

  componentWillMount() {
    let questions = this.props.navigation.state.params.questions;
    let answers = this.props.navigation.state.params.answers;

    questions.forEach((question, i) => {
      if (question.correct_answer === answers[i]) this.score++;
    });
  }

  _playAgain() {
    this.props.navigation.navigate('Home');
  }

  render() {
    let questions = this.props.navigation.state.params.questions;
    let answers = this.props.navigation.state.params.answers;
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.h1}>You scored</Text>
          <Text style={styles.h1}>{this.score} / 10</Text>
        </View>

        <ScrollView style={styles.section}>
          { questions.map((question, i) => {
            let correct = question.correct_answer === answers[i];
            return (
              <View key={i} style={styles.sectionRow}>
                <View style={styles.sectionRowIcon}>
                  { correct ? (
                    <Text style={styles.h1}>+</Text>
                    ) : (
                    <Text style={styles.h1}>-</Text>
                  )}
                </View>
                <View style={{flex: 8}}>
                  <Text style={correct ? {color: '#60ff26'} : {color: '#ff4026'} }>{question.question}</Text>
                </View>
              </View>
            )
          })}
        </ScrollView>

        <TouchableOpacity style={styles.btn} onPress={this._playAgain.bind(this)}>
          <Text style={styles.btnText}>PLAY AGAIN?</Text>
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
    justifyContent: 'center'
  },
  header: {
    height: 100,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    flex: 1,
    width: window.width,
    padding: 10
  },
  sectionRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  sectionRowIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  p: {
    fontSize: 20
  },
  btn: {
    height: 100,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18
  }
});
