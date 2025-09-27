import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Login} from '~/screens/Login';

export type PublicStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

export function PublicRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
