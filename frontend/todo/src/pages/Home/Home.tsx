import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import './Home.css';
import ToDo from '../ToDo/ToDo';
import { useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from '@mui/material';
import useInput from '../../hooks/use-input';

const Home = () => {
    const [toDos, setToDos] = useState<{id: number, title: string, note: string}[]>([]);
    const [open, setOpen] = useState(false);

    const {
        value: title,
        isValid: titleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset
    } = useInput("", (value: string) => value.length > 0 && value.length <= 100);

    const {
        value: note,
        isValid: noteIsValid,
        hasError: noteInputHasError,
        valueChangeHandler: noteChangeHandler,
        inputBlurHandler: noteBlurHandler,
        reset: noteReset
    } = useInput("", (value: string) => value.length <= 200);

    const isFormValid = () => {
        return titleIsValid && noteIsValid;
    }

    const handleClickOpen = () => {
        setOpen(true);
        titleReset();
        noteReset();
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const handleClose = () => {
        fetch("http://localhost:8080/todo", {
                method: 'POST',
                body: JSON.stringify({title, note}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        setOpen(false);
    };
  
    const fetchToDos = useCallback(async () => {
        fetch("http://localhost:8080/todo")
            .then(response => {
                return response.json();
            }).then(data => {
                setToDos(data);
            });
    }, []);

    useEffect(() => {
        fetchToDos();
    }, [isFormValid]);

    return ( 
        <Container>
            <Grid spacing={1} className='todos' container direction="row" justifyContent="center" alignItems="baseline">
                {toDos.map((toDo) => (
                    <Grid key={toDo.id} item className='todo'>
                        <ToDo toDo={toDo}/>
                    </Grid>
                ))}
                <Grid item>
                    <Button variant="contained" color="success" onClick={handleClickOpen}>ADD NEW</Button>
                </Grid>
                <Dialog open={open} onClose={handleCancel}>
                    <DialogContent>
                        <DialogTitle>Add New To Do</DialogTitle>
                        <TextField fullWidth required margin="dense" label="Title" variant="outlined" value={title} error={titleInputHasError} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { titleChangeHandler(event.target.value); }} onBlur={titleBlurHandler} helperText={titleInputHasError ? "Title is required and can have maximum 100 characters" : null}/>
                        <TextField multiline fullWidth margin="dense" label="Note" variant="outlined" value={note} error={noteInputHasError} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { noteChangeHandler(event.target.value); }} onBlur={noteBlurHandler} helperText={noteInputHasError ? "Note can have maximum 200 characters" : null}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleCancel}>CANCEL</Button>
                        <Button disabled={!isFormValid()} variant="contained" color="success" onClick={handleClose}>ADD NEW</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    );
}

export default Home;