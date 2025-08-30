import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { BackIcon } from '../components/icons';

function SurveyForm({ survey, currentUser, onBack, onSubmit }) {
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const currentValues = formData[name] || [];
            const newValues = checked ? [...currentValues, value] : currentValues.filter(v => v !== value);
            setFormData(prev => ({ ...prev, [name]: newValues }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = { 
            surveyId: survey.id,
            userId: currentUser.id,
            responses: formData 
        };
        
        setIsSubmitting(true);
        try {
            await onSubmit(submissionData);
            alert('설문에 응답해주셔서 감사합니다!');
            setFormData({});
            onBack();
        } catch (error) {
            console.error("Survey submission failed:", error)
            alert("설문 제출에 실패했습니다. 다시 시도해주세요.")
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderQuestion = (q) => {
        switch (q.type) {
            case 'text': return <input type="text" name={q.id} value={formData[q.id] || ''} onChange={handleChange} className="mt-2 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg" />;
            case 'textarea': return <textarea name={q.id} value={formData[q.id] || ''} onChange={handleChange} rows="4" className="mt-2 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg"></textarea>;
            case 'radio': return <div className="mt-2 space-y-2">{q.options.map((opt, index) => <label key={opt} className="flex items-center p-2 rounded-md hover:bg-slate-100"><input type="radio" name={q.id} value={index} checked={formData[q.id] == index} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-slate-300" /><span className="ml-3 text-slate-700">{opt}</span></label>)}</div>;
            case 'checkbox': return <div className="mt-2 space-y-2">{q.options.map((opt, index) => <label key={opt} className="flex items-center p-2 rounded-md hover:bg-slate-100"><input type="checkbox" name={q.id} value={index} checked={(formData[q.id] || []).includes(index.toString())} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-slate-300 rounded" /><span className="ml-3 text-slate-700">{opt}</span></label>)}</div>;
            default: return null;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 animate-fade-in">
            <div className="flex items-center gap-4 border-b pb-4 mb-8">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><BackIcon/></button>
                <h2 className="text-3xl font-bold text-slate-800">{survey.title}</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                {survey.questions.map(q => (<div key={q.id}><label className="block text-slate-700 font-semibold">{q.text}</label>{renderQuestion(q)}</div>))}
                {survey.questions.length > 0 && (
                    <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center py-4 px-4 font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl shadow-lg transition disabled:bg-slate-500">
                        {isSubmitting ? <><Spinner /> 제출 중...</> : '설문 제출하기'}
                    </button>
                )}
            </form>
        </div>
    );
}

export default SurveyForm;