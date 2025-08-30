import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { LoginIcon } from '../components/icons';

function LoginPage({ onLogin, onNavigateToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
        await onLogin(email, password);
    } catch (error) {
        console.error("Login component error:", error);
    } finally {
        setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">로그인</h1>
            <p className="text-slate-500 mt-2">설문조사 플랫폼을 이용하려면 로그인하세요.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">이메일 주소</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg"/>
            </div>
            <div>
                <label htmlFor="password" className="block text-slate-700 font-semibold mb-2">비밀번호</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg"/>
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-3 px-4 font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl disabled:bg-slate-500 transition-colors">
                {isLoading ? <><Spinner /> 로그인 중...</> : <><LoginIcon /> <span className="ml-2">로그인</span></>}
            </button>
        </form>
        <div className="text-center mt-6">
            <p className="text-slate-500">
                계정이 없으신가요?{' '}
                <button type="button" onClick={onNavigateToSignUp} className="font-semibold text-indigo-600 hover:underline">
                    회원가입
                </button>
            </p>
        </div>
        </div>
    </div>
  );
}

export default LoginPage;