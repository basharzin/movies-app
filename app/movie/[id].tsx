import { useMovies } from "@/context/movies";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movies, watchlist, toggleWatchlist } = useMovies();

  const movie = movies.find((item) => item.id === id);

  if (!movie) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.notFoundEmoji}>🤷</Text>
        <Text style={styles.notFound}>Movie not found</Text>
      </View>
    );
  }

  const saved = watchlist.includes(movie.id);

  return (
    <View style={styles.center}>
      <Stack.Screen options={{ title: movie.title }} />

      <Text style={styles.emoji}>{movie.emoji}</Text>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.meta}>
        {movie.year} · {movie.genre}
      </Text>
      <Text style={styles.rating}>⭐ {movie.rating} / 10</Text>

      <Pressable
        onPress={() => toggleWatchlist(movie.id)}
        style={({ pressed }) => [
          styles.button,
          saved && styles.buttonSaved,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.buttonText, saved && styles.buttonTextSaved]}>
          {saved ? "★ Remove from watchlist" : "☆ Add to watchlist"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  emoji: {
    fontSize: 96,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  meta: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 6,
  },
  rating: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 12,
    marginBottom: 32,
  },
  button: {
    width: "100%",
    backgroundColor: "#e11d48",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonSaved: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e11d48",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
  buttonTextSaved: {
    color: "#e11d48",
  },
  notFoundEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  notFound: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
});
