import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Wizard, type WizardContextType } from "use-step-wizard";

function StepCard({
  title,
  description,
}: {
  name?: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.stepCard}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  );
}

function Navigation() {
  return (
    <Wizard.Navigation>
      {({
        previous,
        next,
        isFirstStep,
        isLastStep,
        activeIndex,
        totalSteps,
      }: WizardContextType) => (
        <View style={styles.nav}>
          <Pressable
            style={[styles.button, styles.secondaryButton, isFirstStep && styles.buttonDisabled]}
            onPress={previous}
            disabled={isFirstStep}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>
          <Text style={styles.progress}>
            Step {activeIndex + 1} of {totalSteps}
          </Text>
          <Pressable
            style={[styles.button, isLastStep && styles.buttonDisabled]}
            onPress={next}
            disabled={isLastStep}
          >
            <Text style={styles.buttonText}>{isLastStep ? "Done" : "Next"}</Text>
          </Pressable>
        </View>
      )}
    </Wizard.Navigation>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <Wizard.Root initialStep={0} name="onboarding">
          <Wizard.Steps>
            <StepCard
              key="profile"
              name="profile"
              title="Profile"
              description="Collect basic user information."
            />
            <StepCard
              key="details"
              name="details"
              title="Details"
              description="Add preferences and settings."
            />
            <StepCard
              key="review"
              name="review"
              title="Review"
              description="Confirm everything before finishing."
            />
          </Wizard.Steps>
          <Navigation />
        </Wizard.Root>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  app: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 24,
  },
  stepCard: {
    gap: 8,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
  },
  stepDescription: {
    fontSize: 16,
    color: "#475569",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryButton: {
    backgroundColor: "#e2e8f0",
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#0f172a",
    fontWeight: "600",
  },
  progress: {
    color: "#64748b",
    fontSize: 14,
  },
});
