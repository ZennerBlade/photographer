---
name: web-architecture
description: Agent-friendly React/web app architecture for reusable components and scalable folder structure
---

# Web Architecture Skill

## Purpose
Enforce scalable, agent-readable folder structures and component reusability patterns for React/web applications. Designed for seamless handoffs between different AI agents and models.

## Folder Structure (Mandatory)

```
src/
├── components/
│   ├── ui/              # Base, reusable UI elements (Button, Input, Card, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── shared/          # Shared across multiple features (Header, Footer, Sidebar)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── [feature-name]/  # Feature-specific components (only used in one feature)
│       ├── FeatureCard.tsx
│       └── FeatureModal.tsx
├── pages/               # Route/screen level (Next.js/Remix pages)
│   ├── index.tsx
│   └── [feature-name].tsx
├── hooks/               # Custom React hooks (reusable logic)
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   └── useFetch.ts
├── utils/               # Pure functions, helpers, utilities
│   ├── formatting.ts
│   ├── validation.ts
│   └── api-helpers.ts
├── services/            # API calls, external service logic
│   ├── auth.ts
│   ├── api.ts
│   └── storage.ts
├── context/             # React Context providers (global state)
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── constants/           # Configuration, enums, constants
│   ├── colors.ts
│   ├── routes.ts
│   └── api-endpoints.ts
└── types/               # TypeScript types, interfaces
    ├── index.ts
    └── api.ts
```

## Component Reuse Rules (Non-Negotiable)

### Rule 1: Check `components/shared/` First
Before creating a new component, check if it exists in `shared/`. If similar, **reuse and configure with props**, don't duplicate.

```tsx
// ✓ CORRECT: Reuse with props
<Header title="Products" showSearch={true} />

// ✗ WRONG: Creating a new HeaderWithSearch component
// → Use Header with props instead
```

### Rule 2: UI Components Go in `components/ui/`
Atomic, framework-agnostic UI elements (Button, Input, Card, Badge). These are reused across many features.

```tsx
// components/ui/Button.tsx
export function Button({ variant, size, children, ...props }) {
  // One Button component, infinitely reusable
}
```

### Rule 3: Feature-Specific Components Stay in Feature Folder
Only if a component is used in ONE feature, put it in `components/[feature-name]/`.

```
components/
├── ui/                    # Reused everywhere
├── shared/                # Reused by 2+ features
└── checkout-flow/         # Only used in checkout, nowhere else
    └── PaymentForm.tsx
```

## Component Registry Pattern (CRITICAL for Agent Coordination)

**Every reusable component must be documented in a registry so all agents know it exists.**

### Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # Has COMPONENT REGISTRY comment
│   │   ├── Input.tsx               # Has COMPONENT REGISTRY comment
│   │   └── Card.tsx                # Has COMPONENT REGISTRY comment
│   ├── shared/
│   │   └── Header.tsx              # Has COMPONENT REGISTRY comment
│   └── COMPONENTS.md               # Agent reference index
```

### Rule: Before Building ANY Component
1. **Read** `src/components/COMPONENTS.md` (registry index)
2. **Search** for existing component with same purpose
3. **If exists**: Use it (add variant if needed), do NOT recreate
4. **If doesn't exist**: Create new component with COMPONENT REGISTRY comment, update COMPONENTS.md

### COMPONENT REGISTRY Comment Format

Every reusable component (ui/ and shared/) requires this header:

```typescript
/**
 * COMPONENT REGISTRY
 * ID: [UNIQUE_IDENTIFIER in SCREAMING_SNAKE_CASE]
 * Variants: [list all variants, e.g., primary, secondary, outline]
 * Props: [key props, e.g., variant, size, disabled, onClick]
 * Status: ✅ LOCKED / 🔄 IN_PROGRESS / ⚠️ NEEDS_REVIEW
 * Used in: [features/pages that use this component]
 * Design locked: Yes/No (if Yes, don't modify without approval)
 * Last updated: [YYYY-MM-DD] by [Agent name]
 */
```

### Example: Button Component

```typescript
/**
 * COMPONENT REGISTRY
 * ID: BUTTON_PRIMARY
 * Variants: primary, secondary, outline, ghost
 * Props: variant, size (sm|md|lg), loading, disabled, onClick, children
 * Status: ✅ LOCKED
 * Used in: Auth flows (login, signup), CTAs, checkout, all interactive actions
 * Design locked: Yes (colors #1E40AF primary, spacing from design system)
 * Last updated: 2026-10-04 by Design Agent
 */

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', loading, disabled, ...props }: ButtonProps) {
  // Implementation uses design system tokens
}
```

### Example: Input Component

```typescript
/**
 * COMPONENT REGISTRY
 * ID: INPUT_TEXT
 * Variants: default, error, success, disabled
 * Props: type, placeholder, value, onChange, error, helperText
 * Status: ✅ LOCKED
 * Used in: All forms (login, signup, checkout, user profile)
 * Design locked: Yes (height 40px, padding 12px, border radius 8px)
 * Last updated: 2026-10-04 by Design Agent
 */

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
}

export function Input({ type = 'text', error, helperText, ...props }: InputProps) {
  // Implementation uses design system
}
```

### COMPONENTS.md (Agent Reference Index)

Maintain in `src/components/COMPONENTS.md`:

```markdown
# Component Registry

**Single source of truth for all UI components.**
Every agent reads this before building anything.

## Before Building
1. Search this registry
2. If component exists → Use it (add variant if needed)
3. If doesn't exist → Create new, add COMPONENT REGISTRY comment, update this file

---

## UI Components (src/components/ui/)

### BUTTON_PRIMARY
- **ID**: BUTTON_PRIMARY
- **Variants**: primary, secondary, outline, ghost
- **Props**: variant, size (sm|md|lg), loading, disabled, onClick, children
- **Status**: ✅ LOCKED
- **File**: src/components/ui/Button.tsx
- **Used in**: Auth flows, CTAs, checkout, everywhere
- **Design**: Locked (do not modify colors/padding without design approval)
- **Notes**: 
  - Do NOT create ButtonSecondary, use `variant="secondary"` instead
  - Do NOT create ButtonOutline, use `variant="outline"` instead
  - Add size variant (sm, md, lg) instead of creating new component

### INPUT_TEXT
- **ID**: INPUT_TEXT
- **Variants**: default, error, success, disabled
- **Props**: type, placeholder, value, onChange, error, helperText
- **Status**: ✅ LOCKED
- **File**: src/components/ui/Input.tsx
- **Used in**: All forms
- **Design**: Locked
- **Notes**:
  - Do NOT create InputError, use `error` prop instead
  - helperText shows below input for hints
  - error shows validation error in red

### CARD
- **ID**: CARD
- **Variants**: default, elevated, outline
- **Props**: variant, children, className
- **Status**: ✅ LOCKED
- **File**: src/components/ui/Card.tsx
- **Used in**: Product listings, dashboards, content sections
- **Notes**: Simple container with design system styling

---

## Shared Components (src/components/shared/)

### HEADER
- **ID**: HEADER
- **Props**: title, showSearch, onSearchChange
- **Status**: ✅ LOCKED
- **File**: src/components/shared/Header.tsx
- **Used in**: All pages (global header)
- **Notes**: Do not create PageHeader, use Header everywhere

---

## Status Legend
- ✅ **LOCKED**: Design approved. Don't modify without approval.
- 🔄 **IN_PROGRESS**: Being refined. Agents can iterate.
- ⚠️ **NEEDS_REVIEW**: Needs design/product approval before wider use.

---

## How Agents Use This
1. Need a button? → Check BUTTON_PRIMARY, use it
2. Need a variant? → Check if variant exists in BUTTON_PRIMARY
3. Variant doesn't exist? → Add to existing component, update this registry
4. Component doesn't exist? → Create new, add COMPONENT REGISTRY comment, add to this file
```

## Code Organization Rules

### Containers vs. Presentational (Separation of Concerns)
```tsx
// components/shared/ProductCard.tsx (PRESENTATIONAL - no logic)
export function ProductCard({ name, price, onBuy }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={onBuy}>Buy</button>
    </div>
  );
}

// pages/products.tsx or hooks/ (CONTAINER - has logic)
export default function ProductPage() {
  const [products] = useProducts();
  const handleBuy = (id) => { /* API call */ };
  
  return products.map(p => (
    <ProductCard 
      key={p.id}
      name={p.name}
      price={p.price}
      onBuy={() => handleBuy(p.id)}
    />
  ));
}
```

### Logic Goes in Hooks, Not Components
```tsx
// ✓ CORRECT: Logic in hook
function useAuth() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Auth logic here
  }, []);
  
  return { user, logout: () => setUser(null) };
}

// ✗ WRONG: Logic scattered in component
function LoginComponent() {
  // 200 lines of login logic here...
}
```

## Naming Conventions (Agent-Readable)

### Files
- Components: `PascalCase.tsx` — `ProductCard.tsx`, `Header.tsx`
- Hooks: `camelCase.ts` — `useAuth.ts`, `useFetch.ts`
- Utils: `camelCase.ts` — `formatting.ts`, `validators.ts`
- Types: `PascalCase.ts` — `User.ts`, `ApiResponse.ts`

### Functions/Exports
- React components: `PascalCase` — `export function Button() {}`
- Hooks: `camelCase` with `use` prefix — `export function useAuth() {}`
- Helpers: `camelCase` — `export function formatDate() {}`

## Props Pattern (For Agent Readability)

Always define props interface explicitly, never use `any`:

```tsx
// ✓ CORRECT: Clear prop interface
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  // ...
}

// ✗ WRONG: Implicit props
export function Button(props: any) {
  // Next agent has no idea what props this accepts
}
```

## Comments (Minimal, Targeted)

Only comment the **WHY**, not the WHAT. Self-documenting code is better:

```tsx
// ✓ CORRECT: Why we do this
// Debounce search to avoid excessive API calls
const debouncedSearch = useMemo(() => debounce(search, 300), []);

// ✗ WRONG: Obvious from code
// Set debounce to 300
const debouncedSearch = debounce(search, 300);
```

## Agent Handoff Guidelines

When another agent picks up this code, include a `ARCHITECTURE.md` at project root with:

```markdown
# [Project Name] Architecture

## Quick Start for New Agents
1. **Components**: Check `components/shared/` and `components/ui/` before creating new ones
2. **Logic**: Put it in `hooks/` or `services/`, not components
3. **Naming**: Check `constants/` for endpoints, colors, routes
4. **Folder structure**: Feature → components/[feature-name]/, styles, types

## Key Decisions
- State management: [Context/Redux/Zustand]
- API client: [fetch/axios/SWR]
- Styling: [Tailwind/CSS Modules/styled-components]
- Routing: [React Router/Next.js Pages/Remix]

## Critical Dependencies
- [List key packages and why]

## Common Tasks
- Add a new feature: [Steps]
- Add a new page: [Steps]
- Add a new component: [Steps]
```

## Violations to Avoid

| ✗ Wrong | ✓ Right | Why |
|---------|---------|-----|
| Creating duplicate components | Reuse with props | Single source of truth |
| Logic in components | Logic in hooks/services | Reusable, testable |
| Generic naming (Button2, ButtonV2) | Specific naming (PrimaryButton via variant prop) | Agent-readable intent |
| Files scattered randomly | Organized by feature + type | Next agent finds things |
| No prop types | Explicit interfaces (TypeScript) | Next agent knows what props work |
| Comments explaining every line | Comments on non-obvious WHY | Self-documenting code |

## Checklist Before Handoff to Next Agent

- [ ] All components in `ui/` or `shared/` are truly reusable (used in 2+ places)
- [ ] Feature-specific components are in `components/[feature-name]/`
- [ ] No logic in presentational components
- [ ] All reusable logic extracted to `hooks/`, `utils/`, or `services/`
- [ ] Props are explicitly typed (TypeScript interfaces)
- [ ] `ARCHITECTURE.md` exists and is current
- [ ] No generic naming (e.g., no Button2, CardV2)
- [ ] Folder structure matches template above
