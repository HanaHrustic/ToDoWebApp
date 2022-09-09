import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useInput from "../../hooks/use-input";
import './ToDo.css';

const ToDo: React.FC<{toDo: {id: number, title: string, note: string}}> = (props) => {
    const [open, setOpen] = useState(false);

    const {
        value: title,
        isValid: titleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler
    } = useInput("", (value: string) => value.length > 0 && value.length <= 100);

    const {
        value: note,
        isValid: noteIsValid,
        hasError: noteInputHasError,
        valueChangeHandler: noteChangeHandler,
        inputBlurHandler: noteBlurHandler
    } = useInput("", (value: string) => value.length <= 200);

    const handleClickOpen = () => {
        setOpen(true);

        fetch("http://localhost:8080/todo/" + props.toDo.id)
            .then(response => {
                return response.json();
            }).then(data => {
                titleChangeHandler(data.title);
                noteChangeHandler(data.note);
            });
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const isFormValid = () => {
        return titleIsValid && noteIsValid;
    }

    const handleClose = () => {
        fetch("http://localhost:8080/todo/" + props.toDo.id, {
                method: 'PUT',
                body: JSON.stringify({title, note}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        setOpen(false);
    };

    function handleDelete() {
        fetch('http://localhost:8080/todo/' + props.toDo.id, { 
                method: 'DELETE'
            });
    }

    return (
        <Grid spacing={1} className="card" container direction="column" justifyContent="center" alignItems="center">
            <Grid className="box" item>
                <Typography variant="h5">{props.toDo.title}</Typography>
            </Grid>
            <Grid className="box" item>
                <Typography variant="body1">{props.toDo.note}</Typography>
            </Grid>
            <Grid item>
                <Grid spacing={1} container direction="row" justifyContent="flex-start" alignItems="baseline">
                    <Grid item>
                        <Button onClick={handleClickOpen} variant="outlined" color="success">UPDATE</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleDelete} variant="outlined" color="error">DELETE</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleCancel}>
                <DialogContent>
                    <DialogTitle>Update To Do</DialogTitle>
                    <TextField fullWidth required margin="dense" label="Title" variant="outlined" value={title} error={titleInputHasError} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { titleChangeHandler(event.target.value); }} onBlur={titleBlurHandler} helperText={titleInputHasError ? "Title is required and can have maximum 100 characters" : null}/>
                    <TextField multiline fullWidth margin="dense" label="Note" variant="outlined" value={note} error={noteInputHasError} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { noteChangeHandler(event.target.value); }} onBlur={noteBlurHandler} helperText={noteInputHasError ? "Note can have maximum 200 characters" : null}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancel}>CANCEL</Button>
                    <Button disabled={!isFormValid()} variant="contained" color="success" onClick={handleClose}>UPDATE</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default ToDo;