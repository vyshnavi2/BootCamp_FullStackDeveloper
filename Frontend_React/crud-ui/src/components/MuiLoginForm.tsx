import { useForm } from "react-hook-form";
import { Paper,TextField, Button, Stack , Avatar} from "@mui/material";
import { DevTool } from "@hookform/devtools";
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';


let renderCount = 0;
const paperStyle = {padding: 20,
    width: 300,
    margin: '20px auto'}
const avatarStyle={backgroundColor:'#1bbd7e'}

type FormValues = {
  email: string;
  password: string;
};


export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  renderCount++;

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={10} style={paperStyle}>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            </Grid>
            <Grid item>
              <h1>Login</h1>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <p>
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};