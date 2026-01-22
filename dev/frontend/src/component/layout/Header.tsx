 'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
  icon?: string;
  adminOnly?: boolean;
};

// TODO: 後で認証と連携してadmin判定を実装する
const useIsAdmin = () => {
  // 現状は開発用にtrue固定。将来はログイン情報から判定する
  const isAdmin = true;
  return isAdmin;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'TOP', icon: '🏠' },
  { href: '/about', label: 'About', icon: 'ℹ️' },
  { href: '/post', label: 'Post', icon: '✏️', adminOnly: true },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isAdmin = useIsAdmin();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-sm font-bold text-white shadow-sm">
            S
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              shimanpo
            </span>
            <span className="text-xs text-gray-500">Tech Blog</span>
          </div>
        </Link>

        {/* ナビゲーションタブ */}
        <nav className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.map((item) => {
            if (item.adminOnly && !isAdmin) return null;

            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-1 text-sm font-medium transition-transform ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.icon && <span className="text-base">{item.icon}</span>}
                <span>{item.label}</span>
                {item.adminOnly && isAdmin && (
                  <span className="ml-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Admin
                  </span>
                )}
                {/* 下線アニメーション */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 origin-left transform rounded-full bg-blue-600 transition-all duration-300 ${
                    isActive
                      ? 'w-full scale-x-100'
                      : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* モバイル: シンプルなリンク（後でハンバーガーに差し替え可能） */}
        <nav className="flex items-center gap-3 md:hidden">
          {NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin).map(
            (item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            },
          )}
        </nav>
      </div>
    </header>
  );
};

