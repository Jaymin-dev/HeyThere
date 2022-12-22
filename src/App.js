import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {setupHttpConfig} from './utils/http';
import {store} from './redux/store';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {isIOS} from './components/Core/basicStyles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator, {AuthenticatedUserProvider} from './SwitchNavigator';
import {enableScreens} from 'react-native-screens';

enableScreens();

const App = props => {
  useEffect(() => {
    setupHttpConfig();
    if (Platform.OS === 'android') {
      requestLocayionPermission().then(() => {
        console.log('requested!');
      });
    }
  });

  const requestLocayionPermission = async () => {
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
          backgroundColor={'#FFF'}
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
