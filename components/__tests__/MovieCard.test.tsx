import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MovieCard from "../MovieCard";


jest.mock("expo-router", () => ({
    Link: ({ children }: any) => children,
}));

const mockMovie: Movie = {
    id: 1,
    poster_path: "/poster.jpg",
    title: "Matrix",
    vote_average: 8.5,
    release_date: "1999-03-31",
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    video: false,
    vote_count: 0,
};

describe("MovieCard", () => {
    it("renderiza corretamente os dados do filme", () => {
        const { getByText } = render(<MovieCard {...mockMovie} />);
        expect(getByText("Matrix")).toBeTruthy();
        expect(getByText("4")).toBeTruthy();
        expect(getByText("1999")).toBeTruthy();
    });

    it("renderiza imagem do filme corretamente", () => {
        const { getByTestId } = render(<MovieCard {...mockMovie} />);
        const image = getByTestId("movie-poster");
        expect(image.props.source.uri).toContain("/poster.jpg");
    });

    it("renderiza imagem de fallback quando não tem poster_path", () => {
        const { getByTestId } = render(
            <MovieCard {...{ ...mockMovie, poster_path: "" }} />
        );
        const image = getByTestId("movie-poster");
        expect(image.props.source.uri).toContain("placehold.co");
    });

    it("renderiza corretamente quando release_date está vazio", () => {
        const { getByText } = render(
            <MovieCard {...{ ...mockMovie, release_date: "" }} />
        );
        expect(getByText("")).toBeTruthy();
    });

    it("dispara evento de toque no card", () => {
        const { getByTestId } = render(<MovieCard {...mockMovie} />);
        const card = getByTestId("movie-card");
        fireEvent.press(card);
        expect(card).toBeTruthy();
    });
});
