import http from "../http-common";

class TodoListDataService {
  getAll(fid) {
    return http.get(`/todos/${fid}`);
  }

  get(id) {
    return http.get(`/todos/${id}`);
  }

  delete(id) {
    return http.delete(`/todos/${id}`);
  }

  create(incompleteTodo,fid) {
    return http.post( `/todos/${fid}`,incompleteTodo);
  }

  replace(todo) {
    return http.put(`/todos/${todo.id}`,todo)
  }

  getAllFolders(){
    return http.get('/folders');
  }

  createFolder(incompleteFolder){
    return http.post("/folders",incompleteFolder);
  }

  deleteFolder(id) {
    return http.delete(`/folders/${id}`);
  }

  getFolder(id){
    return http.get(`/folders/${id}`);
  }


}

export default new TodoListDataService();
