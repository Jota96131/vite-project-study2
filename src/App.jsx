import { useEffect, useState } from "react";
import { getAllHistory, addTodo, deleteTodo } from "./supabaseFunction.js";

export const App = () => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("0");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    setIsLoading(true); // 読み込み開始時

    const todos = await getAllHistory();

    if (!todos) {
      setError("データ取得に失敗しました");
      setIsLoading(false);
      return;
    }
    setRecords(todos);
    setIsLoading(false); // 読み込み完了時
  };

  // useEffectの外でも fetchTodos を使えるようにする
  useEffect(() => {
    fetchTodos();
  }, []);

  const totalTime = records.reduce((sum, record) => sum + record.time, 0);

  const handleClick = async () => {
    if (content === "" || time === "" || Number(time) <= 0) {
      setError("入力されていない項目があります");
      return;
    }
    const addData = await addTodo(content, Number(time));
    if (!addData) {
      setError("データの登録に失敗しました");
      return;
    }

    setRecords([...records, addData]);
    setError("");
    setContent("");
    setTime("0");
  };

  const handleDelete = async (id) => {
    const error = await deleteTodo(id);

    if (error) {
      setError("削除に失敗しました");
      return;
    }

    setRecords(records.filter((record) => record.id !== id));
    setError("");
  };
  if (isLoading) {
    return (
      <div>
        <h1 data-testid="title">学習記録一覧</h1>
        <p>データ読み込み中...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 data-testid="title">学習記録一覧</h1>

      <div>
        <label htmlFor="content-input">学習内容</label>
        <input
          id="content-input"
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="time-input">学習時間</label>
        <input
          id="time-input"
          type="number"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
      </div>

      <div>
        <p>入力されている学習内容: {content}</p>
        <p>入力されている時間: {time}時間</p>
      </div>

      <button onClick={handleClick}>登録</button>

      <div>{error}</div>

      <p>合計時間: {totalTime}/1000(h)</p>

      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.title} {record.time}時間{" "}
            <button onClick={() => handleDelete(record.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
