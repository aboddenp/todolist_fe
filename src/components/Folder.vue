<template>
  <v-container >
    <v-row justify="center">
      <v-list elevation="2">
        <v-subheader class="pl-4">Folders</v-subheader>

        <v-list-item class="d-flex justify-center">
          <v-progress-circular
            block
            :width="3"
            v-if="loading"
            color="grey lighten-1"
            indeterminate
          ></v-progress-circular>
        </v-list-item>

        <ListItem :items="folders" :data1="openData"  :data2="deleteData" @remove="remove"  @open="goTo" > </ListItem>
        

        <v-form
          class="d-flex pa-6 align-baseline"
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
      </v-list>
    </v-row>
  </v-container>
</template>

<script>
import TodoListDataService from "/src/services/TodoListDataServices.js";
import router from "../router";
import ListItem from "./ListItem"
export default {
  name: "Folder",
  components: {
    ListItem
  },
  data() {
    return {
      loading: true,
      deleteData: {
        icon: "mdi-delete",
        event: "remove",
        description: "delete folder"
      },
      openData: {
        icon: "mdi-folder",
        event: "open",
        description: "open folder"
      },
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
      router.push({
        name: "todos",
        params: { name: folder.name, id: folder.id },
      });
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
          this.loading = false;
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