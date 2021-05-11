import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client';

// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddAlert from "@material-ui/icons/AddAlert";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

import { isInvalidEmail, isInvalidLength } from '../../utils';
import { queries } from '../../config/gqlQueries';
import Snackbar from '../Notification/Snackbar';
import { constants } from '../../config/constant';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1, height: "100%",
        padding: theme.spacing(3),
        minHeight: "100vh",
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabPanel: {
        "margin-left": 'auto',
        "margin-right": 'auto',
        float: "left"
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function Setting(props) {
    const classes = useStyles();
    const [formState, setFormState] = React.useState({
        firstName: { error: false, value: '', text: 'First name is required.' },
        lastName: { error: false, value: '', text: 'Last name is required.' },
        phone: { error: false, value: '', text: 'Phone Number is required.' },
        email: { error: false, value: '', text: 'Email is required' },
        currentPassword: { error: false, value: '', text: 'Current Password is required' },
        newPassword: { error: false, value: '', text: 'New Password is required' }
    });
    const [form2State, setForm2State] = React.useState({
        currentPassword: { error: false, value: '', text: 'Current Password is required' },
        newPassword: { error: false, value: '', text: 'New Password is required' }
    });
    React.useEffect(() => {
        setFormState({
            firstName: { error: false, value: props.user.firstName, text: '' },
            lastName: { error: false, value: props.user.lastName, text: '' },
            phone: { error: false, value: props.user.phone, text: '' },
            email: { error: false, value: props.user.email, text: '' }
        });
    }, [props])
    const [notify, setNotify] = React.useState({ open: false, color: 'success', msg: '' });
    const [btnDisable, setBtnDisable] = React.useState(false);
    const [btn2Disable, setBtn2Disable] = React.useState(false);
    const showNotification = (color, msg) => {
        setNotify({ ...notify, color, msg, open: true });
        setTimeout(function () {
            setNotify({ ...notify, open: false });
        }, 6000);
    }
    const [updateSetting, { loading }] = useMutation(queries.updateUser, {
        variables: { firstName: formState.firstName.value, lastName: formState.lastName.value, email: formState.email.value, phone: formState.phone.value },
        onCompleted: () => {
            setBtnDisable(false);
            showNotification(constants.notification.color.s, constants.notification.common.i);
        },
        onError: (err) => {
            setBtnDisable(false);
            showNotification(constants.notification.color.d, err.message);
        }
    });
    const [update2Setting, { loading2 }] = useMutation(queries.updateUserCredentials, {
        variables: { newPassword: form2State.newPassword.value, currentPassword: form2State.currentPassword.value },
        onCompleted: () => {
            setBtn2Disable(false);
            showNotification(constants.notification.color.s, constants.notification.common.i);
        },
        onError: (err) => {
            setBtn2Disable(false);
            showNotification(constants.notification.color.d, err.message);
        }
    });
    const validateInput = (key, s) => {
        const temp = JSON.parse(JSON.stringify(formState));
        temp[key]['value'] = s;
        Object.keys(temp).map(k => { temp[k]['error'] = false; temp[k]['text'] = `${k} is required`; })
        switch (key) {
            case 'firstName': {
                const e = isInvalidLength(key, s, 3, 20);
                if (e) { temp[key].error = true; temp[key].text = e; }
                else setFormState(temp);
                break;
            }
            case 'lastName': {
                const e = isInvalidLength(key, s, 3, 20);
                if (e) { temp[key].error = true; temp[key].text = e; }
                else setFormState(temp);
                break;
            }
            case 'phone': {
                const e = isInvalidLength(key, s, 6, 13);
                if (e) { temp[key].error = true; temp[key].text = e; }
                else setFormState(temp);
                break;
            }
            case 'email': {
                const e1 = isInvalidEmail(s);
                if (e1) { temp[key].error = true; temp[key].text = e1; }
                else setFormState(temp);
                break;
            }
            case 'currentPassword': {
                const e = isInvalidLength(key, s, 3, 255);
                if (e) { temp[key].error = true; temp[key].text = e; }
                else setForm2State(temp);

                break;
            }
            case 'newPassword': {
                const e = isInvalidLength(key, s, 3, 255);
                if (e) { temp[key].error = true; temp[key].text = e; }
                else setForm2State(temp);
                break;
            }
            default:
                break;
        }
        
        return Object.values(temp).filter(r => r.error).length;
    }
    const validate2Input = (key, s) => {
        const temp = JSON.parse(JSON.stringify(form2State));
        temp[key]['value'] = s;
        Object.keys(temp).map(k => { temp[k]['error'] = false; temp[k]['text'] = `${k} is required`; })
        switch (key) {
            case 'currentPassword': {
                const e = isInvalidLength(key, s, 3, 255);
                if (e) { temp[key].error = true; temp[key].text = e; }
                break;
            }
            case 'newPassword': {
                const e = isInvalidLength(key, s, 3, 255);
                if (e) { temp[key].error = true; temp[key].text = e; }
                break;
            }
            default:
                break;
        }
        setForm2State(temp);
        return Object.values(temp).filter(r => r.error).length;
    };
    const saveSetting = () => {
        try {
            const [errors] = Object.entries(formState).filter(r => validateInput(r[0], r[1]['value']));
            if (errors && errors.length) return showNotification(constants.notification.color.d, errors[1].text);
            if (!loading) { updateSetting(); setBtnDisable(true); }
        } catch (e) {
            console.log(e);
        }
    };
    const saveCredentials = () => {
        try {
            const [errors] = Object.entries(form2State).filter(r => validate2Input(r[0], r[1]['value']));
            if (errors && errors.length) return showNotification(constants.notification.color.d, errors[1].text);
            if (!loading2) { update2Setting(); setBtn2Disable(true); }
        } catch (e) {
            console.log(e);
        }
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <main style={{ backgroundColor: "white", height: "100%" }} className={classes.content}>
            <div className={classes.toolbar} />
            <div style={{ display: 'flex' }}>
                <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" className={classes.tabs} >
                    <Tab label="Personal Details" {...a11yProps(0)} />
                    <Tab label="Account Credential" {...a11yProps(1)} />
                </Tabs>
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                    <div className={classes.heroContent}>
                        <Container component="main" maxWidth="xs">

                            <div className={classes.paper}>
                                
                                <form className={classes.form} noValidate onSubmit={(e) => { e.preventDefault(); }}>
                                    {(formState && formState.firstName) ? <TextField value={formState.firstName.value || ''} onChange={(e) => validateInput('firstName', e.target.value)} helperText={formState.firstName.text} error={formState.firstName.error} variant="outlined" margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="text" autoFocus /> : <Skeleton width="40%" />}
                                    {(formState && formState.lastName) ? <TextField value={formState.lastName.value || ''} onChange={(e) => validateInput('lastName', e.target.value)} helperText={formState.lastName.text} error={formState.lastName.error} variant="outlined" margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" type="text" /> : <Skeleton width="40%" />}
                                    {(formState && formState.phone) ? <TextField value={formState.phone.value || ''} onChange={(e) => validateInput('phone', e.target.value)} helperText={formState.phone.text} error={formState.phone.error} variant="outlined" margin="normal" required fullWidth id="phone" label="Phone" name="phone" type="text" /> : <Skeleton width="40%" />}
                                    {(formState && formState.email) ? <TextField value={formState.email.value || ''} onChange={(e) => validateInput('email', e.target.value)} helperText={formState.email.text} error={formState.email.error} variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" type="email" /> : <Skeleton width="40%" />}
                                </form>
                                <Grid container spacing={2} justify="center">
                                    <Grid item xs={3}>
                                        <Button disabled={btnDisable} onClick={() => { saveSetting(); }} type="submit" variant="contained" color="primary" >
                                            Save
                                </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={1}>
                    <div className={classes.heroContent}>
                        <Container component="main" maxWidth="xs">
                            <div className={classes.paper}>
                                <form className={classes.form} noValidate onSubmit={(e) => { e.preventDefault(); }}>
                                <TextField value={form2State.currentPassword.value || ''} onChange={(e) => validate2Input('currentPassword', e.target.value)} helperText={form2State.currentPassword.text} error={form2State.currentPassword.error} variant="outlined" margin="normal" required fullWidth id="currentPassword" label="Current Password" name="currentPassword" type="password" /> 
                                <TextField value={form2State.newPassword.value || ''} onChange={(e) => validate2Input('newPassword', e.target.value)} helperText={form2State.newPassword.text} error={form2State.newPassword.error} variant="outlined" margin="normal" required fullWidth id="newPassword" label="New Password" name="newPassword" type="password" /> 
                                </form>
                                <Grid container spacing={2} justify="center">
                                    <Grid item xs={3}>
                                        <Button disabled={btn2Disable} onClick={() => { saveCredentials(); }} type="submit" variant="contained" color="primary" >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                </TabPanel>
            </div>
            <Snackbar place='tr' color={notify.color} icon={AddAlert} message={notify.msg} open={notify.open} closeNotification={() => setNotify({ ...notify, open: false })} close />
        </main>
    )
}
Setting.propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Setting
