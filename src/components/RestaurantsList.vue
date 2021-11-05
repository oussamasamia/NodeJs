<template>
  <div>
    <b-button v-b-modal.modal-restaurant @click="chooseAddOrEdit(0)"
      >Create Restaurant</b-button
    >
    <CreateRestaurant ref="CURestaurant" />

    <DetailRestaurant ref="detailsRestaurantComponent" />

    <div class="row">
      <div class="col-6">
        <h5>Nombre de restaurants : {{ nbrRestaurantsTotal }}</h5>
      </div>
      <div class="col-6">
        <h5>Nombre pages total : {{ nbPagesTotal }}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label>Number restaurants to show : </label>

        <input
          @change="getRestaurantsFromServer()"
          type="range"
          min="1"
          max="1000"
          v-model="pageSize"
        />

        {{ pageSize }}
      </div>
    </div>
    <div class="row">
      <div class="col-8"></div>
      <div class="col-4">
        <p>Page courante : {{ page }}</p>
      </div>
    </div>

    <md-table
      v-model="restaurants"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Restaurants</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search by name..."
            @input="searchRestaurants()"
            type="text"
            v-model="nameRestaurantToSearch"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No restaurants found"
        :md-description="`No restaurant found for this '${search}' query. Try a different search term or create a new restaurant.`"
      >
        <md-button class="md-primary md-raised"
          >Create New Restaurant</md-button
        >
      </md-table-empty-state>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="alert(item.name)"
      >
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button
            class="md-fab md-mini md-primary"
            @click="afficherRestaurant(item)"
          >
            <md-icon>info</md-icon>
          </md-button>

          <md-button
            v-b-modal.modal-restaurant
            class="md-fab md-mini md-plain"
            style="background-color: #4da404"
            @click="chooseAddOrEdit(item._id)"
          >
            <md-icon>edit</md-icon>
          </md-button>

          <md-button
            class="md-fab md-mini md-plain"
            @click="supprimerRestaurant(item)"
          >
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-button
      class="md-fab"
      :disabled="page === 0"
      @click="pagePrecedente()"
      style="background-color: #81b5e9"
    >
      <label style="color: black">Prev</label>
    </md-button>

    <md-button
      class="md-fab md-primary"
      :disabled="page === nbPagesTotal"
      @click="pageSuivante()"
    >
      <label style="color: black">Next</label>
    </md-button>
  </div>
</template>


<script>
import _ from "lodash";
import Swal from "sweetalert2";
import CreateRestaurant from "./CreateRestaurant.vue";
import DetailRestaurant from "./DetailRestaurant.vue";

const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.name).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "ListOfRestaurants",
  components: {
    CreateRestaurant,
    DetailRestaurant,
  },
  data: function () {
    return {
      nom: "",
      cuisine: "",
      description: "",
      nbrRestaurantsTotal: 0,
      page: 0,
      pageSize: 10,
      nbPagesTotal: 0,
      nameRestaurantToSearch: "",
      restaurants: [],
      search: null,
      searched: [],
    };
  },
  mounted() {
    this.getRestaurantsFromServer();
  },
  created() {
    this.getRestaurantsFromServer();
  },
  methods: {
    chooseAddOrEdit(id) {
      //alert(id);
      this.$refs["CURestaurant"].id = id;
      if (id != 0) {
        let url = "http://localhost:8080/api/restaurants/" + id;

        fetch(url)
          .then((responseJSON) => {
            //arrow functions ,  conserve le bon "this"
            //la reponse est en JSON , on l'a convertit avec la ligne suivante :
            responseJSON.json().then((res) => {
              // Maintenant res est un vrai objet JavaScript
              this.$refs["CURestaurant"].nom = res.restaurant.name;
              this.$refs["CURestaurant"].cuisine = res.restaurant.cuisine;
              this.$refs["CURestaurant"].description =
                res.restaurant.description;
            });
          })
          .catch((err) => {
            console.log(err);
            console.log("error");
          });
      } else {
        this.$refs["CURestaurant"].nom =
          this.$refs["CURestaurant"].cuisine =
          this.$refs["CURestaurant"].description =
            "";
      }
    },
    showAlert() {
      // Use sweetalert2
      Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
    },
    searchOnTable() {
      this.restaurants = searchByName(this.restaurants, this.search);
    },
    pageSuivante() {
      if (this.page === this.nbPagesTotal) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    pagePrecedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;
      url += "&name=" + this.nameRestaurantToSearch;

      fetch(url)
        .then((responseJSON) => {
          //arrow functions ,  conserve le bon "this"
          //la reponse est en JSON , on l'a convertit avec la ligne suivante :
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = res.data;
            console.log(this.restaurants);
            this.nbrRestaurantsTotal = res.count;
            this.nbPagesTotal = Math.round(
              this.nbrRestaurantsTotal / this.pageSize
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searchRestaurants: _.debounce(function () {
      this.getRestaurantsFromServer();
    }, 300),

    afficherRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url)
        .then((responseJSON) => {
          //arrow functions ,  conserve le bon "this"
          //la reponse est en JSON , on l'a convertit avec la ligne suivante :
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.$refs["detailsRestaurantComponent"].restaurantDetails =
              res.restaurant;
            this.showDetailsRestaurantModal();
          });
        })
        .catch((err) => {
          console.log(err);
          console.log("error");
        });
    },
    supprimerRestaurant(r) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          let url = "http://localhost:8080/api/restaurants/" + r._id;
          fetch(url, {
            method: "DELETE",
          })
            .then((responseJSON) => {
              responseJSON.json().then((resJS) => {
                // Maintenant resJS est un vrai objet JavaScript
                console.log(resJS.msg);
                this.getRestaurantsFromServer();
              });
            })
            .catch(function (err) {
              console.log(err);
            });
          Swal.fire("Deleted!", "The restaurant has been deleted.", "success");
        }
      });
    },
    ajouterRestaurant(event, id) {
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      console.log(event.data);

      if (id == 0) {
        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
          method: "POST",
          body: donneesFormulaire,
        })
          .then((responseJSON) => {
            responseJSON.json().then((resJS) => {
              // Maintenant resJS est un vrai objet JavaScript
              console.log(resJS.msg);
              this.getRestaurantsFromServer();
            });
          })
          .catch(function (err) {
            console.log(err);
          });
        this.nom = "";
        this.cuisine = "";
      } else {
        let url = "http://localhost:8080/api/restaurants/" + id;
        fetch(url, {
          method: "PUT",
          body: donneesFormulaire,
        })
          .then((responseJSON) => {
            responseJSON.json().then((resJS) => {
              // Maintenant resJS est un vrai objet JavaScript
              console.log(resJS.msg);
              this.getRestaurantsFromServer();
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    showDetailsRestaurantModal() {
      this.$refs["detailsRestaurantComponent"].showDetailsRestaurantModal();
    },
    getColor(index) {
      return index % 2 ? "#949799" : "#c6c9cc";
    },
  },
};
</script>

<style>
</style>