import Nullstack from "nullstack";
import {
  Title,
  Table,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  TextInput,
  Select,
  Modal,
  Toggle,
  Alert,
} from "nullwind";

class Users extends Nullstack {
  search = "";
  successMessage = null;
  users = [
    {
      id: "0",
      name: "John Doe",
      avatar: "https://nullwind.dev/avatar.avif",
      title: "Software Engineer",
      email: "john@foo.bar",
      status: "active",
      admin: true,
      lastAccessAt: new Date().toISOString(),
    },
    {
      id: "1",
      name: "Lucas Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      title: "Software Engineer",
      email: "lucas@foo.bar",
      status: "active",
      admin: false,
      lastAccessAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Erick Doe",
      title: "Software Engineer",
      email: "erick@foo.bar",
      status: "inactive",
      admin: false,
      lastAccessAt: new Date().toISOString(),
    },
  ];
  currentUser = null;

  prepare({ page }) {
    page.title = "Manage Users";
  }

  setCurrentUser({ user }) {
    const newUser = {
      id: null,
      name: "",
      title: "",
      email: "",
      role: "",
      status: "active",
    };

    // make a copy of the user to avoid mutating the original
    this.currentUser = user ? { ...user } : newUser;
  }

  save() {
    if (this.currentUser.id) {
      this.users = this.users.map((user) => {
        if (user.id === this.currentUser.id) {
          return this.currentUser;
        }

        return user;
      });
    } else {
      this.users = [
        ...this.users,
        {
          ...this.currentUser,
          id: this.users.length,
        },
      ];
    }

    this.currentUser = null;
  }

  onToggleUserAdmin({ user }) {
    this.successMessage = `User ${user.name} updated successfully`;

    setTimeout(() => {
      this.successMessage = null;
    }, 2000);
  }

  delete({ user }) {
    const confirmed = confirm(`Are you sure you want to delete ${user.name} ?`);
    if (!confirmed) return;
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  render() {
    const filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.search.toLowerCase())
    );

    return (
      <>
        <header class="flex justify-between items-center mb-8 text-slate-500">
          <div>
            <Title h={2} class="mb-2">
              Manage Users
            </Title>
            <p>{this.users.length} users</p>
          </div>
          <Button onclick={this.setCurrentUser}>Add User</Button>
        </header>
        <section class="space-y-8">
          <TextInput
            class="w-full"
            bind={this.search}
            placeholder="Search..."
          />
          {this.successMessage && (
            <Alert color="success">{this.successMessage}</Alert>
          )}
          <div class="min-h-[400px]">
            <Table>
              <Table.THead>
                <Table.TR>
                  <Table.TH>Name</Table.TH>
                  <Table.TH>Title</Table.TH>
                  <Table.TH>Email</Table.TH>
                  <Table.TH>Status</Table.TH>
                  <Table.TH>Admin</Table.TH>
                  <Table.TH>Last Access</Table.TH>
                  <Table.TH />
                </Table.TR>
              </Table.THead>
              <Table.TBody>
                {filteredUsers.map((user) => (
                  <Table.TR>
                    <Table.TD class="font-medium text-gray-900">
                      <Avatar
                        src={user.avatar}
                        name={user.name}
                        description={user.admin ? "Admin" : "User"}
                      />
                    </Table.TD>
                    <Table.TD>{user.title}</Table.TD>
                    <Table.TD>{user.email}</Table.TD>
                    <Table.TD>
                      <Badge
                        class="capitalize"
                        color={user.status === "active" ? "success" : "danger"}
                      >
                        {user.status}
                      </Badge>
                    </Table.TD>
                    <Table.TD>
                      <Toggle
                        bind={user.admin}
                        onclick={() => this.onToggleUserAdmin({ user })}
                      />
                    </Table.TD>
                    <Table.TD>
                      {new Date(user.lastAccessAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </Table.TD>
                    <Table.TD class="space-x-4">
                      <button
                        class="text-info-600 hover:text-info-900"
                        onclick={() => this.setCurrentUser({ user })}
                      >
                        Edit
                      </button>
                      <button
                        class="text-danger-600 hover:text-danger-900"
                        onclick={() => this.delete({ user })}
                      >
                        Delete
                      </button>
                    </Table.TD>
                  </Table.TR>
                ))}
              </Table.TBody>
            </Table>
          </div>
          <div
            id="pagination"
            class="justify-center flex md:justify-between items-center"
          >
            <p class="text-sm text-gray-700 hidden md:block">
              Showing <span class="font-medium">1</span> to{" "}
              <span class="font-medium">10</span> of{" "}
              <span class="font-medium">{this.users.length}</span> results
            </p>
            <ButtonGroup>
              <Button color="secondary" disabled>
                Previous
              </Button>
              <Button color="secondary" active>
                1
              </Button>
              <Button color="secondary">2</Button>
              <Button color="secondary">3</Button>
              <Button color="secondary">4</Button>
              <Button color="secondary">Next</Button>
            </ButtonGroup>
          </div>
        </section>
        <Modal
          visible={!!this.currentUser}
          onclose={() => (this.currentUser = null)}
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <Title h={3}>{this.currentUser?.id ? "Edit" : "Create"} User</Title>
          </div>
          <form onsubmit={this.save}>
            <div class="px-6 py-8 space-y-4">
              <TextInput
                label="Name"
                bind={this.currentUser.name}
                placeholder="Name"
                required
              />
              <TextInput
                label="Title"
                bind={this.currentUser.title}
                placeholder="Title"
              />
              <TextInput
                label="Email"
                bind={this.currentUser.email}
                placeholder="Email"
              />
              <Select label="Status" bind={this.currentUser.status}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
            <footer class="bg-gray-50 px-4 py-3 flex justify-end sm:px-6 gap-2">
              <Button
                color="secondary"
                onclick={() => (this.currentUser = null)}
              >
                Close
              </Button>
              <Button color="primary" class="ml-2" type="submit">
                {this.currentUser?.id ? "Save" : "Create"}
              </Button>
            </footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default Users;
