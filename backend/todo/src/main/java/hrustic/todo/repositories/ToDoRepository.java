package hrustic.todo.repositories;

import hrustic.todo.domain.ToDo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ToDoRepository extends CrudRepository<ToDo, Long> {
    List<ToDo> findAll();
}
