import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routes } from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './config/store';

function App() {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
    </>
  );
}

export default App;