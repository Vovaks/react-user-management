import { ReactNode } from 'react';
import { useState } from 'react';
import './Tooltip.scss';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <span className="tooltip">{content}</span>}
    </div>
  );
};
