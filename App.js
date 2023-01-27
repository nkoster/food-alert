import React, {useEffect, useState} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Vibration, FlatList} from 'react-native'
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [scanning, setScanning] = useState(false);
  const [text, setText] = useState('No barcode scanned');
  const [ingredients, setIngredients] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate();
    setScanned(true);
    const t = `type: ${type}\ndata: ${data}`
    setText(t)
    // setScanning(false)
    console.log(t);
    fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      .then(response => response.json())
      .then(data => {
        if (!data.product) {
          setIngredients('');
          // setText('No product found');
          return;
        }
        setIngredients(JSON.stringify(data.product.nutriments || []));
        // setIngredients(data.product.categories_tags || []);
        console.log('DATA',JSON.stringify(data, null, 2));
      })
      .catch(error => {
        setIngredients('');
        setText('Bar code lookup failed');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.statusText}>{text}</Text>
        <View style={styles.flatList}>
          {/*{ingredients.length > 0 ? <FlatList*/}
          {/*  data={ingredients}*/}
          {/*  renderItem={({ item }) => <Text>{item}</Text>}*/}
          {/*/> : <Text>No ingredients found</Text>}*/}
          <Text>{ingredients}</Text>
        </View>
      </View>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false)
              setText('Scanning...')
            }}
          >
            <Text>Scan Again</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  status: {
    position: 'relative',
    top: 40,
    // left: 100,
    // right: 100,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#DDDDDD'
  },
  statusText: {
    fontSize: 20,
    padding: 10,
  },
  flatList: {
    position: 'relative',
    width: '100%',
    zIndex: 1000,
  }
});
