import React, {useContext, useEffect, useState} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Vibration, Button, ActivityIndicator} from 'react-native'
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import {Context} from '../context/ProductContext';
import { Ionicons } from '@expo/vector-icons';
import {getProduct} from '../api'

export default function Home() {

  const scanningText = 'scanning...';

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState(scanningText);
  const [unknown, setUnknown] = useState(false);
  const {state, update} = useContext(Context);

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

  const handleBarCodeScanned = async ({ type, data }) => {
    Vibration.vibrate();
    setScanned(true);
    setUnknown(false);
    const t = `type: ${type}\ndata: ${data}`
    setText(t)
    console.log(t);
    const productData = await getProduct(data)
    if (productData.product) {
      update(productData.product);
      navigation.navigate('Details');
    } else {
      update(productData);
      setUnknown(true);
      navigation.navigate('Unknown');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <TouchableOpacity
          style={styles.statusButton}
          onPress={() => {
            if (state) {
              if (unknown) {
                navigation.navigate('Unknown')
              } else {
                navigation.navigate('Details');
              }
            }
          }}
        >
          <Text style={styles.statusText}>{text}</Text>
          {text !== scanningText && text !== 'cancelled'
            ? !unknown
              ? <Ionicons name="ios-arrow-forward" size={32} color="black" />
              : <Ionicons name="ios-arrow-forward" size={32} color="red" />
            : null
          }
        </TouchableOpacity>
      </View>
      {!scanned && text !== scanningText
        ? <View style={styles.scanningTextContainer}>
          <View style={styles.scanningTextView}>
            <ActivityIndicator size="small" color="black" />
            <Text style={styles.scanningText}>{scanningText}</Text>
          </View>
        </View>: null}
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.scanButtonView}>
          <View style={styles.scanButton}>
            {scanned
              ? <Button
                title={'scan bar code'}
                onPress={() => {
                  setScanned(false)
                }}
              />
              : <Button
                title={'cancel'}
                onPress={() => {
                  setScanned(true)
                  if (text === scanningText ) setText('cancelled')
                }}
              />
            }
          </View>
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
  statusButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scanButtonView: {
    position: 'absolute',
    bottom: 90,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
  },
  scanButton: {
    backgroundColor: '#DDDDDD',
    position: 'absolute',
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    zIndex: 1001,
    borderRadius: 25,
  },
  status: {
    position: 'relative',
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#DDDDDD',
  },
  statusText: {
    fontSize: 20,
    padding: 10,
  },
  scanningTextContainer: {
    position: 'absolute',
    top: 100,
    width: '100%',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningTextView: {
    width: '45%',
    opacity: 0.8,
    borderRadius: 25,
    zIndex: 1001,
    backgroundColor: 'limegreen',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  scanningText: {
    fontSize: 20,
    // color: 'white',
    paddingRight: 10,
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
