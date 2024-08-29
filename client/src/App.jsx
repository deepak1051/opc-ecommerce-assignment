import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './components/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
