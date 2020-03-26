import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import { Redirect, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutUser } from './actions'

export const MainListItems = () => {
  const location = useLocation().pathname
  const [getRedirect, setRedirect] = useState(false)
  if (getRedirect && !(location === getRedirect)) {
    return <Redirect to={getRedirect}/>
  }
  return (
    <div>
      <ListSubheader inset>Pages</ListSubheader>
      <ListItem button onClick={() => setRedirect('/')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Polls' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Team' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary='Backlog' />
      </ListItem>
    </div>
  )
}

export const SecondaryListItems = () => {
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const [getRedirect, setRedirect] = useState(false)
  if (getRedirect && !(location === getRedirect)) {
    if (getRedirect === '/sign-out') {
      dispatch(signOutUser())
    }
    return <Redirect to={getRedirect}/>
  }
  return(
    <div>
      <ListSubheader inset>Actions</ListSubheader>
      <ListItem button onClick={() => setRedirect('/create-new-poll')}>
        <ListItemIcon>
          <AddIcon/>
        </ListItemIcon>
        <ListItemText primary='Create New Poll'/>
      </ListItem>
      <ListItem button onClick={() => setRedirect('/sign-out')}>
        <ListItemIcon>
          <LockIcon/>
        </ListItemIcon>
        <ListItemText primary='Sign Out'/>
      </ListItem>
    </div>
  )
}
