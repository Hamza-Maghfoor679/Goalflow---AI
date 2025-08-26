// hooks/useLoadingState.ts
import { useEffect, useState } from 'react';

interface LoadingStateParams {
  isInitialized: boolean;
  Uid: string | null;
  isUserLoading: boolean;
  userDetails: any;
  isGoalsLoading: boolean;
  goalsData: any[] | null;
  isPersonalityLoading: boolean;
  personalityData: any;
  isTasksLoading: boolean;
  isTasksGenerating: boolean;
  tasksData: any;
  hasGoalId: boolean;
}

interface LoadingStateResult {
  message: string;
  progress: number;
}

interface UseLoadingStateReturn {
  loadingProgress: number;
  loadingState: LoadingStateResult | null;
}

export const useLoadingState = ({
  isInitialized,
  Uid,
  isUserLoading,
  userDetails,
  isGoalsLoading,
  goalsData,
  isPersonalityLoading,
  personalityData,
  isTasksLoading,
  isTasksGenerating,
  tasksData,
  hasGoalId
}: LoadingStateParams): UseLoadingStateReturn => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  // Progress tracking
  useEffect(() => {
    let progress = 0.2; // Initial
    
    if (!isUserLoading && userDetails) progress += 0.2;
    if (!isGoalsLoading && goalsData) progress += 0.2;
    if (!isPersonalityLoading && personalityData) progress += 0.2;
    if ((!isTasksLoading && !isTasksGenerating && tasksData) || !hasGoalId) progress += 0.2;
    
    setLoadingProgress(progress);
  }, [isUserLoading, userDetails, isGoalsLoading, goalsData, isPersonalityLoading, personalityData, isTasksLoading, isTasksGenerating, tasksData, hasGoalId]);

  // Loading state management
  const getLoadingState = (): LoadingStateResult | null => {
    if (!isInitialized || !Uid) {
      return { message: 'Initializing your AI assistant', progress: 0.1 };
    }
    if (isUserLoading) {
      return { message: 'Loading your profile', progress: 0.3 };
    }
    if (isGoalsLoading && !goalsData) {
      return { message: 'Fetching your goals', progress: 0.5 };
    }
    if (isPersonalityLoading && !personalityData) {
      return { message: 'Analyzing your personality for personalized insights', progress: 0.7 };
    }
    if ((isTasksLoading || isTasksGenerating) && !tasksData && hasGoalId) {
      return { message: 'AI is crafting your personalized daily tasks', progress: 0.9 };
    }
    return null;
  };

  return {
    loadingProgress,
    loadingState: getLoadingState()
  };
};