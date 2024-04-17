<script setup>
  import { useMovies } from "../composables/useMovies.js";
  import { useSearch } from "../composables/useSearch.js";

  const { items: movies } = useMovies();
  const { searchTerm, filteredItems: filteredMovies } = useSearch(movies);
</script>
<template>
    <div>
        <h1>Movies</h1>
        <div>
        <div>
            <label for="search">Search:</label>
            <input type="text" id="search" v-model="searchTerm" />
        </div>
        <ul>
                <li v-for="movie in filteredMovies" :key="movie.id">
                    <article>
                        <h2>{{ movie.Title }}</h2>
                        <img :src="movie.Poster" :alt="movie.Title" width="100" />
                        <p>Released on: {{ movie.Year }}</p>
                    </article>
                </li>
            </ul>
        </div>
    </div>
  </template>

