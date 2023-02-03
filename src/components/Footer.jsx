
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
        <footer component="footer" sx={{ bgcolor: 'background.paper',bottom:0,py:2, px:4,mt:'auto'}} >
       <Container maxWidth="sm">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Get Fit, Be Fabulous and Have Fun!
         
        </Typography>
        <Copyright />
        </Container>
      </footer>
    )
}

export default Footer