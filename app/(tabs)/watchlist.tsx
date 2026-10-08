import MovieCard from "@/components/MovieCard";
import { useMovies } from "@/context/movies";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function WatchlistScreen() {
  const { movies, watchlist } = useMovies();

  const savedMovies = movies.filter((movie) => watchlist.includes(movie.id));
  const count = savedMovies.length;

  if (count === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🍿</Text>
        <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
        <Text style={styles.emptyText}>Add a movie from its page</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedMovies}
        keyExtractor={(movie) => movie.id}
        renderItem={({ item }) => <MovieCard movie={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.count}>
            {count} {count === 1 ? "movie" : "movies"} to watch
          </Text>
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
  list: {
    padding: 16,
  },
  count: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 12,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  emptyText: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 6,
  },
});
