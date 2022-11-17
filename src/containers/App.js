import { BrowserRouter } from 'react-router-dom';
import ContentView from './ContentView';
import LoginView from './LoginView';
import { useSelector, } from 'react-redux'

function App() {

  const isLoggedIn = useSelector(state=> state.login.value.logged)

  return (
    <div>
      <BrowserRouter>
        {isLoggedIn
        ?
        <ContentView />
        :
        <LoginView />
      }
      </BrowserRouter>
    </div>
  );
}

export default App;
