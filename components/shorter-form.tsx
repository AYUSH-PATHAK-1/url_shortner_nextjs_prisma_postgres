"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ShortnaFormProps {
  urlhandlershortner: () => void;
}

const Shorterform = ({ urlhandlershortner }: ShortnaFormProps) => {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoding] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoding(true);
    // console.log(url);
    try {
      const res = await fetch("/api/shorten", {
        method: "POSt",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
        }),
      });
      await res.json();
      setUrl("");
      urlhandlershortner();
    } catch (error) {
      console.log("Error Shortening URL:", error);
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" mb-4">
      <div className=" space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className=" h-12"
          type="url"
          placeholder="Enter your URL"
          required
        />
        <Button className=" w-full p-2" type="submit" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>
    </form>
  );
};

export default Shorterform;
