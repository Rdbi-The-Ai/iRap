import React from 'react';
import { tokens } from './tokens';

export function GlassButton({ 
  variant = 'primary', 
  size = 'default',
  children, 
  className = '',
  style = {},
  ...props 
}) {
  const btnConfig = variant === 'primary' 
    ? tokens.button.primaryGlass 
    : tokens.button.secondaryGlass;
  
  const height = size === 'large' ? tokens.button.heightLarge : tokens.button.height;
  const fontSize = size === 'large' ? tokens.button.fontSizeLarge : tokens.button.fontSize;
  const paddingX = size === 'large' ? tokens.button.paddingXLarge : tokens.button.paddingX;
  const radius = size === 'large' ? tokens.button.radiusLarge : tokens.button.radius;

  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle = {
    height,
    padding: `0 ${paddingX}`,
    borderRadius: radius,
    fontSize,
    fontWeight: tokens.button.fontWeight,
    letterSpacing: tokens.button.letterSpacing,
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    background: isHovered ? btnConfig.backgroundHover : btnConfig.background,
    backdropFilter: isHovered ? btnConfig.backdropBlurHover : btnConfig.backdropBlur,
    WebkitBackdropFilter: isHovered ? btnConfig.backdropBlurHover : btnConfig.backdropBlur,
    border: btnConfig.border,
    boxShadow: isHovered ? btnConfig.shadowHover : btnConfig.shadow,
    transition: tokens.button.transition,
    ...style,
  };

  return (
    <button
      {...props}
      style={buttonStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}