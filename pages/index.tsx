import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTracks, searchTracks } from '../store/actions-creators/track'
import { useTypedSelector } from '../hooks/use.typed.selector'
import { NextThunkDispatch, wrapper } from '../store'
import { Box, Grid, Card, InputBase, styled, alpha } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import TrackList from '../components/TrackList'
import MainLayout from '../layouts/MainLayout'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Index() {
  const dispatch = useDispatch() as NextThunkDispatch

  const { tracks, error } = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const [timer, setTimer] = useState(null)

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

    if (timer) {
      clearTimeout(timer)
    }
    setTimer(setTimeout(async () => {
      await dispatch(await searchTracks(e.target.value))
    }, 500))
  }

  if (error) {
    <MainLayout>
      <h2>error</h2>
    </MainLayout>
  }
  return (
    <MainLayout title={"Tracklist - Music Playground"} description={'desctiption'}>
      <Grid container justifyContent='center'>
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>Tracks List</h1>
            </Grid>
          </Box>
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={search}
            />
          </Search>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}
// export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
// const dispatch = store.dispatch as NextThunkDispatch
// await dispatch(await fetchTracks())
// }
// );

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      await store.dispatch(fetchTracks());
    }
)


