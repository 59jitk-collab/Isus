
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Profile, ScreenId, PracticeType, Theme, SamplePaper, Progress, QuizQuestion, AIReview, Bookmarks, UserRole } from './types';
import { subjectChapters, mcqData, subjects, subjectIcons, samplePaperData, ncertLinks, subjectiveQuestionsData } from './constants';
import { fetchChapterNotes, askAiGeneral, generateVideoLesson, reviewAnswer } from './geminiService';

// --- SOUND UTILITY ---
const CLICK_SOUND_BASE64 = 'UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSQAAAAIAAgAAAAAAAAAAAAAAAAAAAD//wAA//8AAAAAAAAAAAAAAAA=';
const clickAudio = new Audio(`data:audio/wav;base64,${CLICK_SOUND_BASE64}`);
clickAudio.preload = 'auto';

const playSound = () => {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(e => console.error("Error playing sound:", e));
};

const withSound = <T extends (...args: any[]) => void>(fn?: T): ((...args: any[]) => void) => {
    return (...args: any[]) => {
        playSound();
        fn?.(...args);
    };
};

// --- HELPER & UI COMPONENTS ---

const TopBar: React.FC<{ title: string; backTarget?: ScreenId; onBack: () => void; children?: React.ReactNode; }> = ({ title, backTarget, onBack, children }) => (
    <header className="w-full bg-light-card dark:bg-dark-card shadow-md p-4 flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center">
            {backTarget && (
                <button onClick={withSound(onBack)} className="mr-4 text-xl text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent dark:hover:text-dark-accent" aria-label="Go back">
                    <i className="fas fa-arrow-left"></i>
                </button>
            )}
            <h1 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{title}</h1>
        </div>
        <div>{children}</div>
    </header>
);

const BottomNavBar: React.FC<{ activeScreen: ScreenId; navigate: (screen: ScreenId) => void }> = ({ activeScreen, navigate }) => {
    const navItems: { id: ScreenId, icon: string, label: string }[] = [
        { id: 'home', icon: 'fas fa-home', label: 'Home' },
        { id: 'practice', icon: 'fas fa-pencil-alt', label: 'Practice' },
        { id: 'studySubject', icon: 'fas fa-book', label: 'Study' },
        { id: 'ask', icon: 'fas fa-question-circle', label: 'Ask AI' },
        { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
    ];

    const mainScreens: ScreenId[] = ['home', 'practice', 'studySubject', 'ask', 'profile'];
    if (!mainScreens.includes(activeScreen)) return null;

    return (
        <nav className="w-full bg-light-card dark:bg-dark-card shadow-lg flex justify-around p-2 border-t border-light-border dark:border-dark-border flex-shrink-0">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={withSound(() => navigate(item.id))}
                    className={`flex flex-col items-center justify-center w-16 h-14 rounded-lg transition-colors duration-200 ${activeScreen === item.id ? 'text-light-accent dark:text-dark-accent' : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent dark:hover:text-dark-accent'}`}
                    aria-label={item.label}
                >
                    <i className={`${item.icon} text-xl`}></i>
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

const Card: React.FC<{ onClick?: () => void, className?: string, children: React.ReactNode, 'aria-label'?: string }> = ({ onClick, className, children, 'aria-label': ariaLabel }) => {
    const baseClasses = "bg-light-card dark:bg-dark-card rounded-xl shadow-md overflow-hidden transition-all duration-300";
    const clickableClasses = onClick ? "cursor-pointer hover:shadow-lg hover:-translate-y-1" : "";
    const combinedClasses = `${baseClasses} ${clickableClasses} ${className || ''}`;

    if (onClick) {
        return <button onClick={withSound(onClick)} className={combinedClasses} aria-label={ariaLabel}>{children}</button>;
    }
    return <div className={combinedClasses}>{children}</div>;
};

const LoadingSpinner: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
        <div className="w-16 h-16 border-4 border-light-accent dark:border-dark-accent border-t-transparent rounded-full animate-spin"></div>
        {text && <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">{text}</p>}
    </div>
);

const ErrorDisplay: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center animate-fadeIn">
        <div className="bg-danger/10 p-4 rounded-full">
            <i className="fas fa-exclamation-triangle text-4xl text-danger"></i>
        </div>
        <p className="mt-4 text-lg text-danger">{message}</p>
        {onRetry && (
            <button
                onClick={withSound(onRetry)}
                className="mt-6 px-6 py-2 bg-light-accent text-white rounded-full hover:bg-light-accent-hover transition-colors"
            >
                Try Again
            </button>
        )}
    </div>
);

const ProgressBar: React.FC<{ value: number; max: number; className?: string }> = ({ value, max, className }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div className={`w-full bg-light-border dark:bg-dark-border rounded-full h-2.5 ${className}`}>
            <div
                className="bg-gradient-to-r from-light-accent to-light-accent-end dark:from-dark-accent dark:to-dark-accent-end h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            ></div>
        </div>
    );
};

const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-xl w-full max-w-md animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-light-border dark:border-dark-border flex justify-between items-center">
                    <h2 id="modal-title" className="text-lg font-semibold">{title}</h2>
                    <button onClick={withSound(onClose)} className="text-light-text-secondary dark:text-dark-text-secondary text-xl" aria-label="Close modal">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};


// --- SCREEN COMPONENTS ---

const SplashScreen: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-light-accent to-light-accent-end dark:from-dark-accent dark:to-dark-accent-end">
        <i className="fas fa-graduation-cap text-6xl text-white animate-bounce"></i>
        <h1 className="text-4xl font-bold text-white mt-4 animate-fadeIn">Self Study 10</h1>
        <p className="text-white/80 mt-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>Your AI-powered study partner.</p>
    </div>
);

const WelcomeScreen: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
    const [bgLoaded, setBgLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800";
        img.onload = () => setBgLoaded(true);
    }, []);

    return (
        <div className="relative h-screen w-screen bg-light-bg dark:bg-dark-bg text-center flex flex-col justify-end text-white overflow-hidden">
            <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800')" }}
            >
                <div className={`absolute inset-0 bg-black/60 transition-transform duration-1000 ${bgLoaded ? 'scale-105' : 'scale-125'}`}></div>
            </div>
            <div className="relative p-8 z-10 animate-slide-in">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">Welcome to Self Study 10</h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">Unlock your potential with AI-driven notes, quizzes, and personalized study tools.</p>
                <button
                    onClick={withSound(onGetStarted)}
                    className="mt-8 w-full md:w-auto px-12 py-4 bg-gradient-to-r from-light-accent to-light-accent-end dark:from-dark-accent dark:to-dark-accent-end text-white font-semibold rounded-full shadow-2xl text-lg transform hover:scale-105 transition-transform"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

const HomeScreen: React.FC<{
    navigate: (screen: ScreenId) => void;
    setSubject: (subject: string) => void;
    profile: Profile;
    progress: Progress;
}> = ({ navigate, setSubject, profile, progress }) => {

    const mainFeatures = [
        { id: 'studySubject', icon: 'fas fa-book-reader', title: 'Study Notes', description: 'AI-generated chapter notes', color: 'bg-blue-500' },
        { id: 'practice', icon: 'fas fa-tasks', title: 'Practice Tests', description: 'MCQs, PYQs & more', color: 'bg-green-500' },
        { id: 'samplePaperSubject', icon: 'fas fa-file-alt', title: 'Sample Papers', description: 'Prepare for exams', color: 'bg-yellow-500' },
        { id: 'answerReviewSubject', icon: 'fas fa-pen-nib', title: 'AI Answer Review', description: 'Get expert feedback', color: 'bg-purple-500' },
    ];

    const quickTools = [
        { id: 'ncertSubject', icon: 'fas fa-book', title: 'NCERT Books' },
        { id: 'videoLesson', icon: 'fas fa-video', title: 'Video Lessons' },
        { id: 'ask', icon: 'fas fa-lightbulb', title: 'Ask AI' },
        { id: 'pomodoro', icon: 'fas fa-stopwatch-20', title: 'Pomodoro Timer' },
    ];

    const handleSubjectClick = (subject: string) => {
        setSubject(subject);
        navigate('studyChapter');
    };

    const totalProgress = useMemo(() => {
        let totalCompleted = 0;
        let totalPossible = 0;
        Object.values(progress).forEach(subject => {
            Object.values(subject).forEach(chapter => {
                if (chapter.mcq) totalCompleted++;
                if (chapter.pyq) totalCompleted++;
                totalPossible += 2; // For mcq and pyq
            });
        });
        return totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0;
    }, [progress]);


    return (
        <div className="flex flex-col h-full">
            <TopBar title={`Hello, ${profile.name.split(' ')[0]}!`}>
                <button onClick={withSound(() => navigate('profile'))} className="text-xl text-light-text-secondary dark:text-dark-text-secondary" aria-label="Profile">
                    <i className="fas fa-user-circle"></i>
                </button>
            </TopBar>
            <main className="flex-grow p-4 overflow-y-auto">
                <Card className="p-4 mb-6">
                    <h2 className="font-semibold text-lg mb-2">Overall Progress</h2>
                    <ProgressBar value={totalProgress} max={100} />
                    <p className="text-right text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{Math.round(totalProgress)}% Complete</p>
                </Card>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {mainFeatures.map(feature => (
                        <Card key={feature.id} onClick={() => navigate(feature.id as ScreenId)} className="p-4 text-center aspect-square flex flex-col justify-center items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${feature.color} mb-2`}>
                                <i className={`${feature.icon} text-xl`}></i>
                            </div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{feature.description}</p>
                        </Card>
                    ))}
                </div>
                
                <h2 className="font-semibold text-lg mb-2 ml-1">Quick Tools</h2>
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {quickTools.map(tool => (
                        <Card key={tool.id} onClick={() => navigate(tool.id as ScreenId)} className="p-2 text-center aspect-square flex flex-col justify-center items-center">
                            <i className={`${tool.icon} text-xl text-light-accent dark:text-dark-accent mb-1`}></i>
                            <span className="text-xs">{tool.title}</span>
                        </Card>
                    ))}
                </div>


                <h2 className="font-semibold text-lg mb-2 ml-1">Subjects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subjects.map(subject => (
                        <Card key={subject} onClick={() => handleSubjectClick(subject)} className="p-4 flex items-center">
                            <i className={`${subjectIcons[subject].icon} text-2xl w-8 text-center`} style={{ color: subjectIcons[subject].color }}></i>
                            <span className="ml-4 font-medium">{subject}</span>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

const SubjectScreen: React.FC<{
    title: string;
    onBack: () => void;
    onSubjectSelect: (subject: string) => void;
}> = ({ title, onBack, onSubjectSelect }) => (
    <div className="flex flex-col h-full">
        <TopBar title={title} onBack={onBack} backTarget="home" />
        <main className="flex-grow p-4 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subjects.map(subject => (
                    <Card key={subject} onClick={() => onSubjectSelect(subject)} className="p-4 flex items-center">
                        <i className={`${subjectIcons[subject].icon} text-2xl w-8 text-center`} style={{ color: subjectIcons[subject].color }}></i>
                        <span className="ml-4 font-medium">{subject}</span>
                    </Card>
                ))}
            </div>
        </main>
    </div>
);

const ChapterScreen: React.FC<{
    subject: string;
    onBack: () => void;
    onChapterSelect: (chapter: string) => void;
    progress: Progress;
}> = ({ subject, onBack, onChapterSelect, progress }) => {
    const chapters = subjectChapters[subject] || [];
    const subjectProgress = progress[subject] || {};

    return (
        <div className="flex flex-col h-full">
            <TopBar title={subject} onBack={onBack} backTarget="studySubject" />
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-3">
                    {chapters.map((chapter, index) => {
                        const chapterProgress = subjectProgress[chapter] || {};
                        const mcqDone = !!chapterProgress.mcq;
                        const pyqDone = !!chapterProgress.pyq;
                        const totalTasks = 2;
                        const completedTasks = (mcqDone ? 1 : 0) + (pyqDone ? 1 : 0);

                        return (
                            <Card key={index} onClick={() => onChapterSelect(chapter)} className="p-4 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <p className="font-medium flex-1 pr-4">{chapter}</p>
                                    <div className="flex items-center text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                        {mcqDone && <i className="fas fa-check-circle text-success mr-1" title="MCQ Completed"></i>}
                                        {pyqDone && <i className="fas fa-check-circle text-success" title="PYQ Completed"></i>}
                                    </div>
                                </div>
                                { (mcqDone || pyqDone) && (
                                    <div className="mt-2">
                                        <ProgressBar value={completedTasks} max={totalTasks} />
                                    </div>
                                )}
                            </Card>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};

const NotesDetailScreen: React.FC<{
    subject: string;
    chapter: string;
    onBack: () => void;
    bookmarks: Bookmarks;
    toggleBookmark: (chapterKey: string, heading: string) => void;
}> = ({ subject, chapter, onBack, bookmarks, toggleBookmark }) => {
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const notesContainerRef = useRef<HTMLDivElement>(null);

    const chapterKey = `${subject}-${chapter}`;
    const chapterBookmarks = bookmarks[chapterKey] || [];

    const fetchNotes = useCallback(() => {
        setLoading(true);
        setError(null);
        setNotes("");
        let accumulatedNotes = "";
        fetchChapterNotes(
            subject,
            chapter,
            (chunk) => {
                accumulatedNotes += chunk;
                setNotes(accumulatedNotes);
                if (loading) setLoading(false);
            },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    }, [subject, chapter, loading]);

    useEffect(() => {
        fetchNotes();
    }, [subject, chapter]); // Removed fetchNotes from dependency array

    useEffect(() => {
        if (notesContainerRef.current) {
            const headings = notesContainerRef.current.querySelectorAll('h1, h2, h3');
            headings.forEach(heading => {
                const originalContent = heading.textContent || '';
                if (heading.querySelector('.bookmark-btn')) return;

                const isBookmarked = chapterBookmarks.includes(originalContent);
                
                const button = document.createElement('button');
                button.className = `bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`;
                button.innerHTML = `<i class="fas fa-bookmark"></i>`;
                button.onclick = (e) => {
                    e.stopPropagation();
                    playSound();
                    toggleBookmark(chapterKey, originalContent);
                };
                button.setAttribute('aria-label', isBookmarked ? `Remove bookmark from ${originalContent}` : `Bookmark ${originalContent}`);
                
                heading.classList.add('bookmark-container');
                heading.appendChild(button);
            });
        }
    }, [notes, chapterBookmarks, toggleBookmark, chapterKey]);


    const parseMarkdown = (text: string) => {
        let html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 border-b border-light-border dark:border-dark-border pb-1">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc">$1</li>')
            .replace(/\n/g, '<br />')
            .replace(/<br \/><li/g, '<li') // fix extra space before list items
            .replace(/<\/li><br \/>/g, '</li>');
        return { __html: html };
    };
    
    return (
        <div className="flex flex-col h-full">
            <TopBar title={chapter} onBack={onBack} backTarget="studyChapter" />
            <main className="flex-grow p-4 overflow-y-auto" ref={notesContainerRef}>
                {loading && !notes && <LoadingSpinner text="Generating notes with AI..." />}
                {error && <ErrorDisplay message={error} onRetry={fetchNotes} />}
                <div
                    className="prose dark:prose-invert max-w-none text-light-text-primary dark:text-dark-text-primary"
                    dangerouslySetInnerHTML={parseMarkdown(notes)}
                />
                 <style>{`
                    .bookmark-container {
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .bookmark-btn {
                        color: #ccc;
                        background: none;
                        border: none;
                        cursor: pointer;
                        font-size: 1rem;
                        padding: 0.5rem;
                        margin-left: 0.5rem;
                        opacity: 0.3;
                        transition: opacity 0.2s, color 0.2s;
                    }
                    .bookmark-container:hover .bookmark-btn {
                        opacity: 1;
                    }
                    .bookmark-btn.bookmarked {
                        color: #f1c40f;
                        opacity: 1;
                    }
                `}</style>
            </main>
        </div>
    );
};

const AskAIScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<{ q: string, a: string }[]>([]);

    const handleAsk = async () => {
        if (!question.trim()) return;
        setIsLoading(true);
        setAnswer("");
        const result = await askAiGeneral(question);
        setAnswer(result);
        setHistory(prev => [...prev, { q: question, a: result }]);
        setQuestion("");
        setIsLoading(false);
    };

    const parseMarkdown = (text: string) => {
        // A simplified markdown parser
        let html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc">$1</li>')
            .replace(/\n/g, '<br />')
             .replace(/<br \/><li/g, '<li')
            .replace(/<\/li><br \/>/g, '</li>');
        return { __html: html };
    };

    return (
        <div className="flex flex-col h-full">
            <TopBar title="Ask AI" onBack={onBack} backTarget="home" />
            <main className="flex-grow p-4 overflow-y-auto">
                {answer && (
                     <Card className="p-4 mb-4 animate-fadeIn">
                        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={parseMarkdown(answer)}></div>
                    </Card>
                )}
                {isLoading && <LoadingSpinner text="AI is thinking..." />}
                {history.length > 0 && !answer && !isLoading && (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Recent Questions</h3>
                        {history.slice(-3).reverse().map((item, index) => (
                            <Card key={index} className="p-3">
                                <p className="font-medium truncate">{item.q}</p>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1 truncate">{item.a.split('\n')[0]}</p>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
            <div className="p-4 border-t border-light-border dark:border-dark-border flex items-center space-x-2 flex-shrink-0">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleAsk()}
                    placeholder="Ask anything about your subjects..."
                    className="flex-grow p-3 bg-light-border dark:bg-dark-border rounded-full focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                    disabled={isLoading}
                />
                <button
                    onClick={withSound(handleAsk)}
                    disabled={isLoading || !question.trim()}
                    className="w-12 h-12 bg-light-accent text-white rounded-full flex items-center justify-center text-xl disabled:bg-gray-400"
                    aria-label="Ask Question"
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

const ProfileScreen: React.FC<{
    profile: Profile;
    setProfile: (profile: Profile) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    onBack: () => void;
    progress: Progress;
}> = ({ profile, setProfile, theme, setTheme, onBack, progress }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setProfile(formData);
        setIsEditing(false);
    };

    const totalQuizzes = useMemo(() => {
        let count = 0;
        Object.values(progress).forEach(subject => {
            Object.values(subject).forEach(chapter => {
                if (chapter.mcq) count++;
                if (chapter.pyq) count++;
            });
        });
        return count;
    }, [progress]);

    const averageScore = useMemo(() => {
        let totalScore = 0;
        let totalItems = 0;
        Object.values(progress).forEach(subject => {
            Object.values(subject).forEach(chapter => {
                if (chapter.mcq) {
                    totalScore += chapter.mcq.score / chapter.mcq.total;
                    totalItems++;
                }
                if (chapter.pyq) {
                    totalScore += chapter.pyq.score / chapter.pyq.total;
                    totalItems++;
                }
            });
        });
        return totalItems > 0 ? Math.round((totalScore / totalItems) * 100) : 0;
    }, [progress]);


    return (
        <div className="flex flex-col h-full">
            <TopBar title="Profile" onBack={onBack} backTarget="home">
                {!isEditing && (
                    <button onClick={withSound(() => setIsEditing(true))} className="text-light-accent dark:text-dark-accent">Edit</button>
                )}
            </TopBar>
            <main className="flex-grow p-4 overflow-y-auto">
                <Card className="p-6 mb-6">
                    <div className="flex items-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-light-accent to-light-accent-end dark:from-dark-accent dark:to-dark-accent-end flex items-center justify-center text-white text-3xl font-bold">
                            {profile.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold">{profile.name}</h2>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">{profile.school}</p>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="p-4 text-center">
                        <p className="text-2xl font-bold">{totalQuizzes}</p>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Quizzes Taken</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <p className="text-2xl font-bold">{averageScore}%</p>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Average Score</p>
                    </Card>
                </div>


                {isEditing ? (
                    <Card className="p-6 space-y-4 animate-fadeIn">
                        <h3 className="font-semibold text-lg">Edit Profile</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 bg-light-border dark:bg-dark-border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">School</label>
                            <input type="text" name="school" value={formData.school} onChange={handleInputChange} className="w-full p-2 bg-light-border dark:bg-dark-border rounded-md" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">Academic Goals</label>
                            <textarea name="academicGoals" value={formData.academicGoals} onChange={handleInputChange} className="w-full p-2 bg-light-border dark:bg-dark-border rounded-md" rows={3}></textarea>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={withSound(() => setIsEditing(false))} className="px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={withSound(handleSave)} className="px-4 py-2 bg-light-accent text-white rounded-md">Save</button>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-6 space-y-2">
                        <h3 className="font-semibold text-lg mb-2">Details</h3>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Address:</strong> {profile.address}</p>
                         <h3 className="font-semibold text-lg mt-4 mb-2">Goals</h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">{profile.academicGoals || "No goals set yet."}</p>
                    </Card>
                )}

                <Card className="p-4 mt-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Theme</h3>
                        <div className="flex items-center space-x-2 p-1 bg-light-border dark:bg-dark-border rounded-full">
                            <button onClick={withSound(() => setTheme('light'))} className={`w-10 h-8 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-white shadow' : ''}`} aria-label="Light theme"><i className="fas fa-sun"></i></button>
                            <button onClick={withSound(() => setTheme('dark'))} className={`w-10 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 text-white shadow' : ''}`} aria-label="Dark theme"><i className="fas fa-moon"></i></button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
};


const PracticeChapterScreen: React.FC<{
    subject: string;
    onBack: () => void;
    onChapterSelect: (chapter: string, type: PracticeType) => void;
}> = ({ subject, onBack, onChapterSelect }) => {
    const chapters = subjectChapters[subject] || [];

    return (
        <div className="flex flex-col h-full">
            <TopBar title={`${subject} - Practice`} onBack={onBack} backTarget="practice" />
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {chapters.map((chapter, index) => (
                        <Card key={index} className="p-4">
                            <p className="font-medium mb-3">{chapter}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <button onClick={withSound(() => onChapterSelect(chapter, 'mcq'))} className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-500/20">MCQs</button>
                                <button onClick={withSound(() => onChapterSelect(chapter, 'pyq'))} className="p-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md hover:bg-green-500/20">PYQs</button>
                                {mcqData[subject]?.[chapter]?.extra?.length > 0 &&
                                    <button onClick={withSound(() => onChapterSelect(chapter, 'extra'))} className="p-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-md hover:bg-yellow-500/20">Extra</button>
                                }
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

const QuizScreen: React.FC<{
    questions: QuizQuestion[];
    onQuizComplete: (score: number) => void;
    onBack: () => void;
}> = ({ questions, onQuizComplete, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === currentQuestion.answerIndex) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            onQuizComplete(score);
        }
    };

    const getButtonClass = (index: number) => {
        if (!isAnswered) return 'bg-light-card dark:bg-dark-card hover:bg-light-border dark:hover:bg-dark-border';
        if (index === currentQuestion.answerIndex) return 'bg-success/20 border-success text-success';
        if (index === selectedOption) return 'bg-danger/20 border-danger text-danger animate-shake';
        return 'bg-light-card dark:bg-dark-card opacity-60';
    };

    return (
        <div className="flex flex-col h-full">
            <TopBar title={`Question ${currentQuestionIndex + 1}/${questions.length}`} onBack={onBack} backTarget="practiceChapter" />
            <main className="flex-grow p-4 flex flex-col justify-between">
                <div>
                    <Card className="p-4 mb-6">
                        <p className="text-lg font-semibold">{currentQuestion.question}</p>
                    </Card>
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={isAnswered}
                                className={`w-full text-left p-4 rounded-lg border border-transparent transition-all ${getButtonClass(index)}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={withSound(handleNext)}
                    disabled={!isAnswered}
                    className="w-full p-4 mt-6 bg-light-accent text-white rounded-lg disabled:bg-gray-400"
                >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            </main>
        </div>
    );
};

const QuizResultScreen: React.FC<{
    score: number;
    total: number;
    onRetry: () => void;
    onFinish: () => void;
}> = ({ score, total, onRetry, onFinish }) => {
    const percentage = Math.round((score / total) * 100);
    const result = useMemo(() => {
        if (percentage >= 80) return { title: "Excellent!", icon: "fa-star", color: "text-yellow-400" };
        if (percentage >= 60) return { title: "Well Done!", icon: "fa-thumbs-up", color: "text-success" };
        if (percentage >= 40) return { title: "Good Effort", icon: "fa-award", color: "text-blue-400" };
        return { title: "Keep Practicing", icon: "fa-book-reader", color: "text-danger" };
    }, [percentage]);

    return (
        <div className="flex flex-col h-full items-center justify-center p-4 text-center">
            <div className="animate-fadeIn">
                <i className={`fas ${result.icon} text-6xl ${result.color} mb-4`}></i>
                <h2 className="text-3xl font-bold mb-2">{result.title}</h2>
                <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">You scored</p>
                <p className="text-6xl font-bold my-4">{score}<span className="text-3xl text-light-text-secondary dark:text-dark-text-secondary">/{total}</span></p>
                
                <div className="w-64 mx-auto my-6">
                     <ProgressBar value={score} max={total} />
                </div>
               
                <div className="flex space-x-4 mt-8">
                    <button onClick={withSound(onRetry)} className="px-6 py-3 bg-light-border dark:bg-dark-border rounded-lg">Retry Quiz</button>
                    <button onClick={withSound(onFinish)} className="px-6 py-3 bg-light-accent text-white rounded-lg">Finish</button>
                </div>
            </div>
        </div>
    );
};

const SamplePaperViewScreen: React.FC<{
    paper: SamplePaper;
    onBack: () => void;
}> = ({ paper, onBack }) => (
    <div className="flex flex-col h-full">
        <TopBar title={paper.title} onBack={onBack} backTarget="samplePaperChapter" />
        <main className="flex-grow p-4 overflow-y-auto">
            {paper.sections.map((section, sIndex) => (
                <Card key={sIndex} className="p-4 mb-6">
                    <h2 className="text-xl font-bold mb-1">{section.title}</h2>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">{section.description}</p>
                    <div className="space-y-4">
                        {section.questions.map(q => (
                            <div key={q.qNo} className="border-t border-light-border dark:border-dark-border pt-3">
                                <p className="font-semibold">{q.qNo}. {q.text} <span className="text-xs font-normal text-light-text-secondary">({q.marks} marks)</span></p>
                                {q.options && (
                                    <div className="pl-4 mt-2 space-y-1">
                                        {q.options.map((opt, oIndex) => <p key={oIndex}>{String.fromCharCode(97 + oIndex)}) {opt}</p>)}
                                    </div>
                                )}
                                <details className="mt-2 text-sm">
                                    <summary className="cursor-pointer font-medium text-light-accent dark:text-dark-accent">View Answer</summary>
                                    <p className="p-2 mt-1 bg-light-border dark:bg-dark-border rounded">{q.answer}</p>
                                </details>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
        </main>
    </div>
);

const NcertDetailScreen: React.FC<{
    subject: string;
    chapter: string;
    onBack: () => void;
    onPdfView: (url: string) => void;
}> = ({ subject, chapter, onBack, onPdfView }) => {
    const links = ncertLinks[subject]?.[chapter];
    if (!links) {
        return <ErrorDisplay message="NCERT materials not found for this chapter." />;
    }

    return (
        <div className="flex flex-col h-full">
            <TopBar title={chapter} onBack={onBack} backTarget="ncertChapter" />
            <main className="p-4">
                <Card className="p-4">
                    <h2 className="font-semibold text-lg mb-4">Available Resources</h2>
                    <div className="space-y-3">
                        {Object.entries(links).map(([type, url]) => (
                            <button
                                key={type}
                                onClick={() => onPdfView(url)}
                                className="w-full p-4 bg-light-border dark:bg-dark-border rounded-lg flex justify-between items-center hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
                            >
                                <span>{type}</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
};

const NcertPdfViewScreen: React.FC<{ url: string; onBack: () => void }> = ({ url, onBack }) => (
    <div className="flex flex-col h-full bg-gray-200">
        <TopBar title="NCERT Book" onBack={onBack} backTarget="ncertDetail" />
        <iframe src={url} className="w-full h-full flex-grow" title="NCERT PDF Viewer"></iframe>
    </div>
);

const VideoLessonScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    
    // Removed API Key check logic for production build suitability.
    // The app now assumes process.env.API_KEY is properly configured in the hosting environment.

    const handleGenerate = async () => {
        if (!subject || !chapter) return;
        setIsLoading(true);
        setError('');
        setVideoUrl('');
        setStatusMessage('');
        try {
            const url = await generateVideoLesson(subject, chapter, setStatusMessage);
            setVideoUrl(url);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <TopBar title="AI Video Lesson" onBack={onBack} backTarget="home" />
            <main className="flex-grow p-4 overflow-y-auto">
                <Card className="p-4">
                    <h2 className="font-semibold text-lg mb-4">Generate a Video</h2>
                    <div className="space-y-4">
                        <select
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value); setChapter(''); }}
                            className="w-full p-3 bg-light-border dark:bg-dark-border rounded-md"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {subject && (
                            <select
                                value={chapter}
                                onChange={(e) => setChapter(e.target.value)}
                                className="w-full p-3 bg-light-border dark:bg-dark-border rounded-md"
                            >
                                <option value="">Select Chapter</option>
                                {subjectChapters[subject].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        )}
                        <button
                            onClick={withSound(handleGenerate)}
                            disabled={!subject || !chapter || isLoading}
                            className="w-full p-3 bg-light-accent text-white rounded-md disabled:bg-gray-400"
                        >
                            {isLoading ? 'Generating...' : 'Generate Video'}
                        </button>
                    </div>
                </Card>

                {isLoading && (
                    <div className="mt-4 text-center">
                        <LoadingSpinner text={statusMessage || "AI is working..."} />
                    </div>
                )}
                {error && <ErrorDisplay message={error} onRetry={handleGenerate} />}
                {videoUrl && (
                    <Card className="p-4 mt-4">
                        <h3 className="font-semibold text-lg mb-2">Your Video Lesson</h3>
                        <video src={videoUrl} controls className="w-full rounded-md"></video>
                    </Card>
                )}
            </main>
        </div>
    );
};

const AnswerReviewWriteScreen: React.FC<{
    subject: string;
    chapter: string;
    question: string;
    onBack: () => void;
    onReviewSubmit: (answer: string) => void;
}> = ({ subject, chapter, question, onBack, onReviewSubmit }) => {
    const [answer, setAnswer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        onReviewSubmit(answer);
    }

    return (
        <div className="flex flex-col h-full">
            <TopBar title="Write Your Answer" onBack={onBack} backTarget="answerReviewQuestionList" />
            <main className="flex-grow p-4 flex flex-col">
                <Card className="p-4 mb-4">
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{subject} - {chapter}</p>
                    <p className="font-semibold mt-1">{question}</p>
                </Card>
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    className="flex-grow w-full p-3 bg-light-border dark:bg-dark-border rounded-lg text-base"
                    disabled={isSubmitting}
                />
                <button
                    onClick={withSound(handleSubmit)}
                    disabled={!answer.trim() || isSubmitting}
                    className="w-full p-3 mt-4 bg-light-accent text-white rounded-lg disabled:bg-gray-400"
                >
                    {isSubmitting ? "Getting Review..." : "Submit for AI Review"}
                </button>
            </main>
        </div>
    );
};

const AnswerReviewResultScreen: React.FC<{
    review: AIReview;
    question: string;
    userAnswer: string;
    onBack: () => void;
}> = ({ review, question, userAnswer, onBack }) => {
    return (
        <div className="flex flex-col h-full">
            <TopBar title="AI Review" onBack={onBack} backTarget="answerReviewChapter" />
            <main className="flex-grow p-4 overflow-y-auto space-y-4">
                <Card className="p-4 text-center">
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">You scored</p>
                    <p className="text-5xl font-bold my-2">{review.score}<span className="text-2xl">/{review.totalMarks}</span></p>
                    <ProgressBar value={review.score} max={review.totalMarks} className="w-3/4 mx-auto" />
                </Card>

                <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-success"><i className="fas fa-check-circle mr-2"></i>What You Did Well</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        {review.whatYouDidWell.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </Card>

                <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-warning"><i className="fas fa-lightbulb mr-2"></i>Areas for Improvement</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        {review.areasForImprovement.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </Card>
                
                 <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Question</h3>
                    <p>{question}</p>
                </Card>

                <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Your Answer</h3>
                    <p className="whitespace-pre-wrap text-light-text-secondary dark:text-dark-text-secondary">{userAnswer}</p>
                </Card>

                <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Model Answer</h3>
                    <p className="whitespace-pre-wrap">{review.modelAnswer}</p>
                </Card>
            </main>
        </div>
    );
};

const PomodoroTimerScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
    
    const POMODORO_DURATION = 25 * 60;
    const SHORT_BREAK_DURATION = 5 * 60;
    const LONG_BREAK_DURATION = 15 * 60;
    const LONG_BREAK_INTERVAL = 4;
    const FINISH_SOUND_BASE64 = 'UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSQAAAAIAAgAAAAAAAAAAAAAAAAAAAD//wAA//8AAAAAAAAAAAAAAAA=';

    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION);
    const [isActive, setIsActive] = useState(false);
    const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

    const intervalRef = useRef<number | null>(null);
    const finishAudio = useMemo(() => {
        try {
            return new Audio(`data:audio/wav;base64,${FINISH_SOUND_BASE64}`);
        } catch (e) {
            console.error("Failed to create finish audio:", e);
            return null;
        }
    }, []);

    const switchMode = useCallback((mode: TimerMode) => {
        setIsActive(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimerMode(mode);
        switch (mode) {
            case 'pomodoro':
                setTimeLeft(POMODORO_DURATION);
                break;
            case 'shortBreak':
                setTimeLeft(SHORT_BREAK_DURATION);
                break;
            case 'longBreak':
                setTimeLeft(LONG_BREAK_DURATION);
                break;
        }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            finishAudio?.play().catch(e => console.error("Error playing finish sound:", e));

            if (timerMode === 'pomodoro') {
                const newCompleted = pomodorosCompleted + 1;
                setPomodorosCompleted(newCompleted);
                if (newCompleted % LONG_BREAK_INTERVAL === 0) {
                    switchMode('longBreak');
                } else {
                    switchMode('shortBreak');
                }
            } else {
                switchMode('pomodoro');
            }
        }
    }, [timeLeft, timerMode, pomodorosCompleted, switchMode, finishAudio]);

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        switch (timerMode) {
            case 'pomodoro':
                setTimeLeft(POMODORO_DURATION);
                break;
            case 'shortBreak':
                setTimeLeft(SHORT_BREAK_DURATION);
                break;
            case 'longBreak':
                setTimeLeft(LONG_BREAK_DURATION);
                break;
        }
    }, [timerMode]);


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const progress = (
        (timerMode === 'pomodoro' ? POMODORO_DURATION :
         timerMode === 'shortBreak' ? SHORT_BREAK_DURATION :
         LONG_BREAK_DURATION) - timeLeft
    ) / (
        timerMode === 'pomodoro' ? POMODORO_DURATION :
         timerMode === 'shortBreak' ? SHORT_BREAK_DURATION :
         LONG_BREAK_DURATION
    ) * 100;

    const modeText: { [key in TimerMode]: string } = {
        pomodoro: 'Focus Time',
        shortBreak: 'Short Break',
        longBreak: 'Long Break',
    };

    return (
        <div className="flex flex-col h-full bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary">
            <TopBar title="Pomodoro Timer" onBack={withSound(onBack)} backTarget="home" />
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center overflow-y-auto">
                <div className="flex space-x-1 sm:space-x-2 mb-8 bg-light-card dark:bg-dark-card p-2 rounded-full shadow-md">
                    <button onClick={withSound(() => switchMode('pomodoro'))} className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full transition-colors ${timerMode === 'pomodoro' ? 'bg-light-accent text-white shadow' : 'hover:bg-light-border dark:hover:bg-dark-border'}`}>Pomodoro</button>
                    <button onClick={withSound(() => switchMode('shortBreak'))} className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full transition-colors ${timerMode === 'shortBreak' ? 'bg-light-accent text-white shadow' : 'hover:bg-light-border dark:hover:bg-dark-border'}`}>Short Break</button>
                    <button onClick={withSound(() => switchMode('longBreak'))} className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full transition-colors ${timerMode === 'longBreak' ? 'bg-light-accent text-white shadow' : 'hover:bg-light-border dark:hover:bg-dark-border'}`}>Long Break</button>
                </div>

                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                        <circle className="text-light-border dark:text-dark-border" strokeWidth="4" cx="50" cy="50" r="45" fill="transparent"></circle>
                        <circle
                            className="text-light-accent dark:text-dark-accent transition-all duration-500"
                            strokeWidth="4"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="45"
                            fill="transparent"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (progress / 100) * 283}
                            transform="rotate(-90 50 50)"
                        ></circle>
                    </svg>
                    <div className="z-10 text-center">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter tabular-nums">{formatTime(timeLeft)}</h2>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2 text-lg">{modeText[timerMode]}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-6 mt-10">
                    <button onClick={withSound(resetTimer)} className="text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent dark:hover:text-dark-accent transition-colors" aria-label="Reset Timer">
                        <i className="fas fa-redo"></i>
                    </button>
                    <button
                        onClick={withSound(isActive ? pauseTimer : startTimer)}
                        className="w-20 h-20 bg-gradient-to-br from-light-accent to-light-accent-end dark:from-dark-accent dark:to-dark-accent-end text-white rounded-full shadow-lg text-3xl flex items-center justify-center transform hover:scale-105 transition-transform"
                        aria-label={isActive ? 'Pause Timer' : 'Start Timer'}
                    >
                        <i className={`fas ${isActive ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                    <div className="text-2xl flex items-center text-light-text-secondary dark:text-dark-text-secondary">
                        <i className="fas fa-check-circle mr-2 text-success"></i>
                        <span className="font-semibold">{pomodorosCompleted}</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const [screen, setScreen] = useState<ScreenId>('splash');
    const [screenHistory, setScreenHistory] = useState<ScreenId[]>([]);
    const [theme, setTheme] = useState<Theme>('light');

    // App State
    const [profile, setProfile] = useState<Profile>({
        name: 'Alex Doe',
        school: 'Central High School',
        rollNo: '10A-23',
        address: '123 Study Lane, Knowledge City',
        email: 'alex.doe@email.com',
        phone: '123-456-7890',
        academicGoals: 'Score above 90% in all subjects and improve my understanding of complex theorems in Mathematics.'
    });
    const [currentSubject, setCurrentSubject] = useState('');
    const [currentChapter, setCurrentChapter] = useState('');
    const [currentPracticeType, setCurrentPracticeType] = useState<PracticeType>('');
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [quizScore, setQuizScore] = useState(0);
    const [currentSamplePaper, setCurrentSamplePaper] = useState<SamplePaper | null>(null);
    const [currentNcertPdfUrl, setCurrentNcertPdfUrl] = useState('');
    const [currentReviewQuestion, setCurrentReviewQuestion] = useState('');
    const [currentReviewAnswer, setCurrentReviewAnswer] = useState('');
    const [currentAIReview, setCurrentAIReview] = useState<AIReview | null>(null);
    const [progress, setProgress] = useState<Progress>({});
    const [bookmarks, setBookmarks] = useState<Bookmarks>({});
    const [userRole, setUserRole] = useState<UserRole>(null); // 'student' or 'admin'
    
    // --- State persistence ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) setTheme(savedTheme);

        const savedProfile = localStorage.getItem('profile');
        if (savedProfile) setProfile(JSON.parse(savedProfile));

        const savedProgress = localStorage.getItem('progress');
        if (savedProgress) setProgress(JSON.parse(savedProgress));

        const savedBookmarks = localStorage.getItem('bookmarks');
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.className = theme;
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('profile', JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem('progress', JSON.stringify(progress));
    }, [progress]);
    
    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);


    // --- Navigation ---
    const navigate = useCallback((newScreen: ScreenId) => {
        setScreen(prevScreen => {
            if (newScreen !== prevScreen) {
                setScreenHistory(history => [...history, prevScreen]);
            }
            return newScreen;
        });
    }, []);

    const handleBack = useCallback(() => {
        setScreen(screenHistory[screenHistory.length - 1] || 'home');
        setScreenHistory(history => history.slice(0, -1));
    }, [screenHistory]);


    // --- App Logic ---
    useEffect(() => {
        const timer = setTimeout(() => {
            if (screen === 'splash') {
                const hasWelcomed = localStorage.getItem('hasWelcomed');
                if (hasWelcomed) {
                    navigate('home');
                } else {
                    navigate('welcome');
                }
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [screen, navigate]);
    
    const handleGetStarted = () => {
        localStorage.setItem('hasWelcomed', 'true');
        navigate('home');
    };

    const handleSubjectSelectForChapters = (subject: string) => {
        setCurrentSubject(subject);
        if (screen === 'studySubject') navigate('studyChapter');
        if (screen === 'practice') navigate('practiceChapter');
        if (screen === 'samplePaperSubject') navigate('samplePaperChapter');
        if (screen === 'ncertSubject') navigate('ncertChapter');
        if (screen === 'answerReviewSubject') navigate('answerReviewChapter');
    };
    
    const handleChapterSelectForNotes = (chapter: string) => {
        setCurrentChapter(chapter);
        navigate('notesDetail');
    };
    
    const handleChapterSelectForPractice = (chapter: string, type: PracticeType) => {
        setCurrentChapter(chapter);
        setCurrentPracticeType(type);
        const questionSet = mcqData[currentSubject]?.[chapter]?.[type];
        if (questionSet && questionSet.length > 0) {
            setQuizQuestions(questionSet);
            navigate('quiz');
        } else {
            // Handle case with no questions
            alert("No questions available for this selection.");
        }
    };

    const handleQuizComplete = (score: number) => {
        setQuizScore(score);
        setProgress(prev => {
            const newProgress = { ...prev };
            if (!newProgress[currentSubject]) newProgress[currentSubject] = {};
            if (!newProgress[currentSubject][currentChapter]) newProgress[currentSubject][currentChapter] = {};
            newProgress[currentSubject][currentChapter][currentPracticeType] = { score, total: quizQuestions.length };
            return newProgress;
        });
        navigate('quizResult');
    };

    const handleRetryQuiz = () => {
        navigate('quiz');
    };
    
    const handleFinishQuiz = () => {
        navigate('practiceChapter');
    };
    
    const handleSelectSamplePaper = (paper: SamplePaper) => {
        setCurrentSamplePaper(paper);
        navigate('samplePaperView');
    };
    
    const handleNcertPdfView = (url: string) => {
        setCurrentNcertPdfUrl(url);
        navigate('ncertPdfView');
    };
    
    const handleSelectReviewQuestion = (question: string) => {
        setCurrentReviewQuestion(question);
        navigate('answerReviewWrite');
    };
    
    const handleSubmitForReview = async (answer: string) => {
        setCurrentReviewAnswer(answer);
        try {
            const reviewResult = await reviewAnswer(currentSubject, currentReviewQuestion, answer);
            setCurrentAIReview(reviewResult);
            navigate('answerReviewResult');
        } catch (error) {
            console.error(error);
            alert("Failed to get review from AI.");
            // Optionally navigate back or show an error screen
            navigate('answerReviewWrite'); 
        }
    };
    
    const toggleBookmark = (chapterKey: string, heading: string) => {
        setBookmarks(prev => {
            const newBookmarks = { ...prev };
            const currentBookmarks = newBookmarks[chapterKey] || [];
            if (currentBookmarks.includes(heading)) {
                newBookmarks[chapterKey] = currentBookmarks.filter(h => h !== heading);
            } else {
                newBookmarks[chapterKey] = [...currentBookmarks, heading];
            }
            return newBookmarks;
        });
    };


    const screenMap: { [key in ScreenId]: React.ReactElement } = {
        splash: <SplashScreen />,
        welcome: <WelcomeScreen onGetStarted={handleGetStarted} />,
        home: <HomeScreen navigate={navigate} setSubject={setCurrentSubject} profile={profile} progress={progress} />,
        
        studySubject: <SubjectScreen title="Study Notes" onBack={handleBack} onSubjectSelect={handleSubjectSelectForChapters} />,
        studyChapter: <ChapterScreen subject={currentSubject} onBack={handleBack} onChapterSelect={handleChapterSelectForNotes} progress={progress} />,
        notesDetail: <NotesDetailScreen subject={currentSubject} chapter={currentChapter} onBack={handleBack} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />,

        practice: <SubjectScreen title="Practice" onBack={handleBack} onSubjectSelect={handleSubjectSelectForChapters} />,
        practiceSubject: <SubjectScreen title="Practice" onBack={handleBack} onSubjectSelect={handleSubjectSelectForChapters} />, // Alias for back nav
        practiceChapter: <PracticeChapterScreen subject={currentSubject} onBack={handleBack} onChapterSelect={handleChapterSelectForPractice} />,
        quiz: <QuizScreen questions={quizQuestions} onQuizComplete={handleQuizComplete} onBack={handleBack} />,
        quizResult: <QuizResultScreen score={quizScore} total={quizQuestions.length} onRetry={handleRetryQuiz} onFinish={handleFinishQuiz} />,
        
        samplePaperSubject: <SubjectScreen title="Sample Papers" onBack={handleBack} onSubjectSelect={handleSubjectSelectForChapters} />,
        samplePaperChapter: <ChapterScreen subject={currentSubject} onBack={handleBack} onChapterSelect={(chapter) => {
            const paper = samplePaperData[currentSubject]?.[chapter]?.[0];
            if (paper) handleSelectSamplePaper(paper);
            else alert("No sample paper found.");
        }} progress={progress} />,
        samplePaperView: currentSamplePaper ? <SamplePaperViewScreen paper={currentSamplePaper} onBack={handleBack} /> : <div></div>,
        
        ncertSubject: <SubjectScreen title="NCERT Books" onBack={handleBack} onSubjectSelect={handleSubjectSelectForChapters} />,
        ncertChapter: <ChapterScreen subject={currentSubject} onBack={handleBack} onChapterSelect={(chapter) => { setCurrentChapter(chapter); navigate('ncertDetail'); }} progress={progress} />,
        ncertDetail: <NcertDetailScreen subject={currentSubject} chapter={currentChapter} onBack={handleBack} onPdfView={handleNcertPdfView} />,
        ncertPdfView: <NcertPdfViewScreen url={currentNcertPdfUrl} onBack={handleBack} />,
        
        videoLesson: <VideoLessonScreen onBack={handleBack} />,
        
        answerReviewSubject: <SubjectScreen title="AI Answer Review" onBack={handleBack} onSubjectSelect={handleSubjectSelectForChapters} />,
        answerReviewChapter: <ChapterScreen subject={currentSubject} onBack={handleBack} onChapterSelect={(chapter) => { setCurrentChapter(chapter); navigate('answerReviewQuestionList'); }} progress={progress} />,
        answerReviewQuestionList: (
            <div className="flex flex-col h-full">
                <TopBar title={currentChapter} onBack={handleBack} backTarget="answerReviewChapter" />
                <main className="p-4 space-y-3 overflow-y-auto">
                    {(subjectiveQuestionsData[currentSubject]?.[currentChapter] || []).map((q, i) => (
                        <Card key={i} className="p-4 text-left" onClick={() => handleSelectReviewQuestion(q)}>
                            <p>{q}</p>
                        </Card>
                    ))}
                </main>
            </div>
        ),
        answerReviewWrite: <AnswerReviewWriteScreen subject={currentSubject} chapter={currentChapter} question={currentReviewQuestion} onBack={handleBack} onReviewSubmit={handleSubmitForReview} />,
        answerReviewResult: currentAIReview ? <AnswerReviewResultScreen review={currentAIReview} question={currentReviewQuestion} userAnswer={currentReviewAnswer} onBack={handleBack} /> : <LoadingSpinner />,

        ask: <AskAIScreen onBack={handleBack} />,
        profile: <ProfileScreen profile={profile} setProfile={setProfile} theme={theme} setTheme={setTheme} onBack={handleBack} progress={progress} />,
        
        pomodoro: <PomodoroTimerScreen onBack={handleBack} />,

        // Unused screens, but defined for type safety
        login: <div></div>,
        notesSubject: <div></div>,
        notesChapter: <div></div>,
        adminLogin: <div></div>,
        adminDashboard: <div></div>,
        adminContentSubject: <div></div>,
        adminContentChapter: <div></div>,
        adminContentQuestionList: <div></div>,
    };


    return (
        <div className="h-screen w-screen flex flex-col font-sans text-base text-light-text-primary dark:text-dark-text-primary bg-light-bg dark:bg-dark-bg">
            <div className="flex-grow flex flex-col h-0">
                {screenMap[screen] || <ErrorDisplay message={`Screen "${screen}" not found.`} />}
            </div>
            <BottomNavBar activeScreen={screen} navigate={navigate} />
        </div>
    );
};

export default App;
