import { ref, onBeforeMount } from 'vue';

export const useMovies = () => {
  const items = ref([]);

  const fetchItems = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();

      items.value = data.results;

    } catch (err) {
      //do something
    } finally {
      //do something
    }
  };

  onBeforeMount(fetchItems);

  return {
    items,
  };
};

