import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const { logout } = useAuth()

  function handleLogout() {
    logout()
  }

  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
