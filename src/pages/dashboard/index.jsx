
import {
  Box,
  Card,
  Grid,
  Typography
} from '@mui/material';
import LaunchPieChart from './LaunchPieChart';
import LaunchTable from './table';
import LaunchBarChart from './LaunchBarChart';
import { useState } from 'react';

const Dashboard = () => {

  const [failed, setFailed] = useState()
  const [success, setSuccess] = useState()

  function handleSuccess(successValue){
    setSuccess(successValue)
  }

  function handleFailed(failedValue){
    setFailed(failedValue)
  }
 
  return (
 <Grid  container rowSpacing={4.5} columnSpacing={2.75}>

  <Grid item xs={12} md={6} lg={6}>
    <Box width='100%' sx={{ display:"block" }}>
        <Grid item>
          <Typography variant="h4" mb={2}>Lançamentos de Foguetes</Typography>
        </Grid>
        <Grid item>
          <Card
            content={false}
            elevation={ 1}
            sx={{
            border: '1px solid',
            borderRadius: 2,
            }}
          >
              <Box px={'auto'} height='307px' display={'flex'} flexDirection={'column'} justifyContent={'space-between'} sx={{ pl: 2,  pt: 1, pr: 2, pb:2 }}>
                  <LaunchPieChart  onSuccess={handleSuccess} onFailed={handleFailed}/>
                  <div id='result_launch'>
                    <Box sx={{ pr: 2 }}>
                      <Typography variant="h5" >Resultado do Lançamento</Typography>
                      <Box display={'flex'} alignItems={'baseline'} sx={{ pr: 2 }}>
                          <Typography>Sucesso:</Typography>
                          <Typography variant='h5' ml={2}>{success}</Typography>
                      </Box>
                      <Box display={'flex'} alignItems={'baseline'} sx={{ pr: 2 }}>
                          <Typography>Falhou: </Typography>
                          <Typography variant='h5' ml={2}>{failed} </Typography>
                      </Box>
                    </Box>
                  </div>
              </Box>
          </Card>
        </Grid>

    </Box>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
  <Box width='100%' sx={{ display:"block" }}>
      <Grid item>
        <Typography variant="h4" mb={2}>Lançamentos por ano</Typography>
      </Grid>
      <Grid item />
      <Grid item>
        <Card
            content={false}
            elevation={ 1}
            sx={{
            border: '1px solid',
            borderRadius: 2,
            
            }}
        >
            <Box height='320px' sx={{ pt: 1, pr: 2 }}>
                <LaunchBarChart  />
            </Box>
          </Card>
      </Grid>
    </Box>
  </Grid>

  <Grid item xs={12}>
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h4">Registros de Lançamentos</Typography>
      </Grid>
      <Grid item />
    </Grid>
      <LaunchTable />
  </Grid>

</Grid>
   
  );
};

export default Dashboard;