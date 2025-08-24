//   const {
//     impactOnGoals,
//     description,
//     personalityType,
//     personalityName,
//     personalityTraits: traitsString = '',
//     famousPeople = [],
//     // New fields that should be added to your API response
//     strengths = [],
//     challenges = [],
//     motivationTips = [],
//     personalityScore = {
//       openness: 75,
//       conscientiousness: 85,
//       extraversion: 60,
//       agreeableness: 70,
//       neuroticism: 40,
//     },
//     compatibleGoalTypes = [],
//     recommendedApproach = '',
//     personalityInsights = [],
//   } = personalityData?.data || {};

//   const traitsArray =
//     typeof traitsString === 'string'
//       ? traitsString.split(',').map(trait => trait.trim())
//       : [];

//   // Mock data for demonstration (you should get this from your API)
//   const mockStrengths: PersonalityStrength[] = [
//     {
//       title: 'Strategic Thinking',
//       description: 'You excel at long-term planning and seeing the big picture.',
//       icon: 'bulb-outline',
//     },
//     {
//       title: 'Self-Discipline',
//       description: 'You have strong willpower to stick to your commitments.',
//       icon: 'shield-checkmark-outline',
//     },
//     {
//       title: 'Adaptability',
//       description: 'You adjust well to changing circumstances and setbacks.',
//       icon: 'refresh-outline',
//     },
//   ];

//   const mockChallenges: PersonalityChallenge[] = [
//     {
//       challenge: 'Tendency to overthink',
//       solution: 'Break big goals into smaller, immediate actions',
//       icon: 'alert-circle-outline',
//     },
//     {
//       challenge: 'Perfectionism can cause delays',
//       solution: 'Set "good enough" milestones and celebrate progress',
//       icon: 'time-outline',
//     },
//   ];

//   const mockMotivationTips: MotivationTip[] = [
//     {
//       tip: 'Visualize your success daily for 5 minutes',
//       category: 'Visualization',
//     },
//     {
//       tip: 'Track small wins to maintain momentum',
//       category: 'Progress Tracking',
//     },
//     {
//       tip: 'Find an accountability partner with similar goals',
//       category: 'Social Support',
//     },
//   ];