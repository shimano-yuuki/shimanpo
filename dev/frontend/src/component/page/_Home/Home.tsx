'use client';

import React from 'react';
import { Card } from '@/component/ui';
import { Button } from '@/component/ui';

/**
 * Home ページコンポーネント
 * Aggregation Parts: Element Partsを組み合わせてページを構成
 */
export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">shimanpo 技術ブログ</h1>
      
      <Card title="ようこそ">
        <p className="mb-4">
          このプロジェクトは、クリーンアーキテクチャを採用した技術ブログプラットフォームです。
        </p>
        <div className="flex gap-4">
          <Button
            label="ヘルスチェック"
            onClick={() => window.location.href = '/health'}
            variant="primary"
          />
        </div>
      </Card>
    </div>
  );
};
