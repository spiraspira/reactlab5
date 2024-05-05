import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import './App.css';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
           <AppRouter/>
        </BrowserRouter>
        <Footer/>
    </div>
           
);
};

export default App;