import React, { useReducer, useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

import kana from "../data/kana";
import catagories from "../enum/categories";
import kanaActionTypes from "../enum/kanaActionTypes";

import Screen from "../components/Screen";
import CurrentKana from "../components/CurrentKana";
import KanaInput from "../components/KanaInput";
import categories from "../enum/categories";

const newKanaAmount = 5;

const getInitialState = (kana, newKanaAmount) => {
  const copied = [...kana];

  return {
    current: {
      kana: copied.shift(),
      category: catagories.NEW,
    },
    new: copied.splice(0, newKanaAmount - 1), // neutralize first draw
    wrong: [],
    correct: [],
    memorized: [],
    pile: copied,
    cleared: false,
  };
};

function reducer(state, action) {
  switch (action.type) {
    case kanaActionTypes.HANDLE_CORRECT_KANA:
      return state.current.category === categories.CORRECT
        ? { ...state, memorized: [...state.memorized, state.current.kana] }
        : { ...state, correct: [...state.correct, state.current.kana] };
    case kanaActionTypes.HANDLE_WRONG_KANA:
      return { ...state, wrong: [...state.wrong, state.current.kana] };
    case kanaActionTypes.DRAW_NEXT_KANA:
      if (state.new.length > 0)
        return {
          ...state,
          current: { kana: state.new.shift(), category: categories.NEW },
        };
      else if (state.wrong.length > 0)
        return {
          ...state,
          current: {
            kana: state.wrong.shift(),
            category: categories.WRONG,
          },
        };
      else if (state.correct.length > 0)
        return {
          ...state,
          current: {
            kana: state.correct.shift(),
            category: categories.CORRECT,
          },
        };
      else if (state.new.length === 0 && state.pile.length > 0)
        return {
          ...state,
          new: state.pile.splice(1, newKanaAmount),
          current: { kana: state.pile.shift(), category: categories.NEW },
        };
      else return { ...state, cleared: true };
    default:
      throw new Error();
  }
}

export default function KanaScreen() {
  const [{ current, cleared }, dispatch] = useReducer(
    reducer,
    getInitialState(kana, newKanaAmount)
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (current.kana.letter) {
      const hasAnswer = inputValue.length === current.kana.pronunciation.length;
      const isCorrect = inputValue === current.kana.pronunciation;

      if (hasAnswer && isCorrect) {
        dispatch({ type: kanaActionTypes.HANDLE_CORRECT_KANA });
        dispatch({ type: kanaActionTypes.DRAW_NEXT_KANA });
        setInputValue("");
      }

      if (hasAnswer && !isCorrect) {
        dispatch({ type: kanaActionTypes.HANDLE_WRONG_KANA });
        dispatch({ type: kanaActionTypes.DRAW_NEXT_KANA });
        setInputValue("");
      }
    }
  }, [inputValue]);

  if (cleared) {
    return (
      <Screen style={styles.screen}>
        <Text>YOU HAVE CLEARED ALL THE KANA!</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen} avoidKeyboard>
      <CurrentKana kana={current.kana} />
      <KanaInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="Guess the kana!"
        maxLength={current.kana.pronunciation.length}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
