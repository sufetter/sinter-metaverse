import {useRouter} from "next/router";
import React from "react";

export default function HH() {
  let router = useRouter();
  const callAPI = async () => {
    try {
      const res = await fetch(`/api/hentai`);
      const data = await res.json();
      console.log(data.url);

      router.push(`${data.url}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <main>
        <button onClick={callAPI}>Make API Call</button>
      </main>
    </div>
  );
}
