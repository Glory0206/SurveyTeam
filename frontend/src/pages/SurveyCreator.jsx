import React, { useState } from 'react';
import { BackIcon, TrashIcon } from '../components/icons';

function SurveyCreator({ survey, onUpdateSurvey, onBack }) {
    const [newQuestion, setNewQuestion] = useState({ text: '', type: 'text', options: [''] });
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [editingQuestionData, setEditingQuestionData] = useState(null);

    const updateQuestions = (newQuestions) => {
        onUpdateSurvey({ ...survey, questions: newQuestions });
    };

    const addQuestion = () => {
        if (!newQuestion.text) { alert('질문 내용을 입력해주세요.'); return; }
        const finalQuestion = { id: Date.now(), ...newQuestion, options: newQuestion.options.filter(opt => opt.trim() !== '') };
        updateQuestions([...survey.questions, finalQuestion]);
        setNewQuestion({ text: '', type: 'text', options: [''] });
    };

    const removeQuestion = (id) => {
        updateQuestions(survey.questions.filter(q => q.id !== id));
    };

    const handleStartEdit = (question) => {
        setEditingQuestionId(question.id);
        setEditingQuestionData({ ...question });
    };

    const handleCancelEdit = () => {
        setEditingQuestionId(null);
        setEditingQuestionData(null);
    };

    const handleSaveEdit = () => {
        const finalEditData = {
            ...editingQuestionData,
            options: (editingQuestionData.options || []).filter(opt => opt.trim() !== '')
        };
        const updatedQuestions = survey.questions.map(q =>
            q.id === editingQuestionId ? finalEditData : q
        );
        updateQuestions(updatedQuestions);
        handleCancelEdit();
    };

    const handleEditingChange = (e) => {
        const { name, value } = e.target;
        setEditingQuestionData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditingTypeChange = (e) => {
        const newType = e.target.value;
        setEditingQuestionData(prev => {
            const newState = {...prev, type: newType};
            if ((newType === 'radio' || newType === 'checkbox') && !newState.options?.length) {
                newState.options = [''];
            }
            return newState;
        });
    }

    const handleEditingOptionChange = (index, value) => {
        const newOptions = [...editingQuestionData.options];
        newOptions[index] = value;
        setEditingQuestionData(prev => ({ ...prev, options: newOptions }));
    };

    const addEditingOption = () => {
        setEditingQuestionData(prev => ({
            ...prev,
            options: [...(prev.options || []), '']
        }));
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion({ ...newQuestion, options: updatedOptions });
    };
    
    const addOption = () => {
        setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 space-y-8 animate-fade-in">
            <div className="flex items-center gap-4 border-b pb-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><BackIcon/></button>
                <h2 className="text-3xl font-bold text-slate-800">{survey.title} &gt; 문항 관리</h2>
            </div>

            <div className="space-y-4">
                {survey.questions.map((q, index) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg">
                        {editingQuestionId === q.id ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    name="text"
                                    value={editingQuestionData.text}
                                    onChange={handleEditingChange}
                                    className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md font-medium"
                                />
                                <select 
                                    value={editingQuestionData.type} 
                                    onChange={handleEditingTypeChange}
                                    className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                                >
                                    <option value="text">주관식 (한 줄)</option>
                                    <option value="textarea">주관식 (여러 줄)</option>
                                    <option value="radio">객관식 (단일 선택)</option>
                                    <option value="checkbox">객관식 (복수 선택)</option>
                                </select>

                                { (editingQuestionData.type === 'radio' || editingQuestionData.type === 'checkbox') &&
                                    <div className="space-y-2 pl-4 border-l-2 border-indigo-200">
                                        <h4 className="text-sm font-semibold text-slate-600">선택지 목록</h4>
                                        {(editingQuestionData.options || []).map((opt, optIndex) => (
                                            <input
                                                key={optIndex}
                                                type="text"
                                                value={opt}
                                                placeholder={`선택지 ${optIndex + 1}`}
                                                onChange={(e) => handleEditingOptionChange(optIndex, e.target.value)}
                                                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                                            />
                                        ))}
                                        <button onClick={addEditingOption} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">+ 선택지 추가</button>
                                    </div>
                                }
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={handleCancelEdit} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg">취소</button>
                                    <button onClick={handleSaveEdit} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg">저장</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="text-slate-700 font-medium">{index + 1}. {q.text} ({q.type})</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleStartEdit(q)} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg">수정</button>
                                    <button onClick={() => removeQuestion(q.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"><TrashIcon /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="space-y-4 border-t pt-8">
                <h3 className="text-xl font-semibold text-slate-700">새 문항 추가</h3>
                <input type="text" placeholder="질문 내용을 입력하세요" value={newQuestion.text} onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg" />
                <select value={newQuestion.type} onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value, options: [''] })} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg" >
                    <option value="text">주관식 (한 줄)</option>
                    <option value="textarea">주관식 (여러 줄)</option>
                    <option value="radio">객관식 (단일 선택)</option>
                    <option value="checkbox">객관식 (복수 선택)</option>
                </select>
                {(newQuestion.type === 'radio' || newQuestion.type === 'checkbox') && (
                    <div className="space-y-2 pl-4 border-l-2 border-indigo-200">
                        {newQuestion.options.map((option, index) => (<input key={index} type="text" placeholder={`선택지 ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md" />))}
                        <button onClick={addOption} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">+ 선택지 추가</button>
                    </div>
                )}
                <button onClick={addQuestion} className="w-full py-3 px-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition">문항 추가하기</button>
            </div>
        </div>
    );
}

export default SurveyCreator;