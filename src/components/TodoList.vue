<template>
  <v-container>
    <v-row justify="center">
      <v-list elevation="2">
        <v-subheader class="pl-6">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span
                class="mr-2 blue--text lighten-1"
                v-bind="attrs"
                v-on="on"
                @click="goBack()"
              >
                Folders >
              </span>
            </template>
            <span> Go to folders</span>
          </v-tooltip>
          {{ this.folder ? this.folder.name : "loading" }}
        </v-subheader>

        <ListItem :items="todos" :data1="editTask"  :data2="deleteTask" checkbox="true" @checked="toggleDone" @remove="remove"  @open="goTo" > </ListItem>

        <v-list-item class="d-flex justify-center">
          <v-progress-circular
            v-if="loading"
            block
            :width="3"
            color="grey lighten-1"
            indeterminate
          ></v-progress-circular>
        </v-list-item>

        <!-- <template v-for="(todo, index) in todos">
          <v-list-item :key="todo.id">
            <v-list-item-action>
              <v-checkbox
                color="orange lighten-1"
                :input-value="todo.done"
                @click="toggleDone(todo)"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              {{ todo.description }}
            </v-list-item-content>

            <v-list-item-action>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="goTo(todo)" v-bind="attrs" v-on="on">
                    <v-icon left color="blue lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span> Edit Task </span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="remove(todo)" v-bind="attrs" v-on="on">
                    <v-icon left color="blue lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span> Delete Task </span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            class="mx-4"
            v-if="index < todos.length - 1"
            :key="index"
          ></v-divider>
        </template> -->
        <v-form
          class="pa-6 d-flex align-baseline"
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
      </v-list>
    </v-row>
  </v-container>
</template>

<script>
import TodoListDataService from "/src/services/TodoListDataServices.js";
import router from "../router";
import ListItem from "./ListItem"
export default {
  name: "TodoList",
  components:{
    ListItem
  },
  data() {
    return {
      loading: true,
      todos: null,
      folder: null,
      newdesc: "",
      descRules: [(v) => !!v || "Name is required"],
      deleteTask: {
        icon: "mdi-delete",
        event: "remove",
        description: "delete task",
      },
      editTask: {
        icon: "mdi-pencil",
        event: "open",
        description: "edit task",
      },
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
              this.loading = false;
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goBack() {
      router.go(-1);
    },
  },

  mounted() {
    this.getListItems(this.$route.params.id);
  },
};
</script>