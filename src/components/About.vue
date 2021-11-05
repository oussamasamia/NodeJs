<template>
  <div>
    <div class="about-section">
      <h1>About Us Page</h1>
      <p>University Cote d'Azur</p>
      <p>
        Student of the university 
      </p>
    </div>

    <h2 style="text-align: center">Our Team</h2>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <img src="img/Prince.jpg" alt="MACKPAYEN Prince Divin" style="width: 100%;height : 900px" />
          <div class="container">
            <h2>MACKPAYEN Prince Divin</h2>
            <p class="title">Student</p>
            <p>Student developer</p>
            <p>divinmackpayen@gmail.com</p>
            
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <img src="img/oussama.jpg" alt="SAMIA Oussama" style="width: 100%;height : 900px" />
          <div class="container">
            <h2>SAMIA Oussama</h2>
            <p class="title">Student</p>
            <p>Student developer</p>
            <p>oussamasamia1@gmail.com</p>
           
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after,
.row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>