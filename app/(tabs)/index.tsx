import MovieCard from "@/components/MovieCard";
import { useMovies } from "@/context/movies";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function MoviesScreen() {
  const { movies } = useMovies();
  const [query, setQuery] = useState("");

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [movies, query],
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies"
        placeholderTextColor="#9ca3af"
      />

      <FlatList
        data={filteredMovies}
        keyExtractor={(movie) => movie.id}
        renderItem={({ item }) => <MovieCard movie={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No movie matches “{query}”</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  search: {
    backgroundColor: "#ffffff",
    margin: 16,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: "#111827",
  },
  list: {
    padding: 16,
  },
  empty: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 16,
    marginTop: 40,
  },
});
