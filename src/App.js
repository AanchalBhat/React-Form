
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
   formControl: {
    width: 'inherit',
    marginLeft: '0px',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function App() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [color, setColor] = React.useState('');
  const [addcolor, setAddColor] = React.useState(['Red', 'Green', 'Black']);
  const [newcolor, setNewColor] = React.useState('');
  const [username, setName] = React.useState('');
  const handleForm = (e) => {
    e.preventDefault()
    console.log(color, addcolor, selectedDate, username)
    Axios.post('http://dummy.restapiexample.com/api/v1/create', {
      "name": username,
      "age": selectedDate,
      "salary": color,
    })
      .then((res) => {
        setOpen(true);
        console.log('res', res)

      })
  }
  const handleChange = (event) => {
    setColor(event.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleNewColorChange = (event) => {
    setNewColor(event.target.value);
  };
  const handleAddColor = (event) => {
    setAddColor([...addcolor, newcolor]);
    setNewColor('')


  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
           React Form
        </Typography>
        <form className={classes.form} onSubmit={handleForm}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="Username"
            value={username}
            onChange={handleName}


          />
          <TextField
            id="date"
            label="Birthday"
            type="date"
            fullWidth
            defaultValue={selectedDate}
            // value={selectedDate}
            onChange={handleDateChange}

            //className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select
              id="demo-simple-select"
              fullWidth
              value={color}
              onChange={handleChange}
            >
              {
                addcolor.map(color => (
                  <MenuItem key={color} value={color}>{color}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                id="add"
                label="Other"
                name="add"
                fullWidth
                value={newcolor}
                onChange={handleNewColorChange}

              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleAddColor}
                className={classes.submit}
              >
                Add
          </Button>
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Submit
          </Button>

        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            The form is submitted Succesfully
        </Alert>
        </Snackbar>
      </div>

    </Container>
  );
}

