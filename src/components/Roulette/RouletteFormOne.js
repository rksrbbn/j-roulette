import { Button, Typography } from '@mui/material';

const RouletteFormOne = ({ nextStep, handleButtonClick, number, pickNumber, isPicking, handleReset }) => {

  return (
    <div>
     <Typography variant="h4" style={{color:'#f50057'}}>{number}</Typography>
     {pickNumber === 0 && (
      <Button onClick={handleButtonClick}>
        {isPicking ? 'Stop Number' : 'Pick Number'}
      </Button>
      )}
       {pickNumber !== 0 && (
        <div>
            <small style={{color:'#f50057'}}>Your Roulette Number is {pickNumber}!</small>
            <Button onClick={() => {
                handleReset();
            }}>Reset</Button>
        </div>
       )}

      <Button fullWidth onClick={nextStep} variant="outlined" color="success" style={{marginTop: '50px'}}>Next</Button>
    </div>
  );
};

export default RouletteFormOne;
