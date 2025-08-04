import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TrendingCard from "../TrendingCard";

jest.mock("expo-router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const mockMovie = {
    movie_id: 1,
    title: "Matrix",
    poster_url: "https://example.com/poster.jpg",
    searchTerm: "matrix",
    count: 10,
};

describe("TrendingCard", () => {
    it("renderiza título e imagem corretamente", () => {
        const { getByText, getByTestId } = render(
            <TrendingCard movie={mockMovie} index={0} />
        );

        expect(getByText("Matrix")).toBeTruthy();

        const image = getByTestId("trending-image");
        expect(image.props.source.uri).toBe(mockMovie.poster_url);
    });

    it("navega para página do filme ao tocar no card", () => {
        const mockPush = jest.fn();
        jest.spyOn(require("expo-router"), "useRouter").mockReturnValue({ push: mockPush });

        const { getByTestId } = render(
            <TrendingCard movie={mockMovie} index={0} />
        );

        fireEvent.press(getByTestId("trending-card-touchable"));
        expect(mockPush).toHaveBeenCalledWith(`/movies/${mockMovie.movie_id}`);
    });
});
