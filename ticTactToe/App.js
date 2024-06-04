import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'native-base';

let itemArray = new Array(9).fill('empty');

const App = () => {
  const [gameState, updateGameState] = useState({
    isCross: false,
    winMessage: '',
    disabledBtn: true,
  });

  const drawItem = itemNumber => {
    if (!gameState.winMessage) {
      if (itemArray[itemNumber] === 'empty') {
        itemArray[itemNumber] = gameState.isCross;
        updateGameState(
          Object.assign({}, gameState, {
            isCross: !itemArray[itemNumber],
            disabledBtn: false,
          })
        );
      }

      winGame();
    }
  };

  const chooseItemIcon = itemNumber => {
    if (itemArray[itemNumber] !== 'empty') {
      return itemArray[itemNumber] ? 'cross' : 'circle';
    } else {
      return 'pencil';
    }
  };

  const chooseItemColor = itemNumber => {
    if (itemArray[itemNumber] !== 'empty') {
      return itemArray[itemNumber] ? 'red' : 'green';
    } else {
      return 'black';
    }
  };

  const resetGame = () => {
    itemArray.fill('empty');
    updateGameState(
      Object.assign({}, gameState, {
        winMessage: '',
        isCross: false,
        disabledBtn: true,
      })
    );
  };

  const winGame = () => {
    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] == itemArray[1] &&
      itemArray[1] == itemArray[2]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat(' WIN'),
        })
      );
    } else if (
      itemArray[3] !== 'empty' &&
      itemArray[3] == itemArray[4] &&
      itemArray[4] == itemArray[5]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat(' WIN'),
        })
      );
    } else if (
      itemArray[6] !== 'empty' &&
      itemArray[6] == itemArray[7] &&
      itemArray[7] == itemArray[8]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat(' WIN'),
        })
      );
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] == itemArray[3] &&
      itemArray[3] == itemArray[6]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat(' WIN'),
        })
      );
    } else if (
      itemArray[1] !== 'empty' &&
      itemArray[1] == itemArray[4] &&
      itemArray[4] == itemArray[7]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat(' WIN'),
        })
      );
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] == itemArray[5] &&
      itemArray[5] == itemArray[8]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat('  WIN'),
        })
      );
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] == itemArray[4] &&
      itemArray[4] == itemArray[8]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat(' WIN'),
        })
      );
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] == itemArray[4] &&
      itemArray[4] == itemArray[6]
    ) {
      updateGameState(
        Object.assign({}, gameState, {
          winMessage: (gameState.isCross ? 'Cross' : 'Circle').concat(' WIN'),
        })
      );
    }

    if (itemArray.every(ele => ele !== 'empty') && !gameState.winMessage) {
      updateGameState(Object.assign({}, gameState, { winMessage: 'Tie' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.grid}>
        <View style={styles.row}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(0)}>
              <Entypo
                name={chooseItemIcon(0)}
                size={50}
                color={chooseItemColor(0)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(1)}>
              <Entypo
                name={chooseItemIcon(1)}
                size={50}
                color={chooseItemColor(1)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(2)}>
              <Entypo
                name={chooseItemIcon(2)}
                size={50}
                color={chooseItemColor(2)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(3)}>
              <Entypo
                name={chooseItemIcon(3)}
                size={50}
                color={chooseItemColor(3)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(4)}>
              <Entypo
                name={chooseItemIcon(4)}
                size={50}
                color={chooseItemColor(4)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(5)}>
              <Entypo
                name={chooseItemIcon(5)}
                size={50}
                color={chooseItemColor(5)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(6)}>
              <Entypo
                name={chooseItemIcon(6)}
                size={50}
                color={chooseItemColor(6)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(7)}>
              <Entypo
                name={chooseItemIcon(7)}
                size={50}
                color={chooseItemColor(7)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => drawItem(8)}>
              <Entypo
                name={chooseItemIcon(8)}
                size={50}
                color={chooseItemColor(8)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.winMessage}>{gameState.winMessage}</Text>
      <Button
        full
        rounded
        primary
        style={styles.button}
        onPress={resetGame}
        disabled={gameState.disabledBtn}
      >
        <Text style={styles.btnText}>Reset Game</Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 30,
  },
  winMessage: {
    padding: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    margin: 20,
    padding: 10,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;
