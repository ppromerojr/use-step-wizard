# use-wizard

A small, composable React wizard library with hooks and compound components.

## Install

```bash
npm install use-wizard
```

Peer dependency: React 18+.

## Usage

```tsx
import Wizard, {
  useWizardContext,
  type WizardContextValues,
} from "use-wizard";

function Navigation() {
  return (
    <Wizard.Navigation>
      {({ previous, next, isFirstStep, isLastStep, activeIndex, totalSteps }: WizardContextValues) => (
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
        <div>Step 1</div>
        <div>Step 2</div>
        <div>Step 3</div>
      </Wizard.Steps>
      <Navigation />
    </Wizard.Root>
  );
}
```

### Hooks only

Use `useWizardState` outside the component tree when you need full control, or `useWizardContext` inside `<Wizard.Root>`.

```tsx
import { useWizardState } from "use-wizard";

const wizard = useWizardState({ initialStep: 0, name: "checkout" });
```

## API

| Export | Description |
| --- | --- |
| `Wizard.Root` | Provider that holds wizard state |
| `Wizard.Steps` | Renders the active step from its children |
| `Wizard.Navigation` | Render-prop or static children with wizard context |
| `useWizardContext` | Read wizard state inside `<Wizard.Root>` |
| `useWizardState` | Standalone wizard state hook |
| `WizardContext` | Low-level React context |

## Development

```bash
npm install
npm run build
npm run typecheck
```

## Publish

```bash
npm run build
npm publish
```

The `prepublishOnly` script runs the build automatically before publishing.
