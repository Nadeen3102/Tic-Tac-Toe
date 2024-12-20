import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import the LinearGradient component
import MaskedView from '@react-native-masked-view/masked-view';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: false,
      board: Array(9).fill(null),
      isXNext: true,
      
    };
  }

  // Helper function to calculate winner
  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  handlePress = (index) => {
    const { board, isXNext } = this.state;
    const winner = this.calculateWinner(board);

    // Ignore if the square is already taken or there's a winner
    if (board[index] || winner) return;

    // Update board
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    this.setState({
      board: newBoard,
      isXNext: !isXNext,
    });
  };

  restartGame = () => {
    this.setState({
      board: Array(9).fill(null),
      isXNext: true,
    });
  };

  renderSquare = (index) => {
    const { board } = this.state;
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => this.handlePress(index) }
      >
        <MaskedView
          style={{
            flex: 1,
            flexDirection: 'row',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
          maskElement={
            <Text
              style={{
                fontSize: 60,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Signika-Bold',
              }}
            >
              {board[index]}
            </Text>
          }
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={['#E585D3', '#882AA1']} // Gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </MaskedView>
      </TouchableOpacity>
    );
  };

  render() {
    const { board, isXNext } = this.state;
    const winner = this.calculateWinner(board);

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#33ccff', '#ff99cc']}
          style={styles.Gradient}
        >
          <Text style={styles.title}>Tic Tac Toe</Text>

          <View style={styles.board}>
            <View style={styles.row}>
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </View>
            <View style={styles.row}>
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </View>
            <View style={styles.row}>
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </View>
          </View>

          {winner ? (
            <Text style={styles.resultText}>Winner: {winner}</Text>
          ) : (
            <Text style={styles.resultText}>
              Current Player: {isXNext ? 'X' : 'O'}
            </Text>
          )}

          <TouchableOpacity
            style={styles.restartButton}
            onPress={this.restartGame}
          >
            <Text style={styles.restartText}>Restart Game</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  Gradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Signika-Bold',
    margin: '5%',
  },
  board: {
    width: 300,
    height: 300,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    flex: 1,
    height: 100,
    borderWidth: 3,
    borderColor: '#fff' ,
    borderRadius: 10,
    margin: '1%',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 0.5,
    
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  resultText: {
    fontSize: 20,
    marginTop: '10%',
    color: '#fff',
    fontFamily: 'Signika-Bold',
    fontWeight:"bold"
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    height: '7%',
    width: '50%',
    backgroundColor: '#33ccff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Signika-Bold',
  },
});

export default App;
