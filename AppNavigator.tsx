import * as React from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/interface/Navigation';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import MyTabs from './src/navigation/tabs/BottomTabs';
import DetailProductScreen from './src/screens/main/category/DetailProductScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {Easing} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Navigator
        screenOptions={{
          cardOverlayEnabled: true,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 1000,
                easing: Easing.ease,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 1000,
                easing: Easing.ease,
              },
            },
          },
          cardStyleInterpolator: ({current, next}: any) => {
            return {
              cardStyle: {
                opacity: next
                  ? next.progress.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1, 0],
                    })
                  : current.progress.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 0, 1],
                    }),
                transform: [
                  {
                    rotateY: next
                      ? next.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '180deg'],
                        })
                      : current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['180deg', '0deg'],
                        }),
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            };
          },
        }}>
        {!user ? (
          <Stack.Group
            screenOptions={{
              headerShown: false,
              presentation: 'modal',
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              headerShown: false,
              presentation: 'modal',
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
