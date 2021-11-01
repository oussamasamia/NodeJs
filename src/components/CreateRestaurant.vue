<template>
  <div>
    <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <form @submit.prevent="ajouterRestaurant($event)">
        <label>
          Nom : <input name="nom" type="text" required v-model="nom" />
        </label>
        <label>
          Cuisine :
          <input name="cuisine" type="text" required v-model="cuisine" />
        </label>

        <md-button type="submit" class="md-fab md-mini md-primary">
          <md-icon>add</md-icon>
        </md-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CreateRestaurant",
};
</script>

<style>
</style>