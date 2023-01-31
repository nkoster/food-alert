import {Text, StyleSheet, View, ScrollView, Button} from 'react-native'
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
      <View style={styles.button}>
        <Button
          title="Scanner"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
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
  button: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  }
})
