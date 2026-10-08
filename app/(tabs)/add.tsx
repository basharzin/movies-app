import { useMovies } from "@/context/movies";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";

export default function AddScreen() {
  const { addMovie } = useMovies();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  const titleRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  function save() {
    const cleanTitle = title.trim();
    const yearNumber = Number(year);

    if (!cleanTitle) {
      setError("Title is required.");
      titleRef.current?.focus();
      return;
    }

    if (
      !Number.isInteger(yearNumber) ||
      yearNumber < 1900 ||
      yearNumber > 2030
    ) {
      setError("Year must be a number from 1900 to 2030.");
      yearRef.current?.focus();
      return;
    }

    addMovie({
      id: Date.now().toString(),
      title: cleanTitle,
      year: yearNumber,
      genre: genre.trim() || "Unknown",
      rating: 0,
      emoji: "🎬",
    });

    setTitle("");
    setYear("");
    setGenre("");
    setError("");
    router.push("/");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Title</Text>
      <TextInput
        ref={titleRef}
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Inside Out"
        placeholderTextColor="#9ca3af"
      />

      <Text style={styles.label}>Year</Text>
      <TextInput
        ref={yearRef}
        style={styles.input}
        value={year}
        onChangeText={setYear}
        placeholder="e.g. 2015"
        placeholderTextColor="#9ca3af"
        keyboardType="number-pad"
        maxLength={4}
      />

      <Text style={styles.label}>Genre</Text>
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
        placeholder="e.g. Animation"
        placeholderTextColor="#9ca3af"
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable
        onPress={save}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>Save movie</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  error: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#e11d48",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
});
