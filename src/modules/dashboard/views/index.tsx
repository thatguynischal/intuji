import '@/App.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FirstStep from './FirstStep';
import { useAppSelector } from '@/app/hooks';
import CreateTeams from './CreateTeams';
import Results from './Results';

const steps = [
  {
    label: 'Add Players',
    component: <FirstStep />,
  },
  {
    label: 'Create Teams',
    component: <CreateTeams />,
  },
  {
    label: 'Final Result',
    component: <Results />,
  },
];

export default function VerticalLinearStepper() {
const activeStep = useAppSelector((state) => state.player.stepsCount);

  return (
    <div className="card">
      <Box sx={{ maxWidth: 600 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.component}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button> */}
          </Paper>
        )}
      </Box>
    </div>
  );
}
