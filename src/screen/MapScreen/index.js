import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import BaseScreen from '../../components/BaseScreen';

import {useNavigation} from '@react-navigation/native';

import MapView, {
  PROVIDER_GOOGLE,
  enableLatestRenderer,
  Marker,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Feather';
enableLatestRenderer();

import styles from './style';

const MapScreen = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [currentLocation, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const onMapReady = () => {
    getUserLocation();
  };

  const getUserLocation = () => {
    console.log('getUserLocation::');
    Geolocation.getCurrentPosition(
      async position => {
        console.log('getUserLocation::position::', position);
        const currLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        };
        setPosition(currLocation);
        mapRef.current.animateToRegion(currLocation);
      },
      async error => {
        // See error code charts below.
        console.log('Geolocation Error' + error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  const setMarkerPosition = d => {
    console.log('setMarkerPosition:::', d);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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
        loadingEnabled
        rotateEnabled={true}>
        <Marker
          ref={markerRef}
          draggable
          onDragEnd={e => {
            const {latitude, longitude} = e.nativeEvent.coordinate;
            console.log('dragEnd', e.nativeEvent.coordinate);
            const currLocation = {
              latitude,
              longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            };
            setPosition(currLocation);
            mapRef.current.animateToRegion(currLocation);
          }}
          coordinate={currentLocation}
          position={currentLocation}
          centerOffset={{x: -18, y: -60}}
          anchor={{x: 0.69, y: 1}}
          pinColor={'red'}
          onDragStart={setMarkerPosition}
        />
      </MapView>
    </BaseScreen>
  );
};

export default MapScreen;
