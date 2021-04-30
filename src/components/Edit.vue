<template>
  <v-container>
    <v-row justify="center">
      <h3>Editing task {{ this.$route.params.description }}</h3></v-row
    >

    <v-row justify="center">
      <v-form>
        <v-text-field
          v-model="description"
          hint="Change or fix the task"
        >
        </v-text-field>
        <v-btn @click="makeChange()">Save</v-btn>
        <v-btn class="ml-4" @click="returnHome()">Cancel</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import router from "../router";
import TodoListDataService from "/src/services/TodoListDataServices.js";
export default {
  name: "Edit",
  data: () => {
    return {
      description: "",
      id :null
    };
  },
  methods: {
    returnHome() {
      router.go(-1);
    },
    makeChange() {
      let todo = {
        description: this.description,
        id: this.id,
        done: false 
      }
      console.log(todo)
      TodoListDataService.replace(todo);
      this.returnHome();
    },
  },
  mounted(){
     this.id = this.$route.params.id;
     this.description = this.$route.params.description;

  }
};
</script>