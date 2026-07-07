# use-step-wizard

A headless React wizard library with hooks and compound components. Works in React web and React Native — you bring the UI.

## Features

- Headless — no styles or DOM assumptions
- Compound components — `Wizard.Root`, `Wizard.Steps`, `Wizard.Navigation`
- Hooks — `useWizardContext` and `useWizardState`
- TypeScript-first
- React 18+ and React Native compatible

## Install

```bash
npm install use-step-wizard
```

Peer dependency: React 18+.

## Quick start

```tsx
import Wizard, {
  useWizardContext,
  type WizardContextValues,
} from "use-step-wizard";

function Navigation() {
  return (
    <Wizard.Navigation>
      {({
        previous,
        next,
        goToStep,
        isFirstStep,
        isLastStep,
        activeIndex,
        totalSteps,
        steps,
      }: WizardContextValues) => (
        <div>
          <button type="button" onClick={previous} disabled={isFirstStep}>
            Back
          </button>
          <span>
            Step {activeIndex + 1} of {totalSteps}
          </span>
          <button type="button" onClick={next} disabled={isLastStep}>
            Next
          </button>
        </div>
      )}
    </Wizard.Navigation>
  );
}

function App() {
  return (
    <Wizard.Root initialStep={0} name="onboarding">
      <Wizard.Steps>
        <div key="profile">Step 1</div>
        <div key="details">Step 2</div>
        <div key="review">Step 3</div>
      </Wizard.Steps>
      <Navigation />
    </Wizard.Root>
  );
}
```

## React Native

The API is the same — swap HTML elements for React Native components.

```tsx
import { View, Text, Pressable } from "react-native";
import Wizard, { type WizardContextValues } from "use-step-wizard";

function Onboarding() {
  return (
    <Wizard.Root>
      <Wizard.Steps>
        <View><Text>Step 1</Text></View>
        <View><Text>Step 2</Text></View>
      </Wizard.Steps>
      <Wizard.Navigation>
        {({ previous, next, isFirstStep, isLastStep }: WizardContextValues) => (
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable onPress={previous} disabled={isFirstStep}>
              <Text>Back</Text>
            </Pressable>
            <Pressable onPress={next} disabled={isLastStep}>
              <Text>Next</Text>
            </Pressable>
          </View>
        )}
      </Wizard.Navigation>
    </Wizard.Root>
  );
}
```

## Hooks

### `useWizardContext`

Read wizard state inside `<Wizard.Root>`.

```tsx
import { useWizardContext } from "use-step-wizard";

function StepIndicator() {
  const { activeIndex, totalSteps } = useWizardContext();
  return <span>{activeIndex + 1} / {totalSteps}</span>;
}
```

### `useWizardState`

Use wizard state outside the provider when you need full control.

```tsx
import { useWizardState } from "use-step-wizard";

const wizard = useWizardState({ initialStep: 0, name: "checkout" });
```

## Step metadata

Pass a `name` prop on step children to register step metadata in context.

```tsx
<Wizard.Steps>
  <ProfileStep name="profile" />
  <DetailsStep name="details" />
  <ReviewStep name="review" />
</Wizard.Steps>
```

Access registered steps via `steps` in context:

```tsx
const { steps, goToStep } = useWizardContext();
// steps: [{ index: 0, name: "profile" }, ...]
```

## API

### Components

| Export | Props | Description |
| --- | --- | --- |
| `Wizard.Root` | `children`, `initialStep?`, `name?` | Provider that holds wizard state |
| `Wizard.Steps` | `children` | Renders the active step from its children |
| `Wizard.Navigation` | `children` | Render prop or static children with wizard context |

### Hooks

| Export | Description |
| --- | --- |
| `useWizardContext` | Read wizard state inside `Wizard.Root` |
| `useWizardState` | Standalone wizard state hook |

### Context

| Export | Description |
| --- | --- |
| `WizardContext` | Low-level React context |

### `WizardContextValues`

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | Wizard display name |
| `steps` | `WizardStep[]` | Registered step metadata |
| `activeIndex` | `number` | Current step index (clamped) |
| `totalSteps` | `number` | Total number of steps |
| `isFirstStep` | `boolean` | Whether on the first step |
| `isLastStep` | `boolean` | Whether on the last step |
| `previous` | `() => void` | Go to previous step |
| `next` | `() => void` | Go to next step |
| `goToStep` | `(index: number) => void` | Jump to a step by index |
| `setTotalSteps` | `(total: number) => void` | Manually update step count |
| `setState` | `Dispatch<SetStateAction<WizardState>>` | Update full wizard state |

## Development

```bash
npm install
npm run build
npm run typecheck
```

## License

MIT
