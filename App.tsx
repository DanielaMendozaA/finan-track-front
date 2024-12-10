import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from 'react-redux';
import store from './src/redux/store';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  )

}

export default App;
