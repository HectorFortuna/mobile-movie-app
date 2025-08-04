import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "../SearchBar";
import { icons } from "@/constants/icons";

describe("SearchBar", () => {
    it("renderiza placeholder corretamente", () => {
        const { getByPlaceholderText } = render(
            <SearchBar placeholder="Pesquisar..." />
        );
        expect(getByPlaceholderText("Pesquisar...")).toBeTruthy();
    });

    it("chama onChangeText ao digitar", () => {
        const onChangeTextMock = jest.fn();
        const { getByPlaceholderText } = render(
            <SearchBar placeholder="Pesquisar..." onChangeText={onChangeTextMock} />
        );
        fireEvent.changeText(getByPlaceholderText("Pesquisar..."), "teste");
        expect(onChangeTextMock).toHaveBeenCalledWith("teste");
    });

    it("exibe valor controlado corretamente", () => {
        const { getByDisplayValue } = render(
            <SearchBar placeholder="Pesquisar..." value="texto" />
        );
        expect(getByDisplayValue("texto")).toBeTruthy();
    });
});
