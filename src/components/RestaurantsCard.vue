<template>
  <div>
    <div>
      <b-button v-b-modal.modal-restaurant @click="chooseAddOrEdit(0)"
        >Create Restaurant</b-button
      >
      <CreateRestaurant ref="CURestaurant" />

      <DetailRestaurant ref="detailsRestaurantComponent" />

      <h1>Nombre de restaurants : {{ nbrRestaurantsTotal }}</h1>
      <h5>Nombre pages total : {{ nbPagesTotal }}</h5>

      <label>Number restaurants to show : </label>
      <input
        @change="getRestaurantsFromServer()"
        type="range"
        min="1"
        max="1000"
        v-model="pageSize"
      />{{ pageSize }}
      <p>Page courante : {{ page }}</p>
    </div>
    <div class="row">
      <div class="col-8"></div>
      <div class="col-4">
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search by name..."
            @input="searchRestaurants()"
            type="text"
            v-model="nameRestaurantToSearch"
          />
        </md-field>
      </div>
    </div>

    <div class="row">
      <div class="col-3" v-for="(item, index) in restaurants" :key="index">
        {{ (selectedImage = "") }}
        <div class="card-expansion-rest">
          <md-card>
            <md-card-media>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4h2IUYsabtXCuHT5-kKEqB7MCR82apkHBA&usqp=CAU" />
            </md-card-media>

            <md-card-header>
              <div class="md-title">{{ item.name }}</div>
              <div class="md-subhead">{{ item.cuisine }}</div>
            </md-card-header>

            <md-card-expand>
              <md-card-actions md-alignment="space-between">
                <div>
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
                </div>

                <md-card-expand-trigger v-if="item.description">
                  <md-button class="md-icon-button">
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </md-card-actions>

              <md-card-expand-content>
                <md-card-content>
                  {{item.description}}
                </md-card-content>
              </md-card-expand-content>
            </md-card-expand>
          </md-card>
        </div>
      </div>
    </div>
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
  name: "RestaurantsCard",
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
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4h2IUYsabtXCuHT5-kKEqB7MCR82apkHBA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWkozcbxzLAUZShho5W0wSyhmHO1lQgTd8Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREdICAtOqLcCi5E3jWFZ7ih9PqHbcU-eUjUw&usqp=CAU",
      ],
    };
  },
  mounted() {
    this.getRestaurantsFromServer();
  },
  created() {
    this.getRestaurantsFromServer();
  },
  methods: {
    randomItem() {
      //alert("hahah")
      return this.images[Math.floor(Math.random() * this.images.length)];
    },
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
.card-expansion-rest {
  height: 480px;
}


</style>