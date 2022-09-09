package hrustic.todo.controllers;

import hrustic.todo.api.DTO.ToDoDTO;
import hrustic.todo.api.command.ToDoCommand;
import hrustic.todo.services.ToDoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin("http://localhost:3000")
public class ToDoController {
    private final ToDoService toDoService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @PostMapping()
    public ResponseEntity<Void> saveToDo(@RequestBody ToDoCommand toDoCommand){
        ToDoDTO savedToDo = toDoService.addToDo(toDoCommand);

        return ResponseEntity.created(URI.create("/todo/" + savedToDo.getId())).build();
    }

    @GetMapping()
    public ResponseEntity<List<ToDoDTO>> getAllToDos(){
        List<ToDoDTO> toDos = toDoService.getAllToDos();

        return ResponseEntity.status(HttpStatus.OK).body(toDos);
    }

    @GetMapping("{toDoId}")
    public ResponseEntity<ToDoDTO> getByIdToDo(@PathVariable Long toDoId){
        ToDoDTO toDo = toDoService.getToDoById(toDoId);

        return ResponseEntity.status(HttpStatus.OK).body(toDo);
    }

    @DeleteMapping("{toDoId}")
    public ResponseEntity<Void> deleteToDo(@PathVariable Long toDoId) {
        toDoService.deleteToDo(toDoId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{toDoId}")
    public ResponseEntity<Void> updateToDo(@RequestBody ToDoCommand toDoCommand, @PathVariable Long toDoId) {
        toDoService.updateToDo(toDoCommand, toDoId);

        return ResponseEntity.noContent().build();
    }
}
