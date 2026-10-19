---
name: chrome-extension-architecture
description: Agent-friendly Chrome extension architecture with Manifest V3, modular messaging, and clear handoff patterns
---

# Chrome Extension Architecture Skill

## Purpose
Enforce scalable, agent-readable folder structure for Chrome extensions using Manifest V3. Designed for seamless handoffs between different AI agents and models working on extension development.

## Folder Structure (Mandatory)

```
src/
├── manifest.json           # Manifest V3 declaration
├── background/             # Service worker (runs in background)
│   ├── index.ts            # Service worker entry point
│   ├── handlers.ts         # Message handlers, event listeners
│   ├── storage.ts          # Extension storage logic
│   └── api.ts              # Background-only API calls
├── content/                # Content scripts (injected into pages)
│   ├── index.ts            # Content script entry point
│   ├── dom-observer.ts     # DOM mutations, observers
│   ├── messaging.ts        # Messages to/from background
│   └── injector.ts         # Inject UI into page DOM
├── popup/                  # Extension popup (user clicks icon)
│   ├── Popup.tsx           # Main popup component
│   ├── index.tsx           # React root
│   └── styles.css          # Popup styles
├── sidepanel/              # Side panel (optional, Manifest V3)
│   ├── SidePanel.tsx       # Side panel component
│   └── index.tsx           # React root
├── ui/                     # Shared UI components (used in popup, sidepanel, etc.)
│   ├── Button.tsx
│   ├── Toggle.tsx
│   └── Badge.tsx
├── messaging/              # Messaging patterns (shared by all contexts)
│   ├── messages.ts         # Message type definitions
│   ├── popup-to-bg.ts      # Popup ↔ Background messaging
│   ├── content-to-bg.ts    # Content ↔ Background messaging
│   └── broadcast.ts        # One-to-many messaging
├── storage/                # Storage abstraction layer
│   ├── local.ts            # chrome.storage.local wrapper
│   ├── sync.ts             # chrome.storage.sync wrapper
│   └── cache.ts            # In-memory cache for performance
├── hooks/                  # Custom React hooks (popup, sidepanel)
│   ├── useExtensionStorage.ts
│   ├── useMessaging.ts
│   └── usePageAnalysis.ts
├── utils/                  # Utility functions
│   ├── url-helpers.ts      # URL parsing, matching
│   ├── dom-helpers.ts      # DOM manipulation
│   └── formatting.ts       # Formatting helpers
├── constants/              # Configuration, enums
│   ├── messages.ts         # Message type constants
│   ├── storage-keys.ts     # Storage key names
│   └── urls.ts             # URL patterns, endpoints
└── types/                  # TypeScript types
    ├── index.ts
    ├── messages.ts
    └── api.ts
```

## Message Types (Agent-Readable Messaging)

Define ALL messages in `messaging/messages.ts` to make handoffs clear:

```typescript
// messaging/messages.ts
export enum MessageType {
  // Content → Background
  ANALYZE_PAGE = 'ANALYZE_PAGE',
  GET_HIGHLIGHTS = 'GET_HIGHLIGHTS',
  
  // Popup → Background
  SAVE_SETTING = 'SAVE_SETTING',
  GET_EXTENSION_STATUS = 'GET_EXTENSION_STATUS',
  
  // Background → Content (broadcast)
  SETTINGS_CHANGED = 'SETTINGS_CHANGED',
  HIGHLIGHT_STYLE_UPDATED = 'HIGHLIGHT_STYLE_UPDATED',
}

export interface ExtensionMessage {
  type: MessageType;
  payload?: Record<string, any>;
  sender?: 'popup' | 'content' | 'background';
}
```

## Messaging Patterns (Non-Negotiable)

### Pattern 1: Content → Background (Query + Response)
```typescript
// content/messaging.ts
async function askBackgroundForData(query: string) {
  const response = await chrome.runtime.sendMessage({
    type: MessageType.ANALYZE_PAGE,
    payload: { query },
  });
  return response.data;
}

// background/handlers.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MessageType.ANALYZE_PAGE) {
    handleAnalyzePage(message.payload).then(result => 
      sendResponse({ success: true, data: result })
    );
    return true; // Keep channel open for async response
  }
});
```

### Pattern 2: Background → Content (Broadcast)
```typescript
// background/handlers.ts
async function broadcastSettingsChanged(newSettings) {
  const tabs = await chrome.tabs.query({});
  tabs.forEach(tab => {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, {
        type: MessageType.SETTINGS_CHANGED,
        payload: newSettings,
      }).catch(() => {
        // Tab may not have content script loaded, ignore
      });
    }
  });
}

// content/messaging.ts
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === MessageType.SETTINGS_CHANGED) {
    applyNewSettings(message.payload);
  }
});
```

### Pattern 3: Popup → Background (State Query)
```typescript
// popup/Popup.tsx
function useExtensionStatus() {
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageType.GET_EXTENSION_STATUS }, response => {
      setStatus(response.status);
    });
  }, []);
  
  return status;
}

// background/handlers.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MessageType.GET_EXTENSION_STATUS) {
    getExtensionStatus().then(status => 
      sendResponse({ status })
    );
    return true;
  }
});
```

## Storage Abstraction (Agent-Friendly API)

Wrap Chrome storage in TypeScript for clarity:

```typescript
// storage/local.ts
export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      resolve((result[key] ?? defaultValue) as T);
    });
  });
}

export async function setSetting<T>(key: string, value: T): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

// Usage in background or hooks
const userSettings = await getSetting('userPreferences', {});
await setSetting('userPreferences', newSettings);
```

## Context Scripts Isolation Rules

Content scripts run in isolated world; be explicit about data flow:

```typescript
// content/injector.ts
// ✓ CORRECT: Explicit data flow
function injectUIIntoPage() {
  const container = document.createElement('div');
  container.id = 'extension-ui-root';
  document.body.appendChild(container);
  
  // UI can't directly access page's window.data
  // Must use postMessage or data attributes
}

// ✗ WRONG: Assuming you can access page variables
function badInjection() {
  console.log(window.somePageVariable); // Undefined in content script!
}
```

## Manifest V3 Permissions (Explicit)

```json
{
  "manifest_version": 3,
  "name": "Extension Name",
  "permissions": [
    "storage",
    "tabs",
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://*/*",
    "http://localhost:*/*"
  ],
  "background": {
    "service_worker": "src/background/index.ts"
  },
  "content_scripts": [
    {
      "matches": ["https://*/*"],
      "js": ["src/content/index.ts"],
      "run_at": "document_start"
    }
  ],
  "action": {
    "default_popup": "src/popup/index.html",
    "default_title": "Extension Name"
  }
}
```

## React in Popup/Sidepanel

Keep React components simple and messaging-heavy:

```typescript
// popup/Popup.tsx
interface PopupProps {
  onSettingSaved: (key: string, value: any) => void;
}

export function Popup({ onSettingSaved }: PopupProps) {
  const [toggle, setToggle] = useState(false);
  
  const handleToggle = async (enabled: boolean) => {
    setToggle(enabled);
    await chrome.runtime.sendMessage({
      type: MessageType.SAVE_SETTING,
      payload: { extensionEnabled: enabled },
    });
  };
  
  return <Toggle checked={toggle} onChange={handleToggle} />;
}
```

## Comments (Minimal, Targeted)

Only explain non-obvious patterns:

```typescript
// ✓ CORRECT: Why we do this
// Keep message channel open for async response
// (chrome.runtime.sendMessage closes immediately without return true)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  asyncWork().then(result => sendResponse(result));
  return true; // Critical for async handlers
});

// ✗ WRONG: Obvious from code
// Get a message
chrome.runtime.onMessage.addListener((message) => {
  // Handle message
});
```

## Agent Handoff Guidelines

Include `EXTENSION_ARCHITECTURE.md` at project root:

```markdown
# Extension Architecture Guide

## Quick Start for New Agents
1. **Messages**: All message types defined in `messaging/messages.ts`
2. **Flow**: Content → Background (sendMessage), Background → Content (broadcast)
3. **Storage**: Use `storage/local.ts` abstraction, not raw `chrome.storage`
4. **Popup**: Use hooks from `hooks/`, not direct chrome API calls

## Context Isolation
- Content script: Runs in page's JavaScript context, can access DOM
- Background: Persistent service worker, manages state
- Popup: Temporary, queries background for state

## Key Patterns
- Content sends message → Background responds (async)
- Background broadcasts message → Content listens (no response)
- Popup queries Background for current state

## Critical Dependencies
- [List key packages]

## Common Tasks
- Add new message type: [Steps]
- Add new content script feature: [Steps]
- Modify popup UI: [Steps]
```

## Violations to Avoid

| ✗ Wrong | ✓ Right | Why |
|---------|---------|-----|
| Undocumented message types | All in `messaging/messages.ts` | Next agent knows all message flows |
| Mixing manifest versions | Explicit Manifest V3 only | Avoid ambiguity |
| Assuming variables in content script | Use explicit messaging | Content scripts are isolated |
| Direct chrome API in components | Wrap in hooks/storage modules | Reusable, testable |
| Scattered message handlers | Organized by sender/receiver | Clear communication flow |
| Sync messaging (causes hangs) | Always async with `return true` | Prevents UI freezes |

## Checklist Before Handoff to Next Agent

- [ ] All message types in `messaging/messages.ts`
- [ ] Handlers organized by message type
- [ ] Storage wrapped with `storage/local.ts` or `storage/sync.ts`
- [ ] React components use hooks for messaging, not direct chrome API
- [ ] Manifest V3 (not V2)
- [ ] Service worker defined in manifest background section
- [ ] Content scripts don't assume page variables
- [ ] Async messaging returns `true` to keep channel open
- [ ] `EXTENSION_ARCHITECTURE.md` is current
- [ ] No undocumented message types
