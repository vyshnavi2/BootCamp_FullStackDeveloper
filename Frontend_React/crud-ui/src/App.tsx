import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Container, Button, Grid } from "@mui/material";
import { LoginForm } from "./components/MuiLoginForm"; // Import your login form component
import { SignupForm } from "./components/MuiSignUpForm"; // Import your signup form component

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/signup" color="inherit">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main"
        maxWidth="xs"
        sx={{
          marginTop: 4,
          height: "calc(100vh - 64px)", // Adjust to account for AppBar height
        }}>
          <Grid container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
              <Routes>
              <Route path="/login" Component={LoginForm} />
             <Route path="/signup" Component={SignupForm} />
            </Routes>
        </Grid>
        </Grid>
      </Container>
    </Router>
  );
};

export default App;
