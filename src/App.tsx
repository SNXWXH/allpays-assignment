import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PaymentListPage } from '@/pages/PaymentListPage';
import { MerchantListPage } from '@/pages/MerchantListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MerchantListPage />} />
        <Route path='/payments' element={<PaymentListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
