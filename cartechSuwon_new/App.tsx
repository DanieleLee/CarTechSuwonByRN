import AppContainer from '@components/AppContainer';
import {NavigationContainer} from '@react-navigation/native';
import {clearAsyncStorage} from '@utils/asyncStorage';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import AppNavigator from 'src/navigation';
import AuthNavigator from 'src/navigation/AuthNavigator';
import store from 'src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient();

const App = () => {
  clearAsyncStorage().then(() => {
    console.log('logged out');
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AppContainer>
            <AppNavigator />
          </AppContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
