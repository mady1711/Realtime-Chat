import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';


function App() {
  return(
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />    
      {/* something unusual line 11 route path="/chat"*/}
    </div>
  );
}

export default App;
