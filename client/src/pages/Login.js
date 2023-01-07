import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function LoginPage() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const { login } = useAuth()

  function onSubmit(e) {
    e.preventDefault()
    login(formState)
  }

  return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          component="form"
          onSubmit={onSubmit}
          width="400px"
          height="400px"
          bgcolor="white"
          borderRadius="10px"
          boxShadow="0 0 10px 0 rgba(0,0,0,0.2)"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            sx={{ width: '70%' }}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type={'password'}
            variant="outlined"
            margin="normal"
            sx={{ width: '70%' }}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '70%', margin: '1rem' }}
          >
            Login
          </Button>
          <Link component={RouterLink} to="/register">
            Don't have an account? Register
          </Link>
        </Box>
      </Box>
  )
}

export default LoginPage
