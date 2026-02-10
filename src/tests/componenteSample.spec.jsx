import App from "../App";
import "@testing-library/jest-dom";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getAllHistory, deleteTodo } from "../supabaseFunction";

jest.mock("../supabaseFunction", () => ({
  getAllHistory: jest.fn(() =>
    Promise.resolve([{ id: 1, title: "React", time: 2 }]),
  ),
  addTodo: jest.fn(() =>
    Promise.resolve({ id: 2, title: "TypeScript", time: 3 }),
  ),
  deleteTodo: jest.fn(),
}));

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  jest.clearAllMocks();
  getAllHistory.mockResolvedValue([{ id: 1, title: "React", time: 2 }]);
});

describe("Title Test", () => {
  it("タイトルが学習記録一覧であること", async () => {
    render(<App />);
    await waitFor(() => {
      const title = screen.getByTestId("title");
      expect(title).toHaveTextContent("学習記録一覧");
    });
  });
});

describe("Record Add Test", () => {
  it("記録を追加すると一覧の件数が1増える", async () => {
    getAllHistory.mockResolvedValueOnce([{ id: 1, title: "React", time: 2 }]);
    const user = userEvent.setup();
    render(<App />);

    // 初期データの描画を待つ
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });

    // 追加前の件数を保存
    const beforeCount = screen.getAllByRole("listitem").length;

    // 学習内容を入力
    const contentInput = screen.getByLabelText("学習内容");
    await user.type(contentInput, "TypeScript");

    // 学習時間を入力
    const timeInput = screen.getByLabelText("学習時間");
    await user.type(timeInput, "3");

    // 登録ボタンをクリック
    const button = screen.getByRole("button", { name: "登録" });
    await user.click(button);

    await waitFor(() => {
      const afterItems = screen.getAllByRole("listitem");
      expect(afterItems).toHaveLength(beforeCount + 1);
    });
  });
});

describe("Record Delete Test", () => {
  it("削除ボタンを押すと学習記録が1件減る", async () => {
    deleteTodo.mockResolvedValue(null);
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });

    const beforeCount = screen.getAllByRole("listitem").length;

    const deleteButton = screen.getByRole("button", { name: "削除" });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryAllByRole("listitem")).toHaveLength(beforeCount - 1);
    });
  });
});

describe("Validation Test", () => {
  it("入力をしないで登録を押すとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("データ読み込み中...")).not.toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: "登録" });
    await user.click(button);

    expect(
      screen.getByText("入力されていない項目があります"),
    ).toBeInTheDocument();
  });
});
