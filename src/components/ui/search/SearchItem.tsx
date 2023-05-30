import React from 'react'
import {intervalToDuration} from 'date-fns'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import spotify from '../../../data/images/spotify.svg'
import {Album, Artist, Track} from '../../../data/data_types'
import PlayButton from '../../form/buttons/filled/playButton/PlayButton'
import useRecentSearchStore from '../../../stores/search/recentSearchStore'
import './SearchItem.css'
import FollowButton from "../../form/buttons/outlined/followButton/FollowButton";
import FavouriteButton from "../../form/buttons/outlined/favouriteButton/FavouriteButton";

interface SearchItemProps {
    item: Album | Artist | Track
}

const SearchItem = ({item}: SearchItemProps) => {

    const {addRecentSearch} = useRecentSearchStore()

    const album: Album | undefined = (item as Album).uri.includes('album') ? item as Album : undefined
    //const playlist: Playlist | undefined = (item as Playlist).uri.includes('playlist') ? item as Playlist : undefined
    const artist: Artist | undefined = (item as Artist).uri.includes('artist') ? item as Artist : undefined
    const track: Track | undefined = (item as Track).uri.includes('track') ? item as Track : undefined

    const trackTimeDuration = track ? intervalToDuration({
        start: 0,
        end: (item as Track).duration_ms
    }) : null

    const onClickHandle = () => {
        addRecentSearch(item)
    }

    return (
        <div id='search-item'>
            <div>
                {
                    album ?
                        album.images.length !== 0 ?
                            <img src={album.images[0].url} alt='album'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {
                    artist ?
                        artist.images.length !== 0 ?
                            <img src={artist.images[0].url} alt='artist'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {
                    track ?
                        <img src={track.album.images[0].url} alt='track'/> : null
                }
                <div>
                    <h1 className='fw--semi-bold'>{item.name} • {item.type.slice(0, 1).toUpperCase() + item.type.substring(1)}</h1>

                    <div id='information-wrapper'>
                        {
                            album ?
                                <div>
                                    <CalendarMonthRoundedIcon fontSize='small'/>
                                    {new Date(album.release_date).getFullYear()}
                                </div> : null
                        }
                        {
                            album ? ' • ' : null
                        }
                        {
                            album ?
                                album.artists.map(artist => artist.name).join(', ')
                                : null
                        }
                        {
                            artist ? artist.followers.total.toLocaleString() + ' followers' : null
                        }
                        {
                            trackTimeDuration ? `${trackTimeDuration.minutes}:${trackTimeDuration.seconds}` : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItem