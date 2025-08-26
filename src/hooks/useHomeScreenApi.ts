// hooks/useHomeScreenApi.ts
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  useGenerateTaskswithAiQuery,
} from '../api/HomeApi';
import { useGeneratePersonalityQuery as usePersonalityQuery } from '../api/personalityApi';
import { useUserDetailsQuery as useUserQuery } from '../api/userApi';
import { useGetGoalsQuery as useGoalsQuery } from '../api/goals';
import { useGetProgressQuery as useProgressQuery, useGetTasksQuery as useTasksQuery } from '../api/tasks';
import { setGoal } from '../redux/slices/goalsSlice';

// Type definitions
interface UserDetails {
  firestoreData?: {
    goals?: string[];
  };
}

interface GoalData {
  id: string;
  title: string;
  category: string;
  // Add other goal properties as needed
}

interface PersonalityData {
  data?: {
    aiInsight?: string;
  };
}

interface TasksData {
  tasks?: Array<{
    title: string;
    // Add other task properties as needed
  }>;
}

interface GoalProgressData {
  progressPercent?: number;
}

interface UseHomeScreenApiReturn {
  // Data
  userDetails: UserDetails | undefined;
  goalsData: GoalData[] | undefined;
  personalityData: PersonalityData | undefined;
  tasksData: TasksData | undefined;
  goalProgressData: GoalProgressData | undefined;
  todayFocus: string;
  initialGoalId: string | null;
  hasGoalId: boolean;
  
  // Loading states
  isUserLoading: boolean;
  isGoalsLoading: boolean;
  isPersonalityLoading: boolean;
  isTasksLoading: boolean;
  isTasksGenerating: boolean;
  isProgressLoading: boolean;
  isAnyLoading: boolean;
  
  // Errors
  userError: any;
  goalsError: any;
  personalityError: any;
  tasksError: any;
  taskGenerationError: any;
  hasErrors: boolean;
  
  // Refetch functions
  refetchAllData: () => Promise<void>;
  refetchGoalDependentData: () => Promise<void>;
}

export const useHomeScreenApi = (
  Uid: string | null, 
  isInitialized: boolean
): UseHomeScreenApiReturn => {
  const dispatch = useDispatch();
  const [todayFocus, setTodayFocus] = useState<string>('');
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  // Check if user and auth are ready
  const isUserReady = isInitialized && Boolean(Uid);

  // API calls with proper dependency management
  const { 
    data: userDetails, 
    isLoading: isUserLoading, 
    refetch: refetchUserDetails,
    error: userError
  } = useUserQuery(undefined, { 
    skip: !isUserReady 
  });

  const initialGoalId: string | null = userDetails?.firestoreData?.goals?.[0] ?? null;
  const hasGoalId: boolean = Boolean(initialGoalId);

  const { 
    data: goalsData, 
    isLoading: isGoalsLoading,
    refetch: refetchGoals,
    error: goalsError
  } = useGoalsQuery(undefined, { 
    skip: !isUserReady 
  });

  const { 
    data: personalityData, 
    isLoading: isPersonalityLoading,
    refetch: refetchPersonality,
    error: personalityError
  } = usePersonalityQuery(Uid!, { 
    skip: !isUserReady 
  });

  // Goal-dependent API calls
  const { 
    data: goalProgressData, 
    isLoading: isProgressLoading,
    refetch: refetchProgress 
  } = useProgressQuery(
    { goalId: initialGoalId! }, 
    { skip: !hasGoalId }
  );

  const { 
    isLoading: isTasksGenerating, 
    refetch: refetchTaskGeneration,
    error: taskGenerationError
  } = useGenerateTaskswithAiQuery(
    { goalId: initialGoalId!, phase: 1 },
    { skip: !hasGoalId }
  );

  const {
    data: tasksData,
    isLoading: isTasksLoading,
    refetch: refetchTasks,
    error: tasksError
  } = useTasksQuery(
    {
      goalId: initialGoalId!,
      phase: 1,
      dayIndex: 0,
    },
    { skip: !hasGoalId }
  );

  // Computed states
  const isAnyLoading = isUserLoading || isGoalsLoading || isPersonalityLoading || 
                       isTasksLoading || isTasksGenerating || isProgressLoading || isRefetching;
  
  const hasErrors = Boolean(userError || goalsError || personalityError || 
                           tasksError || taskGenerationError);

  // Refetch goal-dependent data
  const refetchGoalDependentData = useCallback(async (): Promise<void> => {
    if (!hasGoalId) {
      console.warn('No goal ID available for refetching goal-dependent data');
      return;
    }

    try {
      console.log('Refetching goal-dependent data...');
      setIsRefetching(true);
      
      await Promise.allSettled([
        refetchTasks(),
        refetchProgress(),
        refetchTaskGeneration()
      ]);
      
      console.log('Goal-dependent data refetch completed');
    } catch (error) {
      console.error('Error refetching goal-dependent data:', error);
    } finally {
      setIsRefetching(false);
    }
  }, [hasGoalId, refetchTasks, refetchProgress, refetchTaskGeneration]);

  // Refetch all data when auth becomes ready
  const refetchAllData = useCallback(async (): Promise<void> => {
    if (!isUserReady) {
      console.warn('User not ready for data refetch');
      return;
    }

    try {
      console.log('Refetching all data...');
      setIsRefetching(true);

      // First fetch user details and basic data
      await refetchUserDetails();
      
      // Then fetch goals and personality in parallel
      await Promise.allSettled([
        refetchGoals(),
        refetchPersonality()
      ]);
      
      console.log('Initial data refetch completed');
    } catch (error) {
      console.error('Error refetching data:', error);
    } finally {
      setIsRefetching(false);
    }
  }, [isUserReady, refetchUserDetails, refetchGoals, refetchPersonality]);

  // Trigger initial data fetch when auth is ready
  useEffect(() => {
    if (isUserReady) {
      console.log('User ready, triggering initial data fetch');
      refetchAllData();
    }
  }, [isUserReady, refetchAllData]);

  // Refetch goal-dependent data when goal ID becomes available
  useEffect(() => {
    if (hasGoalId && !isRefetching) {
      console.log(`Goal ID available (${initialGoalId}), refetching goal-dependent data...`);
      refetchGoalDependentData();
    }
  }, [hasGoalId, initialGoalId, refetchGoalDependentData, isRefetching]);

  // Set today's focus when tasks data is available
  useEffect(() => {
    if (tasksData?.tasks && tasksData.tasks.length > 0) {
      const newFocus = tasksData.tasks[0].title;
      if (newFocus !== todayFocus) {
        console.log(`Setting today's focus: ${newFocus}`);
        setTodayFocus(newFocus);
      }
    }
  }, [tasksData, todayFocus]);

  // Dispatch goals data to Redux when available
  useEffect(() => {
    if (goalsData && Array.isArray(goalsData)) {
      console.log(`Dispatching ${goalsData.length} goals to Redux`);
      dispatch(setGoal(goalsData));
    }
  }, [goalsData, dispatch]);

  // Debug logging
  useEffect(() => {
    const debugInfo = {
      isInitialized,
      hasUid: Boolean(Uid),
      userDetails: Boolean(userDetails),
      initialGoalId,
      hasGoalId,
      goalsCount: goalsData?.length || 0,
      hasPersonalityData: Boolean(personalityData),
      tasksCount: tasksData?.tasks?.length || 0,
      isAnyLoading,
      hasErrors
    };
    
    console.log('HomeScreen API Debug:', debugInfo);
  }, [isInitialized, Uid, userDetails, initialGoalId, hasGoalId, goalsData, personalityData, tasksData, isAnyLoading, hasErrors]);

  return {
    // Data
    userDetails,
    goalsData,
    personalityData,
    tasksData,
    goalProgressData,
    todayFocus,
    initialGoalId,
    hasGoalId,
    
    // Loading states
    isUserLoading,
    isGoalsLoading,
    isPersonalityLoading,
    isTasksLoading,
    isTasksGenerating,
    isProgressLoading,
    isAnyLoading,
    
    // Errors
    userError,
    goalsError,
    personalityError,
    tasksError,
    taskGenerationError,
    hasErrors,
    
    // Refetch functions
    refetchAllData,
    refetchGoalDependentData
  };
};