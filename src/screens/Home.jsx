import React, {useContext, useEffect, useState} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Vibration} from 'react-native'
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import {Context} from '../context/ProductContext';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

  const scanningText = 'scanning bar code...';

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState(scanningText);
  const [unknown, setUnknown] = useState(false);
  const {update} = useContext(Context);

  const navigation = useNavigation()

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
    console.log(t);
    fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      .then(response => response.json())
      .then(data => {
        /*
        information about data:
        data.product._keywords holds product keywords in an array
        data.product.allergens_tags holds allergens in an array
        data.product.categories_tags holds categories in an array (if available)
        */
        if (data.product) {
          update(data.product);
          setUnknown(false);
          navigation.navigate('Details');
        } else {
          update(data);
          setUnknown(true);
          navigation.navigate('Unknown');
        }
      })
      .catch(error => {
        setText('Bar code lookup failed');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <TouchableOpacity
          style={styles.statusButton}
          onPress={() => {
          if (unknown) {
            navigation.navigate('Unknown')
          } else {
            navigation.navigate('Details');
          }
        }}>
          <Text style={styles.statusText}>{text}</Text>
          {scanned
            ? !unknown
              ? <Ionicons name="ios-arrow-forward" size={32} color="black" />
              : <Ionicons name="ios-arrow-forward" size={32} color="red" />
            : null
          }
        </TouchableOpacity>
      </View>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={scanned ? styles.scanButtonView : styles.scanButtonViewDisabled}>
          <TouchableOpacity
            disabled={!scanned}
            style={styles.scanButton}
            onPress={() => {
              setScanned(false)
              setText(scanningText)
            }}
          >
            <Text style={styles.scanButtonText}>{scanned ? 'scan bar code' : scanningText}</Text>
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
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 1001,
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1001,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1001,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1001,
  },
  statusButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scanButtonView: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonViewDisabled: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  scanButton: {
    width: '70%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    zIndex: 1001,
    borderRadius: 25,
  },
  scanButtonText: {
    fontSize: 20,
    padding: 5,
  },
  status: {
    position: 'relative',
    top: 40,
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
  },
  scrollview: {
    position: 'relative',
    width: '100%',
    zIndex: 1000,
    maxHeight: '80%',
  }
});
