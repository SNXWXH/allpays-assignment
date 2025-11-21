import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <h1 className='text-6xl font-bold text-gray-800'>404</h1>
      <p className='mt-4 text-xl text-gray-600'>페이지를 찾을 수 없습니다</p>
      <Link
        to='/'
        className='mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
