import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Context} from '../context/ProductContext';
import React, {useContext} from 'react'
function Details() {

  const navigation = useNavigation()

  const {state} = useContext(Context);

  if (!state) {
    navigation.navigate('Home')
  } else {
    if (!state.product_name) {
      navigation.navigate('Home')
    }
  }

  if (state.status === 0) {
    navigation.navigate('Unknown')
  }

  if (!state.nutriments) {
    navigation.navigate('Unknown')
  }

  const nutriments =  Object.entries(state.nutriments)
    .filter((key) => key[0].includes('_100g'))
``
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{state.product_name}</Text>
      </View>
      <View style={styles.status}>
        <View style={styles.flatList}>
          <FlatList
            style={styles.flatList}
            data={nutriments}
            renderItem={({item}) => (
              <View style={styles.flatListItem}>
                <Text style={styles.keyText}>{item[0].split('_')[0]}</Text>
                <Text style={styles.valueText}>{item[1]}</Text>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Unknown')}
        >
          <Text>Raw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Details

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
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  }
})
