import React from 'react';
import { AdminIcon, UserIcon } from '../components/icons';

function ModeSelectionPage({ onSelectMode }) {
    return (
        <div className="w-full max-w-3xl animate-fade-in">
             <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800">모드 선택</h1>
                <p className="text-slate-500 mt-2 text-lg">어떤 목적으로 플랫폼을 이용하시나요?</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 space-y-8">
                <div className="flex flex-col md:flex-row gap-6 pt-4">
                    <button onClick={() => onSelectMode('admin')} className="flex-1 flex flex-col items-center justify-center p-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition transform hover:-translate-y-1">
                        <AdminIcon />
                        <span className="text-2xl font-bold mt-4">관리자 페이지</span>
                        <span className="mt-1 text-indigo-200">설문 생성 및 관리</span>
                    </button>
                    <button onClick={() => onSelectMode('user')} className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-800 hover:bg-slate-900 text-white rounded-xl shadow-lg transition transform hover:-translate-y-1">
                        <UserIcon />
                        <span className="text-2xl font-bold mt-4">사용자 페이지</span>
                        <span className="mt-1 text-slate-400">설문 응답하기</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModeSelectionPage;