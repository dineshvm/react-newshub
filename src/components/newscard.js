import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    newscard: {
        display: 'flex',
        margin: '2em',
        minHeight: '25vh'
    },
    cardDetails: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto'
    },
    cardContent: {
        flex: '1 0 auto',
        textAlign: 'initial'
    },
    cardCover: {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        maxWidth: '20vw',
        minHeight: '25vh',
        flexShrink: 0
    },
    cardActionContainer: {
        display: 'flex',
        paddingLeft: '16px'
    },
    divider: {
        color: '#3f51b5'
    },
    source: {
        flexGrow: 1,
        textAlign: 'end'
    },
    urlLink: {
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        }
    }
}));

export default function NewsCard(props) {
    const classes = useStyles();
    const { article } = props;

    const formatDate = (dateStr) => {
        let date = new Date(dateStr);
        if (date) {
            let tempD = {
                year: date.getUTCFullYear(),
                month: (date.getUTCMonth() + 1) < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1,
                day: date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate(),
                hour: date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours(),
                minute: date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes(),
            }
            return `${tempD.year}-${tempD.month}-${tempD.day}  ${tempD.hour}:${tempD.minute}`
        }
        return ''
    }
    const goToSourcePage = (card) => {
        window.open(card.newsurl)
    }

    return (
        <Card className={classes.newscard}>
            <Hidden xsDown>
                <CardMedia
                className={classes.cardCover}
                image={article.imageurl ? article.imageurl : ''}
                title={article.title}
                onClick={() => goToSourcePage(article)}
            />
            </Hidden>
            <div className={classes.cardDetails}>
                <CardContent className={classes.cardContent}>
                    <Link onClick={() => goToSourcePage(article)} className={classes.urlLink}>
                        <Typography component="h6" variant="h6">{article.title}</Typography>
                    </Link>
                    <Typography variant="body1" gutterBottom> {article.description}</Typography>

                </CardContent>
                <CardActions className={classes.cardActionContainer}>
                    {
                        article.author && <Typography variant="caption" color="textSecondary">{article.author}
                            <span className={classes.divider}> | </span> </Typography>
                    }
                    <Typography variant="caption" color="textSecondary">{formatDate(article.publishedAt)}</Typography>
                    <div className={classes.source} >
                        <Typography variant="caption" color="textSecondary">Source: </Typography>
                        <Typography variant="caption" color="textSecondary" style={{ color: '#000' }}>{article.source}</Typography>
                    </div>
                </CardActions>
            </div>
        </Card>
    );
}



