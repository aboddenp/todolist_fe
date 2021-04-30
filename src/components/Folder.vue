<template>
  <v-container>
    <v-row justify="center"><h3 class="display2">Folders</h3> </v-row>
    <v-row justify="center">
      <v-list>
        <v-list-item v-for="folder in folders" :key="folder.id">

          <v-list-item-content>
            {{ folder.name }}
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="goTo(folder)">
              <v-icon left color="grey lighten-1">mdi-folder</v-icon>
            </v-btn>
            <v-btn icon @click="remove(folder)">
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
          v-model="newFolderName"
          label="New Folder"
          hint="hint:'create a Folder to start a list'"
          :rules="folderRules"
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
  name: "Folder",
  data() {
    return {
      folders: null,
      newFolderName: "",
      folderRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    remove(folder) {
      TodoListDataService.deleteFolder(folder.id);
      this.folders = this.folders.filter((task) => task !== folder);
    },
    goTo(folder) {
      router.push({name:"todos", params:{name: folder.name, id:folder.id}})
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        let newFolder = {
          name: this.newFolderName,
        };

        TodoListDataService.createFolder(newFolder)
          .then(function (response) {
            newFolder.id = response["data"];
          })
          .catch(function (error) {
            console.log(error);
          });

        this.folders.push(newFolder);
        this.$refs.form.reset();
      }
    },
    getFolders() {
      TodoListDataService.getAllFolders()
        .then((response) => {
          this.folders = response["data"];
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.getFolders();
  },
};
</script>