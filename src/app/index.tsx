import { Redirect } from 'expo-router';
import useStore from '../store/store';

export default function Index() {
  const isSignedIn = useStore((state) => state.isSignedIn);
  
  return <Redirect href={isSignedIn ? "/(main)" : "/(auth)"} />;
}