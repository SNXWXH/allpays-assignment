import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PaymentListPage } from '@/pages/PaymentListPage';
import { MerchantListPage } from '@/pages/MerchantListPage';

import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MerchantListPage />} />
        <Route path='/payments' element={<PaymentListPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
