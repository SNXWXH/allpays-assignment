import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PaymentListPage } from '@/pages/PaymentListPage';
import { MerchantListPage } from '@/pages/MerchantListPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MerchantListPage />} />
        <Route path='/payments' element={<PaymentListPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
