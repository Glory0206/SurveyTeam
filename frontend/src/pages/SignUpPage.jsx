import React, { useState } from 'react';
import Spinner from '../components/Spinner';

function SignUpPage({ onSignUp, onNavigateToLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        setIsLoading(true);
        try {
            await onSignUp(email, password);
        } catch (error) {
            console.error("Signup component error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">회원가입</h1>
                    <p className="text-slate-500 mt-2">새로운 계정을 만들어보세요.</p>
                </div>
                <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                        <label htmlFor="email-signup" className="block text-slate-700 font-semibold mb-2">이메일 주소</label>
                        <input id="email-signup" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="password-signup" className="block text-slate-700 font-semibold mb-2">비밀번호</label>
                        <input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 생성"
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password-signup" className="block text-slate-700 font-semibold mb-2">비밀번호 확인</label>
                        <input id="confirm-password-signup" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 다시 입력"
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg" />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-3 px-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:bg-indigo-400 transition-colors">
                        {isLoading ? <><Spinner /> 가입 중...</> : '가입하기'}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-slate-500">
                        이미 계정이 있으신가요?{' '}
                        <button onClick={onNavigateToLogin} className="font-semibold text-indigo-600 hover:underline">로그인</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;