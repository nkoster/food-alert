import {useContext} from 'react'
import {View, Text, StyleSheet, FlatList, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Context} from '../context/ProductContext'
import enummers from '../data/enummers.json'

export default function Additives() {

  const {state} = useContext(Context)

  const navigation = useNavigation()

  const additives = Array.isArray(state.additives_tags)
    ? state.additives_tags
    : [];

  const additivesSimple = additives.map(additive => additive.split(':')[1].toUpperCase())

  const enummersFiltered = enummers.filter(item => additivesSimple.includes(item.code))

  return (
    <View style={styles.container}>
      <View style={styles.flatListView}>
        <FlatList
          data={enummersFiltered}
          renderItem={({item}) => (
            <View style={styles.flatListItem}>
              <Text style={styles.additiveCodeText}>{item.code}</Text>
              <Text style={styles.additiveText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.backButtonView}>
        <Button title={'Back'} onPress={() => navigation.goBack()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  flatList: {
    paddingTop: 50,
    width: '94%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListView: {
    paddingTop: 50,
    width: '94%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  additiveCodeText: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
  },
  additiveText: {
    fontSize: 16,
    padding: 10,
    textAlign: 'right',
  },
  backButtonView: {
    bottom: 60,
  },
})
