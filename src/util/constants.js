import LanguageIcon from '@material-ui/icons/Language';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PublicIcon from '@material-ui/icons/Public';
import MemoryIcon from '@material-ui/icons/Memory';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';

export const NEWS_CATEGORIES = [
    { key: 'general', label: 'Top Headlines', icon: <LanguageIcon /> },
    { key: 'business', label: 'Business', icon: <BusinessCenterIcon /> },
    { key: 'technology', label: 'Technology', icon: <MemoryIcon /> },
    { key: 'entertainment', label: 'Entertainment', icon: <LocalMoviesIcon /> },
    { key: 'sports', label: 'Sports', icon: <SportsCricketIcon /> },
    { key: 'science', label: 'Science', icon: <PublicIcon /> }
]