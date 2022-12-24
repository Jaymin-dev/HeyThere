import React, {memo, useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import BaseScreen from '../../components/BaseScreen';

import MapView, {
  PROVIDER_GOOGLE,
  enableLatestRenderer,
  Marker,
  Circle,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

enableLatestRenderer();

import styles from './style';
import {brandColors} from '../../components/Core/basicStyles';
import dayjs from 'dayjs';
import {onPressHandler} from '../../utils/hleperFuntion';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const MapScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [userList, setUserList] = useState([]);
  const [currentLocation, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const onMapReady = () => {
    getUserLocation();
  };
  console.log('userList', userList);
  const getUserLocation = (type = false) => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log('getUserLocation::position::', position);
        const currLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        };
        const userCollection = firestore().collection('Users');
        const userId = auth().currentUser.uid;
        userCollection.doc(userId).update({
          liveLocation: new firestore.GeoPoint(
            currLocation?.latitude,
            currLocation?.longitude,
          ),
        });
        data = currLocation;
        setPosition({...currLocation});
        if (!type) mapRef.current.animateToRegion(currLocation);
      },
      async error => {
        // See error code charts below.
        console.log('Geolocation Error' + error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };
  useEffect(() => {
    const locationUpload = setInterval(() => {
      getUserLocation(true);
    }, 20000);
    return () => clearInterval(locationUpload);
  }, []);

  useEffect(() => {
    const latitude = currentLocation.latitude;
    const longitude = currentLocation.longitude;
    const distance = 0.621371;

    let lat = 0.0144927536231884;
    let lon = 0.0181818181818182;

    let lowerLat = latitude - lat * distance;
    let lowerLon = longitude - lon * distance;

    let greaterLat = latitude + lat * distance;
    let greaterLon = longitude + lon * distance;

    let lesserGeopoint = new firestore.GeoPoint(lowerLat, lowerLon);
    let greaterGeopoint = new firestore.GeoPoint(greaterLat, greaterLon);

    const collectionRef = firestore()
      .collection('Users')
      .where('liveLocation', '>', lesserGeopoint)
      .where('liveLocation', '<', greaterGeopoint);

    const unsubscribe = collectionRef.onSnapshot(
      querySnapshot => {
        const filterData =
          querySnapshot.docs.filter(
            i => i.data().userId !== auth().currentUser.uid,
          ) || [];
        const updateData = filterData
          .map(doc => {
            const liveLocation = doc.data()?.liveLocation;
            return {
              userId: doc.data()?.userId,
              liveLocation,
              name: `${doc.data()?.firstName}  ${doc.data()?.lastName}`,
              image: doc.data()?.image || 'https://i.pravatar.cc/',
              message: doc.data()?.messages,
              timeStemp: dayjs(
                new Date(doc.data()?.timeStemp?.toDate()) || new Date(),
              ).fromNow(),
              _id: doc.data()?._id,
              chatIdArray: doc.data()?.chatIdArray,
            };
          })
          ?.filter(i => i);
        setUserList(updateData);
      },
      e => {
        alert(e);
      },
    );

    return () => unsubscribe();
  }, [currentLocation]);
  const UserMarker = memo(() => {
    return userList.map((i, index) => (
      <Marker
        onPress={onPressHandler(i, navigation, dispatch)}
        key={`key_${i.liveLocation.longitude}_${i.liveLocation.latitude}`}
        coordinate={{
          latitude: i.liveLocation.latitude,
          longitude: i.liveLocation.longitude,
        }}
        position={{
          latitude: i.liveLocation.latitude,
          longitude: i.liveLocation.longitude,
        }}
        pinColor="blue">
        <View>
          <Image
            source={{uri: `https://i.pravatar.cc?img=${index}`}}
            style={styles.toolKit}
          />
        </View>
      </Marker>
    ));
  });
  return (
    <BaseScreen title={'MapScreen'} logout>
      <MapView
        ref={mapRef}
        onMapReady={onMapReady}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={currentLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        draggable={true}
        rotateEnabled={true}>
        <Marker
          ref={markerRef}
          coordinate={currentLocation}
          position={currentLocation}
          centerOffset={{x: -18, y: -60}}
          anchor={{x: 0.69, y: 1}}
          pinColor={'red'}
        />
        <UserMarker />
        <Circle
          center={currentLocation}
          radius={1000}
          fillColor={brandColors.greenLight}
          strokeColor={brandColors.greenColor}
          zIndex={2}
          strokeWidth={3}
        />
      </MapView>
    </BaseScreen>
  );
};

export default MapScreen;
