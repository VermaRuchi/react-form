import './App.css';
import FormComponent from './Components/FormComponent';
import Typography from '@material-ui/core/Typography';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h3">User Form </Typography>
        <FormComponent/>
      </header>
    </div>
  );
}

export default App;
