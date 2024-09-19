"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import { url } from "inspector";
import { useRouter } from "next/navigation";

type Url = {
  id: string;
  shortCode: string;
  originURL: string;
  visits: number;
};

const Urllist = () => {
  const router = useRouter();
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyurl, setCopyurl] = useState<string>("");
  const [isLoding, setIsLoading] = useState<boolean>(false);
  const shortanUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;
  // console.log(urls);
  const fetchURLs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/urls");
      const data = await res.json();
      router.refresh();
      setUrls(data);
    } catch (error) {
      console.error("Error  fetching urls", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = (code: string) => {
    const full = `${shortanUrl(code)}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setCopyurl(code);
      setTimeout(() => {
        setCopied(false);
        setCopyurl("");
      }, 2000);
    });
  };

  useEffect(() => {
    fetchURLs();
  }, []);

  if (isLoding) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className=" text-2xl font-bold mb-2">Recent Urls</h2>
      <ul className=" space-y-2">
        {urls.map((url) => (
          <li key={url.id} className=" flex items-center gap-2 justify-between">
            <Link
              href={`/${url.shortCode}`}
              className=" text-blue-600"
              target="_blank">
              {shortanUrl(url.shortCode)}
            </Link>
            <div className=" flex items-center gap-4">
              <Button
                onClick={() => handleCopyUrl(url.shortCode)}
                variant="ghost"
                size="icon"
                className=" text-muted-foreground hover:bg-muted">
                {copied && copyurl == url.shortCode ? (
                  <CheckIcon className=" w-4 h-4" />
                ) : (
                  <CopyIcon className=" w-4 h-4" />
                )}
              </Button>
              <span className=" flex items-center gap-2">
                <EyeIcon className="h-4 w-4" />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Urllist;
