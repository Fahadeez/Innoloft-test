import React, { useState } from "react";

// material
import {
  Box,
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardHeader,
  TextField,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";

export default function MainPage() {
  const [fields, setFields] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);
  const [uniFields, setUniFields] = useState([]);

 
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4" color="primary">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
        </Grid>
      </Container>
    </Page>
  );
}
