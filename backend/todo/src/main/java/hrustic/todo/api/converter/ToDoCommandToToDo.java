package hrustic.todo.api.converter;

import hrustic.todo.api.command.ToDoCommand;
import hrustic.todo.domain.ToDo;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ToDoCommandToToDo implements Converter<ToDoCommand, ToDo> {


    public ToDo convert(ToDoCommand source){
        final ToDo toDo = new ToDo();
        toDo.setTitle(source.getTitle());
        toDo.setNote(source.getNote());

        return toDo;
    }
}
