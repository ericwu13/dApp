import red from '@material-ui/core/colors/red';

export const CardStyles = {
    card: {
        width: 250,
        maxHeight: 500,
    },
    media: {
        height: 0,
        paddingTop: '80.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },
    deliverContainer: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 1000,
        width: 1000,
        overflow: 'auto'
    },
    homeContainer: {
        marginTop: 20,
        marginLeft: '15%',//400,
        marginRight: '5%',
        height: 1000,
        overflow: 'auto'
    }
}