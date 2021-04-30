<template>
        <div class="d-flex justify-center">
        <v-progress-circular block
          :width="3"
          v-if= "loadingFlag"
          color="grey lighten-1"
          indeterminate
        ></v-progress-circular>
        </div>
    
</template>

<script>
export default {
    name:"loading",
    props:{
        loadingFlag: Boolean
    }

}
</script>