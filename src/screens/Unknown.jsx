import {Text, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Context} from '../context/ProductContext';
import React, {useContext} from 'react'
function Unknown() {

  const navigation = useNavigation()
  const {state} = useContext(Context);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{JSON.stringify(state, null, 2)}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Unknown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  title: {
    // fontSize: 20,
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 20,
  },
  flatList: {
    width: '100%',
  },
  flatListItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  keyText: {
    fontSize: 20,
    paddingLeft: 50,
    maxWidth: '70%',
  },
  valueText: {
    fontSize: 20,
    paddingRight: 50,
  },
  button: {
    alignItems: 'center',
    width: '100%',
  }
})
