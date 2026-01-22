'use client';

import React, { useMemo, useState } from "react";
import { Card, Button } from "@/component/ui";

type Mode = "edit" | "preview";

const useIsAdmin = () => {
  // TODO: 認証連携。現状は開発用にtrue固定
  return true;
};

/**
 * Post ページコンポーネント
 * 2ペイン構成（編集 / プレビュー）のプロトタイプ
 */
export const Post: React.FC = () => {
  const isAdmin = useIsAdmin();
  const [mode, setMode] = useState<Mode>("edit");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState<string>("# 新しい記事タイトル\n\nここに本文を入力します。");

  const previewBody = useMemo(() => {
    // 将来的には Markdown ライブラリでレンダリングする
    return body;
  }, [body]);

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Card title="権限がありません">
          <p className="text-sm text-gray-700">
            このページは管理者専用です。閲覧権限がありません。
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            記事の投稿
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Markdown形式で記事を作成し、リアルタイムプレビューで確認できます。
          </p>
        </div>

        {/* モード切り替えトグル（モバイル向け） */}
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 p-1 text-xs font-medium text-gray-600 md:hidden">
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`rounded-full px-3 py-1 transition ${
              mode === "edit" ? "bg-white text-blue-600 shadow-sm" : ""
            }`}
          >
            編集
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`rounded-full px-3 py-1 transition ${
              mode === "preview" ? "bg-white text-blue-600 shadow-sm" : ""
            }`}
          >
            プレビュー
          </button>
        </div>
      </div>

      {/* 2ペインレイアウト */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 編集ペイン */}
        <Card title="編集">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">
                Markdown対応
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                リアルタイムプレビュー
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="mb-1 block font-medium text-gray-800">
                タイトル
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="記事タイトルを入力"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-gray-800">
                タグ
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="タグをカンマ区切りで入力 (例: Go, Next.js, Clean Architecture)"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-gray-800">
                本文 (Markdown)
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-xs outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex justify-end">
              <Button label="投稿する" variant="primary" />
            </div>
          </div>
        </Card>

        {/* プレビューペイン */}
        <Card title="プレビュー">
          <div className="prose max-w-none prose-headings:mt-6 prose-headings:mb-3 prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              {title || "タイトル未設定"}
            </h2>
            {tags && (
              <div className="mb-4 flex flex-wrap gap-2 text-xs">
                {tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
            <pre className="whitespace-pre-wrap rounded-md bg-gray-900/90 p-4 text-xs text-gray-100">
              {previewBody}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};

