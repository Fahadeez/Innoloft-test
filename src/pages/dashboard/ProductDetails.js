import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  TextareaAutosize,
  InputLabel
} from "@mui/material";
import Page from "../../components/Page";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ProductDetails(props) {
  const [appConfig, setAppConfig] = React.useState({});
  let [product, setProduct] = React.useState({});
  let [trl, setTrl] = React.useState([]);
  let [categories, setCategories] = React.useState([]);
  let [businessModels, setBusinessModels] = React.useState([]);
  let [selectedTrl, setSelectedTrl] = React.useState("");

  let [tabContent, setTabContent] = React.useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        "https://api-test.innoloft.com/configuration/" +
          process.env.REACT_APP_ID +
          "/"
      )
      .then((res) => {
        console.log("app configuration", res.data);
        setAppConfig(res.data);
      });

    axios.get("https://api-test.innoloft.com/product/6781/").then((res) => {
      console.log("product info", res.data);
      setProduct(res.data);
      setCategories(res.data.categories);
      setBusinessModels(res.data.businessModels);
    });

    axios.get("https://api-test.innoloft.com/trl/").then((res) => {
      console.log("trl", res.data);
      setTrl(res.data);
    });
  }, []);

  const onSubmitProduct = () => {

    axios.put("https://api-test.innoloft.com/product/6781/",{ categories,businessModels,selectedTrl }).then((res) => {
      console.log("put ", res.data);
    });

  }

  console.log("style details props", props);
  return (
    <Page title="Dashboard">
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" color="primary">
            Product Details
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Back to main page
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid
            container
            spacing={3}
            display="flex"
            sm={12}
            md={12}
            lg={12}
            width="100%"
          >
            <Grid item xs={6} sm={6} md={6}>
              <Grid>
                <img src={product.picture} width="100%" />
              </Grid>
              <Grid item sx={{ background: "white" }} borderRadius={1} p={5}>
                <Typography>
                  <b>Title:</b> {product?.name}
                </Typography>
                <Typography>
                  <b>Type:</b> {product?.type?.name}
                </Typography>
              </Grid>
              <Grid
                item
                display="flex"
                my={2}
                justifyContent="space-evenly"
                sx={{ background: "white" }}
                borderRadius={1}
                p={5}
              >
                <Button variant="contained" onClick={() => setTabContent(2)}>
                  Description
                </Button>
                <Button variant="contained" onClick={() => setTabContent(1)}>
                  Attributes
                </Button>
              </Grid>
              <Grid sx={{ background: "white" }} borderRadius={1} p={5}>
                {tabContent == 1 ? (
                  <>
                    <Typography variant="h5" fontWeight={600}>
                      Attributes
                    </Typography>
                    <Typography
                      variant="h6"
                      fontSize={15}
                      fontWeight={600}
                      my={2}
                    >
                      Categories
                    </Typography>
                    <Typography>
                      {product?.categories?.map((item, index) => (
                        <ul>
                          <li style={{ margin: "15px" }}>
                            <TextField
                              id="outlined-basic"
                              label="Category"
                              variant="outlined"
                              value={item.name}
                              onChange={(e) => {
                                let newCat = [...categories];
                                newCat[index].name = e.target.value;
                                setCategories(newCat);
                              }}
                            />
                          </li>
                        </ul>
                      ))}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontSize={15}
                      fontWeight={600}
                      my={2}
                    >
                      Business Models
                    </Typography>
                    <Typography>
                      {product?.businessModels?.map((item, index) => (
                        <ul>
                          <li style={{ margin: "15px" }}>
                            <TextField
                              id="outlined-basic"
                              label="Business Models"
                              variant="outlined"
                              value={item.name}
                              onChange={(e) => {
                                let newCat = [...businessModels];
                                newCat[index].name = e.target.value;
                                setBusinessModels(newCat);
                              }}
                            />
                          </li>
                        </ul>
                      ))}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontSize={15}
                      fontWeight={600}
                      my={2}
                    >
                      TRL
                    </Typography>
                    <Typography>
                    
                    </Typography>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">TRL</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedTrl}
                        label="TRL"
                        onChange={(e) => setSelectedTrl(e.target.value)}
                      >
                        {trl &&
                        trl?.map((item) => (
                        <MenuItem value={item.name}>{item?.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <Box
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  ></Box>
                )}
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={6} width="100%">
              {appConfig.hasUserSection ? (
                <Grid
                  sx={{ background: "white" }}
                  height="50%"
                  borderRadius={1}
                  p={5}
                  mb={2}
                >
                  <img
                    src={product?.user?.profilePicture}
                    width={"100px"}
                    style={{ margin: "auto" }}
                  />
                  <Typography my={2}>
                    <b>Name: </b> {product?.user?.firstName}{" "}
                    {product?.user?.lastName}
                  </Typography>
                  <Typography>
                    <b>Company: </b> {product?.company?.name}
                  </Typography>
                </Grid>
              ) : null}

              <Grid
                item
                sx={{ background: "white" }}
                borderRadius={1}
                p={5}
                height="50%"
              >
                <Typography>
                  <b>Address: </b>
                  {product?.company?.address?.house},
                  {product?.company?.address?.street},
                  {product?.company?.address?.city?.name},
                  {product?.company?.address?.country?.name}
                </Typography>
                <Typography>
                  <b>Zip code: </b>
                  {product?.company?.address?.zipCode}
                </Typography>
              </Grid>
            </Grid>
            <Button sx={{ ml: '25%', my:2 }} variant="contained" onClick={onSubmitProduct}>
                  Submit
                </Button>
          </Grid>
        
        </Box>
      </Container>
    </Page>
  );
}
