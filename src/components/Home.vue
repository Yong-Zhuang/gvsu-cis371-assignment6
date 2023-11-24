<template>
  <v-container class="mx-0" fluid>
    <v-row class="bg-blue-lighten-3">
      <v-col
        sm="6"
        md="4"
        lg="3"
        v-for="item in products"
        :key="item.id"
        :item="item"
      >
        <StoreItem :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import StoreItem from "./StoreItem.vue";
import { getProducts } from "../data-controller";
import { ProductDoc } from "../data-types";

const products = ref<Array<ProductDoc>>([]);
getProducts("").then((items: Array<ProductDoc>) => {
  products.value = items;
});
</script>

<style></style>
