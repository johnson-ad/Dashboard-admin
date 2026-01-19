'use client';

import { Header } from './Header';

interface HeaderWrapperProps {
  onMenuClick: () => void;
}

export function HeaderWrapper({ onMenuClick }: HeaderWrapperProps) {
  return <Header onMenuClick={onMenuClick} />;
}
