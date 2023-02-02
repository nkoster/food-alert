import {View, Text, StyleSheet, FlatList, Button} from 'react-native'
import {Context} from '../context/ProductContext'
import {useContext} from 'react'
import {useNavigation} from '@react-navigation/native'

export default function Ingredients() {

  const navigation = useNavigation()

  const {state} = useContext(Context)

  const ingredients = state.ingredients

  return (
    <View style={styles.container}>
      {state.ingredients
        ? <FlatList
          data={ingredients}
          renderItem={({item, index}) => (
            <View style={index % 2 !== 0 ? styles.listItemOdd : styles.listItemEven}>
              <Text style={styles.itemText}>{item.text}</Text>
              <Text style={styles.valueText}>
                {Number(item.percent_estimate).toFixed(2)}%
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id + Math.random()}
        />
        : <Text>no ingredients data available</Text>}
      <View style={styles.backButton}>
        <Button title={'Back'} onPress={() => navigation.navigate('Details')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: '80%',
    paddingBottom: 30,
  },
  listItemOdd: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fafafa',
  },
  listItemEven: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: '80%',
    textTransform: 'lowercase',
    overflow: 'hidden',
  },
  valueText: {
    fontSize: 16,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  backButton: {
    paddingBottom: 30,
  }
})
