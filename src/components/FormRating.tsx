import { Controller } from 'react-hook-form';
import { 
  Rating, 
  Typography, 
  Box, 
  FormHelperText 
} from '@mui/material';
import { FormInputProps } from './FormInputProps';

const FormRating = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 1
          }}
        >
          <Typography variant="body2">
            {label}
          </Typography>
          <Rating 
            name={name} 
            value={Number(value) || 0} 
            onChange={onChange} 
            sx={{ 
              '& .MuiRating-icon': {
                transition: 'transform 0.2s ease',
              },
              '& .MuiRating-icon:hover': {
                transform: 'scale(1.1)',
              }
            }}
          />
          {error && (
            <FormHelperText 
              error 
              sx={{ 
                textAlign: 'center', 
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            >
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

export default FormRating;
