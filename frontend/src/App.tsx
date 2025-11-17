import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { InspectionDetail } from './pages/InspectionDetail';
import './App.css';

export const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/inspections/:id" element={<InspectionDetail />} />
  </Routes>
);

export default App;
