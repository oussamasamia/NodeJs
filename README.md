# Find to eat

## Introduction

Find to eat est une application sur mesure qui permet d'enregistrer, d'interroger une base de donnÈes de restaurants, 
de le modifier et de gÈolocaliser ces restaurants. DÈveloppÈe ‡ l'aide d'une technologie JavaScript et MongoDB, 
l'application offre actuellement dans sa premiËre version offre toutes les fonctionnalitÈs de bases et est facile ‡ 
prendre en mains et ne nÈcessite un coup d'exploitation exorbitant. 


## Code Samples



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
      // RÈcupÈration du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a gÈnÈrÈ
      // l'ÈvÈnement
      let form = event.target;

      // RÈcupÈration des valeurs des champs du formulaire
      // en prÈvision d'un envoi multipart en ajax/fetch
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
              console.log

## Installation

Pour installer l'application en local, il faut avoir Node js et MongoDB installÈ. Pour avoir le cúur net, il est 
nÈcessaire de saisir les commandes suivantes dans l'invite de commande:
-C:\>node -v
Pour vÈrifier l'installation de Node js. Si Node js est installÈ, la version installÈe sera affichÈ. 
Dans le cas de MongoDB, il faut saisir et lancer la commande suivante:
-mongod
InstallÈ MongoDB ne donne pas la main mais dans certains cas, il est important d'aller dans le rÈpertoire C:, dans 
le dossier d'installation programme pour voir s'il ne s'y trouve pas car un oubli d'ajout aux variables d'environnement 
peut causer son disfonctionnement .
Une fois tout ceux-ci vÈrifiÈ et les technologies bien installÈes, il faut tÈlÈcharger la base de donnÈe  au lien suivant https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json; le dÈzipper, lancer MongoDBB y crÈer une nouvelle base de donnÈe et une nouvelle collection et y importer les donnÈes sous forme de fichier Jason (js) ensuite tÈlÈcharger le serveur et le client afin d'utiliser l'application.
Il est aussi possible de dÈployer l'application sur un serveur distant et l'utiliser gr‚ce internet.

##DÈveloppeurs
############ SAMIA Oussama IngÈnieur Informaticien
############ MACKPAYEN Prince Divin IngÈnieur Informaticien
 SOUS LA SUPERVISION DE Mr BUFFA Michel  Enseignant Chercheur en Informatique
