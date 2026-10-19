---
name: mobile-app-architecture
description: Agent-friendly mobile app architecture (React Native/Flutter) with feature-first organization, navigation patterns, and clear handoff guidelines
---

# Mobile App Architecture Skill

## Purpose
Enforce scalable, agent-readable folder structure for React Native and Flutter apps using feature-first organization. Designed for seamless handoffs between different AI agents and models working on mobile development.

## Folder Structure (Mandatory)

```
src/
├── app/                    # App-level setup, root component
│   ├── App.tsx             # Main app component
│   ├── AppNavigator.tsx    # Root navigation setup
│   └── theme.ts            # Global theme configuration
├── screens/                # Full-screen components (routes)
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── features/               # Feature-first organization
│   ├── auth/               # Authentication feature
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── PasswordInput.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useLogin.ts
│   │   ├── services/
│   │   │   └── auth-api.ts
│   │   ├── store/
│   │   │   └── auth-slice.ts      # Redux/Zustand state
│   │   ├── types/
│   │   │   └── auth.ts
│   │   └── utils/
│   │       └── validators.ts
│   ├── products/           # Product browsing feature
│   │   ├── screens/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   └── checkout/           # Checkout feature
│       ├── screens/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── store/
│       ├── types/
│       └── utils/
├── components/             # Shared UI components (used across features)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── TabBar.tsx
├── navigation/             # Navigation configuration
│   ├── RootNavigator.tsx   # Main navigation structure
│   ├── auth-navigator.tsx  # Auth flow stack
│   ├── app-navigator.tsx   # Main app stack
│   └── linking.ts          # Deep linking config
├── store/                  # Global state management (Redux/Zustand)
│   ├── index.ts            # Store setup
│   ├── slices/             # Feature-level reducers
│   │   ├── auth-slice.ts
│   │   └── app-slice.ts
│   └── selectors/
│       └── auth-selectors.ts
├── hooks/                  # Custom hooks (app-wide)
│   ├── useAppState.ts
│   ├── useNetworkStatus.ts
│   └── useAnimation.ts
├── services/               # API and external services
│   ├── api.ts              # API client setup
│   ├── auth.ts             # Auth service
│   ├── analytics.ts        # Analytics service
│   └── notifications.ts    # Push notification service
├── utils/                  # Utility functions
│   ├── formatting.ts
│   ├── validation.ts
│   ├── date-helpers.ts
│   └── permission-helpers.ts
├── constants/              # Global constants
│   ├── colors.ts
│   ├── sizes.ts
│   ├── fonts.ts
│   ├── routes.ts
│   └── api-endpoints.ts
├── types/                  # Global TypeScript types
│   ├── index.ts
│   ├── api.ts
│   └── navigation.ts
└── assets/                 # Images, fonts, etc.
    ├── images/
    ├── fonts/
    └── svg/
```

## Feature-First Organization (Core Principle)

Each feature is **self-contained**. Everything needed for a feature lives in its folder:

```
features/auth/              # Everything auth-related
├── screens/                # Auth screens (screens unique to auth)
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── ForgotPasswordScreen.tsx
├── components/             # Auth components (only used in auth screens)
│   ├── PasswordStrengthMeter.tsx
│   └── SocialLoginButton.tsx
├── hooks/                  # Auth-specific hooks
│   ├── useAuth.ts          # Hook: is user logged in?
│   ├── useLogin.ts         # Hook: login logic
│   └── useSignup.ts        # Hook: signup logic
├── services/               # Auth API calls
│   └── auth-api.ts         # login(), signup(), logout()
├── store/                  # Auth state (Redux/Zustand)
│   └── auth-slice.ts       # State: user, token, authStatus
├── types/                  # Auth types
│   └── auth.ts             # User, LoginRequest, etc.
└── utils/                  # Auth helpers
    └── validators.ts       # Email validation, password rules
```

**Key Rule**: Feature components are NOT shared with other features. If you need cross-feature UI, use `components/` (shared UI).

## Component Hierarchy (Mobile-Specific)

Mobile apps have unique constraints:

```typescript
// components/Button.tsx (SHARED - used everywhere)
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ title, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  // Reusable across entire app
}

// features/auth/components/PasswordInput.tsx (FEATURE-SPECIFIC)
// Only used in auth screens
interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  showStrengthMeter?: boolean;
}

export function PasswordInput({ value, showStrengthMeter, ...props }: PasswordInputProps) {
  // Only exists for auth feature
}
```

## Screens vs. Components

- **Screens** (`screens/`): Full-screen components connected to navigation, manage feature state
- **Components** (`components/` or `features/[name]/components/`): Reusable UI building blocks

```typescript
// features/products/screens/ProductListScreen.tsx (SCREEN - manages state)
export function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProducts().then(setProducts).finally(() => setLoading(false));
  }, []);
  
  return (
    <View>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </View>
  );
}

// features/products/components/ProductCard.tsx (COMPONENT - pure UI)
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <Image source={{ uri: product.image }} />
      <Text>{product.name}</Text>
      <Text>${product.price}</Text>
    </Card>
  );
}
```

## Navigation Pattern (Agent-Readable)

Define navigation types explicitly:

```typescript
// navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  Profile: undefined;
  Checkout: { cartId: string };
};

// navigation/RootNavigator.tsx
export function RootNavigator() {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

// Usage in components (TypeScript safe)
function ProductScreen({ navigation }: RootStackScreenProps<'ProductDetail'>) {
  return (
    <Button 
      onPress={() => navigation.navigate('Checkout', { cartId: '123' })} 
    />
  );
}
```

## State Management Pattern (Redux/Zustand)

Organize state by feature, not by type:

```typescript
// store/slices/auth-slice.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLoading: false, error: null },
  reducers: {
    loginStart: (state) => { state.isLoading = true; },
    loginSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoading = false;
    },
    loginError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

// store/selectors/auth-selectors.ts (for querying state)
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
```

## API Service Pattern

Centralized, typed API calls:

```typescript
// services/api.ts
const API_BASE = 'https://api.example.com';

const apiClient = axios.create({ baseURL: API_BASE });

apiClient.interceptors.request.use((config) => {
  // Add auth token to requests
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// features/auth/services/auth-api.ts
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
}

// Usage in hooks
function useLogin() {
  const dispatch = useDispatch();
  
  return async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      const { user, token } = await login({ email, password });
      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };
}
```

## Hooks Pattern (Reusable Logic)

Extract logic from screens into hooks:

```typescript
// features/products/hooks/useProducts.ts
export function useProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(selectProductsState);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return { products, loading, error };
}

// features/products/screens/ProductListScreen.tsx
export function ProductListScreen() {
  const { products, loading, error } = useProducts();
  
  return (
    <View>
      {loading && <ActivityIndicator />}
      {error && <ErrorMessage message={error} />}
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </View>
  );
}
```

## Comments (Minimal, Targeted)

```typescript
// ✓ CORRECT: Why is this needed?
// Debounce search to prevent excessive API calls (each character = request)
const debouncedSearch = useCallback(
  debounce((query: string) => dispatch(searchProducts(query)), 500),
  [dispatch]
);

// ✗ WRONG: Obvious from code
// Update the search query
setSearchQuery(query);
```

## Agent Handoff Guidelines

Include `MOBILE_ARCHITECTURE.md` at project root:

```markdown
# Mobile App Architecture Guide

## Quick Start for New Agents
1. **Features**: Self-contained in `features/[name]/`
2. **Shared UI**: Only in `components/`
3. **State**: Feature state in `features/[name]/store/`, global in `store/`
4. **Navigation**: Types in `navigation/types.ts`, config in `navigation/`

## Feature Structure
Each feature has: screens/, components/, hooks/, services/, store/, types/, utils/

## Navigation Flow
RootNavigator → AuthNavigator (if no user) / AppNavigator (if logged in)

## State Management: [Redux/Zustand]
- Feature slices in `features/[name]/store/`
- Global selectors in `store/selectors/`
- Use hooks to access state, never direct `useSelector` in screens

## Key Services
- API client: `services/api.ts` (all requests go through here)
- Auth: `features/auth/services/auth-api.ts`

## Common Tasks
- Add new screen: Create in `features/[name]/screens/`
- Add navigation route: Update `navigation/types.ts` and navigator
- Add feature: Create `features/[name]/` with full structure
```

## Violations to Avoid

| ✗ Wrong | ✓ Right | Why |
|---------|---------|-----|
| Feature components scattered in `components/` | Keep in `features/[name]/components/` | Features are self-contained |
| Shared UI in feature folders | Keep in `components/` | Maximize reuse |
| Screen logic scattered in component | Extract to hooks | Reusable, testable |
| Direct API calls in screens | Call through hooks/services | Centralized, mockable |
| Undocumented navigation params | Types in `navigation/types.ts` | Next agent knows routes |
| Magic strings for route names | Use constants or generated types | Prevent typos |
| Global state for feature-specific data | Feature state in `features/[name]/store/` | Cleaner, scoped |

## Checklist Before Handoff to Next Agent

- [ ] Features organized in `features/[name]/`
- [ ] Each feature has: screens/, components/, hooks/, services/, store/, types/
- [ ] Shared UI only in `components/`
- [ ] Navigation types in `navigation/types.ts`
- [ ] All API calls through `services/`
- [ ] Screen logic extracted to hooks
- [ ] State management organized by feature
- [ ] No magic strings (use constants)
- [ ] TypeScript strict mode enabled
- [ ] `MOBILE_ARCHITECTURE.md` is current
- [ ] No component import from different feature's folder
