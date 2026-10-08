import { Movie } from "@/data/movies";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <Text style={styles.emoji}>{movie.emoji}</Text>
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.meta}>
            {movie.year} · {movie.genre}
          </Text>
        </View>
        <Text style={styles.rating}>⭐ {movie.rating}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  emoji: {
    fontSize: 36,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  meta: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  rating: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});
