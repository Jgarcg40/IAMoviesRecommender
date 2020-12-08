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