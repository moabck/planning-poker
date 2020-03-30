import React, {  useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import { DateTime } from 'luxon'

const Polls = ({ polls }) => {
  const [getRedirect, setRedirect] = useState()
  if (getRedirect) {
    return <Redirect to={`/poll/${getRedirect}`} />
  }
  return (
    <React.Fragment>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>CREATION DATE</TableCell>
            <TableCell>CREATED BY</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(polls || []).map((row) => (
            <TableRow key={row.get('id')}>
              <TableCell>{row.get('title')}</TableCell>
              <TableCell size='small'>{row.get('description').split(".")[0]} ...</TableCell>
              <TableCell>{DateTime.fromISO(row.get('creationDate')).toFormat('dd LLL yyyy, hh:mm')}</TableCell>
              <TableCell>{row.get('creator')}</TableCell>
              <TableCell align='right'>
                <Button
                  onClick={() => setRedirect(row.get('id'))}
                  color='secondary'
                >
                  View poll
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default Polls
