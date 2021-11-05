<template>
  <div>
    <b-modal
      @shown="modalShown"
      class="modal modal-lg"
      id="modal-detail-restaurant"
      ref="modal-detail-restaurant"
      title="Details of restaurant"
      size="xl"
      centered
      hide-footer
    >
      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <div>
            <img
              style="width: 100%; height: 300px"
              :src="selectedImage"
              alt=""
            />
          </div>
          <br />
          <div class="row">
            <md-card v-if="restaurantDetails.name">
              <md-card-header>
                <div class="md-title">
                  <center><u>Name:</u> {{ restaurantDetails.name }}</center>
                </div>
              </md-card-header>
            </md-card>
          </div>
          <br />
          <div class="row">
            <md-card v-if="restaurantDetails.cuisine">
              <md-card-header>
                <div class="md-title">
                  <center>
                    <u>Kitchen:</u> {{ restaurantDetails.cuisine }}
                  </center>
                </div>
              </md-card-header>
            </md-card>
          </div>
          <br />
          <div class="row">
            <md-card v-if="restaurantDetails.borough">
              <md-card-header>
                <div class="md-title">
                  <center>
                    <u>Borough:</u> {{ restaurantDetails.borough }}
                  </center>
                </div>
              </md-card-header>
            </md-card>
          </div>
          <div class="row">
            <md-card v-if="restaurantDetails.description">
              <md-card-header>
                <div class="md-title">
                  <center>
                    <u>Description:</u> {{ restaurantDetails.description }}
                  </center>
                </div>
              </md-card-header>
            </md-card>
          </div>
        </md-tab>

        <md-tab md-label="Contact"> </md-tab>

        <md-tab md-label="Maps">
          <RestaurantMap ref="restaurantMap" :coord="this.restaurantDetails.address.coord"/>
        </md-tab>
      </md-tabs>
    </b-modal>
  </div>
</template>

<script>
import RestaurantMap from "./Maps.vue";

export default {
  name: "DetailRestaurant",
  components: {
    RestaurantMap,
  },
  data: function () {
    return {
      restaurantDetails: {},
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4h2IUYsabtXCuHT5-kKEqB7MCR82apkHBA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWkozcbxzLAUZShho5W0wSyhmHO1lQgTd8Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREdICAtOqLcCi5E3jWFZ7ih9PqHbcU-eUjUw&usqp=CAU",
      ],
    };
  },
  methods: {
    showDetailsRestaurantModal() {
      //alert(this.restaurantDetails.address.coord)
      //this.$refs["restaurantMap"].center = [this.restaurantDetails.address.coord[0],this.restaurantDetails.address.coord[1]];
      //alert(this.$refs["restaurantMap"] );
      //this.$refs["restaurantMap"].markerLatLng = this.restaurantDetails.address.coord;

      this.$refs["modal-detail-restaurant"].show();
      this.selectedImage = this.randomItem(this.images);
      //alert(this.selectedImage)
    },
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    },
    modalShown() {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>