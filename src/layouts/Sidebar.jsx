import Nullstack from "nullstack";
import { Title, Button, Avatar } from "nullwind";

export default class Sidebar extends Nullstack {
  renderNavLink({ href, children }) {
    return (
      <Button class="w-full text-left rounded-none p-4" href={href}>
        {children}
      </Button>
    );
  }

  render({ settings }) {
    return (
      <side class="bg-slate-800 text-white w-80">
        <div class="py-4 flex flex-col justify-start items-center gap-4 h-full">
          <a class="mt-8 mb-12" href="/">
            <Title h={1} class="text-white">
              {settings.name}
            </Title>
          </a>
          <nav class="flex flex-col gap-4 w-full">
            <NavLink href="/">Users</NavLink>
            <hr class="my-8 mx-4" />
            <NavLink href="/settings">Settings</NavLink>
            <NavLink href="/logout">Logout</NavLink>
          </nav>
          <footer class="w-full mt-auto space-y-4 p-4">
            <a href="#">Support</a>
            <Avatar name="John Doe" description="Admin" />
          </footer>
        </div>
      </side>
    );
  }
}
