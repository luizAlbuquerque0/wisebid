import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabsNavigator } from './BottomTabsNavigator';

export type PrivateStackParamList = {
  BottomTabs: undefined;
  PropertyDetails: { id: string };
  ModuleDetails: { slug: string };
  MapView: undefined;
  Profile: { userId: string };
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export function PrivateRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
    </Stack.Navigator>
  );
}
