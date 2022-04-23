import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';
import axios from 'axios';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};
export default function Logo({ sx, path }) {
  const [appConfig, setAppConfig] = React.useState({});
  
  React.useEffect(() => {

    axios.get("https://api-test.innoloft.com/configuration/"+process.env.REACT_APP_ID+"/").then((res) => {
      console.log("app configuration",res.data)
      setAppConfig(res.data)
    })
  
  },[])
  return (
    <RouterLink to={path || "/"}>
      <Box component="img" src={appConfig.logo} sx={{ height: '185px', ...sx }} />
    </RouterLink>
  );
}
