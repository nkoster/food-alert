import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native'
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
  console.log('NUTRIENTS', JSON.stringify(nutriments, null, 2));

  // const text = state.product_name
    // JSON.stringify(state._keywords, null, 2) + '\n' +
    // JSON.stringify(state.allergens_tags, null, 2) + '\n'
    // JSON.stringify(nutriments, null, 2) + '\n'
  console.log('STATE', state.nutriments);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{state.product_name}</Text>
      </View>
      <View style={styles.status}>
        {/*<Text style={styles.statusText}>{text}</Text>*/}
        <View style={styles.flatList}>
          {/*{ingredients.length > 0 ? <FlatList*/}
          {/*  data={ingredients}*/}
          {/*  renderItem={({ item }) => <Text>{item}</Text>}*/}
          {/*/> : <Text>No ingredients found</Text>}*/}
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text>Home</Text>
      </TouchableOpacity>
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
  }
})
