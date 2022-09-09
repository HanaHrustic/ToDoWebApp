package hrustic.todo.api.converter;

import hrustic.todo.api.DTO.ToDoDTO;
import hrustic.todo.domain.ToDo;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ToDoToToDoDTO implements Converter<ToDo, ToDoDTO> {

    public ToDoDTO convert(ToDo source){
        final ToDoDTO toDoDTO = new ToDoDTO();
        toDoDTO.setId(source.getId());
        toDoDTO.setTitle(source.getTitle());
        toDoDTO.setNote(source.getNote());

        return toDoDTO;
    }
}
