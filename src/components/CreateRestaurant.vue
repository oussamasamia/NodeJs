<template>
  <div>
    <b-modal
      class="modal"
      id="modal-restaurant"
      title="Creation of restaurant"
      size="lg"
      centered
      hide-footer
    >
      <form @submit.prevent="ajouterRestaurant($event)">
        <div class="row">
          <md-field>
            <label>Name</label>
            <md-input name="nom" type="text" required v-model="nom"></md-input>
          </md-field>
        </div>

        <div class="row">
          <md-field>
            <label>Kitchen</label>
            <md-input
              name="cuisine"
              type="text"
              required
              v-model="cuisine"
            ></md-input>
          </md-field>
        </div>
        <div class="row">
          <md-field>
            <label>Description</label>
            <md-textarea
              name="description"
              type="text"
              v-model="description"
            ></md-textarea>
          </md-field>
        </div>
        <div class="row">
          <div class="col-10"></div>
          <div class="col-2">
            <md-button type="submit" class="md-fab md-mini md-primary">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "CreateRestaurant",
  data: function () {
    return {
      id: 0,
      nom: "",
      cuisine: "",
      description: "",
    };
  },
 
  methods: {
    ajouterRestaurant(event) {
      //call parent component 'RestaurantsList' method
      this.$parent.ajouterRestaurant(event, this.id);
      this.$bvModal.hide("modal-restaurant");
      Swal.fire({
        icon: "success",
        title: "The restaurant has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

<style>
.modal {
  border: 5px solid #072079;
}
</style>