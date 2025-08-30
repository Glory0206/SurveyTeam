import React from 'react';
import { BackIcon } from '../components/icons';

function UserSurveyList({ surveys, onStartSurvey, onBack }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 space-y-8 animate-fade-in">
            <div className="flex items-center gap-4 border-b pb-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><BackIcon /></button>
                <h2 className="text-3xl font-bold text-slate-800">참여 가능한 설문 목록</h2>
            </div>
            
            <div className="space-y-4">
                {surveys.map(survey => (
                    <div key={survey.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 gap-4">
                        <span className="text-slate-700 font-medium flex-grow">{survey.title}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => onStartSurvey(survey.id)} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">응답하러 가기</button>
                        </div>
                    </div>
                ))}
                {surveys.length === 0 && <p className="text-slate-500 text-center py-4">참여할 수 있는 설문이 없습니다.</p>}
            </div>
        </div>
    );
}

export default UserSurveyList;