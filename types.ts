export interface Profile {
  name: string;
  school: string;
  rollNo: string;
  address: string;
  email: string;
  phone: string;
  academicGoals: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface SamplePaperQuestion {
  qNo: number;
  text: string;
  marks: number;
  type: 'MCQ' | 'VSA' | 'SA' | 'LA';
  options?: string[];
  answer: string;
}

export interface SamplePaperSection {
  title: string;
  description: string;
  questions: SamplePaperQuestion[];
}

export interface SamplePaper {
  id: string;
  title:string;
  sections: SamplePaperSection[];
}

export interface Progress {
  [subject: string]: {
    [chapter: string]: {
      pyq?: { score: number; total: number };
      mcq?: { score: number; total: number };
      extra?: { score: number; total: number };
      samplePaper?: { completed: boolean };
    };
  };
}

export interface AIReview {
  score: number;
  totalMarks: number;
  whatYouDidWell: string[];
  areasForImprovement: string[];
  modelAnswer: string;
}

export interface Bookmarks {
  [chapterKey: string]: string[]; // Array of bookmarked heading texts
}

export type UserRole = 'student' | 'admin' | null;

export type ScreenId = 
  | 'splash' 
  | 'login'
  | 'welcome'
  | 'home'
  | 'practice' 
  | 'notesSubject' 
  | 'studySubject' 
  | 'ask' 
  | 'profile' 
  | 'notesChapter' 
  | 'studyChapter' 
  | 'practiceSubject' 
  | 'practiceChapter' 
  | 'quiz' 
  | 'quizResult'
  | 'notesDetail'
  | 'samplePaperSubject'
  | 'samplePaperChapter'
  | 'samplePaperView'
  | 'ncertSubject'
  | 'ncertChapter'
  | 'ncertDetail'
  | 'ncertPdfView'
  | 'videoLesson'
  | 'answerReviewSubject'
  | 'answerReviewChapter'
  | 'answerReviewQuestionList'
  | 'answerReviewWrite'
  | 'answerReviewResult'
  | 'pomodoro'
  // Admin Screens
  | 'adminLogin'
  | 'adminDashboard'
  | 'adminContentSubject'
  | 'adminContentChapter'
  | 'adminContentQuestionList';

export type PracticeType = 'pyq' | 'mcq' | 'extra' | '';

export type Theme = 'light' | 'dark';