import React from 'react'
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import axios from "axios"
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../utils/toast';

function Signup() {
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onBlur"})
    const navigate = useNavigate()

    const submitHandler = async(data) => {
        try{
            const res = await axios.post("http://localhost:4000/signup",data);
            showSuccess("Registration Successful");
            setTimeout(()=>{
                navigate("/")
            },3000)
        }catch(err){
            showError(err.response?.data?.messsage || "SignUp Failed")
        }
    }
  return (
    <Container maxWidth="sm">
        <Paper elevation={3} sx={{mt:8, p:4, borderRadius:3}}>
            <Typography variant='h4' align='center' fontWeight="bold" gutterBottom>
                Create Account
            </Typography>
            <Typography variant='body2' align='center' color="text.secondary" mb={3}>
                AI Travel Planner
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
                <TextField 
                    fullWidth
                    label="Name"
                    margin='normal'
                    {...register("name",{
                        required:"Name is required"
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField 
                    fullWidth
                    label="E-mail"
                    margin='normal'
                    {...register("email",{
                        required:"E-mail is required"
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField 
                    fullWidth
                    type='password'
                    label="Password"
                    margin='normal'
                    {...register("password",{
                        required:"Password is required",
                        minLength:{
                            value:6,
                            message:"Minimum 6 Characters"
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant='contained'
                    size='large'
                    sx={{mt:3}}
                >
                    Sign Up
                </Button>
            </Box>

            <Typography
                align='center'
                sx={{mt:2}}
            >
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </Typography>
        </Paper>
    </Container>
  )
}

export default Signup