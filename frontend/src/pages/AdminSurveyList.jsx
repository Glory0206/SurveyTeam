import React, { useState } from 'react';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { BackIcon, TrashIcon } from '../components/icons';

function AdminSurveyList({ surveys, onCreateSurvey, onDeleteSurvey, onStartSurvey, onManageSurvey, onBack }) {
    const [newSurveyTitle, setNewSurveyTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [surveyToDelete, setSurveyToDelete] = useState(null);

    const handleAddSurvey = async () => {
        if (!newSurveyTitle.trim() || isCreating) return;
        setIsCreating(true);
        try {
            await onCreateSurvey(newSurveyTitle);
            setNewSurveyTitle('');
        } catch(error) {
            console.error("Survey creation failed:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const openDeleteModal = (survey) => {
        setSurveyToDelete(survey);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (surveyToDelete) {
            onDeleteSurvey(surveyToDelete.id);
        }
        setIsModalOpen(false);
        setSurveyToDelete(null);
    };

    
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="설문 삭제 확인"
            >
                <p>정말로 '<span className="font-bold">{surveyToDelete?.title}</span>' 설문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            </Modal>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 space-y-8 animate-fade-in">
                <div className="flex items-center gap-4 border-b pb-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><BackIcon /></button>
                    <h2 className="text-3xl font-bold text-slate-800">내 설문 목록 (관리자)</h2>
                </div>
                
                <div className="space-y-4">
                    {surveys.map(survey => (
                        <div key={survey.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 gap-4">
                            <span className="text-slate-700 font-medium flex-grow">{survey.title}</span>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => onStartSurvey(survey.id)} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">응답하기</button>
                                <button onClick={() => onManageSurvey(survey.id)} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition">관리</button>
                                <button onClick={() => openDeleteModal(survey)} className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"><TrashIcon /></button>
                            </div>
                        </div>
                    ))}
                    {surveys.length === 0 && <p className="text-slate-500 text-center py-4">생성된 설문이 없습니다.</p>}
                </div>

                <div className="space-y-4 border-t pt-8">
                    <h3 className="text-xl font-semibold text-slate-700">새 설문 만들기</h3>
                    <div className="flex gap-4">
                        <input type="text" placeholder="새 설문 제목 입력" value={newSurveyTitle} onChange={e => setNewSurveyTitle(e.target.value)} disabled={isCreating} className="flex-grow block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg disabled:bg-slate-200" />
                        <button onClick={handleAddSurvey} disabled={isCreating || !newSurveyTitle.trim()} className="w-28 flex items-center justify-center px-6 py-3 font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl shadow-lg transition disabled:bg-slate-500 disabled:cursor-not-allowed">
                           {isCreating ? <Spinner/> : '추가'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSurveyList;