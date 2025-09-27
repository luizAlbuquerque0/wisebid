import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '~/constants/colors';
import Home from '~/screens/Home';
import Membership from '~/screens/Membership';
import Wallet from '~/screens/Wallet';

export type BottomTabsParamList = {
  Home: undefined;
  Wallet: undefined;
  Membership: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const icons = {
  Home: 'home-outline',
  Wallet: 'wallet-outline',
  Membership: 'star-outline',
} as const;

export function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: '#E5E7EB',
          height: 85,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#6B7280',
        tabBarIcon: ({ focused, color }) => {
          const iconName = icons[route.name as keyof typeof icons] || 'ellipse-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: 'Carteira',
        }}
      />
      <Tab.Screen
        name="Membership"
        component={Membership}
        options={{
          tabBarLabel: 'Membership',
        }}
      />
    </Tab.Navigator>
  );
}
