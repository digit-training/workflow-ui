import './App.css';
import Playground from './pages/Playground';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Playground />
        </DndProvider>
    </div>
  );
}

export default App;
