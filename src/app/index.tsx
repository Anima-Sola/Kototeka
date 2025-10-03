import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/store';

export default function Index() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  
  return <Redirect href={isSignedIn ? "/(main)" : "/(auth)"} />;
}