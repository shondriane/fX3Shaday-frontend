
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';

const Footer=()=>{

    function Copyright() {
        return (
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="FX3shaday.com">
              FX3Shaday
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
       
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Get Fit, Be Fabulous and Have Fun!
        </Typography>
        <Copyright />
      </Box>
    )
}

export default Footer