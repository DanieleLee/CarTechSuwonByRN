import AppContainer from '@components/AppContainer';
import {NavigationContainer} from '@react-navigation/native';
import {clearAsyncStorage} from '@utils/asyncStorage';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import AppNavigator from 'src/navigation';
import AuthNavigator from 'src/navigation/AuthNavigator';
import store from 'src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil'; // 전역상태관리

const queryClient = new QueryClient();

const App = () => {
  clearAsyncStorage().then(() => {
    console.log('logged out');
  });

  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <AppContainer>
                <AppNavigator />
              </AppContainer>
            </SafeAreaProvider>
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
};

export default App;
