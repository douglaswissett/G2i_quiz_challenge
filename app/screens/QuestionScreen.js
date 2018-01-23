import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import HTMLView from 'react-native-htmlview';

const window = Dimensions.get('window');

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      current: 0,
      loaded: false,
      selector: false
    }
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        questions: response.results,
        loaded: true
      });
    });
  }

  _onPressButton() {
    this.setState(previousState => {
      return { selector: !previousState.selector };
    });
  }

  _answerQuestion(bool) {
    if (this.state.current === 9) {
      const { questions, answers } = this.state;
      this.props.navigation.navigate('Result', {questions: questions, answers: answers});
      return;
    };

    this.setState(previousState => {
      return {
        answers: [...previousState.answers, bool],
        current: previousState.current + 1,
        selector: !previousState.selector
      };
    });
  }

  render() {
    const { questions, current, loaded, selector } = this.state;
    return (
      <View style={styles.container}>

        { loaded ? (
          <TouchableOpacity
            style={styles.card}
            onPress={this._onPressButton.bind(this)}>
            { selector ? (
              <View style={styles.selector}>

                <TouchableOpacity
                  onPress={this._onPressButton.bind(this)}
                  style={styles.selectorClose}>
                  <Text style={[styles.p,{fontWeight: 'bold'}]}>X</Text>
                </TouchableOpacity>

                <View style={{flex: 1, backgroundColor: '#9cff8d'}}>
                  <TouchableOpacity
                    onPress={() => this._answerQuestion('True')}
                    style={styles.selectorBtn}>
                    <Text style={[styles.p,{fontWeight: 'bold'}]}>True</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, backgroundColor: '#ff8d8d'}}>
                  <TouchableOpacity
                    onPress={() => this._answerQuestion('False')}
                    style={styles.selectorBtn}>
                    <Text style={[styles.p,{fontWeight: 'bold'}]}>False</Text>
                  </TouchableOpacity>
                </View>
              </View>
              ) : (
              <HTMLView
                value={`<p>${questions[current].question}</p>`}
                stylesheet={styles} />
            )}
          </TouchableOpacity>
          ) : (
          <ActivityIndicator />
        )}

        <Text style={styles.pCount}>{current + 1} of 10</Text>

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
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: window.width - 80,
    height: window.width - 80
  },
  p: {
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  },
  pCount: {
    fontSize: 16,
    padding: 15
  },
  selector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  selectorBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectorClose: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 80,
    height: 70,
    zIndex: 1
  }
});
