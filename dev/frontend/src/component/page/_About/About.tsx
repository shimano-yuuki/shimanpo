'use client';

import React from "react";
import { Card } from "@/component/ui";

/**
 * About ページコンポーネント
 * デザイン要件書の「About画面」に対応したシンプルな1カラムレイアウト
 */
export const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        About shimanpo
      </h1>

      <div className="mb-8 h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-500" />

      <Card>
        <section className="space-y-6 text-sm leading-relaxed text-gray-700 md:text-base">
          <p>
            <strong>shimanpo</strong>について
          </p>

          <hr className="my-4 border-t border-gradient-to-r from-blue-600 to-emerald-500 opacity-40" />

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">ブログ</h2>
            <ul className="list-disc space-y-1 pl-5 text-gray-700">
              <li>技術的な発信を主に行っていく自由気ままなサイト</li>
            </ul>
          </section>

        </section>
      </Card>
    </div>
  );
};

