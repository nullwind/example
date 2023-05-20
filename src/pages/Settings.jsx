import Nullstack from "nullstack";
import {
  Title,
  Button,
  TextInput,
  Toggle,
  Select,
  Divider,
  Alert,
} from "nullwind";

class Users extends Nullstack {
  loading = false;
  successMessage = null;
  settings = {};

  prepare({ page, settings }) {
    page.title = "Settings";
    // make a copy of the settings to avoid mutating the original
    this.settings = { ...settings };
  }

  save(context) {
    this.loading = true;

    setTimeout(() => {
      context.settings = this.settings;
      this.loading = false;
      this.successMessage = "Settings saved successfully";
    }, 2000);
  }

  render() {
    return (
      <>
        <header class="flex justify-between items-center mb-8">
          <div>
            <Title h={2} class="mb-2">
              Settings
            </Title>
            <p>Manage your application settings</p>
          </div>
        </header>
        <section>
          <form class="space-y-8 max-w-xl" onsubmit={this.save}>
            <TextInput
              label="Name"
              bind={this.settings.name}
              placeholder="Name"
              required
            />
            <Select label="Locale" bind={this.settings.locale}>
              <option value="en-US">Ensligh (US)</option>
              <option value="pt-BR">Portuguese (BR)</option>
            </Select>
            <Divider label="Other Settings" />
            <Toggle
              label="Receive Notifications"
              helper="Receive notifications when new users are added"
              bind={this.settings.notifications}
            />
            <Toggle
              label="Allow tracking"
              helper="Allow tracking of your application usage"
              bind={this.settings.analytics}
            />
            {this.successMessage && (
              <Alert
                color="success"
                ondismiss={() => (this.successMessage = null)}
              >
                {this.successMessage}
              </Alert>
            )}
            <footer class="flex justify-end">
              <Button color="primary" type="submit" disabled={this.loading}>
                {this.loading ? "Saving..." : "Save"}
              </Button>
            </footer>
          </form>
        </section>
      </>
    );
  }
}

export default Users;
