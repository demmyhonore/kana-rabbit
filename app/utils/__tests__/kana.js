import {
  addNewAndSetCurrentKana,
  promoteCurrentKana,
  demoteCurrentKana,
  removeCurrentKana,
  setCurrentKana,
  getCurrentKana,
  hasStatus,
} from "../kana";
import * as kanaEnum from "../../enum/kana";

const idleCharacter = { status: kanaEnum.status.IDLE, isCurrent: false };
const newCurrentCharacter = { status: kanaEnum.status.NEW, isCurrent: true };
const correctCurrentCharacter = {
  status: kanaEnum.status.CORRECT,
  isCurrent: true,
};

describe("addNewAndSetCurrentKana", () => {
  const amountNew = 2;
  const result = addNewAndSetCurrentKana(
    [{ ...newCurrentCharacter }, { ...idleCharacter }, { ...idleCharacter }],
    amountNew
  );

  it("returns 1 current character", () => {
    expect(result.filter(({ isCurrent }) => isCurrent).length).toEqual(1);
  });

  it("returns 2 characters with status new", () => {
    expect(
      result.filter(({ status }) => status === kanaEnum.status.NEW).length
    ).toEqual(2);
  });
});

describe("promoteCurrentKana", () => {
  const resultCorrect = promoteCurrentKana([{ ...newCurrentCharacter }]);
  const resultMemorized = promoteCurrentKana([{ ...correctCurrentCharacter }]);

  it("returns 1 character with status correct", () => {
    expect(
      resultCorrect.filter(({ status }) => status === kanaEnum.status.CORRECT)
        .length
    ).toEqual(1);
  });

  it("returns 1 character with status memorized", () => {
    expect(
      resultMemorized.filter(
        ({ status }) => status === kanaEnum.status.MEMORIZED
      ).length
    ).toEqual(1);
  });
});

describe("demoteCurrentKana", () => {
  it("returns 1 character with status wrong", () => {
    expect(
      demoteCurrentKana([{ ...newCurrentCharacter }]).filter(
        ({ status }) => status === kanaEnum.status.WRONG
      ).length
    ).toEqual(1);
  });
});

describe("removeCurrentKana", () => {
  it("does not return a current character", () => {
    expect(
      removeCurrentKana([{ ...newCurrentCharacter }]).filter(
        ({ isCurrent }) => isCurrent
      ).length
    ).toEqual(0);
  });
});

describe("setCurrentKana", () => {
  it("returns 1 current character", () => {
    expect(
      setCurrentKana([{ ...idleCharacter }], kanaEnum.status.IDLE).filter(
        ({ isCurrent }) => isCurrent
      ).length
    ).toEqual(1);
  });
});

describe("getCurrentKana", () => {
  it("returns correct current character", () => {
    expect(getCurrentKana([{ ...correctCurrentCharacter }])).toMatchObject(
      correctCurrentCharacter
    );
  });
});

describe("hasStatus", () => {
  it("confirms if some character has the specified status", () => {
    expect(
      hasStatus([{ ...idleCharacter }], kanaEnum.status.IDLE)
    ).toBeTruthy();
  });
});
