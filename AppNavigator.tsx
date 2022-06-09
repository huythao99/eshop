import * as React from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/interface/Navigation';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import MyTabs from './src/navigation/tabs/BottomTabs';
import DetailProductScreen from './src/screens/main/category/DetailProductScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [user, setUser] = React.useState<any>(null);

  // Handle user state changes

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(u => {
      setUser(u);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="BottomTabs" component={MyTabs} />
            <Stack.Screen
              name="DetailProductScreen"
              component={DetailProductScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
