import {useContext} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import {Context} from '../context/ProductContext';

export default function Additives() {

  const {state} = useContext(Context)

  const additives = Array.isArray(state.additives_tags) ? state.additives_tags : [];

  return (
    <View style={styles.container}>
      <View style={styles.flatListView}>
        <FlatList
          data={additives}
          renderItem={({item}) => (
            <View style={styles.flatListItem}>
              <Text style={styles.additiveText}>{item.split(':')[1]}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  additiveText: {
    fontSize: 20,
    padding: 10,
  },
})
