import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';

import {Provider} from 'react-redux';

// Redux
import {store} from './redux/store';

// Basic Components
import {setupHttpConfig} from './utils/http';
import {brandColors, isIOS} from './components/Core/basicStyles';

// Navigator
import RootNavigator, {AuthenticatedUserProvider} from './SwitchNavigator';

enableScreens();

const App = () => {
  useEffect(() => {
    setupHttpConfig();
    if (Platform.OS === 'android') {
      requestLocationPermission().then(() => {
        console.log('requested!');
      });
    }
  });

  // Requested for Location permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <AuthenticatedUserProvider>
      <Provider store={store}>
        <StatusBar
          hidden
          translucent
          backgroundColor={brandColors.white}
          bar={isIOS ? 'dark-content' : 'light-content'}
        />
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </Provider>
    </AuthenticatedUserProvider>
  );
};

export default App;
