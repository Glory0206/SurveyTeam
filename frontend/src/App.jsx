import React from 'react';
import { useSurveyApp } from './hooks/useSurveyApp';

// 컴포넌트 및 페이지 임포트
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ModeSelectionPage from './pages/ModeSelectionPage';
import AdminSurveyList from './pages/AdminSurveyList';
import UserSurveyList from './pages/UserSurveyList';
import SurveyCreator from './pages/SurveyCreator';
import SurveyForm from './pages/SurveyForm';

export default function App() {
  const {
    currentUser, surveys, isLoading, mode, currentView, authView, activeSurvey,
    handleLogin, handleSignUp, handleLogout, handleCreateSurvey, handleUpdateSurvey,
    handleDeleteSurvey, handleSubmitSurvey, setMode, setCurrentView, setActiveSurveyId, setAuthView
  } = useSurveyApp();

  const renderContent = () => {
    if (!currentUser) {
      if (authView === 'login') {
        return <LoginPage onLogin={handleLogin} onNavigateToSignUp={() => setAuthView('signup')} />;
      }
      return <SignUpPage onSignUp={handleSignUp} onNavigateToLogin={() => setAuthView('login')} />;
    }
    if (isLoading) {
      return <div className="text-center p-12 text-slate-500">데이터를 불러오는 중...</div>;
    }
    if (!mode) {
      return <ModeSelectionPage onSelectMode={setMode} />;
    }
    switch (currentView) {
      case 'create':
        return <SurveyCreator survey={activeSurvey} onUpdateSurvey={handleUpdateSurvey} onBack={() => setCurrentView('list')} />;
      case 'respond':
        return <SurveyForm survey={activeSurvey} currentUser={currentUser} onBack={() => setCurrentView('list')} onSubmit={handleSubmitSurvey} />;
      case 'list':
      default:
        if (mode === 'admin') {
          return <AdminSurveyList 
            surveys={surveys} 
            onCreateSurvey={handleCreateSurvey}
            onDeleteSurvey={handleDeleteSurvey}
            onStartSurvey={(id) => { setActiveSurveyId(id); setCurrentView('respond'); }}
            onManageSurvey={(id) => { setActiveSurveyId(id); setCurrentView('create'); }}
            onBack={() => setMode(null)} 
          />;
        }
        if (mode === 'user') {
          return <UserSurveyList 
            surveys={surveys} 
            onStartSurvey={(id) => { setActiveSurveyId(id); setCurrentView('respond'); }} 
            onBack={() => setMode(null)} 
          />
        }
        return null;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col items-center p-4 font-sans antialiased">
      <Header 
        currentUser={currentUser} 
        mode={mode}
        onLogout={handleLogout}
        onChangeMode={() => setMode(null)}
      />
      <main className="w-full max-w-3xl">
        {renderContent()}
      </main>
    </div>
  );
}