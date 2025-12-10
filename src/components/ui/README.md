# GlassCard Component Usage Guide

## Overview
The `GlassCard` component provides a modern glassmorphic effect with backdrop blur, perfect for creating premium UI elements.

## Basic Usage

```jsx
import GlassCard from './components/ui/GlassCard';

<GlassCard>
  <h2>Your Content Here</h2>
</GlassCard>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to display inside the card |
| `className` | string | '' | Additional Tailwind classes |
| `animate` | boolean | true | Enable scroll-triggered fade-in animation |
| `hover` | boolean | true | Enable hover effects (scale + shadow) |
| `intensity` | string | 'medium' | Blur intensity: 'light', 'medium', 'strong' |

## Examples

### Light Intensity
```jsx
<GlassCard intensity="light">
  <p>Subtle glass effect</p>
</GlassCard>
```

### Strong Intensity with Custom Styling
```jsx
<GlassCard 
  intensity="strong"
  className="p-8 md:p-12"
  hover={false}
>
  <h1>Premium Content</h1>
</GlassCard>
```

### Without Animation
```jsx
<GlassCard animate={false}>
  <div>Static glass card</div>
</GlassCard>
```

## Integration Points

✅ **Implemented:**
- Hero Section category card
- Background gradient added to enhance effect

🎯 **Recommended Usage:**
- Promo banners overlay
- Service cards in MostBookedSection
- Download section content
- Footer newsletter signup
- Modal dialogs
- Floating action buttons

## Design Tips

1. **Background**: Works best with gradient or image backgrounds
2. **Contrast**: Ensure text has sufficient contrast on glass
3. **Layering**: Stack multiple glass cards for depth
4. **Spacing**: Use generous padding for premium feel
