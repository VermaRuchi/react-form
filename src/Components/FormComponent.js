import React from 'react';
import {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import TableData from './TableData';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '1em'
    },
}));

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

function FormComponent(){
    const classes = useStyles();
    const [ usersData, setUsersData ] = useState([
        {
            name:{error:false, value:"Ruchi"},
            age:{error:false, value:"27"},
            email:{error:false, value:"ruchiverma.verma910@gmail.com"},
            phone_no:{error:false, value:"09560164342"}
        },
        {
            name:{error:false, value:"Riya"},
            age:{error:false, value:"27"},
            email:{error:false, value:"riyaverma.verma910@gmail.com"},
            phone_no:{error:false, value:"09560164342"}
        },
    ]);
    const [currentUser,setCurrentUser] = useState({
        name: {error:false, value:''},
        age: {error:false, value:''},
        email: {error:false, value:''},
        phone_no: {error:false, value:''}
    
    })
    const [errors,setErrors] = useState({
        name:false,
        age:false,
        email:false,
        phone_no:false
    })
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClose = () => {
        setOpen(false);
    };

    function isNameValidated(cUser){
        // validate user name
        console.log("cUSer->",cUser.name.value, typeof cUser.name.value)
        // if(cUser.name.value === ""){
        //     setErrors({...errors, name:true});
        //     return false;
        // }
        if (cUser.name.value.length > 12)
        {
            alert("name cannot be more than 12 characters");
            setErrors({...errors, name:true});
            return false;
        }
        else if (/[^a-zA-Z0-9\-]/.test( cUser.name.value ))
        {
            alert("name can only contain alphanumeric characters and hypehns(-)")
            setErrors({...errors, name:true});
            return false;
        }
        return true;
    }
    function isAgeValidated(cUser){
        // validate user's age
        // if(cUser.age.value === ""){
        //     setErrors({...errors, age:true});
        //     return false;
        // }
        if ( !( cUser.age.value > 1 && cUser.age.value<100 ) ){
            setErrors({...errors, age:true});
            alert("The age must be a number between 1 and 100");
            return false;
        }
        return true;
    }
    function isEmailValidated(cUser){
        // validate user's email address
        // if(cUser.email.value === ""){
        //     setErrors({...errors, email:true});
        //     return false;
        // }
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (cUser.email.value.match(validRegex)) {
            return true;
        } else {
            alert("Please enter a valid email address!!!");
            setErrors({...errors, email:true});
            return false;
        }
    }
    function isContactValidated(cUser){
        // validate user's phone no
        // if(cUser.phone_no.value === ""){
        //     setErrors({...errors, phone_no:true});
        //     return false;
        // }
        let contactno = /^\d{10}$/;
        if(cUser.phone_no.value.match(contactno)){
            return true;
        }
        else{
            alert("Please enter a valid phone number having 10 digits!!!");
            setErrors({...errors, phone_no:true});
            return false;
        }
    }
    function isValidated(cUser){
        // validate currecnt user's data
       if(isNameValidated(cUser) && isAgeValidated(cUser) && isEmailValidated(cUser) && isContactValidated(cUser)){
        return true;
       }
       else return false;
    }

    function handleAddNewUser(e) {
        // add new user data
        e.preventDefault();
        const updateUsers = [
          // copy the current users state
          ...usersData,
          currentUser
        ];
        // update the state to the updatedUsers
        console.log("current->", currentUser.name.value === "")
        if( ( currentUser.name.value ) && 
            ( currentUser.age.value ) && 
            ( currentUser.email.value ) && 
            ( currentUser.phone_no.value ) ){
            if(isValidated(currentUser)){
               setUsersData(updateUsers);
               setErrors({...errors,name:false,age:false,email:false,phone_no:false})
            }
        }else{
            setTransition(() => TransitionDown);
            setOpen(true);
        }

        // setCurrentUser({ ...currentUser, name:{...currentUser.name,value:''} ,age:{...currentUser.age,value:''},
        // email:{...currentUser.email,value:''} ,phone_no:{...currentUser.phone_no,value:''}});
        
    }
    function handleResetFormData() {
        // reset form data
        setCurrentUser({ ...currentUser, name:{...currentUser.name,value:'',error:false} ,age:{...currentUser.age,value:'',error:false},
        email:{...currentUser.email,value:'',error:false} ,phone_no:{...currentUser.phone_no,value:'',error:false}});
        setErrors({...errors,name:false,age:false,email:false,phone_no:false})
    }
    function handleNameChange(e) {
        // update currentUser's name with what's currently in the name input box
        setCurrentUser({ ...currentUser, name:{...currentUser.name,value:e.target.value}});
    }
    function handleAgeChange(e) {
        // update currentUser's age with what's currently in the age input box
        setCurrentUser({ ...currentUser, age:{...currentUser.age,value:e.target.value}});
    }
    function handleEmailChange(e) {
        // update currentUser's email with what's currently in the email input box
        setCurrentUser({ ...currentUser, email:{...currentUser.email,value:e.target.value}});
    }
    function handlePhoneChange(e) {
        // update currentUser's phone_no with what's currently in the phone_no input box
        setCurrentUser({ ...currentUser, phone_no:{...currentUser.phone_no,value:e.target.value}});
    }

    return (
        <div>
            <Grid container spacing={3} direction="row">
                <Grid item lg={12} xs={12} sm={12} md={12}>
                    <Paper className={classes.paper}>Users Records
                        <TableData data={usersData}/>
                    </Paper>
                </Grid>
                <Grid item lg={12} xs={12} sm={12} md={12}>
                    <Paper className={classes.paper}>Please Fill user's information
                    <Card className={classes.root} variant="outlined">
                    <form noValidate className={classes.root} autoComplete="off" id="create-new-user">
                        <div>
                            <TextField 
                            margin="dense"
                            fullWidth={true}
                            required
                            value={currentUser.name.value} 
                            onChange={handleNameChange} 
                            name="name" 
                            id="outlined-basic" 
                            label="User Name" 
                            variant="outlined" 
                            />
                            {errors.name ? <Grid container justifyContent='flex-start'>
                                <Typography variant="subtitle2" color="secondary">Please fill user name!!!</Typography> 
                                </Grid>:""}
                        </div>
                        <div>
                            <TextField 
                            margin="dense"
                            fullWidth={true}
                            required={true} 
                            type="number"
                            value={currentUser.age.value} 
                            onChange={handleAgeChange} 
                            name="age" 
                            id="outlined-basic" 
                            label="Age" 
                            variant="outlined" 
                            />
                            {errors.age ? <Grid container justifyContent='flex-start'>
                                <Typography variant="subtitle2" color="secondary">Please fill user's age!!!</Typography> 
                                </Grid>:""}
                        </div>
                        <div>
                            <TextField
                            margin="dense"
                            fullWidth={true} 
                            required={true} 
                            error={currentUser.email.error} 
                            value={currentUser.email.value} 
                            onChange={handleEmailChange} 
                            name="email" id="outlined-basic" 
                            label="Email" variant="outlined" 
                            />
                            {errors.email ? <Grid container justifyContent='flex-start'>
                                <Typography variant="subtitle2" color="secondary">Please fill user's email!!!</Typography> 
                                </Grid>:""}
                        </div>
                        <div>
                            <TextField 
                            margin="dense"
                            fullWidth={true}
                            required={true} 
                            type="number"
                            error={currentUser.phone_no.error} 
                            value={currentUser.phone_no.value} 
                            onChange={handlePhoneChange} 
                            name="phone_no" 
                            id="outlined-basic" 
                            label="Phone No" 
                            variant="outlined"  
                            />
                            {errors.phone_no ? <Grid container justifyContent='flex-start'>
                                <Typography variant="subtitle2" color="secondary">Please fill user's phone no!!!</Typography> 
                                </Grid>:""}
                        </div>
                    </form>
                    </Card>
                    <Grid className={classes.root} container justifyContent="space-around" alignItems="baseline">
                        <Grid item>
                            <Button type="submit" onClick={handleAddNewUser} variant="contained" color="primary">
                                Submit
                            </Button>
                            <Snackbar
                                autoHideDuration={3000}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={transition}
                                message="Please fill required field informations"
                                key={transition ? transition.name : ''}
                            />

                        </Grid>
                        <Grid>
                            <Button onClick={handleResetFormData} variant="contained" color="primary">
                            Reset
                            </Button>
                        </Grid>
                    </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default FormComponent;