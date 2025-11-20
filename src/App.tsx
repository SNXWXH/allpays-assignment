import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PaymentListPage } from '@/pages/PaymentListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/payments' element={<PaymentListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
