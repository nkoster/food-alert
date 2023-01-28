import {Text, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Context} from '../context/ProductContext';
import React, {useContext} from 'react'
function Details() {

  const navigation = useNavigation()

  const {state} = useContext(Context);

  if (!state.product_name) {
    navigation.navigate('Home')
  }

  const text = state.product_name + '\n' +
    JSON.stringify(state._keywords, null, 2) + '\n' +
    JSON.stringify(state.allergens_tags, null, 2) + '\n' +
    JSON.stringify(state.nutriments, null, 2) + '\n'
  console.log('STATE', state);

  return (
    <View>
      <Text style={styles.text}>
        {state.product_name}
      </Text>
      <View style={styles.status}>
        {/*<Text style={styles.statusText}>{text}</Text>*/}
        <View style={styles.flatList}>
          {/*{ingredients.length > 0 ? <FlatList*/}
          {/*  data={ingredients}*/}
          {/*  renderItem={({ item }) => <Text>{item}</Text>}*/}
          {/*/> : <Text>No ingredients found</Text>}*/}
          <ScrollView style={styles.scrollview}>
            <Text>{text}</Text>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go to Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Details

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  }
})
