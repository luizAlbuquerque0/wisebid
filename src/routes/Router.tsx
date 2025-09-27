import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { useAuth } from '~/hooks/useAuth';

export function Router() {
  const {signedIn} = useAuth();

  return (
    <NavigationContainer>{signedIn ? <PrivateRoutes /> : <PublicRoutes />}</NavigationContainer>
  );
}
