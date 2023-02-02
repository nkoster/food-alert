import {Text, StyleSheet, View, FlatList, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Context} from '../context/ProductContext';
import React, {useContext, useEffect} from 'react'
function Details() {

  const navigation = useNavigation()

  const {state, update} = useContext(Context);

  useEffect(() =>{
    if (!state.product_name) {
      if (state.product_name_en) {
        update({...state, product_name: state.product_name_en})
      } else if (state.product_name_nl) {
        update({...state, product_name: state.product_name_nl})
      } else {
        update({...state, product_name: 'No product name'})
      }
    }
  }, [])

  if (!state.product_name) {
    return <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{'Loading...'}</Text>
      </View>
    </View>
  }

  const nutriments =  Object.entries(state.nutriments)
    .filter((key) => key[0].includes('_100g'))
  console.log(nutriments.length, Object.entries(state.nutriments).length);

  const additives = Array.isArray(state.additives_tags) ? state.additives_tags : [];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{state.product_name.toUpperCase()}</Text>
      </View>
      <View style={styles.status}>
        <View style={styles.flatList}>
          <Text style={styles.nutrimentsText}>nutriments per 100g</Text>
          <FlatList
            style={styles.flatList}
            data={nutriments}
            renderItem={({item, index}) => (
              <View style={index % 2 === 0 ? styles.flatListItemEven : styles.flatListItemOdd}>
                <Text style={styles.keyText}>{item[0].split('_')[0]}</Text>
                <Text style={styles.valueText}>{item[1]}</Text>
              </View>
            )}
          />
          <View style={styles.buttonsNav}>
          {state.ingredients && <View>
            <Button
              title={'Ingredients'}
              onPress={() => navigation.navigate('Ingredients')}
            />
          </View>}
          {additives.length > 0 && <View>
            <Button
              title={'Additives'}
              onPress={() => navigation.navigate('Additives')}
            />
          </View>}
          </View>
        </View>
      </View>
      <View style={styles.buttonsBottom}>
        <View>
          <Button title={'Scanner'} onPress={() => navigation.navigate('Home')} />
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
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 14,
    fontWeight: 'bold',
  },
  nutrimentsText: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    paddingBottom: 20,
  },
  flatList: {
    width: '100%',
    paddingBottom: 30,
  },
  flatListItemOdd: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#fafafa',
  },
  flatListItemEven: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
  },
  ingredientsView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 20,
    maxWidth: '70%',
  },
  valueText: {
    fontSize: 20,
    paddingRight: 20,
  },
  button: {
    alignItems: 'center',
    width: '100%',
  },
  buttonsNav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  buttonsBottom: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  }
})
