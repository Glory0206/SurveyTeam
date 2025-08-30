import { useState, useEffect } from 'react';
import { mockApi } from '../api/mockApi';

export const useSurveyApp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mode, setMode] = useState(null); 
    const [currentView, setCurrentView] = useState('list');
    const [activeSurveyId, setActiveSurveyId] = useState(null);
    const [authView, setAuthView] = useState('login');

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const fetchedSurveys = await mockApi([
                    { id: 1, title: '고객 만족도 설문조사', questions: [
                        {id: 101, text: '이름을 입력해주세요.', type: 'text', options: []},
                        {id: 102, text: '선호하는 계절은 무엇인가요?', type: 'radio', options: ['봄', '여름', '가을', '겨울']},
                    ]},
                    { id: 2, title: '팀 점심 메뉴 선호도 조사', questions: [] }
                ]);
                setSurveys(fetchedSurveys);
            } catch (error) {
                alert("데이터를 불러오는 데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleLogin = async (email, password) => {
        console.log(`[LOGIN ATTEMPT] email: ${email}`);
        await mockApi({});
        setCurrentUser({ id: email, name: email.split('@')[0] });
    };
    
    const handleSignUp = async (email, password) => {
        console.log(`[SIGNUP ATTEMPT] email: ${email}`);
        await mockApi({});
        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        setAuthView('login');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setMode(null);
        setAuthView('login');
        setCurrentView('list');
        setActiveSurveyId(null);
    };

    const handleCreateSurvey = async (title) => {
        const newSurvey = { id: Date.now(), title, questions: [] };
        await mockApi(newSurvey);
        console.log('🚀 [CREATE] 서버로 전송될 새 설문 데이터:', newSurvey);
        setSurveys(prev => [...prev, newSurvey]);
    };

    const handleUpdateSurvey = (updatedSurvey) => {
        console.log('🔄 [UPDATE] 서버로 전송할 업데이트 데이터:', updatedSurvey);
        setSurveys(surveys.map(s => s.id === updatedSurvey.id ? updatedSurvey : s));
    };

    const handleDeleteSurvey = async (id) => {
        await mockApi({});
        console.log(`🗑️ [DELETE] 서버에 삭제 요청할 설문 ID: ${id}`);
        setSurveys(surveys.filter(s => s.id !== id));
    };

    const handleSubmitSurvey = async (submissionData) => {
        await mockApi({});
        console.log('📝 [SUBMIT] 서버로 전송할 응답 데이터:', submissionData);
    }

    const activeSurvey = surveys.find(s => s.id === activeSurveyId);

    return {
        currentUser, surveys, isLoading, mode, currentView, authView, activeSurvey,
        handleLogin, handleSignUp, handleLogout, handleCreateSurvey, handleUpdateSurvey,
        handleDeleteSurvey, handleSubmitSurvey, setMode, setCurrentView, setActiveSurveyId, setAuthView
    };
};