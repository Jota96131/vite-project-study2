import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const App = () => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("0");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  const totalTime = records.reduce((sum, record) => sum + record.time, 0);

  const handleClick = () => {
    if (content === "" || time === "" || Number(time) <= 0) {
      setError("入力されていない項目があります");
      return;
    }
    const newStudy = {
      id: Date.now(),
      title: content,
      time: Number(time),
    };
    setRecords([...records, newStudy]);
    setError("");
    setContent("");
    setTime("0");
  };

  return (
    <div>
      <h1> 学習記録一覧</h1>
      <div>
        <label>学習内容</label>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div>
        <label>学習時間</label>
        <input
          type="number"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
      </div>
      <div>
        <p>入力されている学習内容: {content}</p>
        <p>入力されている時間: {time}時間</p>
      </div>

      <div>
        <button onClick={handleClick}>登録</button>
      </div>

      <div>{error}</div>

      <div>
        <p>
          合計時間:
          {totalTime}/1000(h)
        </p>
      </div>

      <div>
        {records.map((record) => (
          <p key={record.id}>
            {record.title} {record.time}時間
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
