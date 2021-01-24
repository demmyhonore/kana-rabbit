import * as kanaEnum from "../enum/kana";

const addNewAndSetCurrentKana = (kana, amountNew) => {
  let amountSet = 0;

  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.isCurrent = false;
    }

    if (character.status === kanaEnum.status.IDLE && amountSet === 0) {
      character.isCurrent = true;
    }

    if (character.status === kanaEnum.status.IDLE && amountSet < amountNew) {
      character.status = kanaEnum.status.NEW;
      amountSet++;
    }

    return kana.concat(character);
  }, []);
};

const promoteCurrentKana = (kana) => {
  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.status =
        character.status !== kanaEnum.status.CORRECT
          ? kanaEnum.status.CORRECT
          : kanaEnum.status.MEMORIZED;
    }

    return kana.concat(character);
  }, []);
};

const demoteCurrentKana = (kana) => {
  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.status = kanaEnum.status.WRONG;
    }

    return kana.concat(character);
  }, []);
};

const removeCurrentKana = (kana) => {
  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.isCurrent = false;
    }

    return kana.concat(character);
  }, []);
};

const setCurrentKana = (kana, status) => {
  let isSet = false;

  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.isCurrent = false;
    }

    if (character.status === status && !isSet) {
      character.isCurrent = true;
      isSet = true;
    }

    return kana.concat(character);
  }, []);
};

const getCurrentKana = (kana) => kana.find((character) => character.isCurrent);

const hasNewCategory = (kana) =>
  kana.some((character) => character.status === kanaEnum.status.NEW);
const hasWrongCategory = (kana) =>
  kana.some((character) => character.status === kanaEnum.status.WRONG);
const hasCorrectCategory = (kana) =>
  kana.some((character) => character.status === kanaEnum.status.CORRECT);
const hasIdleCategory = (kana) =>
  kana.some((character) => character.status === kanaEnum.status.IDLE);

export {
  addNewAndSetCurrentKana,
  promoteCurrentKana,
  demoteCurrentKana,
  removeCurrentKana,
  setCurrentKana,
  getCurrentKana,
  hasNewCategory,
  hasWrongCategory,
  hasCorrectCategory,
  hasIdleCategory,
};
