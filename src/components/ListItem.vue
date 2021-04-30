<template>
  <div>
    <template v-for="(item, index) in items">
      <v-list-item :key="item.id" class="d-flex align-content-space-between">
        <v-list-item-action v-if="checkbox">

          <v-checkbox
            color="orange lighten-1"
            :input-value="item.done"
            @click="$emit('checked',item)"
          ></v-checkbox>

        </v-list-item-action>

        <v-list-item-content class="pr-16">
          {{ item.name || item.description }}
        </v-list-item-content>

        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="$emit(data1.event, item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left color="blue lighten-1">{{ data1.icon }}</v-icon>
            </v-btn>
          </template>
          <span> {{ data1.description }} </span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-action>
              <v-btn
                icon
                @click="$emit(data2.event, item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left color="blue lighten-1">{{ data2.icon }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
          <span> {{ data2.description }} </span>
        </v-tooltip>
      </v-list-item>
      <v-divider
        class="mx-4"
        v-if="index < items.length - 1"
        :key="index"
      ></v-divider>
    </template>
  </div>
</template>


<script>
export default {
  name: "Listitem",
  props: {
    items: Array,
    data1: Object,
    data2: Object,
    checkbox: String
  },
};
</script>
