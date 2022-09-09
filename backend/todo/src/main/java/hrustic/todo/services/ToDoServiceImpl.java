package hrustic.todo.services;

import hrustic.todo.api.DTO.ToDoDTO;
import hrustic.todo.api.command.ToDoCommand;
import hrustic.todo.api.converter.ToDoCommandToToDo;
import hrustic.todo.api.converter.ToDoToToDoDTO;
import hrustic.todo.domain.ToDo;
import hrustic.todo.repositories.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ToDoServiceImpl implements ToDoService {
    private final ToDoRepository toDoRepository;
    private final ToDoCommandToToDo toDoCommandToToDo;
    private final ToDoToToDoDTO toDoToToDoDTO;

    @Autowired
    public ToDoServiceImpl(ToDoRepository toDoRepository, ToDoCommandToToDo toDoCommandToToDo, ToDoToToDoDTO toDoToToDoDTO) {
        this.toDoRepository = toDoRepository;
        this.toDoCommandToToDo = toDoCommandToToDo;
        this.toDoToToDoDTO = toDoToToDoDTO;
    }

    @Override
    public ToDoDTO addToDo(ToDoCommand toDoCommand) {
        ToDo toDo = toDoCommandToToDo.convert(toDoCommand);
        if(toDo != null) {
            ToDo savedToDo = toDoRepository.save(toDo);
            return toDoToToDoDTO.convert(savedToDo);
        }
        return null;
    }

    @Override
    public List<ToDoDTO> getAllToDos() {
        List<ToDo> toDos = toDoRepository.findAll();

        return toDos.stream().map(toDoToToDoDTO::convert).toList();
    }

    @Override
    public ToDoDTO getToDoById(Long toDoId) {
        Optional<ToDo> toDo = toDoRepository.findById(toDoId);
        return toDoToToDoDTO.convert(toDo.get());
    }

    @Override
    public void deleteToDo(Long toDoId) {
        Optional<ToDo> toDo = toDoRepository.findById(toDoId);
        if(toDo.isPresent()){
            toDoRepository.deleteById(toDoId);
        }
    }

    @Override
    public void updateToDo(ToDoCommand toDoCommand, Long toDoId) {
        ToDo toDo = toDoCommandToToDo.convert(toDoCommand);
        toDo.setId(toDoId);
        toDoRepository.save(toDo);
    }
}
