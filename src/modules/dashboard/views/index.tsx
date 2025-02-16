import React, { useMemo } from 'react';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent, 
  Typography, 
  Paper, 
  Container, 
  Button
} from '@mui/material';
import { stepsReset } from '@/services/features/playerSlice';
import { useAppSelector, useAppDispatch } from '@/app/hooks';

interface StepComponentsType {
  [key: string]: React.LazyExoticComponent<() => JSX.Element>;
}

const stepComponents: StepComponentsType = {
  AddPlayers: React.lazy(() => import('./Players')),
  CreateTeams: React.lazy(() => import('./Teams')),
  TeamResults: React.lazy(() => import('./Results'))
};

const steps = [
  { label: 'Add Players', component: 'AddPlayers' },
  { label: 'Create Teams', component: 'CreateTeams' },
  { label: 'Team Results', component: 'TeamResults' }
];

export default function Dashboard() {
  const activeStep = useAppSelector((state) => state.player.stepsCount);
  const dispatch = useAppDispatch();
  
  const CurrentStepComponent = useMemo(() => {
    const stepName = steps[activeStep]?.component;
    const Component = stepComponents[stepName];
    return Component 
      ? React.createElement(Component) 
      : null;
  }, [activeStep]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <React.Suspense fallback={<Typography>Loading...</Typography>}>
                  {activeStep === index && CurrentStepComponent}
                </React.Suspense>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={() => dispatch(stepsReset())} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
      </Paper>
    </Container>
  );
}
