<template>
  <v-container>
    <v-row justify="center">
      <v-list elevation="2">
        <v-subheader class="pl-4">Folders</v-subheader>
        <template v-for="(folder, index) in folders">
          <v-list-item :key="folder.id">
            <v-list-item-content class="pr-16">
              {{ folder.name }}
            </v-list-item-content>

            <v-spacer> </v-spacer>

            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon @click="goTo(folder)" v-bind="attrs" v-on="on">
                  <v-icon left color="blue lighten-1">mdi-folder</v-icon>
                </v-btn>
              </template>
              <span> open folder </span>
            </v-tooltip>

            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-action>
                <v-btn icon @click="remove(folder)" v-bind="attrs" v-on="on">
                  <v-icon left color="blue lighten-1">mdi-delete</v-icon>
                </v-btn>
                </v-list-item-action>
              </template>
              <span>  delete folder </span>
            </v-tooltip>

          </v-list-item>
          <v-divider
            class="mx-4"
            v-if="index < folders.length - 1"
            :key="index"
          ></v-divider>
        </template>
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