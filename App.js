

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, PermissionsAndroid, Alert, TouchableOpacity, Button} from 'react-native';
// import Parent1 from './parent.js';
// import Children1 from './children';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// import  RNCamera  from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      latitude: 0,
      longitude: 0,
      routeCoordinates: [],
      distanceTravelled: 0,
      recordLocation:[],
      prevLatLng: {},
      coordinate: {
        latitude: 0,
        longitude: 0
      }
    }
    console.log("Parent:constructor");
  }

  async componentWillMount(){
    // navigator.geolocation.requestAuthorization();
    if(Platform.OS == 'android'){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Cool Photo App Camera Permission',
            'message': 'Cool Photo App needs access to your camera ' +
                       'so you can take awesome pictures.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          console.log("Camera permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  componentDidMount() {
    // this.watchID = navigator.geolocation.watchPosition(
    //   position => {
    //     console.log("watch:"+JSON.stringify(position));
    //     Alert.alert("watch:"+JSON.stringify(position));
    //     const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
    //     const { latitude, longitude } = position.coords;
        
    //     const newCoordinate = {
    //       latitude,
    //       longitude
    //     };
    //     if (Platform.OS === "android") {
    //       if (this.marker) {
    //         // this.marker._component.animateMarkerToCoordinate(
    //         //   newCoordinate,
    //         //   500
    //         // );
    //        }
    //      } else {
    //       //  coordinate.timing(newCoordinate).start();
    //      }
    //      console.log("setState:"+JSON.stringify({
    //         latitude,
    //         longitude,
    //         routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //         prevLatLng: newCoordinate
    //       }));
    //       Alert.alert("setState:"+JSON.stringify({
    //         latitude,
    //         longitude,
    //         routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //         prevLatLng: newCoordinate
    //       }));
    //       var newRecord = {
    //         latitude : latitude,
    //         longitude: longitude
    //       }
    //       var recordLocation = this.state.recordLocation;
    //       recordLocation.push(newRecord);
    //       AsyncStorage.setItem('recordLocation', JSON.stringify(recordLocation));
    //       this.setState({
    //         latitude,
    //         longitude,
    //         routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //         prevLatLng: newCoordinate,
    //         recordLocation: recordLocation
    //       });
    //    },
    //    error => console.log(error),
    //    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  }

  onSuccess(e) {
    Alert.alert("found:"+e.data);
    console.log("found:"+JSON.stringify(e));
    // this.scanner.reactivate();
    setTimeout(() => {
      this.scanner.reactivate();
    }, 1000);
  }

  async clickIt(){
        const options = { quality: 0.5, base64: true };
        // console.log("nen inthe:"+JSON.stringify(this.camera.takePictureAsync(options)));capture
        // const data = await this.camera.takePictureAsync(options);
        const data = await this.camera.capture();
        console.log(JSON.stringify(data));
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
            <Text style={styles.welcome}>QR and Barcode Scanner</Text>
            <Button title={'Snap'} onPress={()=>{this.clickIt()}}/>
        </View>
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          ref={(node) => { this.scanner = node }}
          topContent={
            <Text style={styles.centerText}>
              Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
        {/* <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.camera
          }
          type={'back'}
          Aspect={5}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log("barcodes:"+JSON.stringify(barcodes));
            Alert.alert("barcodes detected");
          }}
          onBarCodeRead = {(barcode)=>{
            console.log("barcode:"+JSON.stringify(barcode));
            Alert.alert("barcode"+JSON.stringify(barcode));
          }}
          onFacesDetected = {(detectedFace)=>{
            console.log("detectedFace:"+JSON.stringify(detectedFace));
            Alert.alert("face detected");
          }}
          onTextRecognized = {(textRecog)=>{
            console.log("textRecog:"+JSON.stringify(textRecog));
            Alert.alert("textRecog detected");
          }}

        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  camera: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
});
