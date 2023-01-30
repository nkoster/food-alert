import {Text, StyleSheet, View, FlatList, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Context} from '../context/ProductContext';
import React, {useContext} from 'react'
function Details() {

  const navigation = useNavigation()

  const {state} = useContext(Context);

  if (!state.product_name) {
    navigation.navigate('Home')
  }

  const nutriments =  Object.entries(state.nutriments)
    .filter((key) => key[0].includes('_100g'))
  console.log(nutriments.length, Object.entries(state.nutriments).length);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{state.product_name}</Text>
      </View>
      <View style={styles.status}>
        <View style={styles.flatList}>
          <Text style={styles.nutrimentsText}>nutriments per 100g</Text>
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
        <View>
          <Button title={'Home'} onPress={() => navigation.navigate('Home')} />
        </View>
        <View>
          <Button title={'Raw'} onPress={() => navigation.navigate('Unknown')} />
        </View>
      </View>
    </View>
  );
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  title: {
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 20,
  },
  nutrimentsText: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    paddingBottom: 30,
  },
  flatList: {
    width: '100%',
    paddingBottom: 30,
  },
  flatListItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
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
