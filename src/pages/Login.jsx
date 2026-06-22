import React from 'react'
import { useForm } from 'react-hook-form'
import { showError, showSuccess } from '../utils/toast'
import axios from 'axios'
import { setToken } from '../utils/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'

function Login() {
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onBlur"})
    const navigate = useNavigate()

    const submitHandler = async(data) => {
        try{
            const res = await axios.post("http://localhost:4000/login",data)
            setToken(res.data.token)
            showSuccess("Login Successful")
            setTimeout(() => {
                navigate("/dashboard")
            },3000)
        }catch(err){
           showError(err.response?.data?.message || "Login Failed") 
        }
    }
  return (
    <Container maxWidth="sm">
        <Paper elevation={3} sx={{mt:8, p:4, borderRadius:3}}>
            <Typography variant='h4' align='center' fontWeight="bold" gutterBottom>
                Welcome Back
            </Typography>

            <Typography variant='body2' align='center' color='text.secondary' mb={3}>
                Login to AI Travel Planner
            </Typography>

            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
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
                        required:"Password is required"
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
                    Login
                </Button>
            </Box>
            <Typography align='center' sx={{mt:2}}>
                Don't have an account?{" "}
                <Link to="/signup">Register</Link>
            </Typography>
        </Paper>
    </Container>
  )
}

export default Login