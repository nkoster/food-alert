import {useContext} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import {Context} from '../context/ProductContext';
import enummers from '../data/enummers.json';

export default function Additives() {

  const {state} = useContext(Context)

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
              <Text style={styles.additiveText}>{item.code}</Text>
              <Text style={styles.additiveText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListView: {
    width: '88%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  additiveText: {
    fontSize: 16,
    padding: 10,
  },
})
