import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import the LinearGradient component
import MaskedView from '@react-native-masked-view/masked-view';


const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => handlePress(index)}
    >
      <MaskedView
      style={{ flex: 1, flexDirection: 'column', height: '100%' }}
      maskElement={
        
          <Text
            style={{
              fontSize: 60,
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {board[index]}
          </Text>
      
      }
    >


      {/* Shows behind the mask, you can put anything here, such as an image */}
      <View style={{ flex: 1, height: '100%', backgroundColor: '#0054b4' }} />
      <View style={{ flex: 1, height: '100%', backgroundColor: '#40e0d0' }} />
      
    </MaskedView>

     
    </TouchableOpacity>
  );

  return (

    <View style={styles.container}>
      <LinearGradient
        colors={['#33ccff', '#ff99cc']}
        style={styles.Gradient} // Apply gradient to title
      >

        <Text style={styles.title}>Tic Tac Toe</Text>


        <View style={styles.board}>

          <View style={styles.row}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}

          </View>
          <View style={styles.row}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </View>
          <View style={styles.row}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </View>

        </View>

        {winner ? (
          <Text style={styles.resultText}>Winner: {winner}</Text>
        ) : (
          <Text style={styles.resultText}>Current Player: {isXNext ? 'X' : 'O'}</Text>
        )}

        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
          <Text style={styles.restartText}>Restart Game</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

// Helper function to determine the winner
const calculateWinner = (squares) => {
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

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  Gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    fontWeight:"bold",
    color: 'white', // Ensure text is visible over gradient
    fontFamily:"Signika-Bold",
    margin:"5%",

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
    borderRadius: 10,
    margin: "1%",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 0.5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
    color:"#fff",
    fontFamily:"Signika-Bold",
  },
  resultText: {
    fontSize: 20,
    marginTop: "10%",
    color:"#fff",
    fontFamily:"Signika-Bold",

  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    height:"7%",
    width:"50%",
    backgroundColor: '#33ccff',
    borderRadius: 20,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  restartText: {
    color: '#fff',
    fontSize: 22,
    fontWeight:"bold",
    textAlign:"center",
    fontFamily:"Signika-Bold",
    
    
  },
});

export default App;
