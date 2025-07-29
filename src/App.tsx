import { Provider } from 'react-redux';
import { store } from './store';
import MainTheme from './themes/MainTheme';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Provider store={store}>
      <MainTheme>
        <AppRouter />
      </MainTheme>
    </Provider>
  );
}

export default App;
