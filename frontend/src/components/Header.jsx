import React from 'react';

function Header({ currentUser, mode, onLogout, onChangeMode }) {
  return (
    <header className="w-full max-w-3xl mb-8 animate-fade-in">
      {currentUser ? (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800">
            <span className="text-indigo-600">Survey</span> Platform
          </h1>
          <div className="text-right">
            <p className="text-slate-600">
              환영합니다, <span className="font-bold">{currentUser.name}</span>님!
              {mode && ` (${mode === 'admin' ? '관리자 모드' : '사용자 모드'})`}
            </p>
            <div>
              {mode && (
                <>
                  <button onClick={onChangeMode} className="text-sm font-semibold text-indigo-600 hover:underline">모드 변경</button>
                  <span className="text-sm text-slate-400 mx-2">|</span>
                </>
              )}
              <button onClick={onLogout} className="text-sm font-semibold text-indigo-600 hover:underline">로그아웃</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mt-4">통합 설문조사 플랫폼</h1>
          <p className="text-slate-500 mt-2 text-lg">다양한 설문을 만들고, 응답하고, 관리하세요.</p>
        </div>
      )}
    </header>
  );
}

export default Header;