import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { AuthProvider } from "./src/context/auth.context";

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </Provider>
  )

}

export default App;
