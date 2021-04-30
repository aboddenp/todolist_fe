<template>
  <v-container>
    <v-row justify="center"
      ><h3 class="display2">
        Folders > {{ this.folder ? this.folder.name : "loading" }}
      </h3>
    </v-row>
    <v-row justify="center">
      <v-list>
        <v-list-item v-for="todo in todos" :key="todo.id">
          <v-list-item-action>
            <v-checkbox
              :input-value="todo.done"
              @click="toggleDone(todo)"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            {{ todo.description }}
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="goTo(todo)">
              <v-icon left color="grey lighten-1">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="remove(todo)">
              <v-icon color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-row>
    <v-row justify="center">
      <v-form
        class="d-flex align-baseline"
        ref="form"
        v-on:submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="newdesc"
          label="New Task"
          hint="hint:' make more pancakes'"
          :rules="descRules"
          required
        >
        </v-text-field>
        <v-btn class="ml-4" type="submit"> add </v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import TodoListDataService from "/src/services/TodoListDataServices.js";
import router from "../router";
export default {
  name: "TodoList",
  data() {
    return {
      todos: null,
      folder: null,
      newdesc: "",
      descRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    remove(todo) {
      TodoListDataService.delete(todo.id);
      this.todos = this.todos.filter((task) => task !== todo);
    },
    goTo(todo) {
      let id = todo.id;
      let description = todo.description;
      router.push({ name: "Item", params: { id, description } });
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        let newItem = {
          description: this.newdesc,
          done: false,
          id: null,
        };

        TodoListDataService.create(newItem, this.folder.id)
          .then(function (response) {
            newItem.id = response["data"];
          })
          .catch(function (error) {
            console.log(error);
          });

        this.todos.push(newItem);
        this.$refs.form.reset();
      }
    },
    toggleDone(todo) {
      todo.done = !todo.done;
      console.log(todo.done);
      TodoListDataService.replace(todo);
    },
    getListItems(folderId) {
      // get folder
      TodoListDataService.getFolder(folderId)
        .then((response) => {
          this.folder = response["data"];
          // get list items associated to this folder
          TodoListDataService.getAll(this.folder.id)
            .then((response) => {
              this.todos = response["data"];
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });

    },
  },

  mounted() {
    this.getListItems(this.$route.params.id);
  },
};
</script>