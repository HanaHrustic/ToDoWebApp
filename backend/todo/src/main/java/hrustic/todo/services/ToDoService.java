package hrustic.todo.services;

import hrustic.todo.api.DTO.ToDoDTO;
import hrustic.todo.api.command.ToDoCommand;

import java.util.List;

public interface ToDoService {
    ToDoDTO addToDo(ToDoCommand toDoCommand);
    List<ToDoDTO> getAllToDos();
    ToDoDTO getToDoById(Long toDoId);
    void deleteToDo(Long toDoId);
    void updateToDo(ToDoCommand toDoCommand, Long toDoId);
}
