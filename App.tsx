import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { persistor, store } from './src/redux/store/store';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/rootNavigator/RootNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './src/components/ui/Loader';
import { LogBox } from 'react-native';

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  LogBox.ignoreAllLogs(); // Ignore all log notifications

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '34196151101-e6h8hnn253mk87l64ctcgc5bvdkdq6eo.apps.googleusercontent.com',
      offlineAccess: true,
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <Provider store={store}>
       <PersistGate loading={<Loader />} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
