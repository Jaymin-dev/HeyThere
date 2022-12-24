import React, {createContext, useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Components
import TabBar from './components/TabBar';
import ProcessingWheel from './components/ProcessingWheel';

// Core style and colors
import {brandColors} from './components/Core/basicStyles';

// Screens
import ChatList from './screen/ChatList';
import MapScreen from './screen/MapScreen';
import ChatScreen from './screen/ChatScreen';
import SignIn from './screen/Authentication/SignIn';
import SignUp from './screen/Authentication/SignUp';
import ForgotPassword from './screen/Authentication/ForgotPassword';

const Stack = createStackNavigator();
const AppBottomTab = createBottomTabNavigator();

const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="TabScreen" component={AppTabScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

const AppTabScreen = () => {
  return (
    <AppBottomTab.Navigator
      initialRouteName="Map"
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: brandColors.buttonColor,
        gestureEnabled: false,
        style: {
          backgroundColor: brandColors.appBackgroundColor,
        },
      }}>
      <AppBottomTab.Screen name="Map" component={MapScreen} />
      <AppBottomTab.Screen name="ChatList" component={ChatList} />
    </AppBottomTab.Navigator>
  );
};

const RootNavigator = () => {
  const {user, setUser} = useContext(AuthenticatedUserContext);

  const [isLoading, setIsLoading] = useState(false);

  function onAuthStateChanged(authenticatedUser) {
    authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <SafeAreaProvider>
        <NavigationContainer>
          {user ? <ChatStack /> : <AuthStack />}
        </NavigationContainer>
        <ProcessingWheel />
      </SafeAreaProvider>
    </React.Fragment>
  );
};

export default RootNavigator;
