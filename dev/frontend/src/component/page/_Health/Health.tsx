'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/component/ui';
import { Button } from '@/component/ui';
import { fetchHealth } from '@/lib/api';

type HealthStatus = {
  status: string;
} | null;

/**
 * Health ページコンポーネント
 * Aggregation Parts: Element Partsを組み合わせてページを構成
 */
export const Health: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHealth();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">ヘルスチェック</h1>
      
      <Card title="API Status">
        {loading && <p className="text-gray-600">チェック中...</p>}
        {error && (
          <div className="mb-4">
            <p className="text-red-600 mb-2">エラー: {error}</p>
            <Button
              label="再試行"
              onClick={checkHealth}
              variant="primary"
            />
          </div>
        )}
        {health && !loading && (
          <div>
            <p className="text-green-600 mb-4">
              ステータス: <span className="font-bold">{health.status}</span>
            </p>
            <Button
              label="再チェック"
              onClick={checkHealth}
              variant="secondary"
            />
          </div>
        )}
      </Card>
    </div>
  );
};
