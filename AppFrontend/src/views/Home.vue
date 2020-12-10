b<template>
  <v-app style="background-image: url('https://imageproxy.themaven.net/https%3A%2F%2Fimages.saymedia-content.com%2F.image%2FMTY5ODE3MTkxNzY2NTY2MDg4%2Fnative-nerd-movie-list-of-45.jpg?w=1182&q=30&h=788&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1&fp-debug=false');">
    <v-card color="indigo lighten-2" height="60px">
      <v-toolbar dark height="60px" color="blue darken-4">
        <v-toolbar-title id="movie">
          <span style="font-size: 20pt; font-family: 'Helvetica'; ">Movies</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>

    <v-content>
     
      <v-card color="blue darken-4" height="100px">
        <v-toolbar height="100px" color="red darken-4" dark>
          <v-toolbar-title>
            Directores:
            <v-combobox :items="directors" v-model="director" outlined dense rounded></v-combobox>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Ordenado por:
            <v-combobox :items="scores" v-model="score" outlined dense rounded></v-combobox>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Género:
            <v-combobox :items="genres" v-model="genre" outlined dense rounded></v-combobox>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Top:
            <v-combobox :items="limits" v-model="limit" outlined dense rounded></v-combobox>
          </v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-card color="blue darken-4" height="100px">
        <v-toolbar height="100px" color="green darken-4" dark>
          <v-toolbar-title>
            Búsqueda por Título:
            <v-text-field
              rounded
              outlined
              dense
              label="Buscar"
              v-model="busqueda"
              v-on:keyup.enter="send()"
            ></v-text-field>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="send" color="blue darken-4">Buscar</v-btn><v-spacer></v-spacer>
          <v-btn @click="recommend" color="blue darken-4">Recomendación</v-btn>
        </v-toolbar>
      </v-card>
    </v-content>

    <v-content>
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(movie, index) in movies" v-bind:key="movie.id">
            <v-card
              elevation="18"
              style="background: #3A1C71;
    background: blue lighten-1;
    background: blue lighten-1;"
            >
              <v-card-title>{{index + 1}}: {{movie.Title}}</v-card-title>
              <v-card-subtitle>
                director: {{movie.director}}
                <br />
                Año: {{movie.year.low}}
		<br />
                Genero: {{movie.genre}}
		<br />
                Nota: {{movie.score}}
              </v-card-subtitle>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

   

      <v-divider></v-divider>

  </v-app>
      
</template>

<script>
export default {
  data() {
    return {
      name: "home",
      busqueda: "",
      movies: [],
      drawer: false,
      genre: "Cualquiera",
      director: "Cualquiera",
      score: "Opiniónes de Usuario",
      limit: "Top 10",
      
     
      scores: [
        "Opiniónes de Usuario"
      ],
      directors: [
	"Cualquiera",
        "David Fincher",
        "Steven Spielberg",
	"James Cameron",
        "Christopher Nolan",
        "Quentin Tarantino",
        "Robert Zemeckis",
        "Peter Jackson",
	"Frank Darabont",
        "Lana Wachowski",
        "Francis Ford Coppola",
        "Ridley Scott",
        "Joss Whedon",
        "George Lucas",
        "Jonathan Demme",
        "Martin Scorsese",
        "Sam Mendes",
	"Irvin Kershner",
        "Gore Verbinski",
        "James McTeigue",
        "Tony Kaye",
        "James Gunn",
        "Luc Besson",
        "Bryan Singer",
        "Andrew Stanton",
        "Mel Gibson"
      ],
      genres: [
        "Cualquiera",
        "Drama",
        "Action, Crime, Drama",
        "Action, Adventure, Sci-Fi",
        "Crime, Drama",
        "Drama, Romance",
        "Adventure, Drama, Fantasy",
        "Action, Sci-Fi",
        "Action, Adventure, Drama",
        "Action, Thriller",
        "Crime, Drama, Mystery",
        "Adventure, Drama, Sci-Fi",
        "Drama, Western",
        "Action, Adventure, Thriller",
        "Action, Adventure, Fantasy",
        "Crime, Drama, Thriller", 
        "Adventure, Drama, War",
        "Drama, War", 
        "Biography, Drama, History",
        "Drama, Mystery, Sci-Fi",
        "Mystery, Thriller",
        "Biography, Comedy, Crime",
        "Crime, Drama, Fantasy",
        "Action, Drama, Sci-Fi",
        "Adventure, Comedy, Sci-Fi",
        "Action, Adventure, Comedy"

      ],
      limits: ["Top 1", "Top 5", "Top 10", "Top 20", "Top 30", "Top 50", "Top 100"],
      historial: []
    };
  },

  methods: {
    send: function() {
      var params = {
        director: this.transform(this.director),
        score: this.transform(this.score),
        busqueda: this.busqueda,
        limit: this.transform(this.limit),
        genre: this.transform(this.genre)
      };
      this.historial.push(params);

      this.$http.post("http://localhost:3000/getMovies", params).then(
        response => {
          if (
            response.body &&
            response.body.length &&
            response.body[0].message != "Error"
          ) {
            this.movies = response.body;
          } else {
            response.body = [
              {
                Title:
                  "¡vaya, ninguna película cumple con lo que estás buscando!",
                year: "--"
              }
            ];
            this.movies = response.body;
          }
        },
        response => {
          alert("Ha habido un error en el envío: " + response.body);
        }
      );
    },
    recommend: function() {
      var fDirector = "";
      var fScore = "";
      var fGenre = "";
      

      var mFDirector = 0;
      var mFScore = 0;
      var mFGenre = 0;
    

      for (var i = 0; i < this.historial.length; i++) {
        var cDirector = 1;
        var cScore = 1;
        var cGenre = 1;
      
        for (var j = i; j < this.historial.length; j++) {
          if (this.historial[i].director == this.historial[j].director) {
            cDirector++;
          }
          if (mFDirector < cDirector) {
            mFDirector = cDirector;
            fDirector = this.historial[i].director;
          }

          if (this.historial[i].score == this.historial[j].score) {
            cScore++;
          }
          if (mFScore < cScore) {
            mFScore = cScore;
            fScore = this.historial[i].score;
          }

          if (this.historial[i].genre == this.historial[j].genre) {
            cGenre++;
          }
          if (mFGenre < cGenre) {
            mFGenre = cGenre;
            fGenre = this.historial[i].genre;
          }

        }
      }

      if (fDirector == "") {
        var random = Math.floor(Math.random() * this.directors.length);
        fDirector = this.transform(this.directors[random]);
      }
      if (fScore == "") {
        var random2 = Math.floor(Math.random() * this.scores.length);
        fScore = this.transform(this.scores[random2]);
      }
      if (fGenre == "") {
        fGenre = "Cualquiera";
      }
      

      var params = {
        director: fDirector,
        score: fScore,
        busqueda: "",
        limit: this.transform(this.limit),
        genre: fGenre
      };

      this.$http.post("http://localhost:3000/getMovies", params).then(
        response => {
          if (
            response.body &&
            response.body.length &&
            response.body[0].message != "Error"
          ) {
            var random3 = Math.floor(Math.random() * response.body.length);
            this.movies = [response.body[random3]];
          } else {
            response.body = [
              {
                Title:
                  "¡necesito más información para poder darte alguna recomendación, prueba a buscar más películas!",
                year: "--"
              }
            ];
            this.movies = response.body;
          }
        },
        response => {
          alert("Ha habido un error en el envío: " + response.body);
        }
      );
    },
    transform: function(m) {

      if (m == "Opiniónes de Usuario") {
        return "score";
      } else if (m == "Top 1") {
        return 1;
      } else if (m == "Top 5") {
        return 5;
      } else if (m == "Top 10") {
        return 10;
      } else if (m == "Top 20") {
        return 20;
      } else if (m == "Top 30") {
        return 30;
      } else if (m == "Top 50") {
        return 50;
	} else if (m == "Top 100") {
        return 100;
      } else {
        return m;
      }
    }
  }
};
</script>
<style>
</style>
