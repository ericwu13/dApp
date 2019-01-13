import red from '@material-ui/core/colors/red';

export const CardStyles = {
    card: {
        width: 280,
        maxHeight: 500,
    },
    media: {
        maxHeight: 200,
        height: 'auto',
        width: 'auto',
        maxWidth: 250,
        margin:'auto'
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
        height: "100vh",
        width: 1000,
        overflow: 'auto'
    },
    homeContainer: {
        marginTop: 20,
        marginLeft: '15%',//400,
        marginRight: '5%',
        height: "100vh",
        overflow: 'auto'
    }
}